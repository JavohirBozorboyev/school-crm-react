import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Modal,
  Flex,
  Button,
  TextInput,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import AccessControl from "../../../security/AccessControl";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { mutate } from "swr";

const AdminsPageTable = ({ data }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [user, setUser] = useState<any>(null);
  const [deleteText, setDeleteText] = useState<any>(null);
  const DeleteAdmin = async (id: string) => {
    try {
      const res = await axios.delete(`/api/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        mutate("/api/admins");
        close();
        setDeleteText("");
        notifications.show({
          title: "Admin O'chirildi",
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rows = data.map((item: any) => (
    <Table.Tr key={item._id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item?.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item?.firstname} {item?.lastname}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge variant="light" color="dark">
          {item?.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item?.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item?.phone}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light">{item?.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <AccessControl
            requiredPermissions={["write"]}
            requiredPrivileges={["manage_users"]}
          >
            <ActionIcon variant="subtle" color="gray">
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </AccessControl>
          <AccessControl
            requiredPermissions={["write"]}
            requiredPrivileges={["manage_users"]}
          >
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => {
                open();
                setUser(item);
              }}
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </AccessControl>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer minWidth={800} mt={"md"}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Full Name</Table.Th>
              <Table.Th>Rools</Table.Th>
              <Table.Th>Login Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Modal opened={opened} onClose={close} title="Delete Admin">
        <Flex
          direction={"column"}
          gap={"sm"}
          justify={"center"}
          align={"center"}
        >
          <Avatar size={"lg"} src={user?.avatar} radius={"sm"} />
          <Text fz="sm" fw={500}>
            {user?.firstname} {user?.lastname}
          </Text>
        </Flex>
        <TextInput
          mt={"md"}
          description="Adminni o'chirish uchun ' delete ' so'zini yozing."
          placeholder="delete"
          onChange={(e) => setDeleteText(e.target.value)}
        />
        <Group mt={"md"} grow>
          <Button onClick={close} color="gray">
            Bekor Qilish
          </Button>
          <Button
            disabled={deleteText != "delete"}
            color="red"
            rightSection={<IconTrash size={17} />}
            onClick={() => DeleteAdmin(user?._id)}
          >
            O'chirish
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default AdminsPageTable;
