const THEME_KEY = 'mui-mode';

export const saveMode = (mode: 'light' | 'dark') => {
    localStorage.setItem(THEME_KEY, mode);
};

export const loadMode = () => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
}