'use client';

import { useState, useEffect } from 'react';
import styles from './TimeTracking.module.css';

interface TimeRecord {
  _id?: string;
  id: number;
  name: string;
  timeIn: string;
  timeOut: string | 'Not clocked out';
  location: string;
  isActive: boolean;
}

export default function TimeTracking() {
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [currentSession, setCurrentSession] = useState<TimeRecord | null>(null);

  // Format date-time string
  const formatDateTime = (date = new Date()) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // Load records + active session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('currentSession');
    if (saved) setCurrentSession(JSON.parse(saved));

    fetch('http://localhost:5000/api/time')
      .then(res => res.json())
      .then(data => setTimeRecords(data))
      .catch(err => console.error('Error fetching time records:', err));
  }, []);

  const handleTimeIn = () => {
    if (currentSession) {
      alert('You are already clocked in!');
      return;
    }

    const now = new Date();
    const newRecord: TimeRecord = {
      id: Date.now(),
      name: 'Current User',
      timeIn: formatDateTime(now),
      timeOut: 'Not clocked out',
      location: 'Office',
      isActive: true
    };

    // Save locally only — POST will happen on Time Out
    setCurrentSession(newRecord);
    localStorage.setItem('currentSession', JSON.stringify(newRecord));
  };

  const handleTimeOut = async () => {
    if (!currentSession) {
      alert('You need to clock in first!');
      return;
    }

    const finishedSession: TimeRecord = {
      ...currentSession,
      timeOut: formatDateTime(),
      isActive: false
    };

    try {
      const res = await fetch('http://localhost:5000/api/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finishedSession)
      });

      if (!res.ok) throw new Error('Failed to save time-out session');

      const savedRecord = await res.json();
      setTimeRecords(prev => [...prev, savedRecord]);

      // Clear session
      setCurrentSession(null);
      localStorage.removeItem('currentSession');
    } catch (err) {
      console.error('Error saving time-out session:', err);
    }
  };

  const existingRecords = timeRecords.filter(record => record._id !== currentSession?._id);

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
        <h3>Existing Sessions</h3>
        {existingRecords.length === 0 ? (
          <p>No previous time records found.</p>
        ) : (
          existingRecords.map((record) => (
            <div key={record._id} className={`${styles.recordItem} ${record.isActive ? styles.active : ''}`}>
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
          ))
        )}
      </div>
    </div>
  );
}
