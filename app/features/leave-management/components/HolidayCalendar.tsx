'use client';

import { useState } from 'react';
import { Calendar } from '../../../../components/ui/calendar';
import { Badge } from '../../../../components/ui/badge';
import styles from './HolidayCalendar.module.css';

interface Holiday {
  date: Date;
  name: string;
  type: 'public' | 'company';
}

interface HolidayCalendarProps {
  holidays: Holiday[];
  onDateSelect?: (date: Date) => void;
}

const HolidayCalendar = ({ holidays, onDateSelect }: HolidayCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && onDateSelect) {
      onDateSelect(date);
    }
  };

  const getHolidayForDate = (date: Date) => {
    return holidays.find(
      (holiday) =>
        holiday.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Holiday Calendar</h2>
      <div className={styles.calendarContainer}>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          className={styles.calendar}
          modifiers={{
            holiday: holidays.map(h => h.date)
          }}
          modifiersStyles={{
            holiday: {
              color: '#4ADE80',
              fontWeight: '600'
            }
          }}
        />
      </div>
      
      <div className={styles.holidayList}>
        <h3 className={styles.subtitle}>Upcoming Holidays</h3>
        {holidays
          .filter(holiday => holiday.date >= new Date())
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((holiday, index) => (
            <div key={index} className={styles.holidayCard}>
              <div className={styles.holidayInfo}>
                <span className={styles.holidayDate}>
                  {holiday.date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className={styles.holidayName}>{holiday.name}</span>
              </div>
              <Badge
                className={`${styles.holidayType} ${
                  holiday.type === 'public' ? styles.publicHoliday : styles.companyHoliday
                }`}
              >
                {holiday.type === 'public' ? 'Public Holiday' : 'Company Holiday'}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HolidayCalendar;