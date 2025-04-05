'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const features = [
  {
    id: 1,
    title: 'Employee Directory',
    description: 'Manage and view employee information',
    path: '/features/employee-directory'
  },
  {
    id: 2,
    title: 'Attendance',
    description: 'Track employee attendance and time management',
    path: '/features/attendance'
  },
  {
    id: 3,
    title: 'Leave Management',
    description: 'Handle employee leave requests and tracking',
    path: '/features/leave-management'
  },
  {
    id: 4,
    title: 'Onboarding',
    description: 'Streamline new employee onboarding process',
    path: '/features/onboarding'
  },
  {
    id: 5,
    title: 'Offboarding',
    description: 'Manage employee exit procedures',
    path: '/features/offboarding'
  },
  {
    id: 6,
    title: 'Social Connect',
    description: 'Connect and engage with team members',
    path: '/features/social-connect'
  }
];

export default function Features() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HRMS Features</h1>
      <p className={styles.subtitle}>Select a feature to get started</p>
      
      <div className={styles.featuresGrid}>
        {features.map((feature) => (
          <div key={feature.id} className={styles.featureCard}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <button
              onClick={() => router.push(feature.path)}
              className={styles.accessButton}
            >
              Access Feature
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}