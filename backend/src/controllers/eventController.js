import Event from "../models/event.js";
import UserRole from "../models/userRole.js";
import User from "../models/user.js";
import Profile from "../models/profile.js";

// Helper function to check if user is organizer
const isOrganizer = (event, userId) => {
  return event.organizer.userId.toString() === userId.toString();
};

// Helper function to categorize events
const categorizeEvents = (events) => {
  const now = new Date();
  return {
    past: events.filter(event => new Date(event.eventDate) < now),
    upcoming: events.filter(event => new Date(event.eventDate) >= now)
  };
};

// Create an event
export const createEvent = async (req, res) => {
  const data = req.body.data ? JSON.parse(req.body.data) : req.body;
  try {
    const {
      topic,
      description,
      totalAudienceCount,
      pricePerHead,
      speakers,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventMode,
      eventLocation,
      venueAddress
    } = data;

    // Organizer Role Validation
    const organizerRole = await UserRole.findOne({ userId: req.user._id });
    if (!organizerRole || !['Business', 'Freelancer'].includes(organizerRole.role)) {
      return res.status(403).json({
        success: false,
        message: 'Permission denied: Only Business/Freelancer accounts can create events'
      });
    }

    // Event Banner Validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Event banner is required',
        details: {
          requiredFormat: 'PNG/JPG under 5MB',
          fieldName: 'eventBanner'
        }
      });
    }

    // Speaker Validation with UserID Capture
    const validatedSpeakers = [];
    const invalidSpeakers = [];

    await Promise.all(speakers.map(async (email) => {
      try {
        const normalizedEmail = email.toLowerCase().trim();
        const expertRole = await UserRole.findOne({
          workEmail: normalizedEmail,
          role: 'Expert'
        }).populate('userId');

        if (expertRole?.userId) {
          validatedSpeakers.push({
            email: normalizedEmail,
            userId: expertRole.userId._id
          });
        } else {
          invalidSpeakers.push(email);
        }
      } catch (err) {
        invalidSpeakers.push(email);
      }
    }));

    if (invalidSpeakers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Speaker validation failed',
        details: {
          invalidSpeakers,
          requirement: 'Each speaker must:',
          conditions: [
            'Have a registered workEmail in our system',
            'Have "Expert" role status',
            'Be in active good standing'
          ],
          validCount: validatedSpeakers.length,
          invalidCount: invalidSpeakers.length
        }
      });
    }

    // Event Mode Validation
    if (eventMode === 'online' && !eventLocation) {
      return res.status(400).json({
        success: false,
        message: 'Online events require platform selection',
        validOptions: ['zoom pro', 'google meet', 'personal link']
      });
    }

    if (eventMode === 'offline' && !venueAddress) {
      return res.status(400).json({
        success: false,
        message: 'Physical venue address required',
        requirements: {
          maxLength: '500 characters',
          example: '123 Main St, City, Country'
        }
      });
    }

    // Event Creation
    const newEvent = new Event({
      topic,
      description,
      eventBanner: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      totalAudienceCount,
      pricePerHead,
      speakers: validatedSpeakers,
      organizer: {
        email: req.user.email,
        userId: req.user._id
      },
      eventDate,
      eventStartTime,
      eventEndTime,
      eventMode,
      eventLocation: eventMode === 'online' ? eventLocation : undefined,
      venueAddress: eventMode === 'offline' ? venueAddress : undefined,
      createdBy: req.user._id
    });

    // Save event
    await newEvent.validate();
    const savedEvent = await newEvent.save();

    // Update all speakers' profiles
    // Update all speakers' profiles asynchronously
    const speakerUpdates = savedEvent.speakers.map(async (speaker) => {
      try {
        await Profile.findOneAndUpdate(
          { user: speaker.userId },
          { $addToSet: { expertEvents: savedEvent._id } },
          { new: true, upsert: true }
        );
      } catch (err) {
        console.error(`Failed to update profile for ${speaker.email}:`, err);
      }
    });


    await Promise.all(speakerUpdates);

    const eventWithStatus = {
      ...savedEvent.toObject(),
      status: savedEvent.eventDate < new Date() ? 'past' : 'upcoming'
    };

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: {
        ...eventWithStatus,
        speakerCount: validatedSpeakers.length,
        organizerInfo: {
          name: req.user.name,
          email: req.user.email
        }
      }
    });

  } catch (error) {
    console.error('Event Creation Error:', error);

    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate event detected',
        fields: Object.keys(error.keyPattern)
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      systemMessage: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all events
// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find()
//       .populate('speakers.userId', 'name email profileImage')
//       .populate('organizer.userId', 'name email');

//     res.status(200).json({
//       success: true,
//       count: events.length,
//       data: events
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error fetching events'
//     });
//   }
// };

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('speakers.userId', 'name email profileImage')
      .populate('organizer.userId', 'name email')
      .sort({ eventDate: 1 }) // Sort by event date
      .lean();

    const categorized = categorizeEvents(events);

    res.status(200).json({
      success: true,
      data: {
        past: categorized.past.map(event => ({
          ...event,
          status: 'past'
        })),
        upcoming: categorized.upcoming.map(event => ({
          ...event,
          status: 'upcoming'
        })),
        count: {
          total: events.length,
          past: categorized.past.length,
          upcoming: categorized.upcoming.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching events',
      error: error.message
    });
  }
};

// get events for a particular organizer or speaker
export const getUserEvents = async (req, res) => {
  try {
    // Get events where user is organizer or speaker
    const [organizedEvents, speakerEvents] = await Promise.all([
      Event.find({ 'organizer.userId': req.user._id }).lean(),
      Event.find({ 'speakers.userId': req.user._id }).lean()
    ]);

    // Combine and deduplicate
    const allEvents = [...organizedEvents, ...speakerEvents]
      .filter((event, index, self) => 
        index === self.findIndex(e => e._id.toString() === event._id.toString())
      );

    const categorized = categorizeEvents(allEvents);

    res.status(200).json({
      success: true,
      data: {
        past: categorized.past,
        upcoming: categorized.upcoming,
        count: {
          total: allEvents.length,
          past: categorized.past.length,
          upcoming: categorized.upcoming.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching user events'
    });
  }
};

// Get an event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('speakers.userId', 'name email profileImage')
      .populate('organizer.userId', 'name email')
      .lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Add status field
    const eventWithStatus = {
      ...event,
      status: event.eventDate < new Date() ? 'past' : 'upcoming'
    };

    res.status(200).json({
      success: true,
      data: eventWithStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching event'
    });
  }
};

// Update an event

export const updateEvent = async (req, res) => {
  try {
    // 1. Find the event
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // 2. Verify organizer permissions
    if (!isOrganizer(event, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    // 3. Capture original speakers for tracking changes
    const originalSpeakerIds = event.speakers.map(s => s.userId.toString());

    // 4. Parse update data (handles both JSON and form-data)
    const updateData = req.body.data ? JSON.parse(req.body.data) : req.body;

    // 5. Process numeric fields
    if (updateData.totalAudienceCount) {
      updateData.totalAudienceCount = parseInt(updateData.totalAudienceCount);
    }
    if (updateData.pricePerHead) {
      updateData.pricePerHead = parseFloat(updateData.pricePerHead);
    }

    // 6. Process date fields
    if (updateData.eventDate) {
      updateData.eventDate = new Date(updateData.eventDate);
    }

    // 7. Process speakers array
    if (updateData.speakers) {
      try {
        updateData.speakers = Array.isArray(updateData.speakers)
          ? updateData.speakers
          : JSON.parse(updateData.speakers);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Invalid speakers format. Use JSON array format'
        });
      }
    }

    // 8. Apply updates to event document
    const updatableFields = [
      'topic', 'description', 'totalAudienceCount', 'pricePerHead',
      'eventDate', 'eventStartTime', 'eventEndTime', 'eventMode',
      'eventLocation', 'venueAddress'
    ];

    updatableFields.forEach(field => {
      if (updateData[field] !== undefined) {
        event[field] = updateData[field];
      }
    });

    // 9. Handle speakers update
    if (updateData.speakers !== undefined) {
      const validatedSpeakers = [];
      const invalidSpeakers = [];

      await Promise.all(updateData.speakers.map(async (email) => {
        try {
          const normalizedEmail = email.toLowerCase().trim();
          const expertRole = await UserRole.findOne({
            workEmail: normalizedEmail,
            role: 'Expert'
          }).populate('userId');

          if (expertRole?.userId) {
            validatedSpeakers.push({
              email: normalizedEmail,
              userId: expertRole.userId._id
            });
          } else {
            invalidSpeakers.push(email);
          }
        } catch (err) {
          invalidSpeakers.push(email);
        }
      }));

      if (invalidSpeakers.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Speaker validation failed',
          invalidSpeakers
        });
      }
      event.speakers = validatedSpeakers;
    }

    // 10. Handle location based on mode
    if (updateData.eventMode === 'online') {
      if (updateData.eventLocation) {
        event.eventLocation = updateData.eventLocation;
      }
      event.venueAddress = undefined;
    } else if (updateData.eventMode === 'offline') {
      if (updateData.venueAddress) {
        event.venueAddress = updateData.venueAddress;
      }
      event.eventLocation = undefined;
    }

    // 11. Handle file upload
    if (req.file) {
      event.eventBanner = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    // 12. Validate and save
    await event.validate();
    const updatedEvent = await event.save();

    // 13. Update speaker profiles (add/remove as needed)
    const updatedSpeakerIds = updatedEvent.speakers.map(s => s.userId.toString());
    
    const addedSpeakers = updatedSpeakerIds.filter(
      id => !originalSpeakerIds.includes(id)
    );
    
    const removedSpeakers = originalSpeakerIds.filter(
      id => !updatedSpeakerIds.includes(id)
    );

    // Execute updates in parallel
    await Promise.all([
      ...addedSpeakers.map(userId => 
        Profile.findOneAndUpdate(
          { user: userId },
          { $addToSet: { expertEvents: updatedEvent._id } },
          { upsert: true }
        ).catch(err => console.error(`Update failed for ${userId}:`, err))
      ,
      ...removedSpeakers.map(userId => 
        Profile.findOneAndUpdate(
          { user: userId },
          { $pull: { expertEvents: updatedEvent._id } }
        ).catch(err => console.error(`Removal failed for ${userId}:`, err))
      ))
    ]);

    // 14. Prepare response with virtual status field
    const responseEvent = {
      ...updatedEvent.toObject(),
      status: updatedEvent.eventDate < new Date() ? 'past' : 'upcoming'
    };

    // 15. Return successful response
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: responseEvent
    });

  } catch (error) {
    console.error('Event Update Error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Server error updating event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Verify requester is the organizer
    if (!isOrganizer(event, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }

    // Remove from all speakers' profiles
    await Profile.updateMany(
      { expertEvents: event._id },
      { $pull: { expertEvents: event._id } }
    );

    await event.remove();

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting event'
    });
  }
};