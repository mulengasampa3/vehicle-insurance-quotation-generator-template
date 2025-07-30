import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser, loginUser } from '../features/user/userSlice';
import type { RootState, AppDispatch } from '../app/store';

export const useUser = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);
    const loading = useSelector((state: RootState) => state.user.loading);

    const loadUsers = () => dispatch(fetchUsers());
    const fetchUser = (id: number) => dispatch(fetchUserById(id));
    const addUser = (user: { username: string; password: string; email: string, roles: string[] }) => dispatch(createUser(user));
    const loginnUser = (user: { username: string; password: string; }) => dispatch(loginUser(user))
    const removeUser = (id: number) => dispatch(deleteUser(id));
    const updateuserById = (id: number, user: { username: string; password: string }) => { dispatch(updateUser({ id, user })); };


    return {
        users,
        loading,
        loadUsers,
        updateuserById,
        fetchUser,
        addUser,
        removeUser,
        loginnUser
    };
};
