// // // App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import EditUser from './components/EditUser';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false); 
    const [refreshList, setRefreshList] = useState(0);
    const [editing, setEditing] = useState(false);
    const [userIdToEdit, setUserIdToEdit] = useState(null); // Track the user being edited

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleAddUserClick = () => {
        setIsAddingUser(true); 
    };

    const handleCancelAddUser = () => {
        setIsAddingUser(false); 
    };

    const handleUserAdded = () => {
        setIsAddingUser(false); 
        setRefreshList(prev => prev + 1); 
    };

    const handleEditUser = (userId) => {
        setUserIdToEdit(userId); // Set the user ID to edit
        setEditing(true); // Enable editing mode
    };

    return (
        <Router>
            <div className="bg-pink-100 min-h-screen flex flex-col w-full">
                <header className="bg-cyan-600 text-white p-4 shadow-md">
                    <h1 className='text-3xl font-bold text-center'>User Management System</h1>
                </header>
                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/app" element={
                            isLoggedIn ? (
                                <>
                                    {editing ? (
                                        <EditUser 
                                            userId={userIdToEdit} 
                                            setEditing={setEditing} 
                                        />
                                    ) : isAddingUser ? (
                                        <UserForm 
                                            setEditing={setIsAddingUser} 
                                            refreshUserList={handleUserAdded} 
                                        />
                                    ) : (
                                        <UserTable 
                                            refreshList={refreshList}
                                            onAddUser={handleAddUserClick} 
                                            onEditUser={handleEditUser} // Pass the edit handler
                                        />
                                    )}
                                    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                                </>
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        } />
                    </Routes>
                </main>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; 2024 Application By SJ</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
