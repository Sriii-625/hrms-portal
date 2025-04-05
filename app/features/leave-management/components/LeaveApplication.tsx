'use client';

import { useState } from 'react';
import { Calendar } from '../../../../components/ui/calendar';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import styles from './LeaveApplication.module.css';

interface LeaveApplicationProps {
  onSubmit: (data: {
    startDate: Date;
    endDate: Date;
    leaveType: string;
    reason: string;
  }) => void;
}

const LeaveApplication = ({ onSubmit }: LeaveApplicationProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [leaveType, setLeaveType] = useState('annual');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && reason) {
      onSubmit({
        startDate,
        endDate,
        leaveType,
        reason,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leave Application</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.dateSection}>
          <div className={styles.dateContainer}>
            <label>Start Date</label>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              className={styles.calendar}
            />
          </div>
          <div className={styles.dateContainer}>
            <label>End Date</label>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              className={styles.calendar}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className={styles.select}
          >
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal Leave</option>
            <option value="unpaid">Unpaid Leave</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Reason</label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for your leave request"
            className={styles.textarea}
          />
        </div>

        <Button type="submit" className={styles.submitButton}>
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default LeaveApplication;