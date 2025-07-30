import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchUsers, deleteUser, updateUser, createUser } from '../../features/auth/userSlice';

const UserList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<string>(''); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleUpdateClick = (user: any) => {
    setSelectedUser(user);
    setFormData({ username: user.username, email: user.email || '', password: '' });
    setIsUpdateModalOpen(true);
  };

  const handleAddClick = () => {
    setFormData({ username: '', email: '', password: '' });
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedUser(null);
    setFormData({ username: '', email: '', password: '' });
    setRoles('');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userPayload = { ...formData, roles: roles.split(',').map((role) => role.trim()) };
      if (isUpdateModalOpen && selectedUser) {
        await dispatch(updateUser({ id: selectedUser.id, user: userPayload }));
      } else if (isAddModalOpen) {
        await dispatch(createUser(userPayload));
      }
      handleModalClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p className="text-center text-gray-600">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">Error loading users: {error}</p>;
  if (!users.length) return <p className="text-center text-gray-600">No users found.</p>;

  return (
    <div className="overflow-x-auto">
           {/* Header */}
           <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <button
            onClick={() => {
              setFormData({ username: '', email: '', password: '' });
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add User
          </button>
        </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-frontier-dark-blue text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">S/N</th>
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {currentUsers.map((user, index) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100 transition"
            >
              <td className="py-3 px-6 text-left">
                {(currentPage - 1) * usersPerPage + index + 1}
              </td>
              <td className="py-3 px-6 text-left">{user.username}</td>
              <td className="py-3 px-6 text-left">{user.email || 'No email provided'}</td>
              <td className="py-3 px-6 text-left">
                <span
                  className={`py-1 px-3 rounded-full text-xs ${
                    user.active
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3 px-6 text-left flex space-x-4">
                <button
                  onClick={() => handleUpdateClick(user)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Total Records: <span className="font-semibold">{users.length}</span>
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-200'
            }`}
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? 'bg-gray-800 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-200'
            }`}
          >
            &raquo;
          </button>
        </div>
      </div>

    {/* Modal for Adding/Updating User */}
  {(isUpdateModalOpen || isAddModalOpen) && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isUpdateModalOpen ? 'Update User' : 'Add User'}
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {isAddModalOpen && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
                  Roles (comma-separated)
                </label>
                <input
                  type="text"
                  id="roles"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., USER_ROLE, ADMIN_ROLE"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
    </div>
  );
};

export default UserList;
