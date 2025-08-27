import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, 'Event topic is required'],
    trim: true,
    maxlength: [120, 'Topic cannot exceed 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  eventBanner: {
    data: {
      type: Buffer,
      required: [true, 'Event banner data is required']
    },
    contentType: {
      type: String,
      required: [true, 'Event banner content type is required']
    }
  },
  totalAudienceCount: {
    type: Number,
    required: [true, 'Total audience count is required'],
    min: [1, 'Audience count must be at least 1'],
    max: [10000, 'Audience count cannot exceed 10,000']
  },
  pricePerHead: {
    type: Number,
    required: [true, 'Price per head is required'],
    min: [0, 'Price cannot be negative']
  },

  speakers: [{
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  // organizer: [{
  //   type: String,
  //   required: [true, 'Organizer is required'],
  // }],
  organizer: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function (v) {
        return v > Date.now();
      },
      message: 'Event date must be in the future'
    }
  },
  eventStartTime: {
    type: String,
  },
  eventEndTime: {
    type: String,
  },
  eventMode: {
    type: String,
    required: [true, 'Event mode is required'],
    enum: {
      values: ['online', 'offline'],
      message: 'Event mode must be either online or offline'
    }
  },
  eventLocation: {
    type: String,
    required: [true, 'Event location is required'],
    validate: {
      validator: function (v) {
        if (this.eventMode === 'online') {
          return ['zoom pro', 'google meet', 'personal link'].includes(v.toLowerCase());
        }
        return true; // For offline, any string is acceptable
      },
      message: 'For online events, location must be "zoom pro", "google meet", or "personal link"'
    }
  },
  venueAddress: {
    type: String,
    required: function () {
      return this.eventMode === 'offline';
    },
    trim: true,
    maxlength: [500, 'Venue address cannot exceed 500 characters']
  }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },  // Include virtuals when converting to JSON
    toObject: { virtuals: true } // Include virtuals when converting to objects
  });

// Update the updatedAt field before saving
eventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for checking if event is in the past
eventSchema.virtual('isPast').get(function () {
  return this.eventDate < new Date();
});

// Virtual for checking if event is in the future
eventSchema.virtual('isFuture').get(function () {
  return this.eventDate > new Date();
});

// Virtual for event status (categorization)
eventSchema.virtual('status').get(function () {
  return this.eventDate < new Date() ? 'past' : 'future';
}
);

// Update the updatedAt field before saving
eventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


// eventSchema.post('save', async function(doc) {
//   try {
//     const Profile = mongoose.model('Profile');
    
//     // Update each speaker's profile
//     await Promise.all(doc.speakers.map(speaker => 
//       Profile.updateExpertEvents(speaker.userId, doc._id)
//     ));
//   } catch (error) {
//     console.error('Error updating speaker profiles:', error);
//   }
// });

const Event = mongoose.model('Event', eventSchema);

export default Event;