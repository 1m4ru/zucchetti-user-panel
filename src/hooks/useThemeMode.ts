import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setMode } from '../store/uiSlice';
import { loadMode, saveMode } from '../utils/storage';
import { useMediaQuery } from '@mui/material';

export function useThemeMode() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.ui.mode);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const stored = loadMode();
    dispatch(setMode(stored ?? (prefersDark ? 'dark' : 'light')));
  }, [dispatch, prefersDark]);

  useEffect(() => {
    saveMode(mode);
  }, [mode]);

  return mode;
}