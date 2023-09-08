const { Model, DataTypes } = require("sequelize");

class PostComment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "PostComment",
        tableName: "post_comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.PostComment.belongsTo(db.User);
    db.PostComment.belongsTo(db.Post);
  }
}

module.exports = PostComment;
