const Event = require('../models/Event');
const Booking = require('../models/Booking');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.getEvents = async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.search) filters.title = { $regex: escapeRegex(req.query.search), $options: 'i' };

        const events = await Event.find(filters).populate('createdBy', 'name email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, totalSeats, ticketPrice, image } = req.body;
        if (!Number.isInteger(Number(totalSeats)) || Number(totalSeats) < 1) {
            return res.status(400).json({ message: 'Total seats must be at least 1' });
        }
        if (Number(ticketPrice) < 0) {
            return res.status(400).json({ message: 'Ticket price cannot be negative' });
        }
        const event = await Event.create({
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats: totalSeats,
            ticketPrice: ticketPrice ?? 0,
            image: image || '',
            createdBy: req.user.id
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        const allowed = ['title', 'description', 'date', 'location', 'category', 'ticketPrice', 'image', 'totalSeats'];
        const updates = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) updates[key] = req.body[key];
        }
        if (updates.totalSeats !== undefined) {
            const totalSeats = Number(updates.totalSeats);
            if (!Number.isInteger(totalSeats) || totalSeats < 1) {
                return res.status(400).json({ message: 'Total seats must be at least 1' });
            }
            const confirmedSeats = await Booking.countDocuments({ eventId: event._id, status: 'confirmed' });
            if (totalSeats < confirmedSeats) {
                return res.status(400).json({ message: 'Total seats cannot be lower than confirmed bookings' });
            }
            updates.availableSeats = event.availableSeats + (totalSeats - event.totalSeats);
        }
        if (updates.ticketPrice !== undefined && Number(updates.ticketPrice) < 0) {
            return res.status(400).json({ message: 'Ticket price cannot be negative' });
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
