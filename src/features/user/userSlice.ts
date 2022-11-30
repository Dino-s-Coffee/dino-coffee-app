import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'



interface UserState {
    id: string,
    name: string,
    email: string,
    token: string,
    isLoggedIn: boolean,
}

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    token: '',
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state = initialState;
        },
        update: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    },
});

export const { login, logout, update } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer


