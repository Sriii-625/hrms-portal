'use client';

import { useState, useRef } from 'react';
import styles from './DocumentManagement.module.css';

interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Employee Handbook',
      type: 'PDF',
      uploadDate: '2025-01-15',
      size: '2.5 MB'
    },
    {
      id: 2,
      name: 'Vacation Policy',
      type: 'DOCX',
      uploadDate: '2025-02-01',
      size: '1.2 MB'
    },
    {
      id: 3,
      name: 'Performance Review Template',
      type: 'XLSX',
      uploadDate: '2025-02-10',
      size: '500 KB'
    },
    {
      id: 4,
      name: 'Company Organization Chart',
      type: 'PNG',
      uploadDate: '2025-02-20',
      size: '3.1 MB'
    }
  ]);

  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentName || !documentType || !fileInputRef.current?.files?.length) {
      alert('Please fill in all fields and select a file');
      return;
    }

    const file = fileInputRef.current.files[0];
    const size = formatFileSize(file.size);
    const today = new Date().toISOString().split('T')[0];

    const newDocument: Document = {
      id: Date.now(),
      name: documentName,
      type: documentType.toUpperCase(),
      uploadDate: today,
      size: size
    };

    setDocuments([...documents, newDocument]);
    setDocumentName('');
    setDocumentType('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.container}>
      <h2>Document Management</h2>

      <form onSubmit={handleUpload} className={styles.uploadForm}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Document name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Document type (e.g., PDF, DOCX)"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          />
          <input
            type="file"
            ref={fileInputRef}
            className={styles.fileInput}
            required
          />
        </div>
        <button type="submit" className={styles.uploadButton}>
          Upload
        </button>
      </form>

      <div className={styles.documentsTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Upload Date</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.type}</td>
                <td>{doc.uploadDate}</td>
                <td>{doc.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 