import React, { useState, useEffect } from 'react';
import { createUser, getUser, updateUser } from '/server/services/api'; 

const UserForm = ({ userId, setEditing, refreshUserList }) => {
    const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const response = await getUser(userId);
                    setFormData(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    alert("An error occurred while fetching user data.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userId) {
                await updateUser(userId, formData);
                alert("Data Updated Successfully!");
            } else {
                await createUser(formData);
                alert("Data Inserted Successfully!");
            }
            refreshUserList(); 
            setEditing(false); 
        } catch (error) {
            console.error("Error submitting user data:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-md">
            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
            </div>
            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
            </div>
            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => setEditing(false)} 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default UserForm;
