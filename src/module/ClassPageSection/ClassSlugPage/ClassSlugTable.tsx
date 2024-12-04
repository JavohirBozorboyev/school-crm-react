/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Badge, Button, Menu, rem, Table } from "@mantine/core";
import {
  IconArrowRight,
  IconBrandTelegram,
  IconDots,
  IconPhone,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const ClassSlugTable = ({ data }: any) => {
  console.log(data);

  return (
    <>
      <Table.ScrollContainer minWidth={1200}>
        <Table verticalSpacing={"sm"} striped withTableBorder mt={"md"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={"center"}>N</Table.Th>
              <Table.Th w={250}>Ism Familiya</Table.Th>
              <Table.Th>Passport</Table.Th>
              <Table.Th>Kantaktlar</Table.Th>
              <Table.Th>Ota-Ona ismi</Table.Th>
              <Table.Th align="center">Ota-Ona Kantaktlari</Table.Th>
              <Table.Th>Sinf</Table.Th>
              <Table.Th ta={"center"}>Tahrirlash</Table.Th>
              <Table.Th ta={"center"} w={150}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((element: any, i: number) => (
              <Table.Tr key={element._id}>
                <Table.Td w={50} ta={"center"}>
                  {i + 1}
                </Table.Td>
                <Table.Td>{element?.fullname}</Table.Td>
                <Table.Td>{element?.passport}</Table.Td>
                <Table.Td>
                  <Link to={`tel:${element?.phone}`}>
                    <ActionIcon variant="light" radius={"xl"}>
                      <IconPhone size={16} />
                    </ActionIcon>
                  </Link>
                  <ActionIcon variant="light" radius={"xl"} disabled ml={"xs"}>
                    <IconBrandTelegram size={16} />
                  </ActionIcon>
                </Table.Td>
                <Table.Td>{element?.father}</Table.Td>
                <Table.Td>
                  <Link to={`tel:${element?.fatherPhone}`}>
                    <ActionIcon variant="light" radius={"xl"}>
                      <IconPhone size={16} />
                    </ActionIcon>
                  </Link>
                  <ActionIcon variant="light" radius={"xl"} disabled ml={"xs"}>
                    <IconBrandTelegram size={16} />
                  </ActionIcon>
                  <Menu shadow="md" width={200} withArrow>
                    <Menu.Target>
                      <ActionIcon variant="light" radius={"xl"} ml={"xs"}>
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Contactlar</Menu.Label>
                      <Menu.Item
                        leftSection={
                          <IconPhone
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Contact 1
                      </Menu.Item>
                      <Menu.Item
                        leftSection={
                          <IconPhone
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Contact 2
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Label>Contact Taxrirlash</Menu.Label>
                      <Menu.Item
                        leftSection={
                          <IconPlus
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                        color="cyan"
                      >
                        Yangi Contact
                      </Menu.Item>
                      <Menu.Item
                        leftSection={
                          <IconTrash
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                        color="red"
                      >
                        Contact O'chirish
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
                <Table.Td>
                  <Badge size="md" variant="light" color="indigo">
                    7-Class
                  </Badge>
                </Table.Td>
                <Table.Td ta={"center"}>
                  <ActionIcon variant="light" color="cyan">
                    <IconDots size={16} />
                  </ActionIcon>
                </Table.Td>
                <Table.Td ta={"center"}>
                  <Link to={`/students/${element?._id}`}>
                    <Button
                      variant="subtle"
                      size="xs"
                      rightSection={<IconArrowRight size={16} />}
                    >
                      Malumotlar
                    </Button>
                  </Link>
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
