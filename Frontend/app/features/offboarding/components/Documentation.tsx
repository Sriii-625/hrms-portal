'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import styles from './Documentation.module.css';

interface Document {
  id: number;
  title: string;
  type: string;
  status: 'pending' | 'completed';
  generatedDate: string;
  lastModified: string;
}

export default function Documentation() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: 'Exit Clearance Form',
      type: 'Clearance',
      status: 'pending',
      generatedDate: '2024-03-10',
      lastModified: '2024-03-10'
    },
    {
      id: 2,
      title: 'Experience Letter',
      type: 'Letter',
      status: 'completed',
      generatedDate: '2024-03-12',
      lastModified: '2024-03-12'
    },
    {
      id: 3,
      title: 'Final Settlement',
      type: 'Financial',
      status: 'pending',
      generatedDate: '2024-03-12',
      lastModified: '2024-03-12'
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const generateClearanceForm = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(20);
    doc.text('UPTOSKILLS - CLEARANCE FORM', 20, 20);

    // Add form content
    const content = [
      'Employee Name: _____________________',
      'Employee ID: _______________________',
      'Department: ________________________',
      'Last Working Day: __________________',
      '',
      'Clearance Items:',
      '□ Company Assets Returned',
      '□ Access Cards Submitted',
      '□ Account Access Revoked',
      '□ Exit Interview Completed',
      '□ Knowledge Transfer Completed',
      '',
      'HR Approval: _______________________',
      'Date: ____________________________'
    ];

    doc.setFontSize(12);
    content.forEach((text, index) => {
      doc.text(text, 20, 40 + (index * 10));
    });

    doc.save('Clearance_Form.pdf');
  };

  const generateExperienceLetter = () => {
    const doc = new jsPDF();

    // Add letterhead
    doc.setFontSize(24);
    doc.text('UPTOSKILLS', 20, 20);

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(currentDate, 20, 30);

    const letterContent = [
      'TO WHOM IT MAY CONCERN',
      '',
      'This is to certify that [Employee Name] was employed with Uptoskills from [Start Date] to [End Date] as [Position].',
      '',
      'During their tenure, they demonstrated excellent professional skills and contributed significantly to our organization\'s success.',
      '',
      'We wish them the very best in their future endeavors.',
      '',
      'Sincerely,',
      'HR Manager',
      'Uptoskills'
    ];

    letterContent.forEach((text, index) => {
      doc.text(text, 20, 50 + (index * 10));
    });

    doc.save('Experience_Letter.pdf');
  };

  const generateSettlementDoc = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('FINAL SETTLEMENT DOCUMENT', 20, 20);

    const content = [
      'Employee Details:',
      'Name: _____________________________',
      'Employee ID: _______________________',
      'Department: ________________________',
      'Last Working Day: __________________',
      '',
      'Settlement Components:',
      '1. Salary (Pro-rata): ______________',
      '2. Leave Encashment: ______________',
      '3. Gratuity: _____________________',
      '4. Bonus/Incentives: ______________',
      '5. Deductions: ___________________',
      '',
      'Net Payable Amount: _______________',
      '',
      'HR Signature: ____________________',
      'Date: ___________________________',
      '',
      'Employee Signature: _______________',
      'Date: ___________________________'
    ];

    doc.setFontSize(12);
    content.forEach((text, index) => {
      doc.text(text, 20, 40 + (index * 10));
    });

    doc.save('Settlement_Document.pdf');
  };



  const handleGenerateDocument = async (type: string) => {
    switch (type) {
      case 'Clearance':
        await generateClearanceForm();
        break;
      case 'Letter':
        await generateExperienceLetter();
        break;
      case 'Financial':
        await generateSettlementDoc();
        break;
    }

    const newDocument: Document = {
      id: Date.now(),
      title: `New ${type}`,
      type,
      status: 'pending',
      generatedDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setDocuments([...documents, newDocument]);
  };

  const handleStatusUpdate = (id: number) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, status: 'completed', lastModified: new Date().toISOString().split('T')[0] } : doc
    ));
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Exit Documentation</h2>

      <div className={styles.controls}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.generateButtons}>
          <button
            onClick={() => handleGenerateDocument('Clearance')}
            className={styles.generateButton}
          >
            Generate Clearance Form
          </button>
          <button
            onClick={() => handleGenerateDocument('Letter')}
            className={styles.generateButton}
          >
            Generate Experience Letter
          </button>
          <button
            onClick={() => handleGenerateDocument('Financial')}
            className={styles.generateButton}
          >
            Generate Settlement Doc
          </button>
        </div>
      </div>

      <div className={styles.documentList}>
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className={styles.documentItem}>
            <div className={styles.documentInfo}>
              <h3>{doc.title}</h3>
              <p>Type: {doc.type}</p>
              <p>Generated: {doc.generatedDate}</p>
              <p>Last Modified: {doc.lastModified}</p>
            </div>
            <div className={styles.documentStatus}>
              <span className={`${styles.status} ${styles[doc.status]}`}>
                {doc.status}
              </span>
              {doc.status === 'pending' && (
                <button
                  onClick={() => handleStatusUpdate(doc.id)}
                  className={styles.completeButton}
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}