const CategoryModel = (sequelize, DataTypes) => {
  const category = sequelize.define('User', {
    name: DataTypes.STRING,
  });
    
  return category;
};
    
module.exports = CategoryModel;