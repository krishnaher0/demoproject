const Venue = require('../models/Venue');
const asyncHandler = require('express-async-handler');

// @desc    Get all venues
// @route   GET /api/venues
// @access  Public
const getVenues = asyncHandler(async (req, res) => {
    const venues = await Venue.find({});
    res.json(venues);
});

// @desc    Get single venue
// @route   GET /api/venues/:id
// @access  Public
const getVenueById = asyncHandler(async (req, res) => {
    const venue = await Venue.findById(req.params.id);
    if (venue) {
        res.json(venue);
    } else {
        res.status(404);
        throw new Error('Venue not found');
    }
});

// @desc    Create a venue
// @route   POST /api/venues
// @access  Private (Admin only)
const createVenue = asyncHandler(async (req, res) => {
    const { name, description, address, capacity, pricePerHour, images, amenities } = req.body;
    const venue = new Venue({
        name,
        description,
        address,
        capacity,
        pricePerHour,
        images,
        amenities,
        owner: req.user._id
    });
    const createdVenue = await venue.save();
    res.status(201).json(createdVenue);
});

// @desc    Update a venue
// @route   PUT /api/venues/:id
// @access  Private (Admin only)
const updateVenue = asyncHandler(async (req, res) => {
    const { name, description, address, capacity, pricePerHour, images, amenities } = req.body;

    const venue = await Venue.findById(req.params.id);

    if (venue) {
        venue.name = name || venue.name;
        venue.description = description || venue.description;
        venue.address = address || venue.address;
        venue.capacity = capacity || venue.capacity;
        venue.pricePerHour = pricePerHour || venue.pricePerHour;
        venue.images = images || venue.images;
        venue.amenities = amenities || venue.amenities;

        const updatedVenue = await venue.save();
        res.json(updatedVenue);
    } else {
        res.status(404);
        throw new Error('Venue not found');
    }
});

// @desc    Delete a venue
// @route   DELETE /api/venues/:id
// @access  Private (Admin only)
const deleteVenue = asyncHandler(async (req, res) => {
    const venue = await Venue.findById(req.params.id);

    if (venue) {
        await Venue.deleteOne({ _id: venue._id });
        res.json({ message: 'Venue removed' });
    } else {
        res.status(404);
        throw new Error('Venue not found');
    }
});

module.exports = { getVenues, getVenueById, createVenue, updateVenue, deleteVenue };
