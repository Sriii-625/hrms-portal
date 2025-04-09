'use client';

import { useState } from 'react';
import styles from './OrientationProgram.module.css';

interface TrainingModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
}

export default function OrientationProgram() {
  const [modules, setModules] = useState<TrainingModule[]>([
    {
      id: 1,
      title: 'Company Introduction',
      description: 'Learn about our company culture, values, and mission',
      duration: '1 hour',
      status: 'completed',
      progress: 100
    },
    {
      id: 2,
      title: 'HR Policies & Procedures',
      description: 'Understanding workplace policies and guidelines',
      duration: '2 hours',
      status: 'in-progress',
      progress: 60
    },
    {
      id: 3,
      title: 'Technical Setup',
      description: 'Setting up your development environment',
      duration: '3 hours',
      status: 'pending',
      progress: 0
    },
    {
      id: 4,
      title: 'Team Introduction',
      description: 'Meet your team members and understand roles',
      duration: '1 hour',
      status: 'pending',
      progress: 0
    }
  ]);

  const handleStartModule = (id: number) => {
    setModules(modules.map(module =>
      module.id === id ? { ...module, status: 'in-progress', progress: 0 } : module
    ));
  };

  const handleCompleteModule = (id: number) => {
    setModules(modules.map(module =>
      module.id === id ? { ...module, status: 'completed', progress: 100 } : module
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Orientation Program</h2>
        <div className={styles.progress}>
          <span>Overall Progress:</span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{
                width: `${Math.round(
                  modules.reduce((acc, module) => acc + module.progress, 0) / modules.length
                )}%`
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.moduleList}>
        {modules.map((module) => (
          <div key={module.id} className={styles.moduleCard}>
            <div className={styles.moduleHeader}>
              <h3>{module.title}</h3>
              <span className={`${styles.status} ${styles[module.status]}`}>
                {module.status}
              </span>
            </div>

            <p className={styles.description}>{module.description}</p>
            <div className={styles.moduleDetails}>
              <span>Duration: {module.duration}</span>
              <div className={styles.moduleProgress}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
                <span>{module.progress}%</span>
              </div>
            </div>

            <div className={styles.moduleActions}>
              {module.status === 'pending' && (
                <button
                  className={styles.startButton}
                  onClick={() => handleStartModule(module.id)}
                >
                  Start Module
                </button>
              )}
              {module.status === 'in-progress' && (
                <button
                  className={styles.completeButton}
                  onClick={() => handleCompleteModule(module.id)}
                >
                  Complete Module
                </button>
              )}
              {module.status === 'completed' && (
                <button className={styles.reviewButton}>
                  Review Materials
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}