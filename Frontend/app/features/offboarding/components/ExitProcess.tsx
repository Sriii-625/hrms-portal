'use client';

import { useState } from 'react';
import styles from './ExitProcess.module.css';

interface ExitStep {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
  assignedTo: string;
}

interface Note {
  id: number;
  content: string;
  timestamp: string;
}

export default function ExitProcess() {
  const [exitSteps, setExitSteps] = useState<ExitStep[]>([
    {
      id: 1,
      title: 'Resignation Acceptance',
      status: 'completed',
      description: 'Process and accept resignation letter',
      assignedTo: 'HR Manager'
    },
    {
      id: 2,
      title: 'System Access Review',
      status: 'in-progress',
      description: 'Review and revoke system access',
      assignedTo: 'IT Team'
    },
    {
      id: 3,
      title: 'Knowledge Transfer',
      status: 'pending',
      description: 'Complete knowledge transfer documentation',
      assignedTo: 'Department Manager'
    },
    {
      id: 4,
      title: 'Final Settlement',
      status: 'pending',
      description: 'Process final settlement and dues',
      assignedTo: 'Finance Team'
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState({
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Engineering',
    lastDay: '2024-03-15'
  });

  const [currentNote, setCurrentNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);

  const updateStepStatus = (stepId: number, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setExitSteps(exitSteps.map(step =>
      step.id === stepId ? { ...step, status: newStatus } : step
    ));
  };

  const handleSaveNote = () => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now(),
        content: currentNote.trim(),
        timestamp: new Date().toLocaleString()
      };
      setSavedNotes([...savedNotes, newNote]);
      setCurrentNote('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.employeeInfo}>
        <h2>Employee Exit Process</h2>
        <div className={styles.infoCard}>
          <h3>{selectedEmployee.name}</h3>
          <p>Position: {selectedEmployee.position}</p>
          <p>Department: {selectedEmployee.department}</p>
          <p>Last Working Day: {selectedEmployee.lastDay}</p>
        </div>
      </div>

      <div className={styles.workflow}>
        <h3>Exit Workflow</h3>
        <div className={styles.steps}>
          {exitSteps.map((step) => (
            <div key={step.id} className={`${styles.step} ${styles[step.status]}`}>
              <div className={styles.stepHeader}>
                <h4>{step.title}</h4>
                <span className={styles.status}>{step.status}</span>
              </div>
              <p>{step.description}</p>
              <div className={styles.stepFooter}>
                <span>Assigned to: {step.assignedTo}</span>
                <div className={styles.actions}>
                  <button
                    onClick={() => updateStepStatus(step.id, 'pending')}
                    className={`${styles.statusButton} ${step.status === 'pending' ? styles.active : ''}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStepStatus(step.id, 'in-progress')}
                    className={`${styles.statusButton} ${step.status === 'in-progress' ? styles.active : ''}`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStepStatus(step.id, 'completed')}
                    className={`${styles.statusButton} ${step.status === 'completed' ? styles.active : ''}`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.notes}>
        <h3>Additional Notes</h3>
        <textarea
          placeholder="Add any additional notes about the exit process..."
          className={styles.notesInput}
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
        <button className={styles.saveButton} onClick={handleSaveNote}>
          Save Notes
        </button>

        <div className={styles.savedNotes}>
          {savedNotes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              <p>{note.content}</p>
              <span className={styles.timestamp}>{note.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}