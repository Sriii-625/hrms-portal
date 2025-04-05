'use client';

import styles from './UserProfile.module.css';

interface UserProfileProps {
  userData: {
    name: string;
    email: string;
    college: string;
    company: string;
    position: string;
    startDate: string;
    department: string;
  };
}

export default function UserProfile({ userData }: UserProfileProps) {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {userData.name.charAt(0)}
          </div>
          <h2 className={styles.name}>{userData.name}</h2>
          <p className={styles.position}>{userData.position}</p>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.detailGroup}>
            <h3>Personal Information</h3>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{userData.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>College:</span>
              <span className={styles.value}>{userData.college}</span>
            </div>
          </div>

          <div className={styles.detailGroup}>
            <h3>Company Details</h3>
            <div className={styles.detailItem}>
              <span className={styles.label}>Company:</span>
              <span className={styles.value}>{userData.company}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Department:</span>
              <span className={styles.value}>{userData.department}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Start Date:</span>
              <span className={styles.value}>{userData.startDate}</span>
            </div>
          </div>

          <div className={styles.detailGroup}>
            <h3>Login Credentials</h3>
            <div className={styles.detailItem}>
              <span className={styles.label}>Username:</span>
              <span className={styles.value}>{userData.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Password:</span>
              <span className={styles.value}>••••••••</span>
              <button className={styles.resetButton}>Reset Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}