'use client';

import { useState, useRef } from 'react';
import styles from './CreateView.module.css';

type CreateType = 'Post' | 'Story' | 'Reel';
type MediaType = 'photo' | 'video' | 'none';
type ActivityType = { emoji: string; text: string } | null;

interface DraftPost {
  type: CreateType;
  content: string;
  media: File | null;
  mediaType: MediaType;
  activity: ActivityType;
  location: string;
}

export default function CreateView() {
  const [activeType, setActiveType] = useState<CreateType>('Post');
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('none');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activity, setActivity] = useState<ActivityType>(null);
  const [location, setLocation] = useState('');
  const [showActivityPicker, setShowActivityPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const activities = [
    { emoji: '😊', text: 'Feeling happy' },
    { emoji: '🎉', text: 'Celebrating' },
    { emoji: '💼', text: 'Working' },
    { emoji: '📚', text: 'Learning' },
    { emoji: '🤝', text: 'Meeting' }
  ];

  const locations = [
    'Main Office',
    'Conference Room A',
    'Break Room',
    'Training Center',
    'Remote'
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      setMediaType('photo');
    } else if (fileType === 'video') {
      setMediaType('video');
    }
    setSelectedFile(file);
  };

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handleActivitySelect = (selectedActivity: { emoji: string; text: string }) => {
    setActivity(selectedActivity);
    setShowActivityPicker(false);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationPicker(false);
  };

  const saveDraft = () => {
    const draft: DraftPost = {
      type: activeType,
      content,
      media: selectedFile,
      mediaType,
      activity,
      location
    };
    localStorage.setItem('postDraft', JSON.stringify({
      ...draft,
      media: selectedFile ? selectedFile.name : null // Store only filename in localStorage
    }));
    alert('Draft saved successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('type', activeType);
      formData.append('content', content);
      if (selectedFile) {
        formData.append('media', selectedFile);
      }
      if (activity) {
        formData.append('activity', JSON.stringify(activity));
      }
      if (location) {
        formData.append('location', location);
      }

      // Here you would typically send this to your API
      console.log('Submitting post:', {
        type: activeType,
        content,
        mediaName: selectedFile?.name,
        activity,
        location
      });

      // Clear form after successful submission
      setContent('');
      setSelectedFile(null);
      setMediaType('none');
      setActivity(null);
      setLocation('');
      
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className={styles.createContainer}>
      <h1>Create {activeType}</h1>

      <div className={styles.createTypes}>
        <button 
          className={`${styles.typeButton} ${activeType === 'Post' ? styles.active : ''}`}
          onClick={() => setActiveType('Post')}
        >
          Post
        </button>
        <button 
          className={`${styles.typeButton} ${activeType === 'Story' ? styles.active : ''}`}
          onClick={() => setActiveType('Story')}
        >
          Story
        </button>
        <button 
          className={`${styles.typeButton} ${activeType === 'Reel' ? styles.active : ''}`}
          onClick={() => setActiveType('Reel')}
        >
          Reel
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.createForm}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentInput}
        />

        <div 
          className={styles.mediaDropzone}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
            style={{ display: 'none' }}
            accept="image/*,video/*"
          />
          <input
            type="file"
            ref={photoInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
            style={{ display: 'none' }}
            accept="video/*"
          />
          
          {selectedFile ? (
            <div className={styles.selectedFile}>
              <span>{mediaType === 'photo' ? '📷' : '🎥'} Selected: {selectedFile.name}</span>
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  setMediaType('none');
                }}
                className={styles.removeFile}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className={styles.dropzoneContent}>
              <span className={styles.folderIcon}>📁</span>
              <p>Drag and drop media here<br />or click to upload</p>
            </div>
          )}
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.mediaButtons}>
            <button type="button" className={styles.mediaButton} onClick={handlePhotoClick}>
              📷 Photo
            </button>
            <button type="button" className={styles.mediaButton} onClick={handleVideoClick}>
              🎥 Video
            </button>
            <button 
              type="button" 
              className={`${styles.mediaButton} ${showActivityPicker ? styles.active : ''}`}
              onClick={() => setShowActivityPicker(!showActivityPicker)}
            >
              {activity ? `${activity.emoji} ${activity.text}` : '😊 Feeling/Activity'}
            </button>
            <button 
              type="button" 
              className={`${styles.mediaButton} ${showLocationPicker ? styles.active : ''}`}
              onClick={() => setShowLocationPicker(!showLocationPicker)}
            >
              {location ? `📍 ${location}` : '📍 Location'}
            </button>
          </div>

          {showActivityPicker && (
            <div className={styles.picker}>
              {activities.map((act) => (
                <button
                  key={act.text}
                  type="button"
                  onClick={() => handleActivitySelect(act)}
                  className={styles.pickerItem}
                >
                  {act.emoji} {act.text}
                </button>
              ))}
            </div>
          )}

          {showLocationPicker && (
            <div className={styles.picker}>
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocationSelect(loc)}
                  className={styles.pickerItem}
                >
                  📍 {loc}
                </button>
              ))}
            </div>
          )}

          <div className={styles.submitButtons}>
            <button 
              type="button" 
              className={styles.draftButton}
              onClick={saveDraft}
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              className={styles.postButton}
              disabled={!content.trim() && !selectedFile}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 