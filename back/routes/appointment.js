const express = require("express");
const router = express.Router();
const { Group, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { generateRandomCode } = require("../utils/common");

// 그룹의 Appointment 목록 send GET http://localhost:3010/appointment
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const { groupCode } = req.query;

    const existGroup = await Group.findOne({
      where: { code: groupCode },
    });
    if (!existGroup) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    existGroup
      .getAppointments({
        attributes: ["id", "title", "content", "date", "time", "place"],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "profileImage"],
          },
        ],
      })
      .then((appointments) => {
        res.status(200).json(appointments);
      });
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
      groupCode + title + new Date().getTime().toString(),
      11
    );

    console.log(code);

    const existCode = await existGroup.getAppointments({
      where: { code },
    });

    while (existCode.length > 0) {
      code = generateRandomCode(
        groupCode + title + new Date().getTime().toString(),
        11
      );
    }

    const createdAppointment = await existGroup.createAppointment({
      title,
      sub_title,
      start_date,
      end_date,
      start_time,
      end_time,
      deadline,
      duration_minutes,
      code,
      hostId: req.user.id,
      groupCode: groupCode,
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

module.exports = router;
