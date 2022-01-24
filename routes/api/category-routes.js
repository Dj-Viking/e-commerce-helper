const router = require('express').Router();
const { Category, Product } = require('../../models');

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
          },
        ],
      }
    );
    res.status(200).json(data)
    // res.json(data); //this is not formatted if using curl. Insomnia Core will format it for you
  } catch (err) {}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  if (!!req.params.id) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: "Bad Request, must provide a number as an id parameter." });
    }
  }
  try {
    const data = await Category.findOne(
      {
        where: {
          id: req.params.id,
        },//catching which category we're looking at and then JOIN the product model 
        include: [
          {
            model: Product,
          },
        ],
      }
    );
    if (data === null) return res.status(404).json({ error: "category not found by that id" });
    const category = {
      id: data.id,
      category_name: data.category_name
    };
    res.status(200).json({ category });
  } catch (err) {}
});

router.post('/', async (req, res) => {
  // create a new category
  if (!req.body || !req.body.category_name) {
    return res.status(400).json({ error: "Must provide a category_name field in the json body to create a category"});
  }
  try {
    const data = await Category.create(
      {
        category_name: req.body.category_name,
      }
    );
    //validation is being done at sequelize level
    // length needs to be atleast 1 char for now
    const created = {
      category: data
    }
    res.status(200).json({ created });
  } catch (err) {}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if (!!req.params.id) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: "Bad Request, the id parameter must be a number." });
    }
  }
  if (!req.body.category_name) {
    return res.status(400).json({ error: "Bad Request, need to provide a category_name field to update."})
  }
  try {
    const data = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        individualHooks: true,
        where: {
          id: req.params.id,
        },
      }
    );
    if (data[0] === 0 || !data) {
      return res.status(200).json({ message: "an update was not performed from this request" });
    }
    const update = {
      wasUpdated: !!data[0],
      updatedCategory: data[1][0],
    }
    return res.status(200).json({ update })
  } catch (err) {}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  if (!!req.params.id) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: "Bad Request, need to provide a number as a category id"});
    }
  }
  try {
    const data = await Category.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (data === 0) return res.status(404).json({ error: "category not found" });
    res.status(200).json(data);
  } catch (err) {}
});

module.exports = router;
