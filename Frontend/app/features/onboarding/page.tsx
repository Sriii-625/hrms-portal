'use client';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import DigitalDocumentation from '././components/DigitalDocumentation';
import OrientationProgram from '././components/OrientationProgram';
import AssetAssignment from '././components/AssetAssignment';
import UserProfile from './components/UserProfile';

interface UserData {
  name: string;
  email: string;
  college: string;
  company: string;
  position: string;
  startDate: string;
  department: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Profile');
  
  const [userData] = useState<UserData>({
    name: 'John Doe',
    email: 'john.doe@uptoskills.com',
    college: 'Technical University',
    company: 'Uptoskills Technologies',
    position: 'Software Engineer',
    startDate: '2024-03-15',
    department: 'Engineering'
  });

  

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
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className={styles.title}>Employee Onboarding</h1>
      </header>

      <nav className={styles.navigation}>
        <button 
          className={activeTab === 'Profile' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Profile')}
        >
          User Profile
        </button>
        <button 
          className={activeTab === 'Documentation' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Documentation')}
        >
          Digital Documentation
        </button>
        <button 
          className={activeTab === 'Orientation' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Orientation')}
        >
          Orientation Program
        </button>
        <button 
          className={activeTab === 'Assets' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Assets')}
        >
          Asset Assignment
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === 'Profile' && (
          <UserProfile userData={userData} />
        )}
        {activeTab === 'Documentation' && (
          <DigitalDocumentation />
        )}
        {activeTab === 'Orientation' && (
          <OrientationProgram />
        )}
        {activeTab === 'Assets' && (
          <AssetAssignment />
        )}
      </main>
    </div>
  );
}