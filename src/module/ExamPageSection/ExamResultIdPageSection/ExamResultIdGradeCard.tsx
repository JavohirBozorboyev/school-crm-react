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
    maxScore?: number | string;
  };
}
const ExamResultIdGradeCard = ({ item }: DataProps) => {
  return (
    <Paper p={"md"} withBorder>
      <Paper bg={"blue"} radius={"sm"} py={"4px"} mb="md">
        <Text
          py={"2px"}
          fw={"600"}
          fz={"sm"}
          ta={"center"}
          c={"white"}
          tt={"uppercase"}
        >
          {item?.subjectInfo?.title}
        </Text>
      </Paper>{" "}
      <Grid align="center">
        <Grid.Col span={8}>
          <Text py={"2px"} fw={"600"} fz={"sm"} c={"blue"} tt={"uppercase"}>
            Ism Familiya
          </Text>{" "}
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            py={"2px"}
            fw={"600"}
            ta={"center"}
            fz={"sm"}
            c={"blue"}
            tt={"uppercase"}
          >
            {item?.maxScore} - ball
          </Text>{" "}
        </Grid.Col>
      </Grid>
      <Divider my={"xs"} />
      {item?.grades?.map((grade) => {
        return (
          <div key={grade._id}>
            <Grid>
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
            <Divider my={"xs"} />
          </div>
        );
      })}
    </Paper>
  );
};

export default ExamResultIdGradeCard;
