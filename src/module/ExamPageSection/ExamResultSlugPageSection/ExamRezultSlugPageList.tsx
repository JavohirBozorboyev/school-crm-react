/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { Grid } from "@mantine/core";
import ExamResultSlugPageCard from "./ExamResultSlugPageCard";
import { useParams } from "react-router-dom";

const ExamRezultSlugPageList = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useSWR(`/api/exam/exam-results/${slug}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  console.log(data);

  return (
    <div>
      <Grid>
        {data?.group?.map((item: any) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <ExamResultSlugPageCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ExamRezultSlugPageList;
