'use client';

import { useState } from 'react';
import styles from './ShiftManagement.module.css';

interface Shift {
  id: number;
  name: string;
  time: string;
}

export default function ShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 1,
      name: 'Morning Shift',
      time: '09:00 - 17:00'
    },
    {
      id: 2,
      name: 'Night Shift',
      time: '22:00 - 06:00'
    }
  ]);

  const [newShift, setNewShift] = useState({
    name: '',
    startTime: '',
    endTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newShift.name || !newShift.startTime || !newShift.endTime) {
      alert('Please fill in all fields');
      return;
    }

    const shift: Shift = {
      id: Date.now(),
      name: newShift.name,
      time: `${newShift.startTime} - ${newShift.endTime}`
    };

    setShifts([...shifts, shift]);
    setNewShift({ name: '', startTime: '', endTime: '' });
  };

  return (
    <div className={styles.container}>
      <h2>Shift Management</h2>

      <form onSubmit={handleSubmit} className={styles.shiftForm}>
        <div className={styles.inputGroup}>
          <label>Shift Name</label>
          <input
            type="text"
            value={newShift.name}
            onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
            placeholder="Enter shift name"
            required
          />
        </div>

        <div className={styles.timeInputs}>
          <div className={styles.inputGroup}>
            <label>Start Time</label>
            <input
              type="time"
              value={newShift.startTime}
              onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>End Time</label>
            <input
              type="time"
              value={newShift.endTime}
              onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.addButton}>
          Add Shift
        </button>
      </form>

      <div className={styles.shiftList}>
        <h3>Shifts</h3>
        {shifts.map((shift) => (
          <div key={shift.id} className={styles.shiftItem}>
            <div className={styles.shiftName}>{shift.name}</div>
            <div className={styles.shiftTime}>Time: {shift.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 