import {
  Title,
  Paper,
  Grid,
  TextInput,
  Input,
  Divider,
  PasswordInput,
  Select,
  MultiSelect,
  Flex,
  Button,
  Text,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUserStar } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";

const AddNewTeacherPage = () => {
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
        Yangi O'qtuvchi Qo'shish
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
                  mask="+\9\9\ 800 000 00 00"
                  placeholder="+99 890 123 45 67"
                  {...form.getInputProps("phone")}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Subject"
                placeholder="Subject"
                data={["React", "Angular", "Vue", "Svelte"]}
                withAsterisk
                {...form.getInputProps("subject")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <NumberInput
                placeholder="Experience"
                label="Experience"
                withAsterisk
                {...form.getInputProps("experience")}
              />
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

export default AddNewTeacherPage;
