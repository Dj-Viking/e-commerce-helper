const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection.js');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll(
      {
        include: [
          {
            model: Product
          }
        ]
      }
    );
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
    // res.json(data); //this is not formatted if using curl. Insomnia Core will format it for you
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
        },//catching which category we're looking at and then JOIN the product model 
        include: [
          {
            model: Product,
          }
        ]
      }
    );
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
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
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      }
    );
    if (data[0] === 0 || !data) {
      res.status(400).json({message: 'There was a problem with your request format.'});
      return;
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
    // res.json(data);
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
