import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Preferences } from '@capacitor/preferences';


const fetchUserLocalData = createAsyncThunk(
    'user/fetchUserLocalData',
    async () => {
        const response = await Preferences.get({ key: 'user' });
        return response.value;
    }
)

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    token: '',
    isLoggedIn: false,
    loading: 'idle',
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
            Preferences.set({ key: 'user', value: JSON.stringify(state) });
        },
        logout: (state) => {
            state = initialState;
        },
        update: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserLocalData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchUserLocalData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                if (action.payload) {
                    const user = JSON.parse(action.payload);
                    state.id = user.id;
                    state.name = user.name;
                    state.email = user.email;
                    state.token = user.token;
                    state.isLoggedIn = true;
                }
            })
            .addCase(fetchUserLocalData.rejected, (state) => {
                state.loading = 'failed';
            })
    }
});

export const { login, logout, update } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer


