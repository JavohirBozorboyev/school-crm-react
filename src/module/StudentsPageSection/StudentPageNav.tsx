import { Button, Grid, Group, Paper } from "@mantine/core";
import { useState } from "react";
import { Input, CloseButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";

const StudentPageNav = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("active");
  return (
    <Paper mb="sm">
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12, xs: 5, sm: 4 }}>
          <Input
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            leftSection={<IconSearch size={18} />}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setSearch("")}
                style={{ display: search ? undefined : "none" }}
              />
            }
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 7, sm: 8 }}>
          <Group justify="end" gap={"xs"}>
            <Button variant="filled" disabled color="yellow" >Xabar Yuborish</Button>
            <SegmentedControl
              data={[
                { label: "Active", value: "active" },
                { label: "Deactive", value: "deactive" },
              ]}
              value={active}
              onChange={setActive}
              fullWidth
            />
            <Button>Add new Student</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default StudentPageNav;
