/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mantine/core";
import TeacherCard from "./TeachersCard";

const TeachersCardList = ({ data, search }: { data: any; search: string }) => {
  return (
    <div>
      <Grid>
        {data
          .filter(
            (item: any) =>
              item.firstname.toLowerCase().includes(search.toLowerCase()) ||
              item.lastname.toLowerCase().includes(search.toLowerCase())
          )
          .map((item: any) => {
            return (
              <Grid.Col key={item._id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                <TeacherCard item={item} />
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default TeachersCardList;
