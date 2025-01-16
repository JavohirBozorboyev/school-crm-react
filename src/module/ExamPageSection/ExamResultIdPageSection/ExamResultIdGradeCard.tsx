import { Paper, Grid, Divider, Text } from "@mantine/core";

interface DataProps {
  item: {
    subjectInfo: {
      title: string;
    };
    grades: {
      _id: string;
      grade: string;
      student: {
        fullname: string;
      };
    }[];
  };
}
const ExamResultIdGradeCard = ({ item }: DataProps) => {
  return (
    <>
      <Paper p={"md"} withBorder>
        {" "}
        <Grid align="center">
          <Grid.Col span={8}>
            <Text py={"2px"} fw={"600"} fz={"sm"} c={"cyan"}>
              Ism Familiya
            </Text>{" "}
          </Grid.Col>
          <Grid.Col span={4}>
            <Text py={"2px"} fw={"600"} ta={"center"} fz={"sm"} c={"cyan"}>
              {item?.subjectInfo?.title}
            </Text>{" "}
          </Grid.Col>
        </Grid>
        <Divider my={"xs"} />
        {item?.grades?.map((grade) => {
          return (
            <Grid key={grade._id}>
              <Grid.Col span={8}>
                <Text py={"2px"} fz={"sm"}>
                  {grade?.student?.fullname}
                </Text>{" "}
              </Grid.Col>
              <Grid.Col span={4}>
                <Text py={"2px"} ta={"center"} fz={"sm"}>
                  {grade?.grade}
                </Text>{" "}
              </Grid.Col>
            </Grid>
          );
        })}
      </Paper>
    </>
  );
};

export default ExamResultIdGradeCard;
