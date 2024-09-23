import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/config";

const initialState = {
    user: null,
    role: null,
    token: localStorage.getItem('token') || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: user.email,
            password: user.password,
        });
        const data = response.data.data;
        console.log(data)
        if (data && response.data.token) {
            console.log()
            localStorage.setItem('token', response.data.token); // Store the token in local storage
        }
        return data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.error;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const cekRole = createAsyncThunk('user/cekRole', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/auth/check`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.error;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const checkLogin = createAsyncThunk("user/check", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/auth/check`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.error;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const logOut = createAsyncThunk("user/logOut", async () => {
    const response = await axios.delete(`${API_URL}/auth/logout`);
    localStorage.removeItem('token'); // Clear the token from local storage
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.role = action.payload?.role || 'GUEST';
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //check
        builder.addCase(checkLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.role = action.payload.role;
        });
        builder.addCase(checkLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // cekRole
        builder.addCase(cekRole.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.role = action.payload.role;
        });

        // logout
        builder.addCase(logOut.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = null;
            state.role = null;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;