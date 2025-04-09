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

  useEffect(() => {
    fetch('http://localhost:5000/api/time')
      .then(res => res.json())
      .then(data => setTimeRecords(data))
      .catch(err => console.error('Error fetching time records:', err));
  }, []);

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

  const handleTimeIn = async () => {
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

    try {
      const res = await fetch('http://localhost:5000/api/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
      });

      if (!res.ok) throw new Error('Failed to save session');

      const savedRecord = await res.json();
      setTimeRecords(prev => [...prev, savedRecord]);
      setCurrentSession(savedRecord);
    } catch (err) {
      console.error('Error saving session:', err);
    }
  };

  const updateSession = async (_id: string, updates: Partial<TimeRecord>) => {
    try {
      const res = await fetch(`http://localhost:5000/api/time/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update session');
      const updated = await res.json();
      setTimeRecords(prev =>
        prev.map(record => (record._id === updated._id ? updated : record))
      );
    } catch (err) {
      console.error('Error updating session:', err);
    }
  };

  const handleTimeOut = () => {
    if (!currentSession || !currentSession._id) {
      alert('You need to clock in first!');
      return;
    }

    const updates: Partial<TimeRecord> = {
      timeOut: formatDateTime(),
      isActive: false
    };

    updateSession(currentSession._id, updates);
    setCurrentSession(null);
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
