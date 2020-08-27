const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(
      {
        category_name: req.body.category_name
      }
    );
    //validation is being done at sequelize level
    // length needs to be atleast 1 char for now
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(
      req.body,
      {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      }
    );
    //validation is being done at sequelize level
    // length needs to be atleast 1 char for now
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

module.exports = router;
