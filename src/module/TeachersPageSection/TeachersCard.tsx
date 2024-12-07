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
  Group,
  Modal,
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
import { useDisclosure } from "@mantine/hooks";
const TeachersCard = ({ item }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deactive, handlers] = useDisclosure(false);

  const deleteTeacher = async () => {
    try {
      const res = await axios.delete(`/api/teachers/${item._id}`);
      if (res.status == 200) {
        mutate(`/api/teachers?status=${item.status}`);
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
  const ActiveAndDeactive = async (status: string) => {
    try {
      const res = await axios.patch(`/api/teachers/${item._id}`, {
        status,
      });

      if (res.status == 200) {
        mutate(
          `/api/teachers?status=${status == "active" ? "deactive" : "active"}`
        );
        handlers.close();
        notifications.show({
          title: `O'qtuvchi ${status}`,
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
          <Badge
            radius={"sm"}
            variant="light"
            color={item?.status == "active" ? "cyan" : "red"}
          >
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
          {item?.subject?.title}
        </Text>

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
                  onClick={handlers.open}
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
                  onClick={open}
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
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={300}
        title={item?.firstname + " " + item?.lastname}
      >
        <Group grow>
          <Button onClick={close} variant="light">
            Bekor qilish
          </Button>
          <Button
            color="red"
            onClick={deleteTeacher}
            rightSection={<IconTrash size={16} />}
          >
            O'chirish
          </Button>
        </Group>
      </Modal>
      <Modal
        opened={deactive}
        withCloseButton={false}
        size={400}
        title={item?.firstname + " " + item?.lastname}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <Group grow>
          <Button onClick={handlers.close} variant="light">
            Bekor qilish
          </Button>
          {item.status == "deactive" ? (
            <Button color="blue" onClick={() => ActiveAndDeactive("active")}>
              Active Teacher
            </Button>
          ) : (
            <Button
              color="yellow"
              onClick={() => ActiveAndDeactive("deactive")}
            >
              Deactive Teacher
            </Button>
          )}
        </Group>
      </Modal>
    </>
  );
};

export default TeachersCard;
