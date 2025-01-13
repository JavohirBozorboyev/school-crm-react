import { Grid, MultiSelect, TextInput, Title } from "@mantine/core";
import useSWR from "swr";

const AddExamResultPage = () => {
  const { data: groups, error, isLoading } = useSWR("/api/groups");

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  const SellectChangeGroup = groups?.map(
    (group: { title: string; _id: string }) => ({
      value: group._id,
      label: group.title,
    })
  );

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
            placeholder="Pick value"
            data={SellectChangeGroup}
            clearable
            withAsterisk
            disabled={SellectChangeGroup.length === 0}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AddExamResultPage;
