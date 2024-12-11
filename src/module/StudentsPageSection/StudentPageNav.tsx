import { Button, Grid, Group, Paper } from "@mantine/core";
import { useState } from "react";
import { Input, CloseButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";
import AccessControl from "../../security/AccessControl";
import { NavLink } from "react-router-dom";

const StudentPageNav = ({
  filter,
  setFilter,
}: {
  filter: {
    search: string;
    status: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{ search: string; status: string }>
  >;
}) => {
  const [active, setActive] = useState("active");

  return (
    <Paper mb="sm">
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12, xs: 5, sm: 4 }}>
          <Input
            placeholder="Search"
            value={filter?.search}
            onChange={(event) =>
              setFilter({ ...filter, search: event.target.value })
            }
            rightSectionPointerEvents="all"
            leftSection={<IconSearch size={18} />}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setFilter({ ...filter, search: "" })}
                style={{ display: filter.search ? undefined : "none" }}
              />
            }
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 7, sm: 8 }}>
          <Group justify="end" gap={"xs"}>
            <Button variant="filled" disabled color="yellow">
              Xabar Yuborish
            </Button>
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
              requiredPermissions={["read", "write"]}
              requiredPrivileges={["manage_users", "view_reports"]}
            >
              <NavLink to={"/students/add"}>
                <Button>Add new Student</Button>
              </NavLink>
            </AccessControl>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default StudentPageNav;
