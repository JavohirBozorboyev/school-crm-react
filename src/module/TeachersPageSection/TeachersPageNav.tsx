import { Button, Grid, Group, Paper } from "@mantine/core";
import { useState } from "react";
import { Input, CloseButton } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";
import AccessControl from "../../security/AccessControl";
import { NavLink } from "react-router-dom";

const TeachersPageNav = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const [active, setActive] = useState("active");
  return (
    <Paper mb="sm">
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12, xs: 5, sm: 4 }}>
          <Input
            placeholder="Search"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
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
            <AccessControl
              requiredPermissions={["read"]}
              requiredPrivileges={["view_reports"]}
            >
              <SegmentedControl
                data={[
                  { label: "Active", value: "active" },
                  { label: "Deactive", value: "deactive" },
                ]}
                value={active}
                onChange={setActive}
                fullWidth
              />
            </AccessControl>

            <AccessControl
              requiredPermissions={["write"]}
              requiredPrivileges={["manage_users"]}
            >
              <NavLink to={"/teachers/add"}>
                <Button leftSection={<IconPlus size={17} />}>
                  O'qtuvchi Qo'shish
                </Button>
              </NavLink>
            </AccessControl>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default TeachersPageNav;
