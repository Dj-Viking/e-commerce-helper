const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  console.log(`
  
  `);
  console.log("\x1b[33m", "client request to get all tags", "\x1b[00m");
  console.log(`
  
  `);
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll(
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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  console.log(`
  
  `);
  console.log("\x1b[33m", "client request to get one tag by id", "\x1b[00m");
  console.log(`
  
  `);
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findOne(
      {
        where: {
          id: req.params.id
        },
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
  console.log(`
  
  `);
  console.log("\x1b[33m", "client request to create a tag", "\x1b[00m");
  console.log(`
  
  `);
  // create a new tag
  /** body required for the tag post route
   * {
   *  "tag_name": "name"
   * }
   * i think..but lets try
   */
  try {
    const data = await Tag.create(
      {
        tag_name: req.body.tag_name
      }
    );
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log(`
  
  `);
  console.log("\x1b[33m", "client request to update a tag by id", "\x1b[00m");
  console.log(`
  
  `);
  // update a tag's name by its `id` value
    /** body required for the tag post route
   * {
   *  "tag_name": "name"
   * }
   * i think..but lets try
   */
  try {
    const data = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      }
    );
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  console.log(`
  
  `);
  console.log("\x1b[33m", "client request to delete a tag by id", "\x1b[00m");
  console.log(`
  
  `);
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
