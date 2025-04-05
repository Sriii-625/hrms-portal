'use client';

import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import styles from './Reports.module.css';

interface ReportData {
  attendance: Array<{ name: string; role: string; status: string }>;
  leaves: Array<{ name: string; date: string; reason: string; status: string }>;
  timeRecords: Array<{ name: string; timeIn: string; timeOut: string; location: string }>;
  shifts: Array<{ name: string; time: string }>;
  overtime: Array<{ name: string; date: string; hours: number; reason: string; status: string }>;
}

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const generatePDF = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const { height } = page.getSize();
      let currentY = height - 50;

      // Title
      page.drawText('HRMS Attendance Report', {
        x: 50,
        y: currentY,
        size: 20,
        color: rgb(0, 0, 0),
      });
      currentY -= 30;

      // Date Range
      page.drawText(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, {
        x: 50,
        y: currentY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      currentY -= 40;

      // Mock data - In a real app, this would come from your state/database
      const reportData: ReportData = {
        attendance: [
          { name: 'John Doe', role: 'Team Member', status: 'Present' },
          { name: 'Jane Smith', role: 'Team Member', status: 'Absent' }
        ],
        leaves: [
          { name: 'John Doe', date: '2025-02-20 to 2025-02-22', reason: 'Family event', status: 'Pending' }
        ],
        timeRecords: [
          { name: 'John Doe', timeIn: '09:00:00', timeOut: '17:00:00', location: 'Office' }
        ],
        shifts: [
          { name: 'Morning Shift', time: '09:00 - 17:00' }
        ],
        overtime: [
          { name: 'John Doe', date: '2025-02-15', hours: 2, reason: 'Project deadline', status: 'Pending' }
        ]
      };

      // Add each section
      const sections = [
        { title: 'Attendance Records', data: reportData.attendance },
        { title: 'Leave Management', data: reportData.leaves },
        { title: 'Time Tracking', data: reportData.timeRecords },
        { title: 'Shift Management', data: reportData.shifts },
        { title: 'Overtime Records', data: reportData.overtime }
      ];

      sections.forEach(section => {
        // Section Title
        page.drawText(section.title, {
          x: 50,
          y: currentY,
          size: 16,
          color: rgb(0, 0, 0),
        });
        currentY -= 25;

        // Section Data
        section.data.forEach(item => {
          const itemText = Object.entries(item)
            .map(([key, value]) => `${key}: ${value}`)
            .join(' | ');

          page.drawText(itemText, {
            x: 50,
            y: currentY,
            size: 10,
            color: rgb(0, 0, 0),
          });
          currentY -= 20;
        });

        currentY -= 30; // Space between sections
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `attendance-report-${dateRange.startDate}-to-${dateRange.endDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Attendance Reports</h2>
      <div className={styles.reportForm}>
        <div className={styles.dateInputs}>
          <div className={styles.inputGroup}>
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              required
            />
          </div>
        </div>
        <button onClick={generatePDF} className={styles.generateButton}>
          Generate Report
        </button>
      </div>
    </div>
  );
} 

