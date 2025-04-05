'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './leave-management.module.css';

export default function LeaveManagement() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const leaveBalance = {
    annual: 20,
    sick: 12,
    personal: 5,
    remaining: 15
  };

  const holidays = [
    { date: '2024-01-01', name: 'New Year\'s Day' },
    { date: '2024-01-26', name: 'Republic Day' },
    { date: '2024-08-15', name: 'Independence Day' },
    { date: '2024-10-02', name: 'Gandhi Jayanti' },
    { date: '2024-12-25', name: 'Christmas' },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!selectedDate || !leaveType || !reason.trim()) {
        alert('Please fill in all required fields');
        return;
      }

      // Create leave application object
      const leaveApplication = {
        id: Date.now().toString(),
        date: selectedDate.toISOString(),
        type: leaveType,
        reason: reason.trim(),
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store the application (in a real app, this would be an API call)
      const applications = JSON.parse(localStorage.getItem('leaveApplications') || '[]');
      applications.push(leaveApplication);
      localStorage.setItem('leaveApplications', JSON.stringify(applications));

      // Reset form
      setSelectedDate(null);
      setLeaveType('');
      setReason('');
      setSubmitSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/features" className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </Link>
        <h1 className={styles.title}>Leave Management</h1>
      </header>

      <div className={styles.grid}>
        {/* Leave Application */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Leave Application</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="date"
              className={styles.input}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              required
            />
            <select
              className={styles.input}
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
            <textarea
              className={styles.input}
              placeholder="Reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className={`${styles.button} ${isSubmitting ? styles.submitting : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            {submitSuccess && (
              <div className={styles.successMessage}>
                Application submitted successfully!
              </div>
            )}
          </form>
        </div>

        {/* Leave Balance */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Leave Balance</h2>
          <div className={styles.form}>
            <div className={styles.input}>
              Annual Leave: {leaveBalance.annual} days
            </div>
            <div className={styles.input}>
              Sick Leave: {leaveBalance.sick} days
            </div>
            <div className={styles.input}>
              Personal Leave: {leaveBalance.personal} days
            </div>
            <div className={styles.input}>
              Remaining Leave: {leaveBalance.remaining} days
            </div>
          </div>
        </div>

        {/* Approval Workflow */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Approval Workflow</h2>
          <div className={styles.form}>
            <div className={styles.input}>
              Status: Pending Manager Approval
            </div>
            <div className={styles.input}>
              Next Approver: John Doe (Manager)
            </div>
            <button className={styles.button}>
              Track Application
            </button>
          </div>
        </div>

        {/* Holiday Calendar */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Holiday Calendar</h2>
          <table className={styles.calendar}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Holiday</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr key={holiday.date} className={styles.holiday}>
                  <td>{holiday.date}</td>
                  <td>{holiday.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}