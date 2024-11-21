import {
  Divider,
  Grid,
  Input,
  MultiSelect,
  Paper,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IMaskInput } from "react-imask";

const AddAdminPage = () => {
  return (
    <div>
      <Title order={3} tt={"uppercase"}>
        Yangi Admin Qo'shish
      </Title>
      <Paper withBorder p={"md"} mt={"md"}>
        <Text mb={"sm"}>Admin Malumotlari</Text>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <TextInput placeholder="Admin Ismi" label="Ism" withAsterisk />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <TextInput
              placeholder="Admin Familiyasi"
              label="Familiya"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <TextInput placeholder="Passport" label="Passport" withAsterisk />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Input.Wrapper label="Telefon raqam" withAsterisk>
              <Input
                component={IMaskInput}
                mask="+\9\9\8 (00) 000-00-00"
                placeholder="+998 (90) 123-45-67"
                // defaultValue={"+998"}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
        <Divider my={"md"} />
        <Text mb={"sm"}>Tizimga Kirish Malumotlari</Text>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <TextInput
              placeholder="Admin Email"
              label="Email"
              withAsterisk
              autoComplete="off"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <PasswordInput
              placeholder="Admin Paroli"
              label="Parol"
              withAsterisk
              autoComplete="off"
            />
          </Grid.Col>
        </Grid>
        <Divider my={"md"} />
        <Text mb={"sm"}>Admin Roles</Text>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Select
              label="Role"
              placeholder="Admin Or SupperAdmin"
              data={[
                { value: "admin", label: "Admin" },
                { value: "supperadmin", label: "SupperAdmin" },
              ]}
              defaultValue={"admin"}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <MultiSelect
              label="Permissions"
              data={["read", "write", "delete", "update"]}
              defaultValue={["read"]}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
            <MultiSelect
              label="Privileges"
              data={[
                "view_reports",
                "manage_users",
                "manage_roles",
                "manage_permissions",
              ]}
              defaultValue={["view_reports"]}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddAdminPage;
