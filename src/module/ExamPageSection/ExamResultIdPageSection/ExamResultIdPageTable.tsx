/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Flex, Table, TextInput } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { RootState } from "../../../store";

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

  const user = useSelector((state: RootState) => state.auth.user);
  const subjectIndidual = group?.subjects?.filter(
    (fil) => fil._id == user?.subject?._id
  );

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

              {subjectIndidual?.map((subject) => (
                <Table.Th key={subject._id} ta={"center"}>
                  {subject.title}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Flex justify={"flex-end"} mt={20}>
        <Button>Natijalarni Saqlash</Button>
      </Flex>
    </div>
  );
};

export default ExamResultIdPageTable;
