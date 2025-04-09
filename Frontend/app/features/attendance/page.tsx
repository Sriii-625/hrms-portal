'use client';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './attendance.module.css';
import LeaveManagement from './components/LeaveManagement';
import TimeTracking from './components/TimeTracking';
import ShiftManagement from './components/ShiftManagement';
import OvertimeManagement from './components/OvertimeManagement';
import Reports from './components/Reports';

interface Employee {
  name: string;
  role: string;
  status: 'Present' | 'Absent';
}

export default function AttendancePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Attendance');
  const [selectedRole, setSelectedRole] = useState('HR');
  const [employees, setEmployees] = useState<Employee[]>([
    { name: 'John Doe', role: 'Team Member', status: 'Absent' },
    { name: 'Jane Smith', role: 'Team Member', status: 'Absent' },
    { name: 'Mike Johnson', role: 'Team Leader', status: 'Absent' },
    { name: 'Sarah Williams', role: 'Project Manager', status: 'Absent' }
  ]);

  const toggleAttendance = (index: number) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].status = updatedEmployees[index].status === 'Present' ? 'Absent' : 'Present';
    setEmployees(updatedEmployees);
  };

  

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
        <h1 className={styles.title}>HRMS Attendance Module</h1>
        <div className={styles.userInfo}>
          <span>Welcome,</span>
          <select 
            className={styles.roleSelect}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="HR">HR</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Team Leader">Team Leader</option>
            <option value="Team Member">Team Member</option>
          </select>
        </div>
      </header>

      <nav className={styles.navigation}>
        <button 
          className={activeTab === 'Attendance' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Attendance')}
        >
          Attendance
        </button>
        <button 
          className={activeTab === 'Leave Management' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Leave Management')}
        >
          Leave Management
        </button>
        <button 
          className={activeTab === 'Time Tracking' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Time Tracking')}
        >
          Time Tracking
        </button>
        <button 
          className={activeTab === 'Shift Management' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Shift Management')}
        >
          Shift Management
        </button>
        <button 
          className={activeTab === 'Overtime' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Overtime')}
        >
          Overtime
        </button>
        <button 
          className={activeTab === 'Reports' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Reports')}
        >
          Reports
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === 'Attendance' && (
          <section className={styles.attendanceSection}>
            <h2>Attendance Marking</h2>
            <div className={styles.employeeList}>
              {employees.map((employee, index) => (
                <div key={index} className={styles.employeeRow}>
                  <div className={styles.employeeInfo}>
                    <span>{employee.name}</span>
                    <span className={styles.role}>({employee.role})</span>
                  </div>
                  <div className={styles.attendanceActions}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={employee.status === 'Present'}
                        onChange={() => toggleAttendance(index)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                    <span className={`${styles.status} ${styles[employee.status.toLowerCase()]}`}>
                      {employee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Leave Management' && (
          <section className={styles.leaveSection}>
            <LeaveManagement />
          </section>
        )}
        {activeTab === 'Time Tracking' && (
          <section className={styles.timeSection}>
            <TimeTracking />
          </section>
        )}
        {activeTab === 'Shift Management' && (
          <section className={styles.shiftSection}>
            <ShiftManagement />
          </section>
        )}
        {activeTab === 'Overtime' && (
          <section className={styles.overtimeSection}>
            <OvertimeManagement />
          </section>
        )}
        {activeTab === 'Reports' && (
          <section className={styles.reportsSection}>
            <Reports />
          </section>
        )}
      </main>
    </div>
  );
}