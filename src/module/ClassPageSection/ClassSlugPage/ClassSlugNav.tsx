/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumbs,
  Anchor,
  Paper,
  Grid,
  Text,
  Avatar,
  Group,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const ClassSlugNav = ({ data }: any) => {
  const navigate = useNavigate();

  const links = [
    { title: "Dashboard", href: "/" },
    { title: "Class", href: "/class" },
    { title: data?.title, href: "#" },
  ].map((item, index) => (
    <Anchor key={index} onClick={() => navigate(item?.href)}>
      {item.title}
    </Anchor>
  ));

  return (
    <div>
      <Breadcrumbs>{links}</Breadcrumbs>
      <Paper my={"md"} withBorder p={"md"}>
        <Grid gutter={"md"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text size="lg">Sinf Rahbar:</Text>
            <Divider my={"xs"} />
            <Group>
              <Avatar size={"xl"} radius={"sm"} />
              <Text size="xl">
                {data?.teacher == null
                  ? "Mavjud emas"
                  : data?.teacher?.firstname + " " + data?.teacher?.lastname}
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text size="lg">Fanlar:</Text>
            <Divider my={"xs"} />
            <SimpleGrid
              cols={{ base: 2, sm: 2 }}
              spacing="xs"
              verticalSpacing="xs"
            >
              {data?.subjectTeacher?.map((item: any) => {
                return (
                  <Group mt={"sm"} gap={"xs"} key={item?._id}>
                    <Text size="sm">{item?.subject.title}</Text>
                  </Group>
                );
              })}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text size="lg">Fan Ustozlari:</Text>
            <Divider my={"xs"} />
            <SimpleGrid
              cols={{ base: 1, sm: 2 }}
              spacing="xs"
              verticalSpacing="xs"
            >
              {data?.subjectTeacher?.map((item: any) => {
                return (
                  <Link to={`/teachers/${item?._id}`} key={item?._id}>
                    <Group mt={"sm"} gap={"xs"}>
                      <Text size="sm" c={"blue"} td={"underline"}>
                        {item?.firstname + " " + item?.lastname}
                      </Text>
                    </Group>
                  </Link>
                );
              })}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
};

export default ClassSlugNav;
