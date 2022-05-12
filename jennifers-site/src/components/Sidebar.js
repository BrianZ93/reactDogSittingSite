import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import { SidebarData } from './SideBarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: none;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position:fixed;
  z-index: 999;
`;

const NavIcon = styled(Link)`
  z-index: 1;
  margin-left: 2rem;
  font-size: 2.5rem;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgba(0, 212, 212, .9);
  &:hover {
    color: rgb(0, 212, 212);
    font-size: 2.8rem;
  }
`;

const NavIcon2 = styled(Link)`
  z-index: 999;
  margin-left: 2rem;
  font-size: 2.5rem;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: rgba(136, 155, 155, .9);
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 500ms;
  z-index: 999;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;



const Sidebar = () => {


  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Nav>
        <NavIcon to='#'>
          <FaIcons.FaBars onClick={showSidebar} />
        </NavIcon>
      </Nav>
        <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav sidebar={sidebar} onMouseLeave={showSidebar}>
          <SidebarWrap>
            <NavIcon2 to='#'>
              <GiIcons.GiSittingDog/>
            </NavIcon2>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};


export default Sidebar;