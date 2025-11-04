import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    mode: 'light' | 'dark';
    filter: string;
    orderAsc: boolean;
}

const initialState: UIState = {
    mode: 'light',
    filter: '',
    orderAsc: true,
};

const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.mode = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        toggleOrder: (state) => {
            state.orderAsc = !state.orderAsc;
        },
    },
});

export const { setMode, setFilter, toggleOrder } = UISlice.actions;
export default UISlice.reducer;