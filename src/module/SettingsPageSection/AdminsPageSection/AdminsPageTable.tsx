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
  MultiSelect,
  Select,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import AccessControl from "../../../security/AccessControl";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { mutate } from "swr";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const AdminsPageTable = ({ data }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [EditModalOpened, EditHandlers] = useDisclosure(false);
  const [deleteUser, setDeleteUser] = useState<any>(null);
  const [editUser, setEditUser] = useState<any>(null);
  const [deleteText, setDeleteText] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const DeleteAdmin = async (id: string) => {
    try {
      const res = await axios.delete(`/api/admins/${id}`);
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
  const EditAdmin = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      role: form.role.value,
      permissions: form.permissions.value.split(","),
      privileges: form.privileges.value.split(","),
    };
    try {
      const res = await axios.put(`/api/admins/${editUser?._id}`, data);
      if (res.status == 200) {
        notifications.show({
          title: "Admin Role O'zgartirildi",
          message: "",
          withBorder: true,
        });
        mutate("/api/admins");
        EditHandlers.close();
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
        <Badge variant="light" color="dark" radius={"sm"}>
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
        <Group gap={5} justify="flex-end">
          {user?.role != "admin" && (
            <AccessControl
              requiredPermissions={["read", "write", "delete", "update"]}
              requiredPrivileges={[
                "view_reports",
                "manage_users",
                "manage_permissions",
                "manage_roles",
              ]}
            >
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                  EditHandlers.open();
                  setEditUser(item);
                }}
                disabled={item._id == user?._id}
              >
                <IconPencil
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </AccessControl>
          )}
          {user?.role != "admin" && (
            <AccessControl
              requiredPermissions={["read", "write", "delete", "update"]}
              requiredPrivileges={[
                "view_reports",
                "manage_users",
                "manage_permissions",
                "manage_roles",
              ]}
            >
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => {
                  open();
                  setDeleteUser(item);
                }}
                disabled={item._id == user?._id}
              >
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </AccessControl>
          )}
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
          <Avatar size={"lg"} src={deleteUser?.avatar} radius={"sm"} />
          <Text fz="lg" fw={500}>
            {deleteUser?.firstname} {deleteUser?.lastname}
          </Text>
        </Flex>
        <TextInput
          mt={"md"}
          label="Adminni o'chirish uchun ' delete ' so'zini yozing."
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
            onClick={() => DeleteAdmin(deleteUser?._id)}
          >
            O'chirish
          </Button>
        </Group>
      </Modal>
      {/* Edit Admin Role */}
      <Modal
        opened={EditModalOpened}
        onClose={EditHandlers.close}
        title="Edit Admin Role"
      >
        <Text>
          {editUser?.firstname} {editUser?.lastname}
        </Text>
        <form onSubmit={EditAdmin}>
          <Select
            label="Role"
            placeholder="Admin Or SupperAdmin"
            data={[
              { value: "admin", label: "Admin" },
              { value: "supperadmin", label: "SupperAdmin" },
            ]}
            withAsterisk
            defaultValue={editUser?.role}
            name="role"
            mt={"lg"}
          />

          <MultiSelect
            label="Permissions"
            data={["read", "write", "delete", "update"]}
            withAsterisk
            defaultValue={editUser?.permissions}
            name="permissions"
            my={"lg"}
          />

          <MultiSelect
            label="Privileges"
            data={[
              "view_reports",
              "manage_users",
              "manage_roles",
              "manage_permissions",
            ]}
            withAsterisk
            defaultValue={editUser?.privileges}
            name="privileges"
          />

          <Group mt={"xl"} grow>
            <Button color="gray">Bekor Qilish</Button>
            <Button type="submit">Saqlash</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AdminsPageTable;
