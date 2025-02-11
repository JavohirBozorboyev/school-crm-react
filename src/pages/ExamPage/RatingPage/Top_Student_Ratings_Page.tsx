import { Avatar, Box, Card, Divider, Flex, Grid, Paper, Text } from "@mantine/core";
import useSWR from "swr";
import Rating_Nav from "../../../module/RatingPageSection/Rating_Nav";

interface RatingApi {
  _id: string;
  student: {
    fullname: string;
  };
  subjects: {
    subject: { title: string };
    totalScore: number;
  }[];
  totalScoreSum: number;
}

const Top_Student_Ratings_Page = () => {
  const { data, error, isLoading } = useSWR("/api/ratings/top");

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  return (
    <>
      <Rating_Nav />
      <Text size="xl" my={"sm"} fw={"bold"} tt={"uppercase"}>
        Eng Yuqori natijalar
      </Text>
      <Grid>
        {data?.map((item: RatingApi, i: number) => {
          return (
            <Grid.Col span={{ base: 12, md: 6, xl: 4 }} key={i}>
              <Card padding="md" radius="sm" withBorder>
                <Flex align={"center"} gap={"sm"}>
                  <Avatar color="cyan" radius="sm" size={"lg"}>
                    {i + 1}
                  </Avatar>
                  <Box>
                    <Text fw={500} size="lg">
                      {item?.student?.fullname}
                    </Text>
                    <Text c={"yellow"} fw={"bold"} tt={"uppercase"} size="md">
                      {item?.totalScoreSum} ball
                    </Text>
                  </Box>
                </Flex>
                <Divider my={"xs"} />
                <Grid justify="space-between" gutter={"xs"}>
                  {item?.subjects?.map((sub, i) => {
                    return (
                      <Grid.Col key={i} span={6}>
                        <Paper>
                          <Text size="xs" fw={"500"} c={"dimmed"}>
                            {sub.subject?.title}
                          </Text>
                          <Text size="sm" fw={"600"}>
                            {sub?.totalScore} ball
                          </Text>
                        </Paper>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default Top_Student_Ratings_Page;
