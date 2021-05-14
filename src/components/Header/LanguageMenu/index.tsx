import React from "react";
import { Menu } from "antd";
import styles from "./styles";

interface IProps {}

const menus: string[] = ["EN", "ES"];

const LanguageMenu = (props: IProps) => (
  <Menu style={styles.menu}>{renderItem()}</Menu>
);

const renderItem = () => {
  return menus.map((element, index) => (
    <Menu.Item key={index} style={styles.menuItem}>
      <a href="/">{element}</a>
    </Menu.Item>
  ));
};

export default LanguageMenu;
