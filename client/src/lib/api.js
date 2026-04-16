const configuredApiUrl = (process.env.REACT_APP_API_URL || '').trim();
const defaultProductionApiUrl = 'https://new-portfolio-04oq.onrender.com';
const defaultDevelopmentApiUrl = 'http://localhost:5001';

const normalizedConfiguredApiUrl = configuredApiUrl.replace(/\/+$/, '');

export const API_BASE_URL = normalizedConfiguredApiUrl || (
  process.env.NODE_ENV === 'production' ? defaultProductionApiUrl : defaultDevelopmentApiUrl
);

const FALLBACK_API_BASE_URL =
  process.env.NODE_ENV === 'development' ? defaultProductionApiUrl : '';

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const fetchApi = async (path, options) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const primaryUrl = `${API_BASE_URL}${normalizedPath}`;

  try {
    const response = await fetch(primaryUrl, options);

    if (
      response.ok ||
      !FALLBACK_API_BASE_URL ||
      API_BASE_URL === FALLBACK_API_BASE_URL ||
      response.status < 500
    ) {
      return response;
    }
  } catch (error) {
    if (!FALLBACK_API_BASE_URL || API_BASE_URL === FALLBACK_API_BASE_URL) {
      throw error;
    }
  }

  return fetch(`${FALLBACK_API_BASE_URL}${normalizedPath}`, options);
};
