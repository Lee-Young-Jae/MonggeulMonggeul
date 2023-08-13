const express = require("express");
const router = express.Router();
const { Group, User, Appointment } = require("../models");
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
      group_code,
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
      where: { code: group_code },
    });
    if (!existGroup) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    // startTime이 endTime보다 늦을 경우
    if (start_time > end_time) {
      return res.status(400).json({
        message: "시작 시간이 종료 시간보다 늦을 수 없습니다.",
      });
    }

    // startDate가 endDate보다 늦을 경우
    if (start_date > end_date) {
      return res.status(400).json({
        message: "시작 날짜가 종료 날짜보다 늦을 수 없습니다.",
      });
    }

    let code = generateRandomCode(
      group_code + title + new Date().getTime().toString(),
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
      groupCode: group_code,
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
    const { appointment_code } = req.body;

    const existAppointment = await Appointment.findOne({
      where: { code: appointment_code },
    });
    if (!existAppointment) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    if (existAppointment.hostId !== req.user.id) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    const deletedAppointment = await Appointment.destroy({
      where: { code: appointment_code },
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

module.exports = router;
