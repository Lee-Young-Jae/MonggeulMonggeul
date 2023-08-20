const express = require("express");
const router = express.Router();
const { Group, User, Appointment, AppointmentTimeVote } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { generateRandomCode } = require("../utils/common");

// 그룹의 Appointment 목록 send GET http://localhost:3010/appointment
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const { groupcode } = req.query;

    const existGroup = await Group.findOne({
      where: { code: groupcode },
    });
    if (!existGroup) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    const appointments = await Appointment.findAll({
      where: { groupCode: groupcode },
      order: [["createdAt", "DESC"]],
    });

    if (!appointments) {
      return res.status(200).json([]);
    }

    appointments.map((appointment) => {
      const isHost = appointment.dataValues.hostId === req.user.id;
      appointment.dataValues.isHost = isHost;
      return appointment;
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

// 그룹의 Appointment 생성 send POST http://localhost:3010/appointment
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const {
      groupCode,
      title,
      sub_title,
      start_date,
      end_date,
      start_time,
      end_time,
      deadline,
      duration_minutes,
    } = req.body;

    const existGroup = await Group.findOne({
      where: { code: groupCode },
    });
    if (!existGroup) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    // startDate가 endDate보다 늦을 경우
    if (start_date > end_date) {
      return res.status(400).json({
        message: "시작 날짜가 종료 날짜보다 늦을 수 없습니다.",
      });
    }

    let code = generateRandomCode(
      groupCode + title + new Date().getTime().toString(),
      11
    );

    let existCode = await Appointment.findOne({
      where: { code },
    });

    while (existCode) {
      code = generateRandomCode(
        groupCode + title + new Date().getTime().toString(),
        11
      );

      existCode = await Appointment.findOne({
        where: { code },
      });
    }

    const createdAppointment = await Appointment.create({
      title,
      sub_title,
      start_date,
      end_date,
      start_time,
      end_time,
      deadline,
      duration_minutes,
      code,
      status: "진행중",
      hostId: req.user.id,
      groupCode,
    });

    if (!createdAppointment) {
      return res.status(500).json({
        message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
      });
    }

    res.status(201).json(createdAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

// Appointment 삭제 DELETE http://localhost:3010/appointment
router.delete("/", isLoggedIn, async (req, res) => {
  try {
    const { code } = req.body;

    const existAppointment = await Appointment.findOne({
      where: { code },
    });
    if (!existAppointment) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    if (existAppointment.hostId !== req.user.id) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    const deletedAppointment = await Appointment.destroy({
      where: { code },
    });

    if (!deletedAppointment) {
      return res.status(500).json({
        message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
      });
    }

    res.status(200).json({ message: "모임이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

// 특정 Appointment 정보 GET http://localhost:3010/appointment/:code
router.get("/:code", isLoggedIn, async (req, res) => {
  try {
    const { code } = req.params;

    const existAppointment = await Appointment.findOne({
      where: { code },
    });

    if (!existAppointment) {
      return res.status(404).json({ message: "약속을 찾을 수 없습니다." });
    }

    const existGroup = await Group.findOne({
      where: { code: existAppointment.groupCode },
    });
    const isJoinedUser = await existGroup.hasUser(req.user.id);

    if (!isJoinedUser) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    res.status(200).json(existAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

// Appointment Status 변경 PUT http://localhost:3010/appointment/:code
router.put("/:code", isLoggedIn, async (req, res) => {
  try {
    const { code } = req.params;
    const { status } = req.body;
    const existAppointment = await Appointment.update(
      { status },
      { where: { code } }
    );

    console.log(existAppointment, status, code);

    if (!existAppointment) {
      return res.status(404).json({ message: "약속을 찾을 수 없습니다." });
    }
    res.status(200).json({ message: "약속 상태가 변경되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

// 유저가 약속시간에 투표 POST http://localhost:3010/appointment/:code/vote
router.post("/vote", isLoggedIn, async (req, res) => {
  try {
    const { code, pickTimes } = req.body;

    const existAppointment = await Appointment.findOne({
      where: { code },
    });

    if (!existAppointment) {
      return res.status(404).json({ message: "약속을 찾을 수 없습니다." });
    }

    const times = [];
    for (let date in pickTimes) {
      const value = pickTimes[date];
      if (value) {
        value.forEach((time) => {
          times.push([date, time]);
        });
      }
    }

    const createdAppointmentTimeVote = await AppointmentTimeVote.bulkCreate(
      times.map((time) => {
        return {
          selectedDate: new Date(time[0] + " " + time[1]),
          appointmentCode: code,
          userId: req.user.id,
        };
      })
    );

    if (!createdAppointmentTimeVote) {
      return res.status(500).json({
        message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
      });
    }

    res.status(201).json(createdAppointmentTimeVote);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

// 가장 많이 겹치는 시간대 조회 GET http://localhost:3010/appointment/:code/vote/rank
router.get("/:code/vote/rank", isLoggedIn, async (req, res) => {
  try {
    const { code } = req.params;

    const existAppointment = await Appointment.findOne({
      where: { code },
    });

    if (!existAppointment) {
      return res.status(404).json({ message: "약속을 찾을 수 없습니다." });
    }

    // 모임의 멤버인지 확인
    const existGroup = await Group.findOne({
      where: { code: existAppointment.groupCode },
    });
    const isJoinedUser = await existGroup.hasUser(req.user.id);

    if (!isJoinedUser) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    const appointmentTimeVotes = await AppointmentTimeVote.findAll({
      where: { appointmentCode: code },
      include: [
        {
          model: User,
          attributes: ["id", "name", "profileImage"],
        },
      ],
    });

    if (!appointmentTimeVotes) {
      return res.status(200).json([]);
    }

    const rank = [];
    appointmentTimeVotes.forEach((timeVote) => {
      timeVote.dataValues.selectedDate;
      const date = timeVote.dataValues.selectedDate;
      const existDate = rank.find((r) => {
        return `${r.date}` === `${date}`;
      });
      if (existDate) {
        existDate.count++;
        existDate.users.push(timeVote.dataValues.User);
      } else {
        rank.push({
          date,
          count: 1,
          users: [timeVote.dataValues.User],
        });
      }
    });

    rank.sort((a, b) => {
      return b.count - a.count;
    });

    res.status(200).json(rank);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버에서 에러가 발생했어요 잠시 후 다시 시도해 주세요.",
    });
  }
});

module.exports = router;
