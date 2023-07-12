import React from 'react'
import * as FaIcons from 'react-icons/fa' 

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'Add Dealer',
        path: '/addDealer',
        icon: <FaIcons.FaUsers />
    },
    {
        title: 'Find a Dealer',
        path: '/dealers',
        icon: <FaIcons.FaTasks />
    },
    {
        title: 'Services',
        path: '/services',
        icon: <FaIcons.FaRocketchat />
    },
    {
        title: 'Help Desk',
        path: '/helpdesk',
        icon: <FaIcons.FaRegChartBar />
    }
]

