/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Text,
  Button,
  Flex,
  Menu,
  rem,
  Avatar,
  Title,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import {
  IconDotsVertical,
  IconHandClick,
  IconMail,
  IconPencil,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react";
const TeachersCard = ({ item }: any) => {

  return (
    <>
      <Card padding="md" py={"lg"} radius="sm" withBorder>
        <Flex justify={"center"}>
          <Avatar size={"xl"} variant="light" color="blue" />
        </Flex>

        <Title order={4} ta={"center"} mt={"sm"}>
          {item?.name}
        </Title>
        <Text ta={"center"} mt={"xs"} c={"gray"}>
          Informatika
        </Text>

        <Flex align="center" justify={"center"} mt={"md"} gap={"xs"}>
          <NavLink to={`tel:+998993912505`}>
            <ActionIcon variant="light" size={"lg"} radius={"xl"}>
              <IconPhone size={18} />
            </ActionIcon>
          </NavLink>
          <NavLink to={`sms:+998993912505`}>
            <ActionIcon variant="light" size={"lg"} radius={"xl"}>
              <IconMail size={18} />
            </ActionIcon>
          </NavLink>
        </Flex>
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

          <NavLink to={`/class/${item.id}`} style={{ width: "100%" }}>
            <Button
              color="blue"
              size="xs"
              variant="light"
              fullWidth
              radius="sm"
            >
              View teacher
            </Button>
          </NavLink>
        </Flex>
      </Card>
    </>
  );
};

export default TeachersCard;
