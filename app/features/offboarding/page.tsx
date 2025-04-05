'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './offboarding.module.css';
import ExitProcess from './components/ExitProcess';
import AssetRecovery from '././components/AssetRecovery';
import ExitInterview from './././components/ExitInterview';
import Documentation from './././components/Documentation';

type Tab = 'exit-process' | 'asset-recovery' | 'exit-interview' | 'documentation';

export default function OffboardingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('exit-process');

// Move this import to the top of the file with other imports

const handleBackToFeatures = () => {
    router.push('/features');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          onClick={handleBackToFeatures}
          className={styles.backButton}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1 className={styles.title}>Employee Offboarding</h1>
      </header>

      <nav className={styles.navigation}>
        <button 
          className={activeTab === 'exit-process' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('exit-process')}
        >
          Exit Process
        </button>
        <button 
          className={activeTab === 'asset-recovery' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('asset-recovery')}
        >
          Asset Recovery
        </button>
        <button 
          className={activeTab === 'exit-interview' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('exit-interview')}
        >
          Exit Interview
        </button>
        <button 
          className={activeTab === 'documentation' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('documentation')}
        >
          Documentation
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === 'exit-process' && (
          <section className={styles.section}>
            <ExitProcess />
          </section>
        )}
        {activeTab === 'asset-recovery' && (
          <section className={styles.section}>
            <AssetRecovery />
          </section>
        )}
        {activeTab === 'exit-interview' && (
          <section className={styles.section}>
            <ExitInterview />
          </section>
        )}
        {activeTab === 'documentation' && (
          <section className={styles.section}>
            <Documentation />
          </section>
        )}
      </main>
    </div>
  );
}