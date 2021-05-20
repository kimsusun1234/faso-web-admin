import React from "react";
import { Link } from "react-router-dom";
import H from "history";
import { Layout, Menu } from "antd";
import { CalendarFilled, ContactsFilled, DashboardFilled, DatabaseFilled } from "@ant-design/icons";
const { Sider } = Layout;
interface IMenuSiderProps {
  collapsed: boolean;
  onCollapse?: (collapsed: boolean) => void;
  location: H.Location;
}

export default class MenuSider extends React.Component<IMenuSiderProps> {
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
      >
        {/* <div style={logoStyle} /> */}
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${this.props.location.pathname}`]}
          mode="inline"
        >
          {menuList.map((route) => {
            return (
              <Menu.Item key={route.path} icon={route.icon}>
                <span>{route.name}</span>
                <Link to={route.path} />
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

const logoStyle = {
  height: '32px',
  margin: '16px',
  background: 'rgba(255, 255, 255, 0.3)'
}

const iconStyle = { fontSize: '20px' }
const menuList = [
  { name: 'Dashboard', path: '/dashboard', icon: <DashboardFilled style={iconStyle} /> },
  { name: 'User', path: '/users', icon: <ContactsFilled style={iconStyle} /> },
  { name: 'Item', path: '/items', icon: <DatabaseFilled style={iconStyle} /> },
  // { name: 'Calendar', path: '/calendar', icon: <CalendarFilled style={iconStyle} /> }
]
