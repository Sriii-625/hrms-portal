'use client';

import styles from './LeaveTracker.module.css';
import { Card } from '@/components/ui/card';
import { Badge } from '../../../../components/ui/badge';

interface LeaveApplication {
  id: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export default function LeaveTracker() {
  const applications: LeaveApplication[] = [
    {
      id: 'LA001',
      startDate: '2024-03-20',
      endDate: '2024-03-22',
      leaveType: 'Annual Leave',
      reason: 'Family vacation',
      status: 'Pending',
      appliedOn: '2024-03-15'
    },
    {
      id: 'LA002',
      startDate: '2024-04-05',
      endDate: '2024-04-05',
      leaveType: 'Sick Leave',
      reason: 'Medical appointment',
      status: 'Approved',
      appliedOn: '2024-03-10'
    },
    {
      id: 'LA003',
      startDate: '2024-03-18',
      endDate: '2024-03-18',
      leaveType: 'Personal Leave',
      reason: 'Important errands',
      status: 'Rejected',
      appliedOn: '2024-03-01'
    }
  ];

  const getStatusColor = (status: LeaveApplication['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Approved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.trackerGrid}>
        {applications.map((application) => (
          <Card key={application.id} className={styles.applicationCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.applicationId}>Application #{application.id}</h3>
              <Badge className={`${styles.status} ${getStatusColor(application.status)}`}>
                {application.status}
              </Badge>
            </div>
            
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Leave Type:</span>
                <span className={styles.value}>{application.leaveType}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Duration:</span>
                <span className={styles.value}>
                  {application.startDate} to {application.endDate}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Reason:</span>
                <span className={styles.value}>{application.reason}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Applied On:</span>
                <span className={styles.value}>{application.appliedOn}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}