import express, { Request, Response } from 'express';
import TimeTracking from '../models/TimeTracking';

const router = express.Router();

// POST - Create a new time request
router.post('/', async (req, res) => {
  try {
    const { name, timeIn, timeOut, location, isActive } = req.body;
    const time = new TimeTracking({ name, timeIn, timeOut, location, isActive });
    await time.save();
    res.status(201).json(time);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit time request' });
  }
});

// GET - All time requests
router.get('/', async (req, res) => {
  try {
    const timestamps = await TimeTracking.find();
    res.json(timestamps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch time requests' });
  }
});

// // PATCH - Update time record by ID
// router.patch('/:id', async (req: Request, res: Response) => {
//     try {
//         const { status } = req.body;
//         const updated = await TimeTracking.findByIdAndUpdate(req.params.id, { status }, {
//         new: true
//         });

//         if (!updated) {
//         return res.status(404).json({ error: 'Time record not found' });
//         }

//         res.json(updated);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update time record' });
//     }
//   });
  

export default router;
