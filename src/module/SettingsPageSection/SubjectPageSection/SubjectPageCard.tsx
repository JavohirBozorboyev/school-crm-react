/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Text,
  Button,
  Flex,
  Menu,
  rem,
  Title,
  Badge,
  Group,
  Modal,
} from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { mutate } from "swr";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import AccessControl from "../../../security/AccessControl";
import DateFormatter from "../../../utils/DateFormatter";
const TeachersCard = ({ item }: any) => {
  const [opened, { open, close }] = useDisclosure(false);

  const deleteTeacher = async () => {
    try {
      const res = await axios.delete(`/api/subjects/${item._id}`);
      if (res.status == 200) {
        mutate(`/api/subjects`);
        close();
        notifications.show({
          title: "Subject O'chirildi",
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
        <Title order={5} ta={"left"}>
          {item?.title}
        </Title>
        <Text ta={"center"} mt={"xs"} c={"gray"} size="sm">
          {item?.subject}
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
              <Menu.Label>Fanni Taxrirlash</Menu.Label>
              <AccessControl
                requiredPermissions={["update"]}
                requiredPrivileges={["manage_users"]}
              >
                <Menu.Item
                  leftSection={
                    <IconPencil style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Fanni taxrirlash
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
                  Fanni o'chirish
                </Menu.Item>
              </AccessControl>
            </Menu.Dropdown>
          </Menu>
          <Flex justify={"flex-end"} w={"100%"}>
            <Text size="sm" c={"dimmed"}>
              <DateFormatter isoDate={item?.createdAt} />
            </Text>
          </Flex>
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
            onClick={deleteTeacher}
            rightSection={<IconTrash size={16} />}
          >
            O'chirish
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default TeachersCard;
