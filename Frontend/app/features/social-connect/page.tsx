'use client';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './social-connect.module.css';
import SearchView from './components/SearchView';
import ReelsView from './components/ReelsView';
import ThreadsView from './components/ThreadsView';
import VideosView from './components/VideosView';
import MessagesView from './components/MessagesView';
import NotificationsView from './components/NotificationsView';
import CreateView from './components/CreateView';

interface Post {
  id: number;
  user: {
    name: string;
    position: string;
    avatar: string;
  };
  content: string;
  mediaUrl?: string;
  mediaType?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export default function SocialConnect() {
  const router = useRouter();
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
// Remove duplicate declaration since it's already declared below
// Remove duplicate declaration since it's already declared below
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        name: 'Jane Smith',
        position: 'Project Manager',
        avatar: '👩‍💼'
      },
      content: 'Excited to announce our new project milestone! 🎉',
      timestamp: '2h ago',
      likes: 5,
      isLiked: false
    }
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postType, setPostType] = useState('text');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() && !selectedFile) return;

    let mediaUrl = '';
    if (selectedFile) {
      mediaUrl = URL.createObjectURL(selectedFile);
    }

    const newPostObj: Post = {
      id: Date.now(),
      user: {
        name: 'Current User',
        position: 'Employee',
        avatar: '👤'
      },
      content: newPost,
      mediaUrl: mediaUrl || undefined,
      mediaType: selectedFile ? selectedFile.type : undefined,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setSelectedFile(null);
    setPostType('text');
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleBackToFeatures = () => {
    router.push('/features');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <button 
          onClick={handleBackToFeatures}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className={styles.tabs}>
          <button
            className={activeTab === 'feed' ? styles.activeTab : ''}
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </button>
          <button
            className={activeTab === 'stories' ? styles.activeTab : ''}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </button>
          <button
            className={activeTab === 'messages' ? styles.activeTab : ''}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={activeTab === 'learning' ? styles.activeTab : ''}
            onClick={() => setActiveTab('learning')}
          >
            Learning
          </button>
        </div>
        <div className={styles.userInfo}>
          Welcome, User
        </div>
      </nav>
      <nav className={styles.sideNav}>
        <div className={styles.sideNavContent}>
          

<div className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <span className={styles.icon}>🏠</span>
            <span className={styles.label}>Home</span>
          </div>
          <div className={`${styles.navItem} ${activeTab === 'search' ? styles.active : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <span className={styles.icon}>🔍</span>
            <span className={styles.label}>Search</span>
            <span className={styles.badge}>New</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'threads' ? styles.active : ''}`}
            onClick={() => setActiveTab('threads')}
          >
            <span className={styles.icon}>🧵</span>
            <span className={styles.label}>Threads</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'reels' ? styles.active : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            <span className={styles.icon}>📽️</span>
            <span className={styles.label}>Reels</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'videos' ? styles.active : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <span className={styles.icon}>🎥</span>
            <span className={styles.label}>Videos</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeTab === 'messages' ? styles.active : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <span className={styles.icon}>💬</span>
            <span className={styles.label}>Messages</span>
          </div>
          <div className={`${styles.navItem} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className={styles.icon}>🔔</span>
            <span className={styles.label}>Notifications</span>
          </div>
          <div className={`${styles.navItem} ${activeTab === 'create' ? styles.active : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <span className={styles.icon}>➕</span>
            <span className={styles.label}>Create</span>
          </div>
        </div>
      </nav>


      <div className={styles.mainContent}>
        <div className={styles.createPost}>
          <form onSubmit={handlePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className={styles.postInput}
            />
            <div className={styles.postActions}>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setPostType('photo');
                  }
                }}
              />
              <button 
                type="button" 
                className={`${styles.mediaButton} ${postType === 'photo' ? styles.active : ''}`}
                onClick={() => document.getElementById('file-upload')?.click()}
              >📷 Photo</button>
              {selectedFile && (
                <div className={styles.selectedFile}>
                  Selected: {selectedFile.name}
                  <button onClick={() => {
                    setSelectedFile(null);
                    setPostType('text');
                  }}>✕</button>
                </div>
              )}
              <button 
                type="submit" 
                className={styles.postButton}
                disabled={!newPost.trim() && !selectedFile}
              >
                Post
              </button>
            </div>
            {selectedFile && (
              <div className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className={styles.postImage}
                />
              </div>
            )}
          </form>
        </div>
        {activeTab === 'search' && (
          <SearchView />
        )}
        {activeTab === 'reels' && (
          <ReelsView />
        )}
        {activeTab === 'threads' && (
          <ThreadsView />
        )}
        {activeTab === 'videos' && (
          <VideosView />
        )}
        {activeTab === 'messages' && (
          <MessagesView />
        )}
        {activeTab === 'notifications' && (
          <NotificationsView />
        )}
        {activeTab === 'create' && (
          <CreateView />
        )}
        {activeTab === 'feed' && (
          <div className={styles.feedSection}>
            <form onSubmit={handlePost} className={styles.postForm}>
              <img src="/user-avatar.png" alt="User" className={styles.userAvatar} />
              <input
                type="text"
                placeholder="Share something with your colleagues..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className={styles.postInput}
              />
              <div className={styles.postActions}>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setPostType(file.type.startsWith('image') ? 'photo' :
                                file.type.startsWith('video') ? 'video' : 'document');
                    }
                  }}
                />
                <button 
                  type="button" 
                  className={`${styles.mediaButton} ${postType === 'photo' ? styles.active : ''}`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >📷 Photo</button>
                <button 
                  type="button" 
                  className={`${styles.mediaButton} ${postType === 'video' ? styles.active : ''}`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >🎥 Video</button>
                <button 
                  type="button" 
                  className={`${styles.mediaButton} ${postType === 'document' ? styles.active : ''}`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >📄 Document</button>
                <button 
                  type="button" 
                  className={`${styles.mediaButton} ${postType === 'poll' ? styles.active : ''}`}
                  onClick={() => setPostType('poll')}
                >📊 Poll</button>
                {selectedFile && (
                  <div className={styles.selectedFile}>
                    Selected: {selectedFile.name}
                    <button onClick={() => setSelectedFile(null)}>✕</button>
                  </div>
                )}
                <button 
                  type="submit" 
                  className={styles.postButton}
                  disabled={!newPost.trim() && !selectedFile}
                >
                  Post
                </button>
              </div>
            </form>

            <div className={styles.posts}>
              {posts.map(post => (
                <div key={post.id} className={styles.post}>
                  <div className={styles.postHeader}>
                    <div className={styles.userInfo}>
                      <span className={styles.avatar}>{post.user.avatar}</span>
                      <div>
                        <div className={styles.userName}>{post.user.name}</div>
                        <div className={styles.userPosition}>{post.user.position}</div>
                      </div>
                    </div>
                    <span className={styles.timestamp}>{post.timestamp}</span>
                  </div>
                  <div className={styles.postContent}>
                    {post.content}
                    {post.mediaUrl && post.mediaType?.startsWith('image') && (
                      <img src={post.mediaUrl} alt="Post media" className={styles.postImage} style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }} />
                    )}
                  </div>
                  <div className={styles.postActions}>
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`${styles.actionButton} ${post.isLiked ? styles.liked : ''}`}
                    >
                      👍 Like
                    </button>
                    <button className={styles.actionButton}>💬 Comment</button>
                    <button className={styles.actionButton}>↗️ Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <aside className={styles.sidebar}>
          <div className={styles.quickAccess}>
            <h3>Quick Access</h3>
            <button>📊 My Team</button>
            <button>📅 Events</button>
            <button>📚 Courses</button>
            <button>📢 Announcements</button>
          </div>
          <div className={styles.activeColleagues}>
            <h3>Active Colleagues</h3>
            {/* Add active colleagues list here */}
          </div>
        </aside>
      </div>
    </div>
  );
}