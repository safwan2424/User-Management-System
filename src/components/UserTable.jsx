import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '/server/services/api'; 
import UserRow from './UserRow';

const UserTable = ({ setEditing, setUserId, onAddUser, refreshList }) => {
    const [users, setUsers] = useState([]);

    // Load users whenever refreshList changes
    useEffect(() => {
        loadUsers();
    }, [refreshList]);

    const loadUsers = async () => {
        try {
            const response = await getUsers();
            console.log('Fetched users:', response.data); 
            setUsers(response.data || []);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Do you really want to delete this record?')) {
            try {
                await deleteUser(id);
                loadUsers(); 
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div>
            <button
                onClick={onAddUser}
                className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                Add New User
            </button>

            <table className="min-w-full divide-y divide-gray-200 bg-gray-400">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <UserRow
                                key={user._id}
                                user={user}
                                onEdit={() => { setUserId(user._id); setEditing(true); }}
                                onDelete={() => handleDelete(user._id)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
