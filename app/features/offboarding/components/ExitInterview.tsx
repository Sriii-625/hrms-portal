'use client';

import { useState } from 'react';
import styles from './ExitInterview.module.css';

interface FeedbackForm {
  reasonForLeaving: string;
  experienceRating: number;
  workEnvironment: number;
  managementSupport: number;
  careerGrowth: number;
  compensation: number;
  suggestions: string;
  wouldRecommend: boolean;
}

export default function ExitInterview() {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    reasonForLeaving: '',
    experienceRating: 0,
    workEnvironment: 0,
    managementSupport: 0,
    careerGrowth: 0,
    compensation: 0,
    suggestions: '',
    wouldRecommend: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitting feedback:', feedbackForm);
    setSubmitted(true);
  };

  const renderRatingInput = (field: keyof FeedbackForm, label: string) => {
    if (typeof feedbackForm[field] !== 'number') return null;

    return (
      <div className={styles.ratingGroup}>
        <label>{label}</label>
        <div className={styles.ratingButtons}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setFeedbackForm({ ...feedbackForm, [field]: rating })}
              className={`${styles.ratingButton} ${feedbackForm[field] === rating ? styles.active : ''}`}
            >
              {rating}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.thankYouMessage}>
          <h2>Thank You for Your Feedback</h2>
          <p>Your responses have been recorded. We appreciate your honest feedback and wish you the best in your future endeavors.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Exit Interview Form</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Primary Reason for Leaving</label>
          <select
            value={feedbackForm.reasonForLeaving}
            onChange={(e) => setFeedbackForm({ ...feedbackForm, reasonForLeaving: e.target.value })}
            required
          >
            <option value="">Select a reason</option>
            <option value="better-opportunity">Better Opportunity</option>
            <option value="career-change">Career Change</option>
            <option value="work-life-balance">Work-Life Balance</option>
            <option value="compensation">Compensation</option>
            <option value="relocation">Relocation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.ratingsSection}>
          <h3>Please rate the following aspects (1-5)</h3>
          {renderRatingInput('experienceRating', 'Overall Experience')}
          {renderRatingInput('workEnvironment', 'Work Environment')}
          {renderRatingInput('managementSupport', 'Management Support')}
          {renderRatingInput('careerGrowth', 'Career Growth Opportunities')}
          {renderRatingInput('compensation', 'Compensation and Benefits')}
        </div>

        <div className={styles.formGroup}>
          <label>Suggestions for Improvement</label>
          <textarea
            value={feedbackForm.suggestions}
            onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })}
            placeholder="Please share any suggestions or feedback for improvement..."
            rows={4}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={feedbackForm.wouldRecommend}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, wouldRecommend: e.target.checked })}
            />
            Would you recommend our company to others as a good place to work?
          </label>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}