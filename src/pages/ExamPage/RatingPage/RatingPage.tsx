import useSWR from "swr";
import Rating_Nav from "../../../module/RatingPageSection/Rating_Nav";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Pagination,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
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

const RatingPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { data, error, isLoading } = useSWR(
    `/api/ratings?page=${activePage}&search=${debouncedSearch}`
  );

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  return (
    <div>
      <Rating_Nav />
      <Grid align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text size="xl" my={"sm"} fw={"bold"} tt={"uppercase"}>
            Barcha Natijalar
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Flex justify={"end"}>
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Qidirsh"
              w={"100%"}
              leftSection={<IconSearch size={16} />}
            />
          </Flex>
        </Grid.Col>
      </Grid>

      <Grid>
        {data?.students?.map((item: RatingApi, i: number) => {
          return (
            <Grid.Col span={{ base: 12, md: 6, xl: 4 }} key={i}>
              <Card padding="md" radius="sm" withBorder>
                <Flex align={"center"} gap={"sm"}>
                  <Avatar color="cyan" radius="sm" size={"lg"}>
                    <IconUser />
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
      <Pagination
        total={data?.totalPages}
        value={data?.page}
        mt={"md"}
        onChange={(e) => {
          setActivePage(e);
        }}
      />
    </div>
  );
};

export default RatingPage;
