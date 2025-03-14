import {
  IconHome,
  IconSchool,
  IconSettings,
  IconTextCaption,
  IconUserHexagon,
  IconUsers,
} from "@tabler/icons-react";

const AdminNavUrlData = [
  {
    name: "Asosiy Sahifa",
    url: "/",
    icon: <IconHome size={"16px"} />,
    role: "teacher",
  },
  // {
  //   name: "Moliya",
  //   url: "/finance",
  //   icon: <IconCreditCard size={"16px"} />,
  //   sub: [
  //     {
  //       name: "To'lov Malumotlari",
  //       url: "/finance",
  //     },
  //     {
  //       name: "To'lov Qilish",
  //       url: "/finance/payment",
  //     },
  //   ],
  // },
  {
    name: "Sinflar",
    url: "/class",
    icon: <IconSchool size={"16px"} />,
    role: "teacher",
  },
  {
    name: "O'quvchilar",
    url: "/students",
    icon: <IconUsers size={"16px"} />,
    role: "admin",
  },
  {
    name: "O'qtuvchilar",
    url: "/teachers",
    icon: <IconUserHexagon size={"16px"} />,
    role: "teacher",
  },
  // {
  //   name: "Xodimlar",
  //   url: "/employees",
  //   icon: <IconUserCircle size={"16px"} />,
  // },
  {
    name: "Imtixonlar",
    icon: <IconTextCaption size={"16px"} />,
    url: "/exam",
    role: "teacher",
    sub: [
      {
        name: "Imtixon Natijalari",
        url: "/exam/exam-results",
        role: "teacher",
      },
      {
        name: "Ratings",
        url: "/exam/ratings",
        role: "teacher",
      },
    ],
  },
  {
    name: "Ratings",
    icon: <IconTextCaption size={"16px"} />,
    url: "/ratings",
    role: "teacher",
    sub: [
      {
        name: "Rating",
        url: "/ratings",
        role: "teacher",
      },
      {
        name: "Top Students",
        url: "/ratings/top",
        role: "teacher",
      },
      {
        name: "Top Subjects",
        url: "/ratings/subjects",
        role: "teacher",
      },
    ],
  },
  {
    name: "Sozlamalar",
    url: "/settings",
    icon: <IconSettings size={"16px"} />,
    role: "admin",
    sub: [
      // {
      //   name: "Accounts",
      //   url: "/settings/accounts",
      // },
      {
        name: "Adminlar",
        url: "/settings/admins",
        role: "admin",
      },
      {
        name: "Fanlar",
        url: "/settings/subjects",
        role: "admin",
      },
    ],
  },
];

export default AdminNavUrlData;
