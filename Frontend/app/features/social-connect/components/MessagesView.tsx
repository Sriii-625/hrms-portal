'use client';

import { useState } from 'react';
import styles from './MessagesView.module.css';

interface Message {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  attachment?: string;
}

export default function MessagesView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: {
        name: 'Alex Smith',
        avatar: '👤'
      },
      content: 'You sent an attachment.',
      timestamp: '2w',
      attachment: 'file.pdf'
    },
    {
      id: 2,
      user: {
        name: 'Emma Wilson',
        avatar: '👨'
      },
      content: 'Hu',
      timestamp: '3w'
    },
    {
      id: 3,
      user: {
        name: 'Michael Chen',
        avatar: '👨'
      },
      content: '👍',
      timestamp: '3w'
    },
    {
      id: 4,
      user: {
        name: 'Sarah Johnson',
        avatar: '👨'
      },
      content: 'https://www.instagram.com/destinyo.d...',
      timestamp: '4w'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userProfile}>
          <span className={styles.profileAvatar}>👤</span>
          <span className={styles.profileName}>user123</span>
          <button className={styles.composeButton}>✏️</button>
        </div>

        <div className={styles.messageList}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`${styles.messageItem} ${selectedUser === message.user.name ? styles.active : ''}`}
              onClick={() => setSelectedUser(message.user.name)}
            >
              <span className={styles.avatar}>{message.user.avatar}</span>
              <div className={styles.messagePreview}>
                <div className={styles.messageHeader}>
                  <span className={styles.userName}>{message.user.name}</span>
                  <span className={styles.timestamp}>{message.timestamp}</span>
                </div>
                <p className={styles.messageContent}>
                  {message.attachment ? '📎 Attachment' : message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chatSection}>
        {selectedUser ? (
          <>
            <div className={styles.chatHeader}>
              <span className={styles.avatar}>👤</span>
              <span className={styles.userName}>{selectedUser}</span>
            </div>
            <div className={styles.chatMessages}>
              {/* Chat messages will go here */}
            </div>
            <div className={styles.messageInput}>
              <input
                type="text"
                placeholder="Send private photos and messages to a friend or group."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className={styles.sendButton}>Send message</button>
            </div>
          </>
        ) : (
          <div className={styles.welcomeMessage}>
            <span className={styles.messengerIcon}>💬</span>
            <h2>Your messages</h2>
            <p>Send private photos and messages to a friend or group.</p>
            <button className={styles.sendButton}>Send message</button>
          </div>
        )}
      </div>
    </div>
  );
} 