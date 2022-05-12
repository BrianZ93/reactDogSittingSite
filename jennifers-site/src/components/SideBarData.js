import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Services',
    path: '/services',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Dog Sitting',
        path: '/services',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'

      },
      {
        title: 'Pick Up/Drop Off',
        path: '/services',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Extended Stays',
        path: '/services',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Contact Us',
    path: '/contactus',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <IoIcons.IoMdPeople />
  },
];