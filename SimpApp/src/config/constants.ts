/* eslint-disable prettier/prettier */

export const API_URL = 'http://localhost:5000';

export const JWT_TOKEN_KEY = 'my-jwt';

export const SUPPORTED_LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Spanish', value: 'es' },
  { label: 'Hindi', value: 'hi' },
];

export const SUPPORTED_COUNTRIES = [
  {
    label: 'UAE',
    value: 'ae',
    validations: {
      patternMatch: '^[0-9A-Za-z]{5,}$',
      errorText: 'Username should be alphanumeric and atleast 5 characters long',
    },
  },
  {
    label: 'France',
    value: 'fr',
    validations: {
      patternMatch: '^[a-zA-Z][a-zA-Z0-9]{2}[0-9]{3}$',
      errorText: 'Username must be 6 characters long, first 3 character should be a letter followed by 3 numbers.',
    },
  },
  {
    label: 'Spain',
    value: 'es',
    validations: {
      patternMatch: '^[0-9][a-zA-Z0-9]{4,}$',
      errorText: 'Username must be at least 5 characters long, starts with a number, and is alphanumeric',
    },
  },
  {
    label: 'India',
    value: 'in',
    validations: {
      patternMatch: '^[a-zA-Z][a-zA-Z0-9]{5,}$',
      errorText: 'Username must start with a letter and be at least 6 characters long',
    },
  },
];
