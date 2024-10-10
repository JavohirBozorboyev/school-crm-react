/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@mantine/core";
import useSWR from "swr";

const ClassSlugTable = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  const rows = data.map((element: any, i: number) => (
    <Table.Tr key={element.name}>
      <Table.Td w={50} ta={"center"}>
        {i + 1}
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
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
            <Table.Th ta={"center"}>N</Table.Th>
            <Table.Th>Full Name</Table.Th>

            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default ClassSlugTable;
