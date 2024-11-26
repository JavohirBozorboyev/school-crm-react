import {
  Title,
  Paper,
  Grid,
  TextInput,
  Input,
  Divider,
  PasswordInput,
  Select,
  Flex,
  Button,
  Text,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUserHexagon } from "@tabler/icons-react";
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
      subject: "",
      experience: null,
      role: "teacher",
    },

    validate: {
      firstname: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      lastname: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      phone: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      passport: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      role: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      subject: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      experience: (value) => (value == null ? "Malumot yetarli emas" : null),

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email xato"),
      password: (value) => (value.length == 0 ? "Malumot yetarli emas" : null),
    },
  });

  const AddNewTeacher = async (data: any) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/teachers", {
        ...data,
        role: "teacher",
      });
      if (res.status == 201) {
        notifications.show({
          title: "Yangi O'qtuvchi Qo'shildi",
          message: "",
          withBorder: true,
        });
        setLoading(false);
        navigate("/teachers");
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
      <form onSubmit={form.onSubmit((e) => AddNewTeacher(e))}>
        <Paper withBorder p={"md"} mt={"md"}>
          <Text mb={"sm"}>O'qtuvchi Malumotlari</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Ism"
                label="Ism"
                withAsterisk
                {...form.getInputProps("firstname")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Familiyas"
                label="Familiya"
                withAsterisk
                {...form.getInputProps("lastname")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Passport"
                label="Passport"
                maxLength={9}
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
                maxLength={2}
                {...form.getInputProps("experience")}
              />
            </Grid.Col>
          </Grid>
          <Divider my={"md"} />
          <Text mb={"sm"}>Tizimga kirish malumotlari.</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Email"
                label="Email"
                withAsterisk
                autoComplete="off"
                name="adminEmail"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <PasswordInput
                placeholder="Paroli"
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
              leftSection={<IconUserHexagon size={17} />}
              loading={loading}
            >
              Yangi O'qtuvchi Qo'shish
            </Button>
          </Flex>
        </Paper>
      </form>
    </div>
  );
};

export default AddNewTeacherPage;
