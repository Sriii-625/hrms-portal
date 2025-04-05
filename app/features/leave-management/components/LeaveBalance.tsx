'use client';

import styles from './LeaveBalance.module.css';

interface LeaveBalanceProps {
  balances: {
    type: string;
    total: number;
    used: number;
    remaining: number;
  }[];
}

const LeaveBalance = ({ balances }: LeaveBalanceProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leave Balance</h2>
      <div className={styles.grid}>
        {balances.map((balance, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.leaveType}>{balance.type}</h3>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.label}>Total</span>
                <span className={styles.value}>{balance.total}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.label}>Used</span>
                <span className={styles.value}>{balance.used}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.label}>Remaining</span>
                <span className={`${styles.value} ${styles.remaining}`}>
                  {balance.remaining}
                </span>
              </div>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{
                  width: `${(balance.used / balance.total) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;