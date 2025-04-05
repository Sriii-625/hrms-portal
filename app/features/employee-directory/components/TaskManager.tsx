'use client';

import { useState } from 'react';
import styles from './TaskManager.module.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  startTime: string;
  endTime: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete project proposal',
      completed: false,
      startTime: '09:00',
      endTime: '11:00'
    },
    {
      id: 2,
      title: 'Review team performance',
      completed: true,
      startTime: '11:30',
      endTime: '13:00'
    },
    {
      id: 3,
      title: 'Prepare for client meeting',
      completed: false,
      startTime: '14:00',
      endTime: '15:30'
    },
    {
      id: 4,
      title: 'Update employee handbook',
      completed: false,
      startTime: '16:00',
      endTime: '17:00'
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !startTime || !endTime) {
      alert('Please fill in all fields');
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      startTime,
      endTime
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setStartTime('');
    setEndTime('');
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className={styles.container}>
      <h2>Task Manager</h2>

      <form onSubmit={handleAddTask} className={styles.addTaskForm}>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={styles.taskInput}
        />
        <div className={styles.timeInputs}>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={styles.timeInput}
          />
          <span>to</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={styles.timeInput}
          />
        </div>
        <button type="submit" className={styles.addButton}>
          Add Task
        </button>
      </form>

      <div className={styles.taskList}>
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
          >
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={styles.checkmark}></span>
            </label>
            <div className={styles.taskContent}>
              <span className={styles.taskTitle}>{task.title}</span>
              <span className={styles.taskTime}>
                {task.startTime} - {task.endTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 