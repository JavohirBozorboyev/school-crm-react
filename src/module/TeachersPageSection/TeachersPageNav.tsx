import { Button, Grid, Group, Paper } from "@mantine/core";
import { Input, CloseButton } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";
import AccessControl from "../../security/AccessControl";
import { NavLink } from "react-router-dom";

const TeachersPageNav = ({
  search,
  setSearch,
}: {
  search: {
    search: string;
    status: string;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{ search: string; status: string }>
  >;
}) => {
  return (
    <Paper mb="sm">
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12, xs: 5, sm: 4 }}>
          <Input
            placeholder="Search"
            value={search.search}
            onChange={(event) =>
              setSearch({ ...search, search: event.target.value })
            }
            rightSectionPointerEvents="all"
            leftSection={<IconSearch size={18} />}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setSearch({ ...search, search: "" })}
                style={{ display: search.search ? undefined : "none" }}
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
                defaultValue={search.status}
                onChange={(e) => setSearch({ ...search, status: e })}
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
