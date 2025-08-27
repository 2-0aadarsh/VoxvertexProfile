// models/availability.js
import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    // enum: ["Workshop", "Keynote", "Consultation", "Panel", "Other"] // Add your event types
  },
  mode: {
    type: String,
    required: true,
    // enum: ["In-Person", "Virtual", "Hybrid"]
  },
  timeSlot: {
    start: { type: String, required: true }, // Format: "HH:MM" (e.g., "09:00")
    end: { type: String, required: true }   // Format: "HH:MM" (e.g., "17:00")
  },
  // duration: {
  //   value: { type: Number, required: true },
  //   unit: { 
  //     type: String, 
  //     required: true,
  //   //   enum: ["hours", "days", "weeks"] 
  //   }
  // },
  bookingPrice: {
    type: Number,
    required: true,
    min: 0
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

// In availabilitySchema
availabilitySchema.index(
  { expertId: 1, date: 1, "timeSlot.start": 1, "timeSlot.end": 1 },
  { unique: true, partialFilterExpression: { isBooked: false } }
);

availabilitySchema.pre('save', async function(next) {
  const existing = await this.constructor.findOne({
    expertId: this.expertId,
    date: this.date,
    isBooked: false,
    $or: [
      { 
        "timeSlot.start": { $lt: this.timeSlot.end },
        "timeSlot.end": { $gt: this.timeSlot.start }
      }
    ]
  });

  if (existing) {
    throw new Error(`Time conflict with existing ${existing.eventType} booking`);
  }
  next();
});

const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;