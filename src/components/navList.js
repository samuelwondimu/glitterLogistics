import {
  Dashboard,
  Anchor,
  Settings,
  People,
  Inventory2,
  Paid,
  Receipt
} from "@mui/icons-material";

export const navList = [
  {
    title: "Dashboard",
    path: "",
    icon: <Dashboard />,
  },
  {
    title: "Customers",
    path: "customers",
    icon: <People />,
  },
  {
    title: "Port",
    path: "port",
    icon: <Anchor />,
  },
  {
    title: "Operations",
    path: "operations",
    icon: <Settings />,
  },
  {
    title: "Invoice",
    path: "invoice",
    icon: <Receipt />,
  },
  {
    title: "Expense",
    path: "expense",
    icon: <Paid />,
  },
  {
    title: "Commodity",
    path: "commodity",
    icon: <Inventory2 />,
  },
];
