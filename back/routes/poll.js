const express = require("express");
const router = express.Router();
const { Poll, Group, PollSubject, Vote, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { generateRandomCode } = require("../utils/common");

// 그룹의 투표 목록 send GET http://localhost:3010/poll?groupcode={groupCode}
router.get("/", isLoggedIn, async (req, res) => {
  try {
    if (!req.query.groupcode || req.query.groupcode === "") {
      return res.status(409).json({ message: "유효한 모임을 선택해주세요." });
    }

    const existGroup = await Group.findOne({
      where: { code: req.query.groupcode },
    });
    if (!existGroup) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    //가입된 모임인지 확인
    const existUserGroup = await existGroup.getUsers({
      where: { id: req.user.id },
    });

    if (!existUserGroup) {
      return res.status(404).json({ message: "가입된 모임이 아닙니다." });
    }

    const groupId = existGroup.id;

    const polls = await Poll.findAll({
      where: { GroupId: groupId },
      include: [
        {
          model: PollSubject,
          attributes: ["title", "id"],
          include: [
            {
              model: Vote,
            },
          ],
        },
      ],
      order: [
        ["closedAt", "ASC"],
        ["createdAt", "DESC"],
      ],
    });

    if (!polls) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    polls.forEach((poll) => {
      let isVoted = false;
      poll.dataValues.PollSubjects.forEach((subject) => {
        subject.dataValues.Votes.forEach((vote) => {
          if (vote.UserId === req.user.id) {
            isVoted = true;
          }
          return vote;
        });
      });
      poll.dataValues.isVoted = isVoted;
    });

    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
  }
});

// 투표 상세 정보 send GET http://localhost:3010/poll/detail/{pollCode}
router.get("/detail/:pollCode", isLoggedIn, async (req, res) => {
  try {
    const existPoll = await Poll.findOne({
      where: { code: req.params.pollCode },
      include: [
        {
          model: PollSubject,
          attributes: ["title", "id"],
          include: [
            {
              model: Vote,
              include: [
                {
                  model: User,
                  attributes: ["id", "name", "email"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!existPoll) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    // 가입된 모임인지 확인
    const existUserGroup = await existPoll.getGroup({
      where: { id: req.user.id },
    });

    if (!existUserGroup) {
      return res.status(404).json({ message: "가입된 모임이 아닙니다." });
    }

    // 투표에 참여했는지 확인
    let isVoted = false;
    const isAnonymous = existPoll.isAnonymous;
    existPoll.dataValues.PollSubjects.map((subject) => {
      subject.dataValues.Votes.map((vote) => {
        if (vote.UserId === req.user.id) {
          isVoted = true;
        }
        if (isAnonymous) {
          vote.dataValues.User.name = "알 수 없음";
        }
        return vote;
      });
      return subject;
    });

    existPoll.dataValues.isVoted = isVoted;

    return res.status(200).json(existPoll);
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

    poll.dataValues.PollSubjects = pollSubjects.map((subject) => ({
      title: subject.title,
      PollId: subject.PollId,
      Votes: [],
    }));

    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
  }
});

// 투표 삭제 DELETE http://localhost:3010/poll/delete
router.delete("/delete", isLoggedIn, async (req, res) => {
  try {
    const { pollId } = req.body;

    const existPoll = await Poll.findOne({
      where: { id: pollId },
    });
    if (!existPoll) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    const existGroup = await Group.findOne({
      where: { id: existPoll.GroupId },
    });
    const vaildUser = await existGroup.hasUser(req.user.id);

    if (!vaildUser) {
      return res.status(409).json({ message: "삭제 권한이 없습니다." });
    }

    const pollSubjects = await PollSubject.destroy({
      where: { PollId: pollId },
    });
    if (!pollSubjects) {
      return res.status(404).json({ message: "투표를 삭제할 수 없습니다." });
    }

    const poll = await Poll.destroy({
      where: { id: pollId },
    });
    if (!poll) {
      return res.status(404).json({ message: "투표를 삭제할 수 없습니다." });
    }

    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
  }
});

// 유저가 Poll에 투표 POST http://localhost:3010/poll/vote
router.post("/vote", isLoggedIn, async (req, res) => {
  try {
    const { subjectId, comment } = req.body;

    const existSubject = await PollSubject.findOne({
      where: { id: subjectId },
    });
    if (!existSubject) {
      return res.status(404).json({ message: "투표 항목을 찾을 수 없습니다." });
    }

    const existPoll = await Poll.findOne({
      where: { id: existSubject.PollId },
    });
    if (!existPoll) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    const pollSubjects = await PollSubject.findAll({
      where: { PollId: existPoll.id },
      include: [
        {
          model: Vote,
          attributes: ["UserId"],
        },
      ],
    });

    let isVoted = false;
    pollSubjects.forEach((subject) => {
      subject.Votes.forEach((vote) => {
        if (vote.UserId === req.user.id) {
          isVoted = true;
        }
      });
    });

    if (isVoted) {
      // Poll과 연결된 Vote 삭제
      const allSubjectIds = pollSubjects.map((subject) => subject.id);

      const deleteVote = await Vote.destroy({
        where: { UserId: req.user.id, PollSubjectId: allSubjectIds },
      });

      if (!deleteVote) {
        return res
          .status(404)
          .json({ message: "투표 변경중 오류가 발생하였습니다." });
      }
    }

    // vote 생성
    const vote = await Vote.create({
      UserId: req.user.id,
      PollSubjectId: subjectId,
      comment: comment ? comment : null,
    });

    if (!vote) {
      return res.status(404).json({ message: "투표를 생성할 수 없습니다." });
    }
    res.status(200).json(vote);
  } catch (error) {
    console.error(error);
  }
});

// 유저가 Poll에 여러개 투표 POST http://localhost:3010/poll/voteMultiple
router.post("/vote/Multiple", isLoggedIn, async (req, res) => {
  try {
    const { subjectIds, comments } = req.body;

    const existSubject = await PollSubject.findOne({
      where: { id: subjectIds },
    });

    if (!existSubject) {
      return res.status(404).json({ message: "투표 항목을 찾을 수 없습니다." });
    }

    const existPoll = await Poll.findOne({
      where: { id: existSubject.PollId },
    });
    if (!existPoll) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    const pollSubjects = await PollSubject.findAll({
      where: { PollId: existPoll.id },
      include: [
        {
          model: Vote,
          attributes: ["UserId"],
        },
      ],
    });

    let isVoted = false;
    pollSubjects.forEach((subject) => {
      subject.Votes.forEach((vote) => {
        if (vote.UserId === req.user.id) {
          isVoted = true;
        }
      });
    });

    if (isVoted) {
      // 다시 투표하기

      // Poll과 연결된 Vote 삭제
      const allSubjectIds = pollSubjects.map((subject) => subject.id);

      const deleteVote = await Vote.destroy({
        where: { UserId: req.user.id, PollSubjectId: allSubjectIds },
      });

      if (!deleteVote) {
        return res
          .status(404)
          .json({ message: "투표 변경중 오류가 발생하였습니다." });
      }
    }

    // vote 생성
    const votes = await Vote.bulkCreate(
      subjectIds.map((subjectId, index) => ({
        UserId: req.user.id,
        PollSubjectId: subjectId,
        comment: comments[index] ? comments[index] : null,
      }))
    );

    if (!votes) {
      return res.status(404).json({ message: "투표를 생성할 수 없습니다." });
    }

    res.status(200).json(votes);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
