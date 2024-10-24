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
    name: "Asosiy Sahifa",
    url: "/",
    icon: <IconHome size={"16px"} />,
  },
  {
    name: "Moliya",
    url: "/finance",
    icon: <IconCreditCard size={"16px"} />,
    sub: [
      {
        name: "To'lov Malumotlari",
        url: "/finance",
      },
      {
        name: "To'lov Qilish",
        url: "/finance/payment",
      },
    ],
  },
  {
    name: "Sinflar",
    url: "/class",
    icon: <IconSchool size={"16px"} />,
  },
  {
    name: "O'quvchilar",
    url: "/students",
    icon: <IconUsers size={"16px"} />,
  },
  {
    name: "O'qtuvchilar",
    url: "/teachers",
    icon: <IconUserHexagon size={"16px"} />,
  },
  {
    name: "Sozlamalar",
    url: "/settings",
    icon: <IconSettings size={"16px"} />,

    sub: [
      {
        name: "Accounts",
        url: "/settings/accounts",
      },
    ],
  },
];

export default AdminNavUrlData;
