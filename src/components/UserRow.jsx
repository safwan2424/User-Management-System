import React from 'react';

const UserRow = ({ user, onEdit, onDelete }) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.bio}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={onDelete} className="ml-4 text-red-500 hover:text-red-700">Delete</button>
            </td>
        </tr>
    );
};

export default UserRow;

