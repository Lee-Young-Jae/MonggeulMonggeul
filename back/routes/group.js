const express = require("express");
const router = express.Router();
const { Group, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

// 유저의 그룹 목록 send GET http://localhost:3010/group
router.get("/", isLoggedIn, (req, res) => {
  req.user.getGroups().then((groups) => {
    res.status(200).json(groups);
  });
});

// 그룹 정보 GET http://localhost:3010/group/:id
router.get("/:code", isLoggedIn, async (req, res) => {
  try {
    if (!req.params.code || req.params.code === "") {
      return res.status(409).json({ message: "유효한 그룹을 선택해주세요." });
    }

    const group = await Group.findOne({
      where: { code: req.params.code },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });
    if (!group) {
      return res.status(404).json({ message: "그룹을 찾을 수 없습니다." });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
  }
});

// 그룹 생성 POST http://localhost:3010/group/create
router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(409).json({ message: "유효한 이름을 입력해주세요." });
    }

    const generateCode = () => {
      return (
        Math.random().toString(36).substr(2, 16) +
        Math.random().toString(36).substr(2, 16)
      ).toUpperCase();
    };

    let code = generateCode();
    let existGroupCode = await Group.findOne({
      where: { code: code },
    });

    while (existGroupCode) {
      code = generateCode();
      existGroupCode = Group.findOne({
        where: { code: code },
      })
        ? true
        : false;
      if (!existGroupCode) {
        break;
      }
    }

    Group.create({
      name: name,
      code: code,
    }).then((group) => {
      req.user.addGroup(group);
      res.status(201).json(group);
    });
  } catch (error) {
    console.error(error);
  }
});

// 그룹 가입 POST http://localhost:3010/group/join
router.post("/join", isLoggedIn, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || code === "") {
      res.status(404).send({ message: "그룹 코드를 입력해주세요." });
    }

    const existGroup = await Group.findOne({
      where: { code: code },
    });

    if (!existGroup) {
      res.status(404).send({ message: "초대 코드를 확인해주세요." });
    }

    const existJoinedGroup = await req.user.getGroups({
      where: { id: existGroup.id },
    });

    if (existGroup && existJoinedGroup.length === 0) {
      req.user.addGroup(existGroup);
      res.status(201).json(existGroup);
    } else {
      res
        .status(404)
        .send({ message: "이미 가입된 그룹이거나 그룹을 찾을 수가 없어요." });
    }
  } catch (err) {
    console.error(err);
  }
});

//그룹 탈퇴 POST http://localhost:3010/group/leave
router.post("/leave", isLoggedIn, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || code === "") {
      res.status(404).send({ message: "유효한 그룹이 아닙니다." });
    }
    // 그룹 찾기
    const existGroup = await Group.findOne({
      where: { code: code },
    });

    if (!existGroup) {
      res.status(404).send({ message: "유효한 그룹이 아닙니다." });
    }

    // 유저가 가입된 그룹인지 확인
    const existJoinedGroup = await req.user.getGroups({
      where: { id: existGroup.id },
    });

    if (existGroup && existJoinedGroup.length !== 0) {
      req.user.removeGroup(existGroup);
      // 그룹에 유저가 없으면 그룹 삭제
      const existUser = await existGroup.getUsers();
      if (existUser.length === 1) {
        await Group.destroy({
          where: { id: existGroup.id },
        });
      }
      res.status(201).json(existGroup);
    }

    if (existGroup && existJoinedGroup.length === 0) {
      res.status(404).send({ message: "가입된 그룹이 아닙니다." });
    }

    res.status(404).send({ message: "유효한 그룹이 아닙니다." });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
