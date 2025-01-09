import { Grid } from "@mantine/core";
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
      <Grid mt={"md"}>
        {data?.map((item: DataProps) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, xl: 4 }}>
              <ExamResultIdGradeCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </main>
  );
};

export default ExamResultIdGradeList;
