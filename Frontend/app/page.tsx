'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const modules = [
    {
      title: 'Employee Directory',
      description: 'View and search employee information',
      link: '/features/employee-directory',
      icon: '👥'
    },
   
    {
      title: 'Smart Onboarding',
      description: 'Digital document management & automated team assignment system',
      link: '/features/onboarding',
      icon: '📝'
    },
    {
      title: 'Hierarchical Attendance',
      description: 'Multi-level approval system with detailed leave tracking',
      link: 'features/attendance'
    },
    {
      title: 'Leave Management',
      description: 'Hierarchical approval workflow with complete audit trail',
      link: '/features/leave-management',
      icon: '📅'
    },
    {
      title: 'Social Connect',
      description: 'Private social network for internal communication & learning',
      link: '/features/social-connect',
      icon: '💬'
    },
    {
      title: 'Smart Offboarding',
      description: 'Automated access management with historical data retention',
      link: '/features/offboarding',
      icon: '🔄'
    }
  ];

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image 
            src="/images/logo.png"
            alt="UptoSkills Logo"
            width={150}
            height={40}
            priority
          />
        </div>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contacts">Contacts</Link>
        </div>
        <Link href="/get-started" className={styles.getStarted}>
          Get Started
        </Link>
      </nav>

      <section className={styles.hero}>
        <h1 className={styles.title}>HR Management System</h1>
        <p className={styles.subtitle}>
          Digital onboarding • Hierarchy management • Smart attendance
          <br />
          Social workplace integration • Automated workflows
        </p>
        <div className={styles.cta}>
          <Link href="/login?demo=true" className={styles.demoButton}>Free Demo</Link>
          <button className={styles.learnButton}>Learn More</button>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Features</h2>
        <div className={styles.featureGrid}>
          {modules.map((feature, index) => (
            <Link
              key={index}
              href="/get-started"
              className={`${styles.featureCard} ${feature.link ? styles.clickable : ''}`}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.experience}>
        <h2>Experience Smart HR Management</h2>
        <p>
          Manage attendance, leaves, employees, & much more effortlessly
          <br />
          with our mobile HRMS application. Your HR tasks, simplified.
        </p>
        <button className={styles.downloadButton}>Download Mobile App</button>
      </section>

      <section className={styles.openSource}>
        <h2>Free & Open Source HR Software</h2>
        <div className={styles.sourceButtons}>
          <button className={styles.tryButton}>Try Demo</button>
          <button className={styles.viewButton}>View Source</button>
        </div>
      </section>
    </main>
  );
}