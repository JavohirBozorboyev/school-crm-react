/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mantine/core";
import SubjectPageCard from "./SubjectPageCard";

const SubjectPageList = ({ data }: any) => {
  return (
    <div>
      <Grid>
        {data?.map((item: any) => {
          return (
            <Grid.Col key={item._id} span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
              <SubjectPageCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default SubjectPageList;
