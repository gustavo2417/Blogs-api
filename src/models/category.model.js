const CategoryModel = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
  });
    
  return category;
};
    
module.exports = CategoryModel;