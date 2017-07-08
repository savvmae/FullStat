const express = require('express');
const route = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const data = require('../models/data');
var moment = require('moment');
moment().format();

// for deletes -- go into native model and delete by objectid~!!



route.get('/api/users/:id/activities', passport.authenticate('jwt', { session: false }), async function (request, response) {
    await data.users.find({ _id: request.params.id })
        .populate('activities')
        .exec(function (err, data) {
            if (!data[0].activities[0]) {
                return response.status(404).send({ message: 'No activities yet' });
            }
            return response.status(200).json(data[0].activities);
        });
});

route.post('/api/users/:id/activities', passport.authenticate('jwt', { session: false }), async function (request, response) {
    if (request.body.type && request.body.description) {
        var user = await data.users.find({ _id: request.params.id })
            .populate('activities')
            .exec(function (err, data) {
                if (data[0].activities.find(q => q.type === request.body.type) === undefined) {
                    var newActvity = new data.activities({
                        type: request.body.type,
                        description: request.body.description
                    });
                    newActvity.save(function (err, data) {
                        user[0].activities.push(data._id);
                        user[0].save();
                        return response.status(200).json(newActvity);
                    })
                } else {
                    return response.status(409).json({ message: 'activity already exists' });
                }
            })
    } else {
        return response.status(400).json({message: "incomplete data fields"});
    }
});

route.get('/api/activities/:id', passport.authenticate('jwt', { session: false }), async function (request, response) {
    //single activity with data tracked
    var activity = await data.activities.find({ _id: request.params.id })
        .populate('entries').
        exec(function (err, data) {
            console.log(data[0]);
            if (!data[0]) {
                return response.status(400).send({ message: 'Activity not found' });
            } else {
                return response.status(200).json(data[0].entries);
            }
        });
});

route.put('/api/activities/:id', passport.authenticate('jwt', { session: false }), async function (request, response) {
    //only updates type, not entry
    if (request.body.type && request.body.description) {
        var activity = await data.activities.findOneAndUpdate({ _id: request.params.id },
            {
                type: request.body.type,
                description: request.body.description
            });
        var updated = await data.activities.find({ _id: request.params.id });
        return response.status(200).json(updated);
    } else {
        return response.status(400).json({message: "incomplete data fields"});
    }
});

route.delete('/api/activities/:id', passport.authenticate('jwt', { session: false }), async function (request, response) {
    //delete whole activity and data tracked
    // deletes entries but not object id on users model.
    // finds user
    // var user = await data.users.find( { activities: { $in: [ request.params.id ] }});
    // doesnt pull id out of array, whyyyyyy
    // var user = await data.users.update( {$pull: { activities: { $in: [ request.params.id ] }}});
    var deletedActivity = await data.activities.find({ _id: request.params.id });
    if(!deletedActivity[0]){
        return response.status(400).json({message: "Activity not found"});
    } else {
    await data.activities.findOneAndRemove({ _id: request.params.id });
    return response.status(200).json(deletedActivity);
    }
});

route.post('/api/activities/:id/entries', passport.authenticate('jwt', { session: false }), async function (request, response) {
    //add tracked data for a day or replace if date already exists
    // validate date from client here

    var newEntry = { date: request.body.date, quantity: request.body.quantity };
    var activity = await data.activities.find({ _id: request.params.id })
        .populate('entries').
        exec(function (err, data) {
            if (err) return handleError(err);
        });
    var entryIndex = activity[0].entries.findIndex(q => q.date === request.body.date);
    var entryId = activity[0].entries.find(q => q.date === request.body.date);
    if (entryIndex === -1) {
        var newEntry = new data.entries(newEntry);
        newEntry.save(function (err, data) {
            activity[0].entries.push(data._id);
            activity[0].save();
            return response.status(200).json(newEntry);
        });
    } else {
        await data.entries.findOneAndUpdate({ _id: entryId },
            {
                $set: {
                    quantity: request.body.quantity
                }
            })
    };
    var updatedEntry = await data.entries.find({ _id: entryId });
    return response.status(200).json(updatedEntry);
});

route.delete('/api/entries/:id', passport.authenticate('jwt', { session: false }), async function (request, response) {
    //removes tracked data for a day
    // remove entry id's from activities object
    var deleted = await data.entries.find({ _id: request.params.id });
    await data.entries.findOneAndRemove({ _id: request.params.id });
    response.status(200).json(deleted);
});


module.exports = route;