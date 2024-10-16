/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Pagination, Table, Title } from "@mantine/core";
import useSWR from "swr";

const TeacherSlugSalaryList = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users"
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = new Date().getMonth(); // 0-11 oraliqda
  const currentMonth = months[currentMonthIndex];

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <>
      <Title mt={"md"} order={5} tt={"uppercase"}>
        Salary
      </Title>
      <Table.ScrollContainer minWidth={1000}>
        <Table
          verticalSpacing={"sm"}
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          mt={"md"}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={"center"}>Year</Table.Th>
              <Table.Th>Month</Table.Th>

              <Table.Th>Salary 1</Table.Th>
              <Table.Th>Salary 2</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((element: any) => (
              <Table.Tr key={element.name}>
                <Table.Td ta={"center"}>{new Date().getFullYear()}</Table.Td>
                <Table.Td>{currentMonth}</Table.Td>
                <Table.Td>5000000 sum</Table.Td>
                <Table.Td>5000000 sum</Table.Td>
                <Table.Td>10 000 000 sum</Table.Td>
                <Table.Td>
                  <Badge>To'langan</Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Pagination mt={"sm"} total={10} size="md" />
    </>
  );
};

export default TeacherSlugSalaryList;
