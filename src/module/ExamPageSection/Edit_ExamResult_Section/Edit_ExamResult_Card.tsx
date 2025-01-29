/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper, Grid, MultiSelect, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props {
  group: string;
  groups: {
    _id: string;
    title: string;
    subjectTeacher: { _id: string; fullname: string }[];
    subjects: { _id: string; title: string }[];
  }[];
  subjectSellectData: { value: string; label: string }[];
  teacherSellectData: { value: string; label: string }[];
  setExamResult: any;
  examResult?: string[];
  defaultGroupData: {
    groupInfo: {
      _id: string;
      title: string;
    };
    teachers: { _id: string }[];
    subjects: { _id: string }[];
  };
}

const Edit_ExamResult_Card = ({
  group,
  groups,
  subjectSellectData,
  teacherSellectData,
  setExamResult,
  defaultGroupData,
}: Props) => {
  const defaultSubjectTeacher = defaultGroupData.teachers.map((item) => {
    return item._id;
  });

  const defaultSubjects = defaultGroupData.subjects.map((item) => {
    return item._id;
  });

  const [result, setResult] = useState({
    groupInfo: group,
    teachers: defaultSubjectTeacher,
    subjects: defaultSubjects,
  });

  useEffect(() => {
    setExamResult((prevResults: any[]) => {
      const updatedResults = prevResults.map((item) =>
        item.groupInfo === result.groupInfo ? result : item
      );

      const isGroupExists = prevResults.some(
        (item) => item.groupInfo === result.groupInfo
      );

      return isGroupExists ? updatedResults : [...prevResults, result];
    });
  }, [result, setExamResult]);
  return (
    <>
      <Paper p={"sm"} withBorder my={"sm"}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, sm: 3, lg: 2 }}>
            <Text>
              {
                groups?.find(
                  (g: { title: string; _id: string }) => g._id === group
                )?.title
              }
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 9, lg: 5 }}>
            <MultiSelect
              label="Imtixon Fanlari"
              placeholder="Fanlar"
              description="Belgilangan fanlardan imtixon olinadi"
              data={subjectSellectData}
              onChange={(e) => {
                setResult({
                  ...result,
                  subjects: e,
                });
              }}
              clearable
              defaultValue={defaultSubjects}
              variant="filled"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 12, lg: 5 }}>
            <MultiSelect
              label="Fan Ustozlari"
              placeholder="Ustozlar"
              description="Belgilangan ustozlar imtixon natijalarni kirita oladi."
              data={teacherSellectData}
              clearable
              defaultValue={defaultSubjectTeacher}
              onChange={(e) => {
                setResult({
                  ...result,
                  teachers: e,
                });
              }}
              variant="filled"
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default Edit_ExamResult_Card;
