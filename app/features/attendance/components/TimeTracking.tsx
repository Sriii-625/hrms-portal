'use client';

import { useState } from 'react';
import styles from './TimeTracking.module.css';

interface TimeRecord {
  id: number;
  name: string;
  timeIn: string;
  timeOut: string | 'Not clocked out';
  location: string;
  isActive: boolean;
}

export default function TimeTracking() {
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([
    {
      id: 1,
      name: 'John Doe',
      timeIn: '2025-02-15 09:00:00',
      timeOut: '2025-02-15 17:00:00',
      location: 'Office',
      isActive: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      timeIn: '2025-02-15 08:30:00',
      timeOut: 'Not clocked out',
      location: 'Remote',
      isActive: true
    }
  ]);

  const [currentSession, setCurrentSession] = useState<TimeRecord | null>(null);

  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleTimeIn = () => {
    if (currentSession) {
      alert('You are already clocked in!');
      return;
    }

    const newRecord: TimeRecord = {
      id: Date.now(),
      name: 'Current User',
      timeIn: formatDateTime(),
      timeOut: 'Not clocked out',
      location: 'Office',
      isActive: true
    };

    setTimeRecords([...timeRecords, newRecord]);
    setCurrentSession(newRecord);
  };

  const handleTimeOut = () => {
    if (!currentSession) {
      alert('You need to clock in first!');
      return;
    }

    const updatedRecords = timeRecords.map(record => {
      if (record.id === currentSession.id) {
        return {
          ...record,
          timeOut: formatDateTime(),
          isActive: false
        };
      }
      return record;
    });

    setTimeRecords(updatedRecords);
    setCurrentSession(null);
  };

  return (
    <div className={styles.container}>
      <h2>Time Tracking</h2>

      <div className={styles.timeActions}>
        <button 
          onClick={handleTimeIn} 
          className={`${styles.timeButton} ${styles.timeInButton}`}
          disabled={!!currentSession}
        >
          Time In
        </button>
        <button 
          onClick={handleTimeOut} 
          className={`${styles.timeButton} ${styles.timeOutButton}`}
          disabled={!currentSession}
        >
          Time Out
        </button>
      </div>

      {currentSession && (
        <div className={styles.currentSession}>
          <h3>Current Session</h3>
          <div className={styles.sessionInfo}>
            <p>Started at: {currentSession.timeIn}</p>
            <p>Location: {currentSession.location}</p>
          </div>
        </div>
      )}

      <div className={styles.timeRecords}>
        <h3>Time Records</h3>
        {timeRecords.map((record) => (
          <div key={record.id} className={`${styles.recordItem} ${record.isActive ? styles.active : ''}`}>
            <div className={styles.recordHeader}>
              {record.name}
              {record.isActive && <span className={styles.activeIndicator}>Active</span>}
            </div>
            <div className={styles.recordDetails}>
              <div>Time In: {record.timeIn}</div>
              <div>Time Out: {record.timeOut}</div>
              <div>Location: {record.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 