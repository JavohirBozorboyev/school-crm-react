/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Divider,
  Flex,
  Grid,
  Paper,
  TextInput,
  Text,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import axios from "axios";
import { useParams } from "react-router";
import { notifications } from "@mantine/notifications";
import useSWR, { mutate } from "swr";
import { getHotkeyHandler } from "@mantine/hooks";

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
  maxScore: number | string;
}

interface GradeProps {
  student: {
    _id: string;
  };
  grade: string;
  subjectInfo: {
    _id: string;
    title: string;
  };
}

const ExamResultIdPageCard = ({
  item,
  groupData,
  teacher,
  maxScore,
}: Props) => {
  const { slug, id } = useParams();
  const { data, isLoading } = useSWR(
    `/api/exam/exam-grades/${slug}?class=${id}`
  );
  const gredeResult = data?.find(
    (serch: GradeProps) => serch.subjectInfo._id === item?._id
  );
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [examResult, setExamResult] = useState<
    { student: string; grade: string }[]
  >([]);

  useEffect(() => {
    if (gredeResult?.grades?.length) {
      setExamResult(
        groupData?.students?.map((student) => {
          const existingGrade = gredeResult.grades.find(
            (grade: GradeProps) => grade.student._id === student._id
          );
          return {
            student: student._id,
            grade: existingGrade?.grade || " ",
          };
        }) || []
      );
    } else if (groupData?.students?.length) {
      setExamResult(
        groupData.students.map((student) => ({
          student: student._id,
          grade: " ",
        }))
      );
    }
  }, [groupData?.students, gredeResult]);

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
        maxScore: maxScore,
        creator: user?._id,
        creatorType,
      });
      if (res.status == 201) {
        mutate(`/api/exam/exam-grades/${slug}?class=${id}`);
        setLoading(false);
        notifications.show({
          title: "Imtixon ma'lumotlari qo'shildi",
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      setLoading(false);
      notifications.show({
        title: "Xatolik imtixon natijasi saqlanmadi",
        message: "",
        withBorder: true,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };
  const updateExamResult = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/exam/exam-grades/${slug}?class=${id}`, {
        subjectInfo: item?._id,
        grades: examResult,
      });
      if (res.status === 200) {
        mutate(`/api/exam/exam-grades/${slug}?class=${id}`); // SWR ma'lumotlarini yangilash
        notifications.show({
          title: "Imtixon natijalari yangilandi",
          message: "",
          withBorder: true,
        });
      }
    } catch (error) {
      console.error("Error updating exam results:", error);
      notifications.show({
        title: "Xatolik natijalar yangilanmadi",
        message: "",
        withBorder: true,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const SaveData = () => {
    if (gredeResult) {
      updateExamResult();
    } else {
      addExamResult();
    }
  };

  if (isLoading) return <div>загрузка...</div>;
  return (
    <>
      <Paper p={"md"} withBorder>
        <Paper bg={"blue"} radius={"sm"} py={"4px"} mb="md">
          <Text
            py={"2px"}
            fw={"600"}
            fz={"sm"}
            ta={"center"}
            c={"white"}
            tt={"uppercase"}
          >
            {item?.title}
          </Text>
        </Paper>
        <Grid align="center">
          <Grid.Col span={8}>
            <Text py={"2px"} fw={"600"} fz={"sm"} c={"blue"} tt={"uppercase"}>
              Ism Familiya
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text py={"2px"} fw={"600"} ta={"center"} fz={"sm"} c={"blue"}>
              {maxScore} - BALL
            </Text>
          </Grid.Col>
        </Grid>
        {groupData?.students?.length != 0 && <Divider my={"sm"} />}

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
                  onKeyDown={getHotkeyHandler([["ctrl+s", SaveData]])}
                />
              </Grid.Col>
            </Grid>
          );
        })}
        {groupData?.students?.length === 0 && (
          <Paper p={"md"} withBorder mt={"lg"}>
            <Text py={"2px"} fz={"sm"} ta={"center"}>
              O'quvchi Topilmadi !
            </Text>
          </Paper>
        )}
        {groupData?.students?.length != 0 && (
          <>
            <Divider mt={"md"} mb={"sm"} />
            <Flex justify={"flex-end"}>
              <Button
                size="xs"
                onClick={SaveData}
                loading={loading}
                tt={"uppercase"}
              >
                Natijalarni Saqlash
              </Button>
            </Flex>
          </>
        )}
      </Paper>
    </>
  );
};

export default ExamResultIdPageCard;
