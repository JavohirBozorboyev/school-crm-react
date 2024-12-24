/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TextInput } from "@mantine/core";
import { useState } from "react";
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
  const [examResult, setExamResult] = useState<
    { studentId: string; result: string }[]
  >([]);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;


  const rows = (data as GroupData)?.students.map(
    (element: Student, i: number) => (
      <Table.Tr key={element._id}>
        <Table.Td ta={"center"}>{i + 1}</Table.Td>
        <Table.Td>{element.fullname}</Table.Td>

        <Table.Td ta={"center"}>
          <TextInput
            size="xs"
            onChange={(e) => {
              setExamResult((prev) => {
                const existingIndex = prev.findIndex(
                  (item) => item.studentId === element._id
                );

                if (existingIndex !== -1) {
                  const updatedResults = [...prev];
                  updatedResults[existingIndex].result = e.target.value;
                  return updatedResults;
                } else {
                  return [
                    ...prev,
                    { studentId: element._id, result: e.target.value },
                  ];
                }
              });
            }}
          />
        </Table.Td>
      </Table.Tr>
    )
  );
  return (
    <div>
      <Table.ScrollContainer minWidth={"auto"}>
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

              <Table.Th ta={"center"}>Informatika</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default ExamResultIdPageTable;
