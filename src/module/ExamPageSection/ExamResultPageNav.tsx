import { Button, Grid, Group, Paper } from "@mantine/core";
import { Input, CloseButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";
import { Link } from "react-router-dom";
import AccessControl from "../../security/AccessControl";

const ExamResultPageNav = ({
  search,
  setSearch,
}: {
  search: {
    search: string;
    active: string;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{ search: string; active: string }>
  >;
}) => {
  return (
    <Paper mb="sm">
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 12, xs: 5, sm: 4 }}>
          <Input
            placeholder="Qidirish"
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
            <SegmentedControl
              data={[
                { label: "Active", value: "active" },
                { label: "Deactive", value: "deactive" },
              ]}
              defaultValue={search.active}
              onChange={(event) => {
                setSearch({ ...search, active: event });
              }}
              fullWidth
            />
            <AccessControl
              requiredPermissions={["write"]}
              requiredPrivileges={["manage_users"]}
            >
              <Link to="/class/add">
                <Button>Yangi Imtixon Qo'shish</Button>
              </Link>
            </AccessControl>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default ExamResultPageNav;
