const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Group = require("./group");
const Poll = require("./poll");
const Vote = require("./vote");

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
