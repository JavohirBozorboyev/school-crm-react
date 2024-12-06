/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  Menu,
  rem,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import {
  IconDotsVertical,
  IconHandClick,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
const ClassCard = ({ item }: any) => {
  return (
    <>
      <Card padding="md" radius="sm" withBorder>
        <Group justify="space-between" mb="xs" align="center">
          <Text fw={500} size="lg">
            {item?.title}
          </Text>
          <Badge
            variant="light"
            color={item?.status === "active" ? "cyan" : "red"}
          >
            {item?.status}
          </Badge>
        </Group>
        <Group align="center">
          <Text size="xs" tt={"uppercase"} c="dimmed">
            Student:
          </Text>
          <Text size="sm" fw={"600"}>
            {item?.studentCount}
          </Text>
        </Group>
        <Group align="center">
          <Text size="xs" tt={"uppercase"} c="dimmed">
            Teacher:
          </Text>
          <Text size="sm" fw={"600"}>
            {item?.teacherInfo == null
              ? "Mavjud emas"
              : item?.teacherInfo?.firstname +
                " " +
                item?.teacherInfo?.lastname}
          </Text>
        </Group>

        <Flex align="center" mt={"md"} gap={"xs"}>
          <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
              <ActionIcon variant="light">
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Active and Deactive</Menu.Label>
              <Menu.Item
                color="yellow"
                leftSection={
                  <IconHandClick style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Deactive
              </Menu.Item>

              <Menu.Divider />
              <Menu.Label>Edit Class</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit Class
              </Menu.Item>

              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Delete Class
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <NavLink to={`/class/${item._id}`} style={{ width: "100%" }}>
            <Button
              color="blue"
              size="xs"
              variant="light"
              fullWidth
              radius="sm"
            >
              View Class
            </Button>
          </NavLink>
        </Flex>
      </Card>
    </>
  );
};

export default ClassCard;
