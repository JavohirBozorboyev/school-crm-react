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
  Divider,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import {
  IconDotsVertical,
  IconHandClick,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { mutate } from "swr";
import { useSelector } from "react-redux";
import AccessControl from "../../../security/AccessControl";
import { RootState } from "../../../store";
const ExamResultSlugPageCard = ({ item }: { item: any }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deactive, handlers] = useDisclosure(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const DeleteClass = async () => {
    try {
      const res = await axios.delete(`/api/groups/${item._id}`);
      if (res.status == 200) {
        mutate(`/api/groups?status=${item.status}`);
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

  const ActiveAndDeactive = async (status: string) => {
    try {
      const res = await axios.patch(`/api/exam-results/${item._id}`, {
        status,
      });

      if (res.status == 200) {
        mutate(
          `/api/exam-results?status=${
            status == "active" ? "deactive" : "active"
          }`
        );
        handlers.close();
        notifications.show({
          title: `Imtixon ${status}`,
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      console.log(error);
      handlers.close();
    }
  };

  return (
    <>
      <Card padding="md" radius="sm" withBorder>
        <Group justify="space-between" mb="xs" align="center">
          <Text fw={500} size="lg">
            {item?.title}
          </Text>
        </Group>
        <Divider mb="xs" />
        <Group align="center" gap={"xs"}>
          <Text size="xs" tt={"uppercase"} c="dimmed">
            Fanlar:
          </Text>
          {item?.subject?.map(
            (
              item: {
                title: string;
              },
              i: number
            ) => {
              return (
                <Badge
                  size="sm"
                  key={i}
                  radius={"xs"}
                  variant="light"
                  color="teal"
                >
                  {item?.title}
                </Badge>
              );
            }
          )}
        </Group>

        <Divider my="xs" />
        <Group align="center" gap={"xs"}>
          <Text size="xs" tt={"uppercase"} c="dimmed">
            Ustozlar:
          </Text>
          {item?.teacher?.map(
            (
              item: {
                firstname: string;
              },
              i: number
            ) => {
              return (
                <Badge
                  color="dark"
                  radius={"xs"}
                  size="sm"
                  key={i}
                  variant="light"
                >
                  {item?.firstname}
                </Badge>
              );
            }
          )}
        </Group>
        <Divider mt="xs" />
        {user?.role == "admin" || user?.role == "supperadmin" ? null : (
          <NavLink
            to={`/exam/exam-results/${item._id}`}
            style={{ width: "100%" }}
          >
            <Button
              color="blue"
              size="xs"
              variant="light"
              fullWidth
              radius="sm"
              mt={"md"}
              disabled={item?.lock}
            >
              Natijalar
            </Button>
          </NavLink>
        )}
        <AccessControl
          requiredPermissions={["read"]}
          requiredPrivileges={["view_reports"]}
        >
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
                  Edit Imtixon
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
                    Delete Imtixon
                  </Menu.Item>
                </AccessControl>
              </Menu.Dropdown>
            </Menu>

            <NavLink
              to={`/exam/exam-results/${item._id}`}
              style={{ width: "100%" }}
            >
              <Button
                color="blue"
                size="xs"
                variant="light"
                fullWidth
                radius="sm"
              >
                Natijalar
              </Button>
            </NavLink>
          </Flex>
        </AccessControl>
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
            <Button color="blue" onClick={() => ActiveAndDeactive("active")}>
              Active Imtixon
            </Button>
          ) : (
            <Button
              color="yellow"
              onClick={() => ActiveAndDeactive("deactive")}
            >
              Deactive Imtixon
            </Button>
          )}
        </Group>
      </Modal>
    </>
  );
};

export default ExamResultSlugPageCard;
