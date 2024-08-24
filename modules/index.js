const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");
const MakeBlogModel = require("./blogModel");
const MakeUserModel = require("./userModel");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blogs = MakeBlogModel(sequelize, DataTypes);
db.users = MakeUserModel(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Synced");
});

module.exports = db;
