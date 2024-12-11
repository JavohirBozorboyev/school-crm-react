/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import {
  IconArrowRight,
  IconPencil,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";
import useSWR from "swr";
import AccessControl from "../../security/AccessControl";
import { useEffect, useState } from "react";
const StudentPageTable = ({ filter }: any) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limt: 5,
  });
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [filter]);
  const { data, error, isLoading } = useSWR(
    `/api/students?page=${pagination.page}&limit=${pagination.limt}&search=${
      debouncedFilter?.search || ""
    }`
  );
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <>
      <Table.ScrollContainer minWidth={1600}>
        <Table
          verticalSpacing={"sm"}
          withTableBorder
          mt={"md"}
          withColumnBorders
          highlightOnHover
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={"center"}>N</Table.Th>
              <Table.Th w={250}>Ism Familiya</Table.Th>
              <Table.Th w={100}>Sinf</Table.Th>
              <Table.Th>Passport</Table.Th>
              <Table.Th>Kantaktlar</Table.Th>
              <Table.Th w={350}>Manzil</Table.Th>
              <Table.Th w={250}>Ota-Ona ismi</Table.Th>
              <Table.Th align="center" miw={150}>
                Ota-Ona Kantaktlari
              </Table.Th>

              <Table.Th ta={"center"} w={120}>
                Tahrirlash
              </Table.Th>
              <Table.Th ta={"center"} w={120}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.students?.map((item: any, i: number) => (
              <Table.Tr key={i}>
                <Table.Td w={50} ta={"center"}>
                  {i + 1}
                </Table.Td>
                <Table.Td>
                  <Group gap={"xs"}>
                    {" "}
                    <Avatar color="blue" size={"sm"} radius={"sm"} />
                    <Text size="sm">{item?.fullname}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge size="md" variant="light" color="indigo">
                    {item?.group?.title}
                  </Badge>
                </Table.Td>
                <Table.Td>{item?.passport}</Table.Td>
                <Table.Td>
                  <NavLink to={`tel:${item?.phone}`}>
                    <ActionIcon variant="light" radius={"xl"}>
                      <IconPhone size={16} />
                    </ActionIcon>
                  </NavLink>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item?.address}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={"xs"}>
                    {" "}
                    <Avatar color="cyan" size={"sm"} radius={"sm"} />
                    <Text size="sm">{item?.father}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <NavLink to={`tel:${item?.fatherPhone}`}>
                    <ActionIcon variant="light" radius={"xl"}>
                      <IconPhone size={16} />
                    </ActionIcon>
                  </NavLink>
                  <NavLink to={`tel:${item?.motherPhone}`}>
                    <ActionIcon
                      color="indigo"
                      variant="light"
                      radius={"xl"}
                      ml={"xs"}
                    >
                      <IconPhone size={16} />
                    </ActionIcon>
                  </NavLink>
                </Table.Td>

                <Table.Td ta={"center"}>
                  <AccessControl
                    requiredPermissions={["delete", "read"]}
                    requiredPrivileges={["manage_users", "view_reports"]}
                  >
                    <ActionIcon mr={"xs"} variant="light" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </AccessControl>
                  <AccessControl
                    requiredPermissions={["update", "read"]}
                    requiredPrivileges={["manage_users", "view_reports"]}
                  >
                    <ActionIcon variant="light" color="blue">
                      <IconPencil size={16} />
                    </ActionIcon>
                  </AccessControl>
                </Table.Td>
                <Table.Td ta={"center"}>
                  <Link to={`/students/${item.id}`}>
                    <Button
                      variant="subtle"
                      size="xs"
                      rightSection={<IconArrowRight size={16} />}
                    >
                      Ko'rish
                    </Button>{" "}
                  </Link>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Pagination
        total={data?.totalPages}
        mt={"md"}
        onChange={(e) => {
          setPagination({ ...pagination, page: e });
        }}
        value={data?.currentPage}
      />
    </>
  );
};

export default StudentPageTable;
