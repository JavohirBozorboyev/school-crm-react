import {
  Paper,
  Avatar,
  Box,
  Title,
  Grid,
  Flex,
  ActionIcon,
  Text,
} from "@mantine/core";
import { IconPhone, IconMail, IconId } from "@tabler/icons-react";
import { NavLink, useParams } from "react-router-dom";
import useSWR from "swr";

const TeacherSlugHeadSection = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useSWR(`/api/teachers/${slug}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;


  return (
    <div>
      <Paper withBorder>
        <Paper p={"md"} bg={"blue.3"} h={"80px"} radius={"xs"}>
          <Avatar variant="filled" color={"blue"} size={"xl"} mt={"lg"} />
        </Paper>
        <Box mt={"50px"} p={"md"}>
          <Title order={3}>{data?.firstname + " " + data?.lastname}</Title>
          <Text c={"dimmed"} mt={"xs"}>
            Fan: {data?.subject}
          </Text>
        </Box>
        <Grid p={"md"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NavLink to={"tel:+998993912505"}>
              <Text c={"dimmed"} size="sm">
                Phone:
              </Text>
              <Flex mt={"sm"} align={"center"} gap={"sm"}>
                <ActionIcon size={"md"} radius={"xl"}>
                  <IconPhone size={"16"} />
                </ActionIcon>
                <Text size="sm" c={"blue"}>
                  {data?.phone}
                </Text>
              </Flex>
            </NavLink>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NavLink to={"#"}>
              <Text c={"dimmed"} size="sm">
                Email:
              </Text>
              <Flex mt={"sm"} align={"center"} gap={"sm"}>
                <ActionIcon size={"md"} radius={"xl"}>
                  <IconMail size={"16"} />
                </ActionIcon>
                <Text size="sm" c={"blue"}>
                  {data?.email}
                </Text>
              </Flex>
            </NavLink>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              Passport:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              <ActionIcon size={"md"} radius={"xl"}>
                <IconId size={"16"} />
              </ActionIcon>
              <Text size="sm" c={"blue"}>
                {data?.passport}
              </Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
};

export default TeacherSlugHeadSection;
