const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
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
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
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
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
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
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
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
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
