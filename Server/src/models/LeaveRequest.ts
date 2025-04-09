import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Team Member' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

export default mongoose.model('LeaveRequest', leaveRequestSchema);
