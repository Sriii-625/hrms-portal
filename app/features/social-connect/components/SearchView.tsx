'use client';

import styles from './SearchView.module.css';

interface ContentItem {
  id: number;
  type: 'video' | 'photo' | 'post' | 'document';
  title: string;
  author: string;
  timestamp: string;
  thumbnail?: string;
}

export default function SearchView() {
  const contentItems: ContentItem[] = [
    {
      id: 1,
      type: 'video',
      title: 'Team Building Workshop Highlights',
      author: 'John Smith',
      timestamp: '2 days ago',
      thumbnail: '/video-thumbnail.jpg'
    },
    {
      id: 2,
      type: 'photo',
      title: 'Office Christmas Party 2023',
      author: 'Sarah Johnson',
      timestamp: '1 week ago',
      thumbnail: '/party-photo.jpg'
    },
    {
      id: 3,
      type: 'post',
      title: 'New Project Announcement',
      author: 'Mike Wilson',
      timestamp: '3 hours ago'
    },
    {
      id: 4,
      type: 'document',
      title: 'Q4 2023 Report',
      author: 'Finance Team',
      timestamp: '5 days ago'
    }
  ];

  return (
    <div className={styles.searchView}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for posts, photos, videos, or documents..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.contentGrid}>
        {contentItems.map((item) => (
          <div key={item.id} className={styles.contentCard}>
            {item.thumbnail ? (
              <div className={styles.thumbnailContainer}>
                <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
              </div>
            ) : (
              <div className={`${styles.placeholderThumbnail} ${styles[item.type]}`}>
                {item.type === 'post' && '📝'}
                {item.type === 'document' && '📄'}
              </div>
            )}
            <div className={styles.contentInfo}>
              <span className={`${styles.contentType} ${styles[item.type]}`}>
                {item.type}
              </span>
              <h3 className={styles.contentTitle}>{item.title}</h3>
              <div className={styles.contentMeta}>
                <span>By {item.author}</span>
                <span>•</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 