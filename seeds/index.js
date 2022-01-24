const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await sequelize.sync({ force: false });
      // console.log('\n----- DATABASE SYNCED -----\n');
    }
    await seedCategories();
    // console.log('\n----- CATEGORIES SEEDED -----\n');
  
    await seedProducts();
    // console.log('\n----- PRODUCTS SEEDED -----\n');
  
    await seedTags();
    // console.log('\n----- TAGS SEEDED -----\n');
  
    await seedProductTags();
    // console.log('\n----- PRODUCT TAGS SEEDED -----\n');
  
    process.env.NODE_ENV !== "test" && process.exit(0);

  } catch (err) {
    console.log(err);
  }
};

seedAll();

module.exports = seedAll;
