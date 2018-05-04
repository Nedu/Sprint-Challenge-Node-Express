const express = require('express');

const db = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Error getting actions from the database' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: `Error fetching action with id ${id}` });
    });
});

router.post('/', (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const action = { project_id, description, notes, completed };
  if (!project_id || !description) {
    res.status(400).json({
      error: `Please provide a valid project id and description for the action.`,
    });
  } else {
    db
      .insert(action)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: `There was an error creating the action` });
      });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;
  const updatedAction = { project_id, description, notes, completed };
  if (!project_id || !description) {
    res
      .status(400)
      .json({
        error: `Please provide a valid project id and description for the action.`,
      });
  } else {
    db
      .update(id, updatedAction)
      .then(action => {
        if (action === null) {
          res.status(404).json({ error: `Action with id ${id} not found.` });
        } else {
          res.status(200).json(action);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: `There was an error updating the action with id ${id}`,
          });
      });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: `The action with id ${id} was not found.` });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `Error deleting the action with id ${id}` });
    });
});

module.exports = router;
