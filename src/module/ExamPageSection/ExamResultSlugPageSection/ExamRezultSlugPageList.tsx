/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { Grid } from "@mantine/core";
import ExamResultSlugPageCard from "./ExamResultSlugPageCard";

const ExamRezultSlugPageList = () => {
  const { data, error, isLoading } = useSWR(`/api/exam-results`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  return (
    <div>
      <Grid>
        {data?.map((item: any) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, xl: 4 }}>
              <ExamResultSlugPageCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ExamRezultSlugPageList;
