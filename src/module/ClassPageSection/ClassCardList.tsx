/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassCard from "./ClassCard";
import useSWR from "swr";
import { Grid } from "@mantine/core";

const ClassCardList = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <Grid>
        {data.map((item: any) => {
          return (
            <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <ClassCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ClassCardList;
