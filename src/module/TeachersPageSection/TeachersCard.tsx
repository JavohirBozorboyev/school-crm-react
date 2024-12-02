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
  Badge,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import {
  IconDotsVertical,
  IconHandClick,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import AccessControl from "../../security/AccessControl";
import { notifications } from "@mantine/notifications";
import { mutate } from "swr";
import axios from "axios";
const TeachersCard = ({ item }: any) => {
  const deleteTeacher = async (id: number) => {
    try {
      const res = await axios.delete(`/api/teachers/${id}`);
      if (res.status == 200) {
        mutate("/api/teachers");
        close();
        notifications.show({
          title: "Teacher O'chirildi",
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
      <Card padding="md" py={"lg"} radius="sm" withBorder>
        <Flex pos={"absolute"} justify={"flex-end"} right={10} top={10}>
          <Badge radius={"sm"} variant="light" color="cyan">
            {item?.status}
          </Badge>
        </Flex>
        <Flex justify={"center"}>
          <Avatar size={"xl"} variant="light" color="blue" />
        </Flex>

        <Title order={5} ta={"center"} mt={"sm"}>
          {item?.firstname} {item?.lastname}
        </Title>
        <Text ta={"center"} mt={"xs"} c={"gray"} size="sm">
          {item?.subject}
        </Text>

        {/* <Flex align="center" justify={"center"} mt={"md"} gap={"xs"}>
          <NavLink to={`tel:${item?.phone}`}>
            <ActionIcon variant="light" size={"lg"} radius={"xl"}>
              <IconPhone size={18} />
            </ActionIcon>
          </NavLink>
          <NavLink to={`sms:${item?.phone}`}>
            <ActionIcon variant="light" size={"lg"} radius={"xl"}>
              <IconMail size={18} />
            </ActionIcon>
          </NavLink>
        </Flex> */}
        <Flex align="center" mt={"md"} gap={"xs"}>
          <Menu shadow="md" width={200} withArrow>
            {" "}
            <AccessControl
              requiredPermissions={["read"]}
              requiredPrivileges={["view_reports"]}
            >
              <Menu.Target>
                <ActionIcon variant="light">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Menu.Target>{" "}
            </AccessControl>
            <Menu.Dropdown>
              <AccessControl
                requiredPermissions={["update"]}
                requiredPrivileges={["manage_users"]}
              >
                <Menu.Label>Active and Deactive</Menu.Label>
                <Menu.Item
                  color="yellow"
                  leftSection={
                    <IconHandClick
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Deactive
                </Menu.Item>
              </AccessControl>

              <Menu.Divider />
              <Menu.Label>Edit Class</Menu.Label>
              <AccessControl
                requiredPermissions={["update"]}
                requiredPrivileges={["manage_users"]}
              >
                <Menu.Item
                  leftSection={
                    <IconPencil style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Edit Class
                </Menu.Item>
              </AccessControl>

              <AccessControl
                requiredPermissions={["delete"]}
                requiredPrivileges={["manage_users"]}
              >
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => deleteTeacher(item?._id)}
                >
                  Delete Teacher
                </Menu.Item>
              </AccessControl>
            </Menu.Dropdown>
          </Menu>

          <NavLink to={`/teachers/${item?._id}`} style={{ width: "100%" }}>
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
