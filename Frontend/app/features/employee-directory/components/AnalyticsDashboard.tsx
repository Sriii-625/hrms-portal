'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './AnalyticsDashboard.module.css';

export default function AnalyticsDashboard() {
  const departmentChartRef = useRef<HTMLCanvasElement>(null);
  const ageChartRef = useRef<HTMLCanvasElement>(null);
  const genderChartRef = useRef<HTMLCanvasElement>(null);
  const experienceChartRef = useRef<HTMLCanvasElement>(null);
  
  // Add refs for chart instances
  const chartInstancesRef = useRef<{[key: string]: Chart | null}>({
    department: null,
    age: null,
    gender: null,
    experience: null
  });

  useEffect(() => {
    // Create charts
    const createCharts = () => {
      if (departmentChartRef.current) {
        const ctx = departmentChartRef.current.getContext('2d');
        if (ctx) {
          chartInstancesRef.current.department = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'],
              datasets: [{
                label: 'Employees by Department',
                data: [50, 30, 20, 10, 15],
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Employees by Department',
                  color: 'white',
                  font: { size: 16 }
                },
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.8)'
                  }
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.8)'
                  }
                }
              }
            }
          });
        }
      }

      if (genderChartRef.current) {
        const ctx = genderChartRef.current.getContext('2d');
        if (ctx) {
          chartInstancesRef.current.gender = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Men', 'Women', 'Non-Binary'],
              datasets: [{
                data: [60, 35, 5],
                backgroundColor: [
                  'rgba(79, 70, 229, 0.6)',
                  'rgba(236, 72, 153, 0.6)',
                  'rgba(16, 185, 129, 0.6)'
                ],
                borderColor: [
                  'rgba(79, 70, 229, 1)',
                  'rgba(236, 72, 153, 1)',
                  'rgba(16, 185, 129, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Gender Distribution',
                  color: 'white',
                  font: { size: 16 }
                },
                legend: {
                  position: 'bottom',
                  labels: {
                    color: 'white'
                  }
                }
              }
            }
          });
        }
      }

      if (ageChartRef.current) {
        const ctx = ageChartRef.current.getContext('2d');
        if (ctx) {
          chartInstancesRef.current.age = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['20-30', '31-40', '41-50', '51+'],
              datasets: [{
                label: 'Age Distribution',
                data: [40, 35, 15, 10],
                backgroundColor: 'rgba(139, 92, 246, 0.6)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Age Distribution',
                  color: 'white',
                  font: { size: 16 }
                },
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.8)'
                  }
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.8)'
                  }
                }
              }
            }
          });
        }
      }

      if (experienceChartRef.current) {
        const ctx = experienceChartRef.current.getContext('2d');
        if (ctx) {
          chartInstancesRef.current.experience = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['0-2 years', '3-5 years', '6-10 years', '10+ years'],
              datasets: [{
                data: [30, 25, 30, 15],
                backgroundColor: [
                  'rgba(79, 70, 229, 0.6)',
                  'rgba(139, 92, 246, 0.6)',
                  'rgba(167, 139, 250, 0.6)',
                  'rgba(196, 181, 253, 0.6)'
                ],
                borderColor: [
                  'rgba(79, 70, 229, 1)',
                  'rgba(139, 92, 246, 1)',
                  'rgba(167, 139, 250, 1)',
                  'rgba(196, 181, 253, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Experience Distribution',
                  color: 'white',
                  font: { size: 16 }
                },
                legend: {
                  position: 'bottom',
                  labels: {
                    color: 'white'
                  }
                }
              }
            }
          });
        }
      }
    };

    createCharts();

    // Cleanup function to destroy charts
    return () => {
      Object.values(chartInstancesRef.current).forEach(chart => {
        if (chart) {
          chart.destroy();
        }
      });
      chartInstancesRef.current = {
        department: null,
        age: null,
        gender: null,
        experience: null
      };
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={styles.container}>
      <h2>Analytics Dashboard</h2>
      
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <canvas ref={departmentChartRef}></canvas>
        </div>
        <div className={styles.chartCard}>
          <canvas ref={genderChartRef}></canvas>
        </div>
        <div className={styles.chartCard}>
          <canvas ref={ageChartRef}></canvas>
        </div>
        <div className={styles.chartCard}>
          <canvas ref={experienceChartRef}></canvas>
        </div>
      </div>
    </div>
  );
} 