import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/auth/userSlice';
import templatesReducer from '../features/templates/templatesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        templates: templatesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
