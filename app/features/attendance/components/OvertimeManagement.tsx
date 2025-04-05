'use client';

import { useState } from 'react';
import styles from './OvertimeManagement.module.css';

interface OvertimeRequest {
  id: number;
  name: string;
  role: string;
  date: string;
  hours: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function OvertimeManagement() {
  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>([
    {
      id: 1,
      name: 'John Doe',
      role: 'Team Member',
      date: '2025-02-15',
      hours: 2,
      reason: 'Project deadline',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Team Member',
      date: '2025-02-14',
      hours: 1.5,
      reason: 'Client meeting',
      status: 'Approved'
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    date: '',
    hours: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRequest.date || !newRequest.hours || !newRequest.reason) {
      alert('Please fill in all fields');
      return;
    }

    const request: OvertimeRequest = {
      id: Date.now(),
      name: 'Current User', // Would come from auth context
      role: 'Team Member',
      date: newRequest.date,
      hours: Number(newRequest.hours),
      reason: newRequest.reason,
      status: 'Pending'
    };

    setOvertimeRequests([...overtimeRequests, request]);
    setNewRequest({ date: '', hours: '', reason: '' });
  };

  const handleApprove = (id: number) => {
    setOvertimeRequests(overtimeRequests.map(request => 
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleReject = (id: number) => {
    setOvertimeRequests(overtimeRequests.map(request => 
      request.id === id ? { ...request, status: 'Rejected' } : request
    ));
  };

  return (
    <div className={styles.container}>
      <h2>Overtime Management</h2>

      <form onSubmit={handleSubmit} className={styles.overtimeForm}>
        <div className={styles.inputGroup}>
          <label>Date</label>
          <input
            type="date"
            value={newRequest.date}
            onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Hours</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={newRequest.hours}
            onChange={(e) => setNewRequest({ ...newRequest, hours: e.target.value })}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Reason</label>
          <input
            type="text"
            value={newRequest.reason}
            onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Overtime Request
        </button>
      </form>

      <div className={styles.requestList}>
        <h3>Overtime Requests</h3>
        {overtimeRequests.map((request) => (
          <div key={request.id} className={styles.requestItem}>
            <div className={styles.requestHeader}>
              <span>{request.name} ({request.role})</span>
              <span className={`${styles.status} ${styles[request.status.toLowerCase()]}`}>
                {request.status}
              </span>
            </div>
            <div className={styles.requestDetails}>
              <div>Date: {request.date}</div>
              <div>Hours: {request.hours}</div>
              <div>Reason: {request.reason}</div>
            </div>
            {request.status === 'Pending' && (
              <div className={styles.actions}>
                <button
                  onClick={() => handleApprove(request.id)}
                  className={styles.approveButton}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className={styles.rejectButton}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 