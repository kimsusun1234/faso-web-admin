import React from "react";
import { Link } from "react-router-dom";
import H from "history";
import { Menu } from "antd";
import { HomeRoute } from "routers/routes";
interface IMenuTabProps {
  location: H.Location;
}

export default class MenuTab extends React.Component<IMenuTabProps> {
  render() {
    return (   
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${this.props.location.pathname}`]}
          mode="horizontal"
          style={{width:'100%',position:'fixed', bottom:0,left:0, zIndex: 99999}}
        >
          {HomeRoute.map((route) => {
            return (
              <Menu.Item key={route.path}>
                <span>{route.name}</span>
                <Link to={route.path} />
              </Menu.Item>
            );
          })}
        </Menu>
    );
  }
}
