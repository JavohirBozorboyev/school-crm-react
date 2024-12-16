/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Group, Pagination, Table, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";
import useSWR from "swr";
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
    }&status=${debouncedFilter?.status || ""}`
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
              <Table.Th w={250}>Ism Familiya</Table.Th>
              <Table.Th w={150}>Sinf</Table.Th>
              <Table.Th w={150}>Passport</Table.Th>
              <Table.Th w={200}>Kantaktlar</Table.Th>
              <Table.Th w={350}>Manzil</Table.Th>
              <Table.Th w={300}>Ota-Ona ismi</Table.Th>
              <Table.Th align="center" miw={200}>
                Ota-Ona Kantaktlari
              </Table.Th>
              <Table.Th w={150}>Status</Table.Th>
              <Table.Th ta={"center"} w={120}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.students?.map((item: any, i: number) => (
              <Table.Tr key={i}>
                <Table.Td>
                  <Group gap={"xs"}>
                    {" "}
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
                    <Text c="blue.6">{item?.phone}</Text>
                  </NavLink>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{item?.address}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={"xs"}>
                    {" "}
                    <Text size="sm">{item?.father}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <NavLink to={`tel:${item?.fatherPhone}`}>
                    <Text c="blue.6">{item?.fatherPhone}</Text>
                  </NavLink>
                </Table.Td>

                <Table.Td>
                  <Badge
                    color={`${item?.status == "active" ? "blue" : "yellow"}`}
                  >
                    {item?.status}
                  </Badge>
                </Table.Td>
                <Table.Td ta={"center"}>
                  <Link to={`/students/${item._id}`}>
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
