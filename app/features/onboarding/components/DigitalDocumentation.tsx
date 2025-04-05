'use client';

import { useState } from 'react';
import styles from './DigitalDocumentation.module.css';

interface Document {
  id: number;
  title: string;
  type: string;
  status: 'pending' | 'completed';
  uploadDate: string;
  signedDate?: string;
}

export default function DigitalDocumentation() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: 'Employment Agreement',
      type: 'Contract',
      status: 'pending',
      uploadDate: '2024-03-15'
    },
    {
      id: 2,
      title: 'Code of Conduct',
      type: 'Policy',
      status: 'completed',
      uploadDate: '2024-03-15',
      signedDate: '2024-03-15'
    },
    {
      id: 3,
      title: 'NDA Agreement',
      type: 'Legal',
      status: 'pending',
      uploadDate: '2024-03-15'
    }
  ]);

  const handleDocumentSign = (id: number) => {
    setDocuments(documents.map(doc =>
      doc.id === id
        ? { ...doc, status: 'completed', signedDate: new Date().toISOString().split('T')[0] }
        : doc
    ));
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocument: Document = {
        id: Date.now(),
        title: file.name,
        type: 'Upload',
        status: 'pending',
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setDocuments([...documents, newDocument]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Digital Documentation</h2>
        <div className={styles.uploadSection}>
          <input
            type="file"
            onChange={handleDocumentUpload}
            className={styles.fileInput}
            accept=".pdf,.doc,.docx"
          />
          <button className={styles.uploadButton}>Upload New Document</button>
        </div>
      </div>

      <div className={styles.documentList}>
        {documents.map((doc) => (
          <div key={doc.id} className={styles.documentCard}>
            <div className={styles.documentInfo}>
              <h3>{doc.title}</h3>
              <span className={`${styles.badge} ${styles[doc.type.toLowerCase()]}`}>
                {doc.type}
              </span>
            </div>
            
            <div className={styles.documentDetails}>
              <p>Uploaded: {doc.uploadDate}</p>
              {doc.signedDate && <p>Signed: {doc.signedDate}</p>}
              <span className={`${styles.status} ${styles[doc.status]}`}>
                {doc.status}
              </span>
            </div>

            <div className={styles.documentActions}>
              <button className={styles.viewButton}>View Document</button>
              {doc.status === 'pending' && (
                <button
                  className={styles.signButton}
                  onClick={() => handleDocumentSign(doc.id)}
                >
                  Sign Document
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}