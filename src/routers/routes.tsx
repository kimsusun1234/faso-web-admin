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
  { key: "Staff", name: "Staff", path: "/staff", component: StaffPage },
  {
    key: "View Add New Staff",
    name: "View Add New Staff",
    path: "/staff/add",
    component: StaffDetailPage,
  },
  {
    key: "Services",
    name: "Services",
    path: "/services",
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
