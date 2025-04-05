'use client';

import { useState } from 'react';
import styles from './LeaveManagement.module.css';

interface LeaveRequest {
  id: number;
  name: string;
  role: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function LeaveManagement() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      name: 'John Doe',
      role: 'Team Member',
      date: '2025-02-20 to 2025-02-22',
      reason: 'Family event',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Team Member',
      date: '2025-03-01 to 2025-03-03',
      reason: 'Personal',
      status: 'Approved'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill in all fields');
      return;
    }

    const newRequest: LeaveRequest = {
      id: Date.now(), // Using timestamp as a simple unique id
      name: 'Current User', // This would come from auth context in a real app
      role: 'Team Member',
      date: `${formData.startDate} to ${formData.endDate}`,
      reason: formData.reason,
      status: 'Pending'
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    
    // Reset form
    setFormData({
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  const handleApprove = (id: number) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleReject = (id: number) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id ? { ...request, status: 'Rejected' } : request
    ));
  };

  return (
    <div className={styles.container}>
      <h2>Leave Management</h2>
      
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.dateFields}>
          <div className={styles.dateField}>
            <label>Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div className={styles.dateField}>
            <label>End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className={styles.reasonField}>
          <label>Reason</label>
          <input
            type="text"
            className={styles.reasonInput}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Leave Request
        </button>
      </form>

      <div className={styles.leaveRequests}>
        <h3>Leave Requests</h3>
        {leaveRequests.map((request) => (
          <div key={request.id} className={styles.requestItem}>
            <div>
              <div className={styles.requestHeader}>
                {request.name} ({request.role})
              </div>
              <div className={styles.requestDetails}>
                <div>Date: {request.date}</div>
                <div>Reason: {request.reason}</div>
                <div>Status: {request.status}</div>
              </div>
            </div>
            {request.status === 'Pending' && (
              <div className={styles.requestActions}>
                <button
                  className={styles.approveButton}
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </button>
                <button
                  className={styles.rejectButton}
                  onClick={() => handleReject(request.id)}
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