import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppShellHeader from "../components/Nav/AppShellHeader";
import AppShellNavbar from "../components/Nav/AppShellNavbar";

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: { base: 60 } }}
        navbar={{
          width: { base: 200, md: 260 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <AppShellHeader opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar p="sm">
          <AppShellNavbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default AppLayout;
