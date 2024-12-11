/* eslint-disable no-nonoctal-decimal-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Divider,
  Flex,
  Grid,
  Input,
  MultiSelect,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUsers } from "@tabler/icons-react";
import axios from "axios";
import { IMaskInput } from "react-imask";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";

const AddNewStudentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: subject, error: error1 } = useSWR("/api/subjects");
  const { data: groups, error: error2 } = useSWR("/api/groups");

  const SubjectSellectData = subject?.map(
    (item: { _id: string; title: string }) => {
      return { value: item._id, label: item.title };
    }
  );

  const GroupsSellectData = groups?.map(
    (item: { _id: string; title: string }) => {
      return { value: item._id, label: item.title };
    }
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullname: "",
      phone: "",
      passport: "",
      group: [],
      subjects: [],
      address: "",
      father: "",
      mother: "",
      fatherPhone: "",
      motherPhone: "",
    },

    validate: {
      fullname: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      phone: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      passport: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      father: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
      mother: (value) => (value.length < 2 ? "Malumot yetarli emas" : null),
    },
  });

  const AddNewStudent = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/students", data);
      if (res.status == 201) {
        notifications.show({
          title: "Yangi O'quvchi Qo'shildi",
          message: "",
          withBorder: true,
        });
        setLoading(false);
        navigate("/students");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (error1 || error2) return <div>Error yuklashda xatolik yuz berdi!</div>;
  return (
    <div>
      <Title order={3} tt={"uppercase"}>
        Yangi O'quvchi Qo'shish
      </Title>
      <form onSubmit={form.onSubmit((e) => AddNewStudent(e))}>
        <Paper withBorder p={"md"} mt={"md"}>
          <Text mb={"sm"}>O'quvchi Malumotlari</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <TextInput
                placeholder="Ism Familiya"
                label="Ism Familiya"
                withAsterisk
                {...form.getInputProps("fullname")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <TextInput
                placeholder="Passport"
                label="Passport"
                withAsterisk
                {...form.getInputProps("passport")}
                max={9}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <Select
                label="Sinf Tanlang"
                placeholder="Sinf"
                withAsterisk
                data={GroupsSellectData}
                {...form.getInputProps("group")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <Input.Wrapper label="Telefon raqam">
                <Input
                  component={IMaskInput}
                  mask="+\9\9\8 90 000 00 00"
                  placeholder="+998 90 000 00 00"
                  {...form.getInputProps("phone")}
                  {...form.getInputProps("phone")}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 8, xl: 6 }}>
              <MultiSelect
                label="Iqtisoslik fanlari"
                placeholder="Fanlar"
                data={SubjectSellectData}
                {...form.getInputProps("subjects")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 12, xl: 6 }}>
              <TextInput
                placeholder="Manzil"
                label="To'liq manzil"
                {...form.getInputProps("passport")}
                {...form.getInputProps("address")}
              />
            </Grid.Col>
          </Grid>

          <Divider my={"md"} />
          <Text mb={"sm"}>Ota-Ona Malumotlari</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <TextInput
                placeholder="Ota Ism Familiya"
                label="Ota Ism Familiyas"
                withAsterisk
                {...form.getInputProps("father")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <Input.Wrapper label="Ota Telefon raqami">
                <Input
                  component={IMaskInput}
                  mask="+\9\9\8 90 000 00 00"
                  placeholder="+998 90 000 00 00"
                  {...form.getInputProps("fatherPhone")}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <TextInput
                placeholder="Ona Ism Familiya"
                label="Ona Ism Familiyas"
                withAsterisk
                {...form.getInputProps("mother")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <Input.Wrapper label="Ona Telefon raqami">
                <Input
                  component={IMaskInput}
                  mask="+\9\9\8 90 000 00 00"
                  placeholder="+998 90 000 00 00"
                  {...form.getInputProps("motherPhone")}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>

          <Flex mt={"xl"} justify={"flex-end"}>
            <Button
              type="submit"
              variant="filled"
              leftSection={<IconUsers size={17} />}
              loading={loading}
            >
              Yangi O'quvchi Qo'shish
            </Button>
          </Flex>
        </Paper>
      </form>
    </div>
  );
};

export default AddNewStudentPage;
