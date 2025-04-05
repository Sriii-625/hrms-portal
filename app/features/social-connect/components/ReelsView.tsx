'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './ReelsView.module.css';

interface Reel {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  description: string;
  likes: number;
  comments: Array<{ id: number; user: string; text: string }>;
  shares: number;
  isLiked: boolean;
  isPlaying: boolean;
}

export default function ReelsView() {
  const [reels, setReels] = useState<Reel[]>([
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: '👤'
      },
      description: 'Check out our new office space! 🏢 #OfficeLife #WorkCulture',
      likes: 1200,
      comments: [],
      shares: 56,
      isLiked: false,
      isPlaying: true
    },
    {
      id: 2,
      author: {
        name: 'Sarah Wilson',
        avatar: '👩'
      },
      description: 'Team building workshop highlights! 🎯 #TeamWork #Growth',
      likes: 890,
      comments: [],
      shares: 32,
      isLiked: false,
      isPlaying: false
    },
    {
      id: 3,
      author: {
        name: 'Mike Chen',
        avatar: '👨'
      },
      description: 'Product launch celebration! 🚀 #Success #Innovation',
      likes: 1500,
      comments: [],
      shares: 78,
      isLiked: false,
      isPlaying: false
    }
  ]);

  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const friends = [
    { id: 1, name: 'Alice Johnson', avatar: '👩' },
    { id: 2, name: 'Bob Smith', avatar: '👨' },
    { id: 3, name: 'Carol White', avatar: '👩' },
    { id: 4, name: 'David Brown', avatar: '👨' }
  ];

  const handleScroll = useCallback((event: Event) => {
    const wheelEvent = event as WheelEvent;
    if (isScrolling) return;

    setIsScrolling(true);
    
    // Detect scroll direction
    if (wheelEvent.deltaY > 0 && currentReelIndex < reels.length - 1) {
      // Scrolling down - next reel
      setCurrentReelIndex(prev => prev + 1);
    } else if (wheelEvent.deltaY < 0 && currentReelIndex > 0) {
      // Scrolling up - previous reel
      setCurrentReelIndex(prev => prev - 1);
    }

    // Debounce scroll events
    setTimeout(() => {
      setIsScrolling(false);
    }, 500); // Adjust timing as needed
  }, [currentReelIndex, reels.length, isScrolling]);

  useEffect(() => {
    const container = document.querySelector(`.${styles.reelsContainer}`);
    if (container) {
      container.addEventListener('wheel', handleScroll);
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, [handleScroll]);

  const toggleLike = (reelId: number) => {
    setReels(reels.map(reel => {
      if (reel.id === reelId) {
        return {
          ...reel,
          likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
          isLiked: !reel.isLiked
        };
      }
      return reel;
    }));
  };

  const togglePlay = (reelId: number) => {
    setReels(reels.map(reel => ({
      ...reel,
      isPlaying: reel.id === reelId ? !reel.isPlaying : false
    })));
  };

  const handleAddComment = (reelId: number) => {
    if (!newComment.trim()) return;
    setReels(reels.map(reel => {
      if (reel.id === reelId) {
        return {
          ...reel,
          comments: [...reel.comments, { id: Date.now(), user: 'You', text: newComment }]
        };
      }
      return reel;
    }));
    setNewComment('');
  };

  const currentReel = reels[currentReelIndex];

  return (
    <div className={styles.reelsContainer}>
      <div className={styles.reelView}>
        <div 
          className={styles.videoContainer}
          onClick={() => togglePlay(currentReel.id)}
        >
          <div className={styles.videoPlaceholder}>
            {currentReel.isPlaying ? (
              <span className={styles.pauseIcon}>⏸️</span>
            ) : (
              <span className={styles.playIcon}>▶️</span>
            )}
          </div>

          {/* Progress indicator dots */}
          <div className={styles.progressDots}>
            {reels.map((_, index) => (
              <div 
                key={index}
                className={`${styles.dot} ${index === currentReelIndex ? styles.activeDot : ''}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.reelInfo}>
          <div className={styles.authorInfo}>
            <span className={styles.avatar}>{currentReel.author.avatar}</span>
            <span className={styles.authorName}>{currentReel.author.name}</span>
          </div>

          <p className={styles.description}>{currentReel.description}</p>

          <div className={styles.engagementMetrics}>
            <button 
              className={`${styles.metric} ${currentReel.isLiked ? styles.liked : ''}`}
              onClick={() => toggleLike(currentReel.id)}
            >
              <span className={styles.icon}>{currentReel.isLiked ? '❤️' : '🤍'}</span>
              <span className={styles.count}>
                {currentReel.likes >= 1000 ? `${(currentReel.likes/1000).toFixed(1)}K` : currentReel.likes}
              </span>
            </button>
            <button 
              className={styles.metric}
              onClick={() => setShowComments(true)}
            >
              <span className={styles.icon}>💬</span>
              <span className={styles.count}>{currentReel.comments.length}</span>
            </button>
            <button 
              className={styles.metric}
              onClick={() => setShowShareMenu(true)}
            >
              <span className={styles.icon}>↗️</span>
              <span className={styles.count}>{currentReel.shares}</span>
            </button>
          </div>
        </div>

        {showComments && (
          <div className={styles.commentsOverlay}>
            <div className={styles.commentsContainer}>
              <button 
                className={styles.closeButton}
                onClick={() => setShowComments(false)}
              >
                ✕
              </button>
              <div className={styles.commentsList}>
                {currentReel.comments.map(comment => (
                  <div key={comment.id} className={styles.commentItem}>
                    <span className={styles.commentUser}>{comment.user}</span>
                    <span className={styles.commentText}>{comment.text}</span>
                  </div>
                ))}
              </div>
              <div className={styles.addComment}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className={styles.commentInput}
                  autoFocus
                />
                <button 
                  onClick={() => handleAddComment(currentReel.id)}
                  className={styles.sendButton}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {showShareMenu && (
          <div className={styles.shareOverlay}>
            <div className={styles.shareContainer}>
              <button 
                className={styles.closeButton}
                onClick={() => setShowShareMenu(false)}
              >
                ✕
              </button>
              <h3>Share with</h3>
              <div className={styles.friendsList}>
                {friends.map(friend => (
                  <button key={friend.id} className={styles.friendItem}>
                    <span className={styles.friendAvatar}>{friend.avatar}</span>
                    <span className={styles.friendName}>{friend.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button className={styles.createReelButton}>
          + Create Reel
        </button>
      </div>
    </div>
  );
} 