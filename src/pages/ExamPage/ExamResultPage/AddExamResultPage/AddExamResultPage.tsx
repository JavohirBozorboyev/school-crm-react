import {
  Box,
  Grid,
  MultiSelect,
  Paper,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

const AddExamResultPage = () => {
  const { data: groups, error, isLoading } = useSWR("/api/groups/three");
  const { data: subjects } = useSWR("/api/subjects");
  const { data: teachers } = useSWR("/api/teachers");
  const [groupValue, setGroupValue] = useState<string[]>([]);

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
  // console.log(groups);

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
            {groupValue.map((group) => {
              const defaultGroupSubjectTeacher = groups
                .find((fi: { _id: string }) => fi._id === group)
                ?.subjectTeacher?.map((item: { _id: string }) => item?._id);

              return (
                <Paper p={"sm"} withBorder key={group} my={"sm"}>
                  <Grid align="center">
                    <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                      <Text>
                        {
                          groups?.find(
                            (g: { title: string; _id: string }) =>
                              g._id === group
                          )?.title
                        }
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
                      <MultiSelect
                        label="Imtixon Fanlari"
                        placeholder="Fanlar"
                        description="Belgilangan fanlardan imtixon olinadi"
                        data={subjectSellectData}
                        clearable
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
                      <MultiSelect
                        label="Fan Ustozlari"
                        placeholder="Ustozlar"
                        description="Belgilangan ustozlar imtixon natijalarni kirita oladi."
                        data={teacherSellectData}
                        clearable
                        defaultValue={defaultGroupSubjectTeacher}
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>
              );
            })}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AddExamResultPage;
