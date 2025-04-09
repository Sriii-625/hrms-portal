import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import leaveRoutes from './routes/leaveRoutes';
import timeRoutes from './routes/timeRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/leave', leaveRoutes);
app.use('/api/time', timeRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
