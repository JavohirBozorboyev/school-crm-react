import { Paper, Grid, MultiSelect, Text } from "@mantine/core";

interface Props {
  group: Group;
  subjects: Item[];
  teachers: Item[];
}
interface Group {
  groupInfo: { title: string };
  subjects: { title: string; _id: string }[];
  teachers: {
    _id: string;
    firstname: string;
    subject: { title: string; _id: string };
  }[];
}

interface Item {
  title?: string;
  _id?: string;
  firstname?: string;
  subject?: { title: string; _id: string };
}

const Edit_ExamResult_Card = ({ group, subjects, teachers }: Props) => {
  
  const selectedSubject = subjects?.map((item: Item) => {
    return { label: item.title || "", value: item._id || "" };
  });
  const defaultSubjectValue = group?.subjects?.map((item) => item?._id);
  const selectedTeacher = teachers?.map((item: Item) => {
    return {
      label: `${item.firstname || ""} ( ${item?.subject?.title || ""} )`,
      value: item._id || "",
    };
  });
  const defaultTeacherValue = group?.teachers?.map((item) => item?._id);


  return (
    <>
      <Paper p={"sm"} withBorder my={"sm"}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
            <Text>{group?.groupInfo?.title}</Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
            <MultiSelect
              label="Imtixon Fanlari"
              placeholder="Fanlar"
              description="Belgilangan fanlardan imtixon olinadi"
              clearable
              variant="filled"
              data={selectedSubject}
              defaultValue={defaultSubjectValue}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
            <MultiSelect
              label="Fan Ustozlari"
              placeholder="Ustozlar"
              description="Belgilangan ustozlar imtixon natijalarni kirita oladi."
              clearable
              variant="filled"
              data={selectedTeacher}
              defaultValue={defaultTeacherValue}
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default Edit_ExamResult_Card;
