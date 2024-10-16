/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Badge, Table } from "@mantine/core";
import { IconBrandTelegram, IconDots, IconPhone } from "@tabler/icons-react";
import useSWR from "swr";

const ClassSlugTable = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <>
      <Table.ScrollContainer minWidth={1200}>
        <Table verticalSpacing={"sm"} striped withTableBorder mt={"md"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={"center"}>N</Table.Th>
              <Table.Th w={250}>Full Name</Table.Th>
              <Table.Th>Passport</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Parent Name</Table.Th>
              <Table.Th>Parent Phone</Table.Th>
              <Table.Th>Class</Table.Th>
              <Table.Th ta={"center"}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((element: any, i: number) => (
              <Table.Tr key={element.name}>
                <Table.Td w={50} ta={"center"}>
                  {i + 1}
                </Table.Td>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>AA1234567</Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" radius={"xl"}>
                    <IconPhone size={16} />
                  </ActionIcon>
                  <ActionIcon variant="light" radius={"xl"} disabled ml={"xs"}>
                    <IconBrandTelegram size={16} />
                  </ActionIcon>
                </Table.Td>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" radius={"xl"}>
                    <IconPhone size={16} />
                  </ActionIcon>
                  <ActionIcon variant="light" radius={"xl"} disabled ml={"xs"}>
                    <IconBrandTelegram size={16} />
                  </ActionIcon>
                </Table.Td>
                <Table.Td>
                  <Badge size="md" variant="light" color="blue">
                    7-Class
                  </Badge>
                </Table.Td>
                <Table.Td ta={"center"}>
                  <ActionIcon variant="light">
                    <IconDots size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
};

export default ClassSlugTable;
