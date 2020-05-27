import { useEffect, useState, useCallback } from 'react';

const useDarkMode = () => {
  let [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      localStorage.setItem('anuraghazra-theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('anuraghazra-theme', 'light');
      setTheme('light');
    }
  }, [theme]);

  useEffect(() => {
    const localTheme = localStorage.getItem('anuraghazra-theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return [theme, toggleTheme];
};

export default useDarkMode;
