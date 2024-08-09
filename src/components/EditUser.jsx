import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '/server/services/api';

const EditUser = ({ userId, setEditing }) => {
    const [user, setUser] = useState({ name: '', email: '', bio: '' });

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUser(userId);
            setUser(response);
        };

        fetchUser();
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateUser(userId, user);
        setEditing(false); // Close the edit form after updating
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex space-x-4">
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save
                </button>
                <button 
                    type="button" 
                    onClick={() => setEditing(false)} 
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditUser;

