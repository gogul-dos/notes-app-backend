const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const User = require("./user")(sequelize);
const Note = require("./note")(sequelize);

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

sequelize.sync();

module.exports = { sequelize, User, Note };
