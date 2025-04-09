import express from 'express';
import LeaveRequest from '../models/LeaveRequest';

const router = express.Router();

// POST - Create a new leave request
router.post('/', async (req, res) => {
  try {
    const { name, role, startDate, endDate, reason } = req.body;
    const leave = new LeaveRequest({ name, role, startDate, endDate, reason });
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit leave request' });
  }
});

// GET - All leave requests
router.get('/', async (req, res) => {
  try {
    const leaves = await LeaveRequest.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

// PATCH - Update leave status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave status' });
  }
});

export default router;
