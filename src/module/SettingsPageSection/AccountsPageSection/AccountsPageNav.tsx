import { Button, Grid, Group, Paper } from "@mantine/core";
import { useState } from "react";
import { SegmentedControl } from "@mantine/core";
import AccessControl from "../../../security/AccessControl";

const AccountsPageNav = () => {
  const [active, setActive] = useState("active");
  return (
    <Paper mb="sm">
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12 }}>
          <Group justify="end" gap={"xs"}>
            <SegmentedControl
              data={[
                { label: "Active", value: "active" },
                { label: "Deactive", value: "deactive" },
              ]}
              value={active}
              onChange={setActive}
              fullWidth
            />
            <AccessControl
              requiredPermissions={["read", "write", "delete", "update"]}
              requiredPrivileges={[
                "manage_users",
                "view_reports",
                "manage_roles",
                "manage_permissions",
              ]}
            >
              <Button>Add new Employee</Button>
            </AccessControl>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AccountsPageNav;
