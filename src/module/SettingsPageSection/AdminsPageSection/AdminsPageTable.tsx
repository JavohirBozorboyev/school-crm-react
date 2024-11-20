import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import AccessControl from "../../../security/AccessControl";

const AdminsPageTable = ({ data }: any) => {
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
            <ActionIcon variant="subtle" color="red">
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
  );
};

export default AdminsPageTable;
