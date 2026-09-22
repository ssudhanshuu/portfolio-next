"use client";

import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminDeshbord() {
 
  return (
    <div className='flex md:flex-row flex-col'>
      <AdminSidebar />
      <div className='flex-1 p-4'>
        
          <h1>this is my AdminDeshbord</h1>
      </div>  

    </div>
  )
}
