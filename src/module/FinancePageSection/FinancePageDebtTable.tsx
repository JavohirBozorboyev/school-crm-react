/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Avatar,
  Badge,
  Grid,
  Group,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import { IconMail, IconPrinter } from "@tabler/icons-react";
import useSWR from "swr";
import PriceFormatter from "../../utils/PriceFormatter";

const FinancePageDebtTable = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <Grid mt={"md"}>
      <Grid.Col span={12}>
        <Text size="xl" fw={600}>
          {" "}
          Qarzdorlar Ro'yhati
        </Text>
      </Grid.Col>

      <Grid.Col span={{ base: 12, xl: 12 }}>
        <Table.ScrollContainer minWidth={900}>
          <Table verticalSpacing={"sm"} withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th miw={250}>Ism Familiya</Table.Th>
                <Table.Th w={150} ta={"center"}>
                  Sinf
                </Table.Th>
                <Table.Th w={150} ta={"center"}>
                  Sana
                </Table.Th>
                <Table.Th w={200} ta={"center"}>
                  Qarzdorlik
                </Table.Th>
                <Table.Th w={200} ta={"center"}>
                  To'lov
                </Table.Th>

                <Table.Th w={150} ta={"center"}>
                  Status
                </Table.Th>
                <Table.Th w={150} ta={"center"}>
                  Xabar Berish
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((element: any) => (
                <Table.Tr key={element.name}>
                  <Table.Td>
                    <Group gap={"xs"}>
                      {" "}
                      <Avatar color="blue" size={"sm"} radius={"sm"} />
                      <Text fw={600} size="sm">
                        {element.name}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <Badge size="md" variant="light" color="indigo">
                      7-Green
                    </Badge>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <Text size="sm" fw={600}>
                      Oktabr 2024
                    </Text>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <Text c="red" size="sm" fw={600}>
                      <PriceFormatter value={2000000} />
                    </Text>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <Text c="cyan" size="sm" fw={600}>
                      <PriceFormatter value={500000} />
                    </Text>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <Badge color="red" size="sm">
                      To'lanmagan
                    </Badge>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <ActionIcon variant="light">
                      <IconMail size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" ml={"sm"}>
                      <IconPrinter size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Pagination total={10} mt={"md"} />
      </Grid.Col>
    </Grid>
  );
};

export default FinancePageDebtTable;
