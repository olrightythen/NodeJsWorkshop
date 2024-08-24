const MakeBlogModel = (sequelize, DataTypes) => {
  return sequelize.define("blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING
    },
  });
};

module.exports = MakeBlogModel;
