'use client';

import styles from './OrganizationChart.module.css';

interface OrgEmployee {
  name: string;
  position: string;
  children?: OrgEmployee[];
}

export default function OrganizationChart() {
  const orgData: OrgEmployee = {
    name: 'John Doe',
    position: 'CEO',
    children: [
      {
        name: 'Jane Smith',
        position: 'CTO',
        children: [
          {
            name: 'Mike Johnson',
            position: 'Lead Developer'
          },
          {
            name: 'Sarah Williams',
            position: 'UX Designer'
          }
        ]
      },
      {
        name: 'Bob Brown',
        position: 'CFO',
        children: [
          {
            name: 'Alice Green',
            position: 'Financial Analyst'
          }
        ]
      },
      {
        name: 'Emma Wilson',
        position: 'HR Director',
        children: [
          {
            name: 'Tom Davis',
            position: 'HR Manager'
          }
        ]
      }
    ]
  };

  const EmployeeNode = ({ employee }: { employee: OrgEmployee }) => (
    <div className={styles.nodeWrapper}>
      <div className={styles.node}>
        <div className={styles.employeeName}>{employee.name}</div>
        <div className={styles.employeePosition}>{employee.position}</div>
      </div>
      {employee.children && employee.children.length > 0 && (
        <div className={styles.childrenContainer}>
          {employee.children.map((child, index) => (
            <EmployeeNode key={index} employee={child} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.chartContainer}>
      <div className={styles.orgChart}>
        <EmployeeNode employee={orgData} />
      </div>
    </div>
  );
} 