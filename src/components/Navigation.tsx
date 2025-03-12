import React from "react";
import { Menu, Home, Settings, LogIn } from "lucide-react";

export function Navigation() {
  return (
    <nav className='bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg text-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16 items-center'>
          <div className='flex items-center space-x-4'>
            <Menu className='h-6 w-6' />
            <span className='text-xl font-bold'>AI News Digest</span>
          </div>
          <div className='flex items-center space-x-6'>
            <button className='flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20'>
              <Home className='h-5 w-5' />
              <span>Home</span>
            </button>
            <button className='flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20'>
              <Settings className='h-5 w-5' />
              <span>Settings</span>
            </button>
            <button className='flex items-center space-x-1 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100'>
              <LogIn className='h-5 w-5' />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
