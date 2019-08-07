// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Echarts from "views/Echarts";
import OriginNotifications from 'views/OriginNotifications';
import Users from "views/Users";
import Menus from 'views/Menus';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "仪表盘",
    icon: "fa-tachometer-alt",
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "用户",
    icon: "fa-user-tie",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "表格",
    icon: "fa-table",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "标题",
    icon: "fa-heading",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "图标",
    icon: "fa-icons",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "通知",
    icon: "fa-bell",
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/echarts",
    name: "Echarts",
    icon: "fa-chart-area",
    component: Echarts,
    layout: "/admin"
  },
  {
    path: "/origin",
    name: "原生",
    icon: "fa-drafting-compass",
    component: OriginNotifications,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "用户管理",
    icon: "fa-users",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/menus",
    name: "菜单管理",
    icon: "fa-list",
    component: Menus,
    layout: "/admin"
  }
];

export default dashboardRoutes;
