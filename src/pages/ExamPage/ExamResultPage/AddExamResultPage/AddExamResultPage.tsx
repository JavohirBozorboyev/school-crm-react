import { Box, Grid, MultiSelect, TextInput, Title, Text } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import AddExamResultCard from "../../../../module/ExamPageSection/AddExamResultCard/AddExamResultCard";

const AddExamResultPage = () => {
  const { data: groups, error, isLoading } = useSWR("/api/groups/three");
  const { data: subjects } = useSWR("/api/subjects");
  const { data: teachers } = useSWR("/api/teachers");
  const [groupValue, setGroupValue] = useState<string[]>([]);

  const [examResult, setExamResult] = useState([]);
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  const SellectChangeGroup = groups?.map(
    (group: { title: string; _id: string }) => ({
      value: group._id,
      label: group.title,
    })
  );

  const subjectSellectData = subjects?.map(
    (item: { _id: string; title: string }) => {
      return { value: item._id, label: item.title };
    }
  );
  const teacherSellectData = teachers?.map(
    (item: {
      _id: string;
      firstname: string;
      lastname: string;
      subject: {
        title: string;
      };
    }) => {
      return {
        value: item._id,
        label:
          item?.firstname +
          " " +
          " " +
          item?.lastname +
          ` ( ${item?.subject?.title} )`,
      };
    }
  );

  console.log(examResult, "natija");

  return (
    <div>
      <Title order={3}>Yangi imtixon qo'shish</Title>
      <Grid mt={"md"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 3 }}>
          <TextInput
            label="Imtixon sarlavhasi"
            placeholder="Sarlavha kiriting"
            withAsterisk
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 1 }}>
          <TextInput label="Ball" placeholder="Ball" withAsterisk />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 7, xl: 8 }}>
          <MultiSelect
            label="Sinflarni tanlang."
            placeholder="Sinflar"
            data={SellectChangeGroup}
            clearable
            withAsterisk
            disabled={SellectChangeGroup.length === 0}
            value={groupValue}
            onChange={setGroupValue}
          />
        </Grid.Col>
      </Grid>

      <Box mt={"md"}>
        {groupValue.length > 0 && (
          <Box>
            <Text size="lg" mb={"md"} c={"teal"}>
              Tanlagan sinflar:
            </Text>
            {groupValue.map((group) => (
              <AddExamResultCard
                group={group}
                groups={groups}
                key={group}
                subjectSellectData={subjectSellectData}
                teacherSellectData={teacherSellectData}
                setExamResult={setExamResult}
                examResult={examResult}
              />
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AddExamResultPage;
