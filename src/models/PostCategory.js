const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });
    
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
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
