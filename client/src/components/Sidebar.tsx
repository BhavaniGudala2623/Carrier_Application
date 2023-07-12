import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'
import { SidebarData } from './SidebarData';
import { useAuth } from '../auth/AuthContext';

const Navbar = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3.5rem;
    background-color: #000080;
    justify-content: space-between;
    padding: 0 1rem;
`
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const RightMenuLink = styled(Link)`
  margin-left: 1rem;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const MenuIconOpen = styled(Link)`
    display: flex;
    justify-content: start;
    font-size: 1.5rem;
    margin-left: 2rem;
    color: #ffffff;
`

const MenuIconClose = styled(Link)`
    display: flex;
    justify-content: end;
    font-size: 1.5rem;
    margin-top: 0.75rem;
    margin-right: 1rem;
    color: #ffffff;
`

const SidebarMenu = styled.div<{ close: boolean }>`
    width: 230px;
    height: 100vh;
    background-color: #000080;
    
    position: fixed;
    top: 0;
    left: ${({ close }) => close ? '0' : '-100%'};
    transition: .6s;
`

const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 50px;
    padding: 1rem 0 1.25rem;
`

const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #ffffff;
        color: #000080;
        width: 100%;
        height: 45px;
        text-align: center;
        border-radius: 3px;
        margin: 0rem;
    }
`

const Sidebar: React.FunctionComponent = () => {
    const [close, setClose] = useState(false)
    const showSidebar = () => setClose(!close)
    const { isAuthenticated } = useAuth();
    const { handleLogout } = useAuth();
    return (
        <>
            <Navbar >
                <MenuIconOpen to="#" onClick={showSidebar}>
                    <FaIcons.FaBars />
                </MenuIconOpen>
                <RightMenu>
                    <img src={'https://images.carriercms.com/image/upload/h_150,q_100,f_auto/v1573562016/common/logos/carrier-corp-logo.png'} alt={'carrier-logo'} height={'30px'}></img>
                    <RightMenuLink to="/register">Register</RightMenuLink>
                    {!isAuthenticated ? <RightMenuLink to="/">Login</RightMenuLink> : 
                    <RightMenuLink to="/" onClick={handleLogout}>Logout</RightMenuLink>
                    }
                </RightMenu>
            </Navbar>

            <SidebarMenu close={close}>
                <MenuIconClose to="#" onClick={showSidebar}>
                    <FaIcons.FaTimes />
                </MenuIconClose>

                {SidebarData.map((item, index) => {
                    return (
                        <MenuItems key={index}>
                            <MenuItemLinks to={item.path}>
                                {item.icon}
                                <span style={{ marginLeft: '16px' }}>{item.title}</span>
                            </MenuItemLinks>
                        </MenuItems>
                    )
                })}
            </SidebarMenu>
        </>
    )
}

export default Sidebar
