import { useRef, useEffect, useState } from 'react';

const useDarkMode = () => {
  const toggleRef = useRef();
  let [theme, setTheme] = useState('light');

  const toggleTheme = (e) => {
    let checked = e.target.checked;
    setTheme(() => checked ? 'dark' : 'light');
    localStorage.setItem('anuraghazra-site-theme', checked ? 'dark' : 'light');
  }

  useEffect(() => {
    if (!toggleRef.current) return;
    const savedTheme = localStorage.getItem('anuraghazra-site-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    toggleRef.current.checked = savedTheme === 'dark' ? true : false;
  }, []);

  return [theme, toggleTheme, toggleRef];
}

export default useDarkMode;