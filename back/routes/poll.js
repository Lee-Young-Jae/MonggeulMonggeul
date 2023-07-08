const express = require("express");
const router = express.Router();
const { Poll, User, Group } = require("../models");
const { isLoggedIn } = require("./middlewares");

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
    const { title, description, GroupId } = req.body;
    if (!title || title === "") {
      return res.status(409).json({ message: "유효한 제목을 입력해주세요." });
    }
    if (!description || description === "") {
      return res.status(409).json({ message: "유효한 설명을 입력해주세요." });
    }
    if (!GroupId || GroupId === "") {
      return res.status(409).json({ message: "유효한 그룹을 선택해주세요." });
    }

    const poll = await Poll.create({
      title,
      description,
      GroupId,
      UserId: req.user.id,
    });
    if (!poll) {
      return res.status(404).json({ message: "투표를 생성할 수 없습니다." });
    }
    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
