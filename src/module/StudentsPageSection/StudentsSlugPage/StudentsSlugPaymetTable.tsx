/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Pagination, Table, Title, Image } from "@mantine/core";
import useSWR from "swr";

const StudentsSlugPaymentTable = () => {
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
          mt={"md"}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={"center"}>Yil</Table.Th>
              <Table.Th>Oy</Table.Th>

              <Table.Th>To'lov</Table.Th>
              <Table.Th>To'lov 2</Table.Th>
              <Table.Th>Umumiy to'lov</Table.Th>
              <Table.Th>To'lov Qog'ozi</Table.Th>
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
                  <Image
                    w={100}
                    radius="xs"
                    src="https://www.digiseller.ru/preview/196233/p1_50508190510387.JPG"
                  />
                </Table.Td>
                <Table.Td>
                  <Badge color="green">To'langan</Badge>
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

export default StudentsSlugPaymentTable;
