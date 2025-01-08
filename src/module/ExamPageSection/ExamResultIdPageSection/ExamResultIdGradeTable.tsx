import { Divider, Grid, Paper, Text } from "@mantine/core";
import { useParams } from "react-router";
import useSWR from "swr";

interface DataProps {
  _id: string;
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
}

const ExamResultIdGradeTable = () => {
  const { slug, id } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/exam/exam-grades/${slug}?class=${id}`
  );

  console.log(data);

  if (error) return <div>failed to load merge</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main>
      <Grid>
        {data?.map((item: DataProps) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, xl: 4 }}>
              <Paper p={"md"} withBorder shadow="sm">
                {" "}
                <Grid align="center">
                  <Grid.Col span={8}>
                    <Text py={"2px"} fw={"600"} fz={"sm"} c={"cyan"}>
                      Ism Familiya
                    </Text>{" "}
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text
                      py={"2px"}
                      fw={"600"}
                      ta={"center"}
                      fz={"sm"}
                      c={"cyan"}
                    >
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
                <Grid></Grid>
              </Paper>
            </Grid.Col>
          );
        })}
      </Grid>
    </main>
  );
};

export default ExamResultIdGradeTable;
