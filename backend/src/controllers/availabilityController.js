import Availability from "../models/availability.js";
import User from "../models/user.js";
import Profile from "../models/profile.js";

// Add new availability slot
export const addAvailability = async (req, res) => {
  try {
    const { date, eventType, timeSlot } = req.body;

    const validUser = await User.findOne({
      _id: req.user._id
    });
    if(validUser.role !== 'Expert') {
      return res.status(403).json({
        success: false,
        message: "Only experts can create availability slots"
      });
    }

    const currentDate = new Date();
    const inputDate = new Date(date);

    if (inputDate < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Cannot create availability for past dates"
      });
    }

    // Get user details
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const userName = `${user.firstName} ${user.lastName}`;

    // Check for duplicate
    const duplicate = await Availability.findOne({
      expertId: req.user._id,
      date,
      "timeSlot.start": timeSlot.start,
      "timeSlot.end": timeSlot.end,
      eventType
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Identical availability slot already exists"
      });
    }

    // Check for time overlap
    const overlap = await Availability.findOne({
      expertId: req.user._id,
      date,
      isBooked: false,
      $or: [
        {
          "timeSlot.start": { $lt: timeSlot.end },
          "timeSlot.end": { $gt: timeSlot.start }
        }
      ]
    });

    if (overlap) {
      return res.status(400).json({
        success: false,
        message: `Time overlaps with existing ${overlap.eventType} commitment`,
        conflictingSlot: overlap
      });
    }

    const newAvailability = new Availability({
      ...req.body,
      expertId: req.user._id,
      userName
    });

    await newAvailability.save();
    res.status(201).json({
      success: true,
      availability: newAvailability
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate time slot detected"
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all availabilities for an expert
export const getExpertAvailabilities = async (req, res) => {
  try {
    const availabilities = await Availability.find({
      expertId: req.user._id,
      isBooked: false
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: availabilities.length,
      availabilities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching availabilities",
      error: error.message
    });
  }
};

// Update an availability slot
export const updateAvailability = async (req, res) => {
  try {
    const { availabilityId } = req.params;

    const { date } = req.body;

    // Validate date is not in the past if date is being updated
    if (date) {
      const currentDate = new Date();
      const inputDate = new Date(date);
      
      if (inputDate < currentDate) {
        return res.status(400).json({
          success: false,
          message: "Cannot update availability to past dates"
        });
      }
    }

    // Prevent userName updates
    if (req.body.userName) {
      delete req.body.userName;
    }

    const availability = await Availability.findOneAndUpdate(
      {
        _id: availabilityId,
        expertId: req.user._id,
        isBooked: false
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found or already booked"
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating availability",
      error: error.message
    });
  }
};

// Delete an availability slot
export const deleteAvailability = async (req, res) => {
  try {
    const { availabilityId } = req.params;

    const availability = await Availability.findOneAndDelete({
      _id: availabilityId,
      expertId: req.user._id,
      isBooked: false
    });

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found or already booked"
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting availability",
      error: error.message
    });
  }
};

// Get availability by ID (new addition)
export const getAvailabilityById = async (req, res) => {
  try {
    const availability = await Availability.findOne({
      _id: req.params.availabilityId,
      expertId: req.user._id
    }).populate('expertId', 'firstName lastName');

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found"
      });
    }

    res.status(200).json({
      success: true,
      availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching availability",
      error: error.message
    });
  }
};