'use client';

import { useState } from 'react';
import styles from './ThreadsView.module.css';

interface Thread {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export default function ThreadsView() {
  const [newThread, setNewThread] = useState('');
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 1,
      author: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: '👤'
      },
      content: 'Just passed 5 million sign ups in the first four hours...',
      timestamp: '2h',
      likes: 0,
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: '👤'
      },
      content: 'Threads just passed 2 million sign ups in the first two hours.',
      timestamp: '4h',
      likes: 0,
      isLiked: false
    }
  ]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThread.trim()) return;

    const thread: Thread = {
      id: Date.now(),
      author: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: '👤'
      },
      content: newThread,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    };

    setThreads([thread, ...threads]);
    setNewThread('');
  };

  return (
    <div className={styles.threadsContainer}>
      <div className={styles.profileHeader}>
        <img src="/profile.jpg" alt="Profile" className={styles.profileImage} />
        <div className={styles.profileInfo}>
          <h1>John Doe</h1>
          <span className={styles.username}>@johndoe</span>
          <span className={styles.followers}>412k followers</span>
          <a href="fb.com" className={styles.website}>fb.com</a>
        </div>
      </div>

      <div className={styles.createThread}>
        <form onSubmit={handlePost}>
          <textarea
            placeholder="Start a thread..."
            value={newThread}
            onChange={(e) => setNewThread(e.target.value)}
            className={styles.threadInput}
          />
          <div className={styles.postActions}>
            <button type="button" className={styles.mediaButton}>📎 Add media</button>
            <button type="submit" className={styles.postButton}>Post</button>
          </div>
        </form>
      </div>

      <div className={styles.threads}>
        {threads.map(thread => (
          <div key={thread.id} className={styles.thread}>
            <div className={styles.threadHeader}>
              <div className={styles.authorInfo}>
                <span className={styles.avatar}>{thread.author.avatar}</span>
                <div>
                  <span className={styles.authorName}>{thread.author.name}</span>
                  <span className={styles.timestamp}>{thread.timestamp}</span>
                </div>
              </div>
            </div>
            <p className={styles.threadContent}>{thread.content}</p>
            <div className={styles.threadActions}>
              <button className={styles.actionButton}>❤️</button>
              <button className={styles.actionButton}>💬</button>
              <button className={styles.actionButton}>↗️</button>
              <button className={styles.actionButton}>⬇️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 