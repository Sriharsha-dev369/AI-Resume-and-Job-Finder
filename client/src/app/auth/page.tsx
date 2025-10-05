'use client';

import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const client = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true, // CRITICAL: This enables cookies to be sent/received
  });

  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Use the loading state
    setErrors({}); // Clear previous errors

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const url = isLogin ? "/auth/login" : "/auth/signup";
      
      // Send only required fields for each endpoint
      const requestData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };

      const response = await client.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      navigate('/');
    } catch (error) {
      console.log('Full error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Authentication failed';
        setErrors({ general: errorMessage });
      } else if (error.request) {
        // Network error
        setErrors({ general: 'Network error. Please check your connection.' });
      } else {
        // Other error
        setErrors({ general: 'An unexpected error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Only validate username for signup
    if (!isLogin && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    // Only validate confirmPassword for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {errors.general}
          </div>
        )}

        {!isLogin && (
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              required
              id="username"
              onChange={handleChange}
              name="username"
              value={formData.username}
              disabled={isLoading}
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          required
          id="email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          disabled={isLoading}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required
          id="password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          disabled={isLoading}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        {!isLogin && (
          <div>
            <label htmlFor="confirmpassword">Confirm password:</label>
            <input
              type="password"
              required
              id="confirmpassword"
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : (isLogin ? "Login" : "Sign Up")}
        </button>
        
        <p>
          {isLogin ? "Need an account?" : "Already have an account?"}
          <Link to={isLogin ? "/signup" : "/login"}>
            {isLogin ? " Sign up" : " Login"}
          </Link>
        </p>
      </form>
    </div>
  );
}