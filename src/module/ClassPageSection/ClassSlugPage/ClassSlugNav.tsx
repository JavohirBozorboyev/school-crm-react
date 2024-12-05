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
  ActionIcon,
} from "@mantine/core";
import { IconBook2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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
              <Text size="xl">{data?.teacher}</Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text size="lg">SPES Fanlar:</Text>
            <Divider my={"xs"} />
            <SimpleGrid
              cols={{ base: 2, sm: 2 }}
              spacing="xs"
              verticalSpacing="xs"
            >
              <Group mt={"sm"} gap={"xs"}>
                <ActionIcon variant="light">
                  <IconBook2 size={16} />
                </ActionIcon>
                <Text size="sm">Informatika</Text>
              </Group>
              <Group mt={"sm"} gap={"xs"}>
                <ActionIcon variant="light">
                  <IconBook2 size={16} />
                </ActionIcon>
                <Text size="sm">Matematika</Text>
              </Group>
              <Group mt={"sm"} gap={"xs"}>
                <ActionIcon variant="light">
                  <IconBook2 size={16} />
                </ActionIcon>
                <Text size="sm">Ingliz-tili</Text>
              </Group>
              <Group mt={"sm"} gap={"xs"}>
                <ActionIcon variant="light">
                  <IconBook2 size={16} />
                </ActionIcon>
                <Text size="sm">Rus-tili</Text>
              </Group>
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
              <Group mt={"sm"} gap={"xs"}>
                <Avatar
                  variant="light"
                  color="blue"
                  radius={"sm"}
                  size={"sm"}
                />
                <Text size="sm">Ulugbek H</Text>
              </Group>
              <Group mt={"sm"} gap={"xs"}>
                <Avatar
                  variant="light"
                  color="blue"
                  radius={"sm"}
                  size={"sm"}
                />
                <Text size="sm">Ulugbek H</Text>
              </Group>
              <Group mt={"sm"} gap={"xs"}>
                <Avatar
                  variant="light"
                  color="blue"
                  radius={"sm"}
                  size={"sm"}
                />
                <Text size="sm">Ulugbek H</Text>
              </Group>
              <Group mt={"sm"} gap={"xs"}>
                <Avatar
                  variant="light"
                  color="blue"
                  radius={"sm"}
                  size={"sm"}
                />
                <Text size="sm">Ulugbek H</Text>
              </Group>
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
};

export default ClassSlugNav;
