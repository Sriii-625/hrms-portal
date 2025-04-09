'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from './page.module.css';

export default function GetStarted() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Remove automatic redirection to allow user interaction

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Welcome to HRMS</h1>
        <p>Your complete HR management solution</p>
        
        <div className={styles.buttonGroup}>
          <button
            onClick={() => handleNavigation('/login')}
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <button
            onClick={() => handleNavigation('/login?demo=true')}
            className={styles.demoButton}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Try Demo'}
          </button>
        </div>

        <div className={styles.features}>
          <h2>Key Features</h2>
          <ul>
            <li>Employee Directory Management</li>
            <li>Attendance Tracking</li>
            <li>Leave Management</li>
            <li>Onboarding & Offboarding</li>
            <li>Social Connect</li>
          </ul>
        </div>
      </div>
    </div>
  );
}