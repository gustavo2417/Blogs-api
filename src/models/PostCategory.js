const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'PostCategory'
  });
    
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'blogPost',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
          
return PostCategory;
};
    
module.exports = PostCategory;
