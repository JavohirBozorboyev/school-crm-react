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
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { mutate } from "swr";
const ClassCard = ({ item }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deactive, handlers] = useDisclosure(false);

  const DeleteClass = async () => {
    try {
      const res = await axios.delete(`/api/groups/${item._id}`);
      if (res.status == 200) {
        mutate("/api/groups");
        close();
        notifications.show({
          title: "Sinf o'chirildi",
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeactiveClass = async () => {
    try {
      const res = await axios.patch(`/api/groups/${item._id}`, {
        status: "deactive",
      });
      if (res.status == 200) {
        mutate("/api/groups");
        handlers.close();
        notifications.show({
          title: "Sinf deactive",
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ActiveClass = async () => {
    try {
      const res = await axios.patch(`/api/groups/${item._id}`, {
        status: "active",
      });
      if (res.status == 200) {
        mutate("/api/groups");
        handlers.close();
        notifications.show({
          title: "Sinf active",
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
              <AccessControl
                requiredPermissions={["update"]}
                requiredPrivileges={["manage_users"]}
              >
                {item?.status == "active" ? (
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
                ) : (
                  <Menu.Item
                    onClick={handlers.open}
                    color="blue"
                    leftSection={
                      <IconHandClick
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Active
                  </Menu.Item>
                )}
              </AccessControl>
              <Menu.Divider />
              <Menu.Label>Edit Class</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit Class
              </Menu.Item>

              <AccessControl
                requiredPermissions={["delete"]}
                requiredPrivileges={["manage_users"]}
              >
                <Menu.Divider />
                <Menu.Item
                  onClick={open}
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Delete Class
                </Menu.Item>
              </AccessControl>
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
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={300}
        title={item?.title}
      >
        <Group grow>
          <Button onClick={close} variant="light">
            Bekor qilish
          </Button>
          <Button
            color="red"
            onClick={DeleteClass}
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
        title={item?.title}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <Group grow>
          <Button onClick={handlers.close} variant="light">
            Bekor qilish
          </Button>
          {item.status == "deactive" ? (
            <Button color="blue" onClick={ActiveClass}>
              Active Class
            </Button>
          ) : (
            <Button color="yellow" onClick={DeactiveClass}>
              Deactive Class
            </Button>
          )}
        </Group>
      </Modal>
    </>
  );
};

export default ClassCard;
