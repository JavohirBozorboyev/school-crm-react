/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { Grid } from "@mantine/core";
import ExamReusltPageCard from "./ExamResultPageCard";

const ExamResultPageList = ({ search, active }: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/exam-results?status=${active}&search=${search}`
  );

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  return (
    <div>
      <Grid>
        {data?.map((item: any) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, xl: 4 }}>
              <ExamReusltPageCard item={item} search={search} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ExamResultPageList;
