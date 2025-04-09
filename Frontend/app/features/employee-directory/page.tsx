'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './employee-directory.module.css';
import OrganizationChart from './components/OrganizationChart';
import DocumentManagement from './components/DocumentManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TaskManager from './components/TaskManager';

interface Employee {
  name: string;
  position: string;
  department: string;
  email: string;
}

type Tab = 'directory' | 'organization' | 'documents' | 'analytics' | 'tasks';

export default function EmployeeDirectory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('directory');

  const handleBackToFeatures = () => {
    router.push('/features');
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [employees] = useState<Employee[]>([
    {
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'Engineering',
      email: 'john@example.com'
    },
    {
      name: 'David Chen',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'david@example.com'
    },
    {
      name: 'Emily Brown',
      position: 'UI/UX Designer',
      department: 'Design',
      email: 'emily@example.com'
    },
    {
      name: 'Alex Turner',
      position: 'Project Manager',
      department: 'Management',
      email: 'alex@example.com'
    },
    {
      name: 'Maria Garcia',
      position: 'Quality Analyst',
      department: 'Engineering',
      email: 'maria@example.com'
    },
    {
      name: 'James Wilson',
      position: 'DevOps Engineer',
      department: 'Operations',
      email: 'james@example.com'
    },
    {
      name: 'Sophie Martin',
      position: 'Marketing Manager',
      department: 'Marketing',
      email: 'sophie@example.com'
    },
    {
      name: 'Ryan Taylor',
      position: 'Business Analyst',
      department: 'Business',
      email: 'ryan@example.com'
    },
    {
      name: 'Lisa Anderson',
      position: 'Content Writer',
      department: 'Marketing',
      email: 'lisa@example.com'
    },
    {
      name: 'Kevin Lee',
      position: 'System Administrator',
      department: 'Operations',
      email: 'kevin@example.com'
    },
    {
      name: 'Jane Smith',
      position: 'HR Manager',
      department: 'Human Resources',
      email: 'jane@example.com'
    },
    {
      name: 'Mike Johnson',
      position: 'Sales Representative',
      department: 'Sales',
      email: 'mike@example.com'
    },
    {
      name: 'Sarah Williams',
      position: 'Product Manager',
      department: 'Product',
      email: 'sarah@example.com'
    }
  ]);

// Move this import to the top of the file with other imports

const handleBackToHome = () => {
    router.push('/');
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          onClick={handleBackToFeatures}
          className={styles.backButton}
        >
          <span>←</span>
          Back
        </button>
        <h1 className={styles.title}>Employee Directory</h1>
      </header>

      <nav className={styles.navigation}>
        <button 
          className={activeTab === 'directory' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('directory')}
        >
          Employee Directory
        </button>
        <button 
          className={activeTab === 'organization' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('organization')}
        >
          Organization Chart
        </button>
        <button 
          className={activeTab === 'documents' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('documents')}
        >
          Document Management
        </button>
        <button 
          className={activeTab === 'analytics' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics Dashboard
        </button>
        <button 
          className={activeTab === 'tasks' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('tasks')}
        >
          Task Manager
        </button>
      </nav>

      {activeTab === 'directory' && (
        <>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button onClick={handleClear} className={styles.clearButton}>
                Clear
              </button>
            )}
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.employeeTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'organization' && <OrganizationChart />}
      {activeTab === 'documents' && <DocumentManagement />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
      {activeTab === 'tasks' && <TaskManager />}
    </div>
  );
}