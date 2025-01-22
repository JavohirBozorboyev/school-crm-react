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
  Box,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import {
  IconDotsVertical,
  IconHandClick,
  IconLock,
  IconLockOpen2,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import AccessControl from "../../security/AccessControl";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { mutate } from "swr";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
const ExamReusltPageCard = ({
  item,
  search,
}: {
  item: any;
  search: string;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deactive, handlers] = useDisclosure(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const DeleteExamResults = async () => {
    try {
      const res = await axios.delete(`/api/exam/exam-results/${item?._id}`);
      if (res.status == 200) {
        mutate(`/api/exam/exam-results?status=${item.status}&search=`);
        close();
        notifications.show({
          title: "Imtixon o'chirildi",
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
      const res = await axios.patch(`/api/exam/exam-results/${item._id}`, {
        status,
        lock: "lock",
      });

      if (res.status == 200) {
        mutate(
          `/api/exam/exam-results?status=${
            status == "active" ? "deactive" : "active"
          }&search=${search}`
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
  const LockAndUnlock = async (status: string, lock: string) => {
    try {
      const res = await axios.patch(`/api/exam/exam-results/${item._id}`, {
        lock,
      });

      if (res.status == 200) {
        mutate(`/api/exam/exam-results?status=${status}&search=${search}`);
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
            color={item?.status === "active" ? "cyan" : "yellow"}
          >
            {item?.status}
          </Badge>
        </Group>

        <Group justify="space-between" mb="xs" align="center">
          <ActionIcon
            size={"xl"}
            color={item?.lock == "lock" ? "dark" : "blue"}
            variant={item?.lock == "lock" ? "light" : "filled"}
          >
            {item?.lock == "lock" ? <IconLock /> : <IconLockOpen2 />}
          </ActionIcon>
          <Box>
            <Group>
              <Text size="xs" c="dimmed">
                Create:
              </Text>
              <Text fw={500} size="xs">
                {FormatDate(item?.createdAt)}
              </Text>
            </Group>
            <Group>
              <Text size="xs" c="dimmed">
                Update:
              </Text>
              <Text fw={500} size="xs">
                {FormatDate(item?.updatedAt)}
              </Text>
            </Group>
          </Box>
        </Group>

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
                <Menu.Label>Lock or Unclok</Menu.Label>
                <AccessControl
                  requiredPermissions={["update"]}
                  requiredPrivileges={["manage_users"]}
                >
                  {item?.lock == "lock" ? (
                    <Menu.Item
                      onClick={() => LockAndUnlock(item?.status, "unLock")}
                      leftSection={
                        <IconLockOpen2
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Qulfdan chiqarish
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      onClick={() => LockAndUnlock(item?.status, "lock")}
                      leftSection={
                        <IconLock style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Qulflash
                    </Menu.Item>
                  )}
                </AccessControl>
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
                  onClick={() => {
                    navigate(`/exam/exam-results/edit/${item._id}`);
                  }}
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
            onClick={DeleteExamResults}
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

export default ExamReusltPageCard;
