import {
  IconCreditCard,
  IconHome,
  IconSchool,
  IconSettings,
  IconUserHexagon,
  IconUsers,
} from "@tabler/icons-react";

const AdminNavUrlData = [
  {
    name: "Dashboard",
    url: "/",
    icon: <IconHome size={"16px"} />,
  },
  {
    name: "Finance",
    url: "/finance",
    icon: <IconCreditCard size={"16px"} />,
  },
  {
    name: "Class",
    url: "/class",
    icon: <IconSchool size={"16px"} />,
    opened: true,
    sub: [
      {
        name: "Class",
        url: "/class",
      },
    ],
  },
  {
    name: "Student",
    url: "/students",
    icon: <IconUsers size={"16px"} />,
    opened: true,
    sub: [
      {
        name: "Student",
        url: "/students",
      },
    ],
  },
  {
    name: "Teachers",
    url: "/teachers",
    icon: <IconUserHexagon size={"16px"} />,
    opened: true,
    sub: [
      {
        name: "Teachers",
        url: "/teachers",
      },
    ],
  },
  {
    name: "Settings",
    url: "/settings",
    icon: <IconSettings size={"16px"} />,
    opened: true,
    sub: [
      {
        name: "Accounts",
        url: "/settings/accounts",
      },
    ],
  },
];

export default AdminNavUrlData;
