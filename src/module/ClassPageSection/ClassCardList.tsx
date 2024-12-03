/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassCard from "./ClassCard";
import { Grid } from "@mantine/core";

const ClassCardList = ({ data }: any) => {
  return (
    <div>
      <Grid>
        {data.map((item: any) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <ClassCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ClassCardList;
