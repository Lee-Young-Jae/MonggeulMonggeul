const express = require("express");
const router = express.Router();
const { Poll, User, Group, PollSubject } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { generateRandomCode } = require("../utils/common");

// 그룹의 투표 목록 send GET http://localhost:3010/poll
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const polls = await Poll.findAll({
      where: { GroupId: req.query.groupId },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });
    if (!polls) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
  }
});

// 투표 생성 POST http://localhost:3010/poll/create
router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const { title, subjects, groupCode, isMultiple, isAnonymous, closedAt } =
      req.body;

    const existGroup = await Group.findOne({
      where: { code: groupCode },
    });
    if (!existGroup) {
      return res.status(404).json({ message: "그룹을 찾을 수 없습니다." });
    }
    const groupId = existGroup.id;

    if (!title || title === "") {
      return res.status(409).json({ message: "유효한 제목을 입력해주세요." });
    }
    if (!subjects || subjects === "") {
      return res.status(409).json({ message: "유효한 설명을 입력해주세요." });
    }
    if (!groupId || groupId === "") {
      return res.status(409).json({ message: "유효한 그룹을 선택해주세요." });
    }

    let code = generateRandomCode(existGroup.code + title, 11);
    let existCode = await Poll.findOne({
      where: { code },
    });
    let count = 0;
    while (existCode) {
      code = generateRandomCode(existGroup.code + count++, 11 + (count % 10));
      existCode = await Poll.findOne({
        where: { code },
      });
    }

    const poll = await Poll.create({
      title,
      subjects,
      GroupId: groupId,
      UserId: req.user.id,
      isMultiple,
      isAnonymous,
      code,
      closedAt,
    });

    const pollSubjects = await PollSubject.bulkCreate(
      subjects.map((subject) => ({
        title: subject,
        PollId: poll.id,
      }))
    );
    if (!pollSubjects) {
      return res.status(404).json({ message: "투표를 생성할 수 없습니다." });
    }
    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
