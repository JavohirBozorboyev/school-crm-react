import { Button, Grid, Group, Paper } from "@mantine/core";
import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

const AdminsPageNav = () => {
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
            <Button>Add new Admin</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default AdminsPageNav;
