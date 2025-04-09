'use client';

import { useState, useRef } from 'react';
import styles from './VideosView.module.css';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  author: {
    name: string;
    avatar: string;
  };
  views: number;
  timestamp: string;
  category: string;
}

export default function VideosView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All', 'Training', 'Events', 'Announcements', 
    'Team Building', 'Tutorials', 'Company Culture'
  ];

  const videos: Video[] = [
    {
      id: 1,
      title: 'Annual Company Meeting Highlights 2024',
      thumbnail: '/meeting-thumbnail.jpg',
      duration: '5:23',
      author: {
        name: 'HR Team',
        avatar: '👥'
      },
      views: 1200,
      timestamp: '2 days ago',
      category: 'Events'
    },
    {
      id: 2,
      title: 'New Employee Onboarding Process Tutorial',
      thumbnail: '/onboarding-thumbnail.jpg',
      duration: '12:45',
      author: {
        name: 'Training Department',
        avatar: '👨‍🏫'
      },
      views: 856,
      timestamp: '1 week ago',
      category: 'Training'
    },
    {
      id: 3,
      title: 'Team Building Event - Summer 2024',
      thumbnail: '/team-building-thumbnail.jpg',
      duration: '3:17',
      author: {
        name: 'Events Team',
        avatar: '🎉'
      },
      views: 2300,
      timestamp: '3 days ago',
      category: 'Team Building'
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !userId || !caption) {
      alert('Please fill in all fields');
      return;
    }
    // Here you would typically handle the actual upload
    console.log('Uploading:', { file: selectedFile, userId, caption });
    setShowUploadModal(false);
    setSelectedFile(null);
    setUserId('');
    setCaption('');
  };

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <div className={styles.videosContainer}>
      <div className={styles.header}>
        <h1>Videos</h1>
        <button 
          className={styles.uploadButton}
          onClick={() => setShowUploadModal(true)}
        >
          Upload Video
        </button>
      </div>

      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.videoGrid}>
        {filteredVideos.map(video => (
          <div key={video.id} className={styles.videoCard}>
            <div className={styles.thumbnailContainer}>
              <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
              <span className={styles.duration}>{video.duration}</span>
            </div>
            <div className={styles.videoInfo}>
              <h3>{video.title}</h3>
              <div className={styles.authorInfo}>
                <span className={styles.avatar}>{video.author.avatar}</span>
                <span className={styles.authorName}>{video.author.name}</span>
              </div>
              <div className={styles.metadata}>
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.uploadModal}>
            <h2>📹 Videos Dashboard</h2>
            <form onSubmit={handleUpload}>
              <div className={styles.searchBar}>
                <input 
                  type="text" 
                  placeholder="Search videos..."
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>User-Id:</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your name/ID"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Caption:</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter caption for the video"
                />
              </div>

              <div className={styles.fileUpload}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="video/*"
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.chooseFileButton}
                >
                  📁 Choose file
                </button>
                <span className={styles.fileName}>
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </span>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.uploadSubmitButton}>
                  ⬆️ Upload Video
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowUploadModal(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className={styles.trendingSection}>
              <h3>🔥 Trending Videos</h3>
              {/* Add trending videos list here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 