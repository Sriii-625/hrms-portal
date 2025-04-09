import mongoose from 'mongoose';

const timetrackingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String, default: 'Not Clocked Out', required: true },
  location: { type: String, required: true },
  isActive: { type: String, required: true }
}, { collection: "timetracking" });

export default mongoose.model('TimeTracking', timetrackingSchema);
