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
    res.status(200).json(data);
  } catch (err) {}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  if (!!req.params.id) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: "Bad Request, need to provide a number for the request id parameter"});
    }
  }
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
    if (data === null) res.status(404).json({ error: "tag not found" });
    res.status(200).json(data);
  } catch (err) {}
});

router.post('/', async (req, res) => {
  // create a new tag
  /** body required for the tag post route
   * {
   *  "tag_name": "name"
   * }
   */
  if (!req.body || !req.body.tag_name) {
    return res.status(400).json({ error: "Bad Request, need to provide a tag_name in the json body"});
  }
  try {
    const data = await Tag.create(
      {
        tag_name: req.body.tag_name
      }
    );
    
    res.status(200).json(data);
  } catch (err) {}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
    /** body required for the tag put route
   * {
   *  "tag_name": "name"
   * }
   */
  if (!!req.params.id) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: "Bad Request, the id in the request parameter was not a number" });
    }
  }
  if (!req.body || !req.body.tag_name) {
    return res.status(400).json({ error: "Bad Request, need to provide a tag_name in the json body to update" });
  }
  const data = await Tag.findOne({ where: { id: req.params.id }});
  if (data === null) return res.status(404).json({ error: "tag not found" });
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
    
    if (!data[0]) return res.status(200).json({ message: "an update was not performed at this time" });
    const updated = {
      wasUpdated: !!data[0],
      tag: data[1][0]
    }
    res.status(200).json({ updated });
  } catch (err) {}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  if (!!req.params.id) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: "Bad Request, the id in the request parameter was not a number" });
    }
  }
  const data = await Tag.findOne({ where: { id: req.params.id }});
  if (data === null) return res.status(404).json({ error: "tag not found" });
  try {
    const data = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(data);
  } catch (err) {}
});

module.exports = router;
