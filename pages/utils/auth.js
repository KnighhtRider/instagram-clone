export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    // Check if the window object is available (client-side)
    const token = localStorage.getItem('jwt');
    return token;
  }
  return null;
};