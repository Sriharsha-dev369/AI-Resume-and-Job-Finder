import * as yup from "yup";

interface BasicInfo {
  name: string;
  phone: string;
  linkedin: string;
  email: string;
}

export const BasicInfoSchema: yup.ObjectSchema<BasicInfo> = yup.object({
  name: yup
    .string()
    .trim()
    .min(6, 'Name must be at least 6 characters')
    .max(25, 'Name must be 25 characters or less')
    .matches(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, or apostrophes')
    .required('Name is required'),
  phone: yup
    .string()
    .matches(/^\+91[6-9]\d{9}$/, 'Enter a valid Indian phone number (e.g., +919876543210)')
    .required('Phone is required'),
  linkedin: yup
    .string()
    .url('Enter a valid URL')
    .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/, 'Must be a valid LinkedIn URL')
    .required('LinkedIn is required'),
  email: yup
    .string()
    .email('Enter a valid email address')
    .max(50, 'Email must be 50 characters or less') // Reduced from 100
    .required('Email is required'),
});
