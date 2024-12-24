/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { Grid } from "@mantine/core";
import ExamReusltPageCard from "./ExamResultPageCard";
import ExamResultPageGroupCard from "./ExamResultPageGroupCard";
import { useSelector } from "react-redux";

const ExamResultPageList = ({ search, active }: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/exam/exam-results?status=${active}&search=${search}`
  );
  const user = useSelector((state: any) => state.auth.user);
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div>
      <Grid>
        {data?.map((item: any) => {
          return user?.role == "teacher" ? (
            <Grid.Col key={item._id} span={{ base: 12 }}>
              <ExamResultPageGroupCard item={item} search={search} />
              <Grid.Col key={item._id} span={{ base: 12 }}>
                <ExamReusltPageCard item={item} search={search} />
              </Grid.Col>
            </Grid.Col>
          ) : (
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
