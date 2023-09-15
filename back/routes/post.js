const express = require("express");
const router = express.Router();
const { Group, User, Post, PostComment } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { generateRandomCode } = require("../utils/common");
const { Op } = require("sequelize");

// 그룹내 게시글 조회 GET http://localhost:3010/post/:groupcode/&page=1?limit=10
router.get("/:groupcode", isLoggedIn, async (req, res) => {
  try {
    if (!req.params.groupcode || req.params.groupcode === "") {
      return res.status(409).json({ message: "유효한 모임을 선택해주세요." });
    }

    console.log("groupcode : ", req.params.groupcode);

    // 가입한 모임인지 확인
    const existJoinedGroup = await req.user.getGroups({
      where: { code: req.params.groupcode },
    });

    if (existJoinedGroup.length === 0) {
      return res.status(404).json({ message: "가입된 모임이 아닙니다." });
    }

    const { page, limit } = req.query;

    // 게시글 조회
    const posts = await Post.findAll({
      where: { GroupId: existJoinedGroup[0].id },
      include: [
        {
          model: User,
          attributes: ["name", "email", "profileImage"],
        },
        {
          model: PostComment,
          attributes: ["id", "content", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["name", "email", "profileImage"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: 0 + parseInt(page) * parseInt(limit),
      limit: parseInt(limit),
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// 게시글 작성 POST http://localhost:3010/post/:groupcode
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { groupCode } = req.body;

    if (!groupCode || groupCode === "") {
      return res.status(409).json({ message: "유효한 모임을 선택해주세요." });
    }

    // 가입한 모임인지 확인
    const existJoinedGroup = await req.user.getGroups({
      where: { code: groupCode },
    });

    if (existJoinedGroup.length === 0) {
      return res.status(404).json({ message: "가입된 모임이 아닙니다." });
    }

    const { title, content } = req.body;

    // 게시글 작성
    const post = await Post.create({
      title,
      content,
      GroupId: existJoinedGroup[0].id,
      UserId: req.user.id,
      like: 0,
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
  }
});

// 게시글 Comment 작성 POST http://localhost:3010/post/{postId}/comment
router.post("/:postId/comment", isLoggedIn, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    // 게시글 조회
    const existPost = await Post.findOne({
      where: { id: postId },
    });

    if (!existPost) {
      return res.status(404).json({ message: "존재하지 않는 게시글입니다." });
    }

    // 가입된 모임인지 확인
    const existJoinedGroup = await req.user.getGroups({
      where: { id: existPost.GroupId },
    });

    if (existJoinedGroup.length === 0) {
      return res.status(404).json({ message: "가입된 모임이 아닙니다." });
    }

    // 댓글 작성
    const postComment = await PostComment.create({
      content,
      PostId: postId,
      UserId: req.user.id,
    });

    res.status(200).json(postComment);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
