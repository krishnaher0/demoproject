const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

const { protect, adminOrOrganizer } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEvents)
    .post(protect, adminOrOrganizer, createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, adminOrOrganizer, updateEvent)
    .delete(protect, adminOrOrganizer, deleteEvent);

module.exports = router;
