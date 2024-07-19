const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Note = sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue("tags")
          ? this.getDataValue("tags").split(";")
          : [];
      },
      set(val) {
        this.setDataValue("tags", val.join(";"));
      },
      defaultValue: "",
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#ffffff",
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isTrashed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reminder: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Note;
};
