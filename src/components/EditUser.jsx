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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <textarea
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
    );
};

export default EditUser;
