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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import axios from "axios";
import { useParams } from "react-router";

interface Props {
  groupData?: {
    students?: { _id: string; fullname: string }[];
    group: { _id: string; title: string };
  };
  item?: {
    title: string;
    _id: string;
  };
  teacher?: {
    _id: string;
    firstname: string;
    lastname: string;
  } | null;
}

const ExamResultIdPageCard = ({ item, groupData, teacher }: Props) => {
  const { slug, id } = useParams();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [examResult, setExamResult] = useState<
    { student: string; grade: string }[]
  >([]);

  useEffect(() => {
    if (groupData?.students?.length) {
      setExamResult(
        groupData.students.map((student) => ({
          student: student._id,
          grade: " ",
        }))
      );
    }
  }, [groupData?.students]);

  const handleResultChange = (studentId: string, value: string) => {
    setExamResult((prev) => {
      const existing = prev.find((res) => res.student === studentId);
      if (existing) {
        return prev.map((res) =>
          res.student === studentId ? { ...res, grade: value.trim() } : res
        );
      }
      return [...prev, { student: studentId, grade: value.trim() }];
    });
  };

  const addExamResult = async () => {
    setLoading(true);
    const creatorType = user?.role == "teacher" ? "Teacher" : "Admin";
    try {
      const res = await axios.post("/api/exam/exam-grades", {
        examInfo: slug,
        groupInfo: id,
        teacherInfo: teacher?._id || null,
        subjectInfo: item?._id,
        grades: examResult,
        maxScore: "",
        creator: user?._id,
        creatorType,
      });
      console.log(res);
      if (res.status == 201) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


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
        {groupData?.students?.map((student, i) => {
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
                    examResult.find((res) => res.student === student?._id)
                      ?.grade || ""
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
          <Button size="xs" onClick={addExamResult} loading={loading}>
            Natijalarni Saqlash
          </Button>
        </Flex>
      </Paper>
    </>
  );
};

export default ExamResultIdPageCard;
