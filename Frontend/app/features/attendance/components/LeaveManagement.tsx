'use client';

import { useEffect, useState } from 'react';
import styles from './LeaveManagement.module.css';

interface LeaveRequest {
  _id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function LeaveManagement() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // Fetch all leave requests from server
  useEffect(() => {
    fetch('http://localhost:5000/api/leave')
      .then(res => res.json())
      .then(data => setLeaveRequests(data))
      .catch(err => console.error('Error fetching leave data:', err));
  }, []);

  // Submit a new leave request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill in all fields');
      return;
    }

    const newRequest = {
      name: 'Current User', // Replace with real user if available
      role: 'Team Member',
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason
    };

    try {
      const res = await fetch('http://localhost:5000/api/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
      const data = await res.json();
      setLeaveRequests([...leaveRequests, data]);
      setFormData({ startDate: '', endDate: '', reason: '' });
    } catch (err) {
      console.error('Error submitting leave:', err);
    }
  };

  // Update leave status (Approve/Reject)
  const updateStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`http://localhost:5000/api/leave/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await res.json();
      setLeaveRequests(prev =>
        prev.map(req => (req._id === updated._id ? updated : req))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleApprove = (id: string) => updateStatus(id, 'Approved');
  const handleReject = (id: string) => updateStatus(id, 'Rejected');

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
          <div key={request._id} className={styles.requestItem}>
            <div>
              <div className={styles.requestHeader}>
                {request.name} ({request.role})
              </div>
              <div className={styles.requestDetails}>
                <div>
                  Date: {request.startDate} to {request.endDate}
                </div>
                <div>Reason: {request.reason}</div>
                <div>Status: {request.status}</div>
              </div>
            </div>
            {request.status === 'Pending' && (
              <div className={styles.requestActions}>
                <button
                  className={styles.approveButton}
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </button>
                <button
                  className={styles.rejectButton}
                  onClick={() => handleReject(request._id)}
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
