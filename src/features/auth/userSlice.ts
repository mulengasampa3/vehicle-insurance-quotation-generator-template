import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/userApi';
import { User } from '../../types/user.types';



interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunks for user-related operations
export const fetchUsers = createAsyncThunk('user/fetchUsers', authApi.getUsers);
export const fetchUserById = createAsyncThunk('user/fetchUserById', authApi.getUserById);
export const createUser = createAsyncThunk('user/createUser', authApi.registerUser);
export const deleteUser = createAsyncThunk('user/deleteUser', authApi.deleteUser);
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, user }: { id: number; user: Partial<User> }, { rejectWithValue }) => {
      try {
        const response = await authApi.updateUser({ id, user });
        return response; // Return the updated user
      } catch (error) {
        return rejectWithValue('Failed to update user');
      }
    }
  );

// User slice definition
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const existingUserIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (existingUserIndex !== -1) {
          state.users[existingUserIndex] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })

    // Update User
    .addCase(updateUser.pending, (state) => {
        state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
            state.users[index] = action.payload;
        }
        })
        .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update user';
        })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
