import { Divider, Grid, Paper, Table } from "@mantine/core";
import { useParams } from "react-router";
import useSWR from "swr";
import ExamResultIdGradeCard from "./ExamResultIdGradeCard";

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

const ExamResultIdGradeList = () => {
  const { slug, id } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/exam/exam-grades/${slug}?class=${id}`
  );

  if (error) return <div>failed to load merge</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main>
      <Divider my={"lg"} label="Barcha Natijalar" />

      <Paper withBorder radius={"sm"} p={"md"}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={300} fw={500}>
                  Ism Familiya
                </Table.Th>
                {data?.all?.subjects.map(
                  (item: { _id: string; title: string }) => {
                    return (
                      <Table.Th key={item._id} ta={"center"} w={150} fw={500}>
                        {item.title}
                      </Table.Th>
                    );
                  }
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.all?.students.map(
                (
                  element: {
                    fullname: string;
                    grades: number[];
                  },
                  i: number
                ) => (
                  <Table.Tr key={i}>
                    <Table.Td>{element.fullname}</Table.Td>
                    {element?.grades.map((grade: number, index: number) => {
                      return (
                        <Table.Td key={index} ta={"center"}>
                          {grade}
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                )
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
      <Divider my={"lg"} label="Fanlar bo'yicha natijalar" />
      <Grid mt={"md"}>
        {data?.sb?.map((item: DataProps, i: number) => {
          return (
            <Grid.Col key={i} span={{ base: 12, md: 6, xl: 4 }}>
              <ExamResultIdGradeCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </main>
  );
};

export default ExamResultIdGradeList;
