import {
  Paper,
  Avatar,
  Box,
  Title,
  Grid,
  Flex,
  ActionIcon,
  Text,
  Group,
  Button,
  Menu,
  rem,
  Badge,
} from "@mantine/core";
import {
  IconPhone,
  IconId,
  IconPencil,
  IconTrash,
  IconHandClick,
  IconMap,
} from "@tabler/icons-react";
import { NavLink, useParams } from "react-router-dom";
import AccessControl from "../../../security/AccessControl";
import useSWR, { mutate } from "swr";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const StundetsSlugPageNav = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useSWR(`/api/students/${slug}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;


  const ActiveAndDeactive = async (status: string) => {
    try {
      const res = await axios.patch(`/api/students/${slug}`, {
        status: status,
      });

      if (res.status == 200) {
        mutate(`/api/students/${slug}`);

        notifications.show({
          title: `O'quvchi ${status}`,
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Paper withBorder>
        <Paper bg={"blue.3"} h={"80px"}></Paper>
        <Flex
          mt={"-40px"}
          justify={"space-between"}
          align={"center"}
          p={"md"}
          h={"80px"}
        >
          <Avatar variant="filled" color={"blue"} size={"xl"} />
          <Group>
            <AccessControl
              requiredPermissions={["read", "write", "delete", "update"]}
              requiredPrivileges={["manage_users", "view_reports"]}
            >
              {" "}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button radius={"xl"} leftSection={<IconPencil size={18} />}>
                    Taxrirlash
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  {data?.status == "active" ? (
                    <Menu.Item
                      leftSection={
                        <IconHandClick
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="blue"
                      onClick={() => ActiveAndDeactive("deactive")}
                    >
                      Active
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      leftSection={
                        <IconHandClick
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="yellow"
                      onClick={() => ActiveAndDeactive("active")}
                    >
                      Deactive
                    </Menu.Item>
                  )}
                  <Menu.Divider />

                  <Menu.Item
                    leftSection={
                      <IconPencil style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Taxrirlash
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    O'quvchini O'chirish
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </AccessControl>
            <Badge
              size="lg"
              color={data?.status == "active" ? "blue" : "yellow"}
            >
              {data?.status}
            </Badge>
          </Group>
        </Flex>
        <Box p={"md"} mt={"sm"}>
          <Title order={2}>{data?.fullname}</Title>
          <Text c={"dimmed"} mt={"xs"}>
            Sinf: {data?.group?.title}
          </Text>
        </Box>
        <Grid p={"md"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NavLink to={"tel:+998993912505"}>
              <Text c={"dimmed"} size="sm">
                Phone:
              </Text>
              <Flex mt={"sm"} align={"center"} gap={"sm"}>
                <ActionIcon size={"lg"} radius={"xl"}>
                  <IconPhone size={"18"} />
                </ActionIcon>
                <Text size="md" c={"blue"}>
                  {data?.phone}
                </Text>
              </Flex>
            </NavLink>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              Passport:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              <ActionIcon size={"lg"} radius={"xl"}>
                <IconId size={"18"} />
              </ActionIcon>
              <Text size="md" c={"blue"}>
                {data.passport}
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              Email:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              <ActionIcon size={"lg"} radius={"xl"}>
                <IconMap size={"18"} />
              </ActionIcon>
              <Text size="md" c={"dark"}>
                {data?.address}
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              Ota:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              <ActionIcon size={"lg"} radius={"xl"}>
                <IconMap size={"18"} />
              </ActionIcon>
              <Text size="md" c={"dark"}>
                {data?.father}
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              Ona:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              <ActionIcon size={"lg"} radius={"xl"}>
                <IconMap size={"18"} />
              </ActionIcon>
              <Text size="md" c={"dark"}>
                {data?.mother}
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              SPS Fanlar:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              {data?.subjects?.map((item: string, i: number) => {
                return (
                  <Badge key={i} color="gray">
                    {item}
                  </Badge>
                );
              })}
            </Flex>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default StundetsSlugPageNav;
