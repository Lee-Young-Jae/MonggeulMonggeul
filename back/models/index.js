const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Group = require("./group");
const Poll = require("./poll");
const Vote = require("./vote");
const PollSubject = require("./pollSubject");
const Appointment = require("./appointment");
const AppointmentTimeVote = require("./appointmentTimeVote");
const GroupInviteCode = require("./groupInviteCode");
const Post = require("./post");
const PostComment = require("./postComment");

// node와 mySql연결
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    timezone: "Asia/Seoul",
  }
);

const db = {};
db.User = User;
db.Group = Group;
db.Poll = Poll;
db.Vote = Vote;
db.PollSubject = PollSubject;
db.Appointment = Appointment;
db.AppointmentTimeVote = AppointmentTimeVote;
db.GroupInviteCode = GroupInviteCode;
db.Post = Post;
db.PostComment = PostComment;

// 모델 초기화
Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

// 모델간의 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
