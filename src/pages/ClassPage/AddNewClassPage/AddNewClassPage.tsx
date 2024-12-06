/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Title,
  Paper,
  Grid,
  TextInput,
  Divider,
  Select,
  Flex,
  Button,
  Text,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconSchool } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

interface TeacherFormData {
  title: string;
  teacher: string | null;
  subjectTeacher: string[];
}

const AddNewClassPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: teacher } = useSWR("/api/teachers");

  const teacherSellectData = teacher?.map(
    (item: { _id: string; firstname: string; lastname: string }) => {
      return { value: item._id, label: item.firstname + " " + item.lastname };
    }
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      teacher: null,
      subjectTeacher: [],
    },

    validate: {
      title: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
    },
  });

  const AddNewClass = async (data: TeacherFormData) => {
    console.log(data);

    setLoading(true);
    try {
      const res = await axios.post("/api/groups", data);
      if (res.status == 201) {
        notifications.show({
          title: "Yangi Sinf Qo'shildi",
          message: "",
          withBorder: true,
        });
        setLoading(false);
        navigate("/class");
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        notifications.show({
          title: "Xatolik",
          message: "",
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
        Yangi Sinf Qo'shish
      </Title>
      <form
        onSubmit={form.onSubmit((values: TeacherFormData) =>
          AddNewClass(values)
        )}
      >
        <Paper withBorder p={"md"} mt={"md"}>
          <Text mb={"sm"}>O'qtuvchi Malumotlari</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Sinf nomini kiriting"
                label="Sinf nomi"
                withAsterisk
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Sinf rahbar"
                placeholder="Sinf rahbar"
                data={teacherSellectData}
                {...form.getInputProps("teacher")}
                searchable
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <MultiSelect
                label="SPES Fan ustozlari"
                placeholder="Bir nechta ustozlarni tanlang"
                data={teacherSellectData}
                {...form.getInputProps("subjectTeacher")}
              />
            </Grid.Col>
          </Grid>
          <Divider my={"md"} />

          <Flex mt={"xl"} justify={"flex-end"}>
            <Button
              type="submit"
              variant="filled"
              leftSection={<IconSchool size={17} />}
              loading={loading}
            >
              Yangi Sinf Qo'shish
            </Button>
          </Flex>
        </Paper>
      </form>
    </div>
  );
};

export default AddNewClassPage;