'use client';

import { useState } from 'react';
import styles from './NotificationsView.module.css';

interface Notification {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  type: 'like' | 'comment' | 'mention' | 'shopping';
  content: string;
  timestamp: string;
  actionText: string;
  actionType: string;
}

export default function NotificationsView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: '👤'
      },
      type: 'like',
      content: 'liked your post',
      timestamp: '2 minutes ago',
      actionText: 'Like',
      actionType: 'like'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Smith',
        avatar: '👩'
      },
      type: 'comment',
      content: 'commented on your photo',
      timestamp: '1 hour ago',
      actionText: 'Comment',
      actionType: 'comment'
    }
    // Add more notifications as needed
  ]);

  const filters = ['All', 'Likes', 'Comments', 'Mentions', 'Shopping'];

  const filteredNotifications = activeFilter === 'All' 
    ? notifications 
    : notifications.filter(notif => notif.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.header}>
        <h1>Notifications</h1>
      </div>

      <div className={styles.filters}>
        {filters.map(filter => (
          <button
            key={filter}
            className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.notificationsList}>
        {filteredNotifications.map(notification => (
          <div key={notification.id} className={styles.notificationItem}>
            <div className={styles.notificationContent}>
              <img 
                src={`/avatars/${notification.user.avatar}.png`} 
                alt={notification.user.name}
                className={styles.userAvatar}
              />
              <div className={styles.notificationText}>
                <span className={styles.userName}>{notification.user.name}</span>
                <span className={styles.action}>{notification.content}</span>
                <span className={styles.timestamp}>{notification.timestamp}</span>
              </div>
            </div>
            <button 
              className={`${styles.actionButton} ${styles[notification.actionType]}`}
            >
              {notification.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 