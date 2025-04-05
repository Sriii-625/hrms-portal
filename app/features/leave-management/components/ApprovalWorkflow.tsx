'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import styles from './ApprovalWorkflow.module.css';

interface ApprovalWorkflowProps {
  leaveRequests: {
    id: string;
    employeeName: string;
    startDate: Date;
    endDate: Date;
    leaveType: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    approvers: {
      name: string;
      role: string;
      status: 'pending' | 'approved' | 'rejected';
      comment?: string;
    }[];
  }[];
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string, comment: string) => void;
}

const ApprovalWorkflow = ({
  leaveRequests,
  onApprove,
  onReject,
}: ApprovalWorkflowProps) => {
  const [comment, setComment] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return styles.approved;
      case 'rejected':
        return styles.rejected;
      default:
        return styles.pending;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leave Approval Workflow</h2>
      <div className={styles.requestList}>
        {leaveRequests.map((request) => (
          <div key={request.id} className={styles.requestCard}>
            <div className={styles.requestHeader}>
              <h3 className={styles.employeeName}>{request.employeeName}</h3>
              <Badge className={`${styles.status} ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </div>

            <div className={styles.requestDetails}>
              <div className={styles.detail}>
                <span className={styles.label}>Leave Type:</span>
                <span>{request.leaveType}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Duration:</span>
                <span>
                  {new Date(request.startDate).toLocaleDateString()} -{' '}
                  {new Date(request.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Reason:</span>
                <span>{request.reason}</span>
              </div>
            </div>

            <div className={styles.approvalChain}>
              <h4 className={styles.approvalTitle}>Approval Chain</h4>
              {request.approvers.map((approver, index) => (
                <div key={index} className={styles.approver}>
                  <div className={styles.approverInfo}>
                    <span className={styles.approverName}>{approver.name}</span>
                    <span className={styles.approverRole}>{approver.role}</span>
                  </div>
                  <Badge
                    className={`${styles.approverStatus} ${getStatusColor(
                      approver.status
                    )}`}
                  >
                    {approver.status}
                  </Badge>
                </div>
              ))}
            </div>

            {request.status === 'pending' && (
              <div className={styles.actions}>
                <textarea
                  className={styles.commentInput}
                  placeholder="Add a comment (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className={styles.actionButtons}>
                  <Button
                    onClick={() => onApprove(request.id, comment)}
                    className={styles.approveButton}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => onReject(request.id, comment)}
                    className={styles.rejectButton}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalWorkflow;