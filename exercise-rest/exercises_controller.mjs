import * as exercises from './exercises_model.mjs';
import express from 'express';

// store express API as app
const app = express();

// set port
const PORT = 3000;

// middleware function to interpret json objects
app.use(express.json());

/**
 * Create a new exercise with name, reps, weight, unit, and date provided in the body.
 */
app.post("/exercises", (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});


/**
 * Retrive the entire collection of exercises.
 */

app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(exercise => {
            res.status(200).json(exercise)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' })
        });
});

/**
 * Update the exercise whose _id is provided in the path parameter and set 
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({
                    _id: req.params._id, name: req.body.name,
                    reps: req.body.reps, weight: req.body.weight,
                    unit: req.body.unit, date: req.body.date
                })
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose _id is provided in the query parameters
 */
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});