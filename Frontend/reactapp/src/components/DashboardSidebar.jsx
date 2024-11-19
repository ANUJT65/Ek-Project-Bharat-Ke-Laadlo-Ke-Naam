import React from 'react'
import SidebarButton from './SidebarButton'

const DashboardSidebar = () => {
  return (
    <div className='flex flex-col bg-[#F4F4F8] py-5 w-1/5 min-h-screen border-r border-[#BEBEBE]'>
        <div className='text-3xl font-bold text-[#2F4550] pl-5 pb-5'>Gram-Shiksha</div>
        <hr className='border border-[#BEBEBE]'></hr>
        <div className='flex flex-col px-5 mt-5'>
            <div>MAIN MENU</div>
            <SidebarButton name='Dashboard' />
            <SidebarButton name='Calendar' />
            <SidebarButton name='Teams' />
            <SidebarButton name='Resources' />
        </div>
    </div>
  )
}

export default DashboardSidebar