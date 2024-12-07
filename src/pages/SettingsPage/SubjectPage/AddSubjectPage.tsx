/* eslint-disable no-nonoctal-decimal-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Grid,
  MultiSelect,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";

const AddSubjectPage = () => {
  const { data, error, isLoading } = useSWR(`/api/teachers`);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      teachers: [],
    },

    validate: {
      title: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
    },
  });

  const SelectMap = data?.map(
    (item: { _id: any; firstname: string; lastname: string }) => {
      return {
        value: item._id,
        label: item.firstname + " " + item.lastname,
      };
    }
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const AddNewAdmin = async (data: any) => {
    console.log(data);

    setLoading(true);
    try {
      const res = await axios.post("/api/subjects", data);
      console.log(res);

      if (res.status == 201) {
        notifications.show({
          title: "Yangi Fan Qo'shildi",
          message: "",
          withBorder: true,
        });
        setLoading(false);
        navigate("/settings/subjects");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <Title order={3} tt={"uppercase"}>
        Yangi Fan qo'shish
      </Title>
      <form onSubmit={form.onSubmit((e) => AddNewAdmin(e))}>
        <Paper withBorder p={"md"} mt={"xl"}>
          <Text mb={"sm"} c={"dimmed"}>
            Fan malumotlarini to'ldiring.
          </Text>
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                placeholder="Fan nomi"
                label="Fan nomi"
                withAsterisk
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
              <MultiSelect
                label="O'qtuvchilar tanlash"
                placeholder="o'qtuvchilar"
                data={SelectMap}
                {...form.getInputProps("teachers")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Button
                type="submit"
                variant="filled"
                leftSection={<IconPlus size={17} />}
                loading={loading}
                mt={"lg"}
              >
                Yangi fan qo'shish
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default AddSubjectPage;
