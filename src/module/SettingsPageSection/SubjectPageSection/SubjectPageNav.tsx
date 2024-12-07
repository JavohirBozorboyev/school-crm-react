import { Paper, Grid, Group, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import AccessControl from "../../../security/AccessControl";
import { IconPlus } from "@tabler/icons-react";

const SubjectPageNav = () => {
  return (
    <>
      <Paper mb="sm">
        <Grid justify="center" align="center">
          <Grid.Col span={{ base: 12 }}>
            <Group justify="end" gap={"xs"}>
              <AccessControl
                requiredPermissions={["read", "write", "delete", "update"]}
                requiredPrivileges={[
                  "manage_users",
                  "view_reports",
                  "manage_roles",
                  "manage_permissions",
                ]}
              >
                <Link to={"/settings/subjects/add"}>
                  {" "}
                  <Button leftSection={<IconPlus size={17} />}>
                    Yangi fan qo'shish
                  </Button>
                </Link>
              </AccessControl>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default SubjectPageNav;
