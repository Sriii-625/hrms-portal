'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/context/AuthContext';
import styles from './page.module.css';

export default function Login() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [isDemo, setIsDemo] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const demo = searchParams.get('demo');
    if (demo === 'true') {
      setIsDemo(true);
      setFormData({ email: 'admin', password: 'admin' });
    }
  }, []);

  // Removed automatic redirection effect

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when input changes
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Verify admin credentials
      if (formData.email === 'admin' && formData.password === 'admin') {
        await login(formData.email, formData.password);
        const searchParams = new URLSearchParams(window.location.search);
        const returnUrl = searchParams.get('returnUrl');
        router.push(returnUrl || '/features');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Sign In</h1>
        <p>Please login to access the dashboard.</p>
        
        <form onSubmit={handleLogin}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={isDemo}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordInput}>
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                readOnly={isDemo}
                className={styles.input}
                required
              />
              <span 
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
              >
                {showPassword ? '🔒' : '👁'}
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Secure Sign-in'}
          </button>
        </form>

        {!isDemo && (
          <p className={styles.note}>
            Note: You can use the username 'admin' and password 'admin' to log in.
          </p>
        )}
      </div>
    </div>
  );
}