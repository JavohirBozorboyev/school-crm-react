/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Divider,
  Flex,
  Grid,
  Paper,
  TextInput,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface Props {
  group: GroupData;
  item: {
    title: string;
  };
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
const ExamResultIdPageCard = ({ item, group }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [examResult, setExamResult] = useState<
    { studentId: string; result: string }[]
  >([]);

  const handleResultChange = (studentId: string, value: string) => {
    setExamResult((prev) => {
      const existing = prev.find((res) => res.studentId === studentId);
      if (existing) {
        return prev.map((res) =>
          res.studentId === studentId ? { ...res, result: value } : res
        );
      }
      return [...prev, { studentId, result: value }];
    });
  };

  console.log(examResult, user);

  return (
    <>
      <Paper p={"md"} withBorder>
        <Grid align="center">
          <Grid.Col span={8}>
            <Text py={"2px"} fw={"600"} fz={"sm"} c={"cyan"}>
              Ism Familiya
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text py={"2px"} fw={"600"} ta={"center"} fz={"sm"} c={"cyan"}>
              {item?.title}
            </Text>
          </Grid.Col>
        </Grid>
        <Divider my={"sm"} />
        {group?.students?.map((student, i) => {
          return (
            <Grid key={i} align="center">
              <Grid.Col span={8}>
                <Text py={"2px"} fz={"sm"}>
                  {student?.fullname}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  variant="filled"
                  size="xs"
                  value={
                    examResult.find((res) => res.studentId === student?._id)
                      ?.result || ""
                  }
                  onChange={(e) =>
                    handleResultChange(student._id, e.target.value)
                  }
                />
              </Grid.Col>
            </Grid>
          );
        })}
        <Divider mt={"md"} mb={"sm"} />
        <Flex justify={"flex-end"}>
          <Button size="xs">Natijalarni Saqlash</Button>
        </Flex>
      </Paper>
    </>
  );
};

export default ExamResultIdPageCard;
