import React from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

const MainContent = () => {
  return (
    <main id="site-main" className="flex-1 p-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="box-nav d-flex justify-between mb-4">
          <a href="/" className="border-shadow text-indigo-600 hover:text-indigo-900">
            <i className="fas fa-angle-double-left"></i> All Users
          </a>
        </div>
        <div className="form-title text-center mb-8">
          <h2 className="text-gray-900 text-2xl">New User</h2>
          <span className="text-gray-600 text-lg">Use the below form to create a new account</span>
        </div>
        <UserForm />
        <UserTable />
      </div>
    </main>
  );
};

export default MainContent;
