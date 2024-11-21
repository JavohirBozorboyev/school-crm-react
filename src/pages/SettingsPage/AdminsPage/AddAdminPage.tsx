import {
  Button,
  Divider,
  Flex,
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
import { useForm } from "@mantine/form";
import { IconUserStar } from "@tabler/icons-react";
import axios from "axios";
import { IMaskInput } from "react-imask";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddAdminPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      passport: "",
      email: "",
      password: "",
      role: "admin",
      privileges: ["view_reports"],
      permissions: ["read"],
    },

    validate: {
      firstname: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      lastname: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      phone: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      passport: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      role: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      privileges: (value) =>
        value.length == 0 ? "Malumot yetarli emas" : null,
      permissions: (value) =>
        value.length == 0 ? "Malumot yetarli emas" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length == 0 ? "Malumot yetarli emas" : null),
    },
  });

  const AddNewAdmin = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admins", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(res.status);

      if (res.status == 201) {
        notifications.show({
          title: "Yangi Admin Qo'shildi",
          message: "",
          withBorder: true,
        });
        setLoading(false);
        navigate("/settings/admins");
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        notifications.show({
          title: "Xatolik",
          message: "Bu email bilan admin allaqachon mavjud:",
          withBorder: true,
          color: "red",
          autoClose: 5000,
        });
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <Title order={3} tt={"uppercase"}>
        Yangi Admin Qo'shish
      </Title>
      <form onSubmit={form.onSubmit((e) => AddNewAdmin(e))}>
        <Paper withBorder p={"md"} mt={"md"}>
          <Text mb={"sm"}>Admin Malumotlari</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Admin Ismi"
                label="Ism"
                withAsterisk
                {...form.getInputProps("firstname")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Admin Familiyasi"
                label="Familiya"
                withAsterisk
                {...form.getInputProps("lastname")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Passport"
                label="Passport"
                withAsterisk
                {...form.getInputProps("passport")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Input.Wrapper label="Telefon raqam" withAsterisk>
                <Input
                  component={IMaskInput}
                  mask="+\9\9\8 (00) 000-00-00"
                  placeholder="+998 (90) 123-45-67"
                  {...form.getInputProps("phone")}
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
                name="adminEmail"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <PasswordInput
                placeholder="Admin Paroli"
                label="Parol"
                withAsterisk
                autoComplete="off"
                name="adminPassword"
                {...form.getInputProps("password")}
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
                {...form.getInputProps("role")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <MultiSelect
                label="Permissions"
                data={["read", "write", "delete", "update"]}
                defaultValue={["read"]}
                withAsterisk
                {...form.getInputProps("permissions")}
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
                {...form.getInputProps("privileges")}
              />
            </Grid.Col>
          </Grid>
          <Flex mt={"xl"} justify={"flex-end"}>
            <Button
              type="submit"
              variant="filled"
              leftSection={<IconUserStar size={17} />}
              loading={loading}
            >
              Yangi Admin Qo'shish
            </Button>
          </Flex>
        </Paper>
      </form>
    </div>
  );
};

export default AddAdminPage;
