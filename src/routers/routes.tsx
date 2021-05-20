import React from "react";
import {
  StaffPage,
  StaffDetailPage,
  ServicesPage,
  DashBoard,
  Calendar,
} from "pages";

interface IRoute {
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  key: string;
}
const HomeRoute: IRoute[] = [
  {
    key: "Dashboard",
    name: "Dashboard",
    path: "/dashboard",
    component: DashBoard,
  },
  { key: "User", name: "User", path: "/users", component: StaffPage },
  {
    key: "View Add New Staff",
    name: "View Add New Staff",
    path: "/staff/add",
    component: StaffDetailPage,
  },
  {
    key: "Items",
    name: "Items",
    path: "/items",
    component: ServicesPage,
  },
  {
    key: "calendar",
    name: "Calendar",
    path: "/calendar",
    component: Calendar,
  },
];

export { HomeRoute };
