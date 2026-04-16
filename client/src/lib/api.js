const configuredApiUrl = (process.env.REACT_APP_API_URL || '').trim();
const defaultProductionApiUrl = 'https://new-portfolio-04oq.onrender.com';

const normalizedConfiguredApiUrl = configuredApiUrl.replace(/\/+$/, '');

export const API_BASE_URL = normalizedConfiguredApiUrl || (
  process.env.NODE_ENV === 'production' ? defaultProductionApiUrl : ''
);

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
