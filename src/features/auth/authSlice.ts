import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, requestPasswordReset, verifyResetToken, resetPassword, verifyAccount } from '../../api/authApi';
import { authApi } from '../../api/userApi';

// Interfaces for API Responses
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    roles: string[];
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    roles: string[];
}

interface RegisterResponse {
    status?: number;
    message: string;
}

interface VerifyAccountResponse {
    status: number;
    message: string;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    roles: JSON.parse(localStorage.getItem('roles') || '[]'),
    loading: false,
    error: null,
    successMessage: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response: AuthResponse = await authApi.loginUser(credentials);
            const { accessToken, refreshToken, roles } = response;

            // Store tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('roles', JSON.stringify(roles));

            return { accessToken, refreshToken, roles };
        } catch (error) {
            return rejectWithValue('Invalid username or password');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: { email: string; password: string; username: string }): Promise<RegisterResponse> => {
        const response = await registerUser(data);
        return { status: response?.status, message: response?.data };
    }
);

export const verifyAccountToken = createAsyncThunk(
    'auth/verifyAccount',
    async (params: { email: string; token: string }): Promise<VerifyAccountResponse> => {
        const response = await verifyAccount(params);
        return { status: response?.status, message: response?.data };
    }
);

export const requestReset = createAsyncThunk('auth/requestReset', async (email: string) => {
    const response = await requestPasswordReset(email);
    return response.data;
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async (params: { email: string; token: string }) => {
    const response = await verifyResetToken(params.email, params.token);
    return response.data;
});

export const resetUserPassword = createAsyncThunk('auth/resetPassword', async (data: { email: string; token: string; newPassword: string }) => {
    const response = await resetPassword(data);
    return response.data;
});

// Auth Slice Definition
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.roles = [];
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('roles');
        },
        setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
    },
    extraReducers: (builder) => {
        const setLoading = (state: AuthState) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        };

        const setSuccess = (state: AuthState, message: string) => {
            state.loading = false;
            state.successMessage = message;
        };

        const setError = (state: AuthState, error: string) => {
            state.loading = false;
            state.error = error;
        };

        builder
            // Login User
            .addCase(loginUser.pending, setLoading)
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.roles = action.payload.roles;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => setError(state, action.payload as string))

            // Register
            .addCase(register.pending, setLoading)
            .addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) =>
                setSuccess(state, action.payload.message)
            )
            .addCase(register.rejected, (state, action) => setError(state, action.payload as string))

            // Verify Account
            .addCase(verifyAccountToken.pending, setLoading)
            .addCase(verifyAccountToken.fulfilled, (state, action: PayloadAction<VerifyAccountResponse>) =>
                setSuccess(state, action.payload.message)
            )
            .addCase(verifyAccountToken.rejected, (state, action) => setError(state, action.payload as string))

            // Verify Token
            .addCase(verifyToken.pending, setLoading)
            .addCase(verifyToken.fulfilled, (state, action) => setSuccess(state, action.payload))
            .addCase(verifyToken.rejected, (state, action) => setError(state, action.payload as string));
    },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserRoles = (state: { auth: AuthState }) => state.auth.roles;
export const hasRole = (state: { auth: AuthState }, role: string) => state.auth.roles.includes(role);
