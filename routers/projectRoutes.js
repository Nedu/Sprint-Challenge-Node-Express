const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting projects from the database' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: `Error fetching project with id ${id}` });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  db
    .getProjectActions(id)
    .then(actions => {
      if (actions.length === 0) {
        res
          .status(404)
          .json({ error: `No Actions found for project with id ${id}` });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `Error fetching actions for project with id ${id}` });
    });
});

router.post('/', (req, res) => {
  const { name, description, completed } = req.body;
  const project = { name, description, completed };
  if (!name || !description) {
    res
      .status(400)
      .json({
        error: `Please provide a name and description for the project.`,
      });
  } else {
    db
      .insert(project)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: `There was an error creating the project` });
      });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const updatedProject = { name, description, completed };
  if (!name || !description) {
    res
      .status(400)
      .json({ error: `Please provide a name and description for the project.` });
  } else {
    db
      .update(id, updatedProject)
      .then(project => {
        if (project === null) {
          res
            .status(404)
            .json({ error: `Project with id ${id} not found.` });
        } else {
          res.status(200).json(project);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: `There was an error updating the project with id ${id}`,
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
          .json({ message: `The project with id ${id} was not found.` });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json({ error: `Error deleting the project with id ${id}` });
    });
});

module.exports = router;
