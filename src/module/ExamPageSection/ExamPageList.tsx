/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { Grid } from "@mantine/core";
import ExamPageCard from "./ExamPageCard";

const ExamPageList = ({ search, active }: any) => {
  const { data, error, isLoading } = useSWR(`/api/groups?status=${active}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  return (
    <div>
      <Grid>
        {data
          ?.filter((fil: { title: string }) =>
            fil.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item: any) => {
            return (
              <Grid.Col key={item._id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                <ExamPageCard item={item} />
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default ExamPageList;
