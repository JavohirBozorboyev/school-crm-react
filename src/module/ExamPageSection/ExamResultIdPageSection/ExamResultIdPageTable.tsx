import { Table, TextInput } from "@mantine/core";
import { useParams } from "react-router-dom";
import useSWR from "swr";

interface Props {
  group: GroupData;
}
interface Student {
  _id: string;
  fullname: string;
}

interface GroupData {
  students: Student[];
  subjects: Subject[];
}

interface Subject {
  _id: string;
  title: string;
}

const ExamResultIdPageTable = ({ group }: Props) => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useSWR(`/api/groups/${id}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  // console.log(group);

  const rows = (data as GroupData)?.students.map(
    (element: Student, i: number) => (
      <Table.Tr key={element._id}>
        <Table.Td ta={"center"}>{i + 1}</Table.Td>
        <Table.Td>{element.fullname}</Table.Td>
        {group?.subjects?.map((el) => {
          return (
            <Table.Td ta={"center"} key={el._id}>
              <TextInput size="xs" />
            </Table.Td>
          );
        })}
      </Table.Tr>
    )
  );
  return (
    <div>
      <Table.ScrollContainer minWidth={800}>
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing={"xs"}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50} ta={"center"}>
                №
              </Table.Th>
              <Table.Th miw={220}>Ism Familiya</Table.Th>
              {group?.subjects?.map((el) => (
                <Table.Th ta={"center"} key={el._id}>
                  {el.title}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default ExamResultIdPageTable;
