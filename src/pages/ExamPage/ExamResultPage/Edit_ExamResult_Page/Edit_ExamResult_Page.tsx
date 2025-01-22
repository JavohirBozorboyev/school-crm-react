import {
  Box,
  Grid,
  MultiSelect,
  TextInput,
  Title,
  Text,
  Flex,
  Button,
  NumberInput,
} from "@mantine/core";

interface Group {
  groupInfo: { title: string };
  subjects: { title: string; _id: string }[];
  teachers: {
    _id: string;
    firstname: string;
    subject: { title: string; _id: string };
  }[];
  _id: string;
}
import { useRef } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Edit_ExamResult_Card from "../../../../module/ExamPageSection/Edit_ExamResult_Section/Edit_ExamResult_Card";

const Edit_ExamResult_Page = () => {
  const { id } = useParams();
  const { data: groups } = useSWR("/api/groups/three");
  const { data: subjects } = useSWR("/api/subjects");
  const { data: teachers } = useSWR("/api/teachers");
  const {
    data: examResults,
    error,
    isLoading,
  } = useSWR(`/api/exam/exam-results/${id}`);
  const title = useRef<HTMLInputElement>(null);
  const ball = useRef<HTMLInputElement>(null);

  const SellectChangeGroup = groups?.map(
    (group: { title: string; _id: string }) => ({
      value: group._id,
      label: group.title,
    })
  );

  const defaultClassValue = examResults?.group.map(
    (item: { groupInfo: { _id: string } }) => item?.groupInfo?._id
  );

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div>
      <Title order={3}>Imtixonni Taxrirlash</Title>
      <Grid mt={"lg"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 3 }}>
          <TextInput
            label="Imtixon sarlavhasi"
            placeholder="Sarlavha kiriting"
            withAsterisk
            ref={title}
            defaultValue={examResults?.title}
            variant="filled"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 1 }}>
          <NumberInput
            label="Ball"
            placeholder="Ball"
            withAsterisk
            ref={ball}
            variant="filled"
            defaultValue={examResults?.maxScore}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 7, xl: 8 }}>
          <MultiSelect
            label="Sinflarni tanlang"
            placeholder="Sinflar"
            data={SellectChangeGroup}
            defaultValue={defaultClassValue}
            clearable
            withAsterisk
            variant="filled"
          />
        </Grid.Col>
      </Grid>

      <Box mt={"md"}>
        {
          <Box>
            <Text size="lg" mb={"md"} c={"teal"}>
              Tanlagan sinflar:
            </Text>
            {examResults?.group?.map((group: Group) => (
              <Edit_ExamResult_Card
                key={group?._id}
                group={group}
                subjects={subjects}
                teachers={teachers}
              />
            ))}
          </Box>
        }
      </Box>
      <Flex justify={"flex-end"} mt={"xl"}>
        <Button>Saqlash</Button>
      </Flex>
    </div>
  );
};

export default Edit_ExamResult_Page;
