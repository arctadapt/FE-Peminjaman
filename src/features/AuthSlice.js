import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";
import API_URL from "../config/config";

const initialState = {
    user: null,
    token: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await api.post(`${API_URL}/auth/login`, {
            nama_lengkap: user.nama_lengkap,
            password: user.password
        });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            return {
                user: response.data.data,
                token: response.data.token
            };
        } else {
            return thunkAPI.rejectWithValue("Token tidak ditemukan dalam respons");
        }
    } catch (error) {
        console.error('Login error:', error);
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Terjadi kesalahan saat login");
    }
});

export const checkLogin = createAsyncThunk("user/check", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return thunkAPI.rejectWithValue("Token tidak ditemukan");
        }
        const response = await api.get(`${API_URL}/auth/check`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.error;
            return thunkAPI.rejectWithValue(message);
        }
        return thunkAPI.rejectWithValue("Terjadi kesalahan saat memeriksa login");
    }
});

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await api.delete(`${API_URL}/auth/logout`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        localStorage.removeItem('token');
        return null;
    } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('token');
        return null;
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload.user; // Pastikan ini mengambil data user yang benar
            state.token = action.payload.token;
            state.message = 'Login berhasil';
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            state.user = null;
            state.token = null;
        });

        builder.addCase(checkLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.data;
            state.token = action.payload.token;
        });
        builder.addCase(checkLogin.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
            state.token = null;
        });

        builder.addCase(logOut.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.isSuccess = false;
        });
    }
});

export const { reset, setToken } = authSlice.actions;
export default authSlice.reducer;
