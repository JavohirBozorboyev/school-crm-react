/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paper, Grid, MultiSelect, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

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
  setExamResult: any; // Funksiya turi
  examResult: string[]; // Natijalar massiv turi
}

const AddExamResultCard = ({
  group,
  groups,
  subjectSellectData,
  teacherSellectData,
  setExamResult,
  examResult,
}: Props) => {
  const defaultSubjectTeacher = groups
    .find((fi: { _id: string }) => fi._id === group)
    ?.subjectTeacher?.map((item: { _id: string }) => item?._id);

  const defaultSubjects = groups
    .find((fi: { _id: string }) => fi._id === group)
    ?.subjects?.map((item: { _id: string }) => item?._id);

  const [result, setResult] = useState({
    groupInfo: group,
    teachers: defaultSubjectTeacher,
    subjects: defaultSubjects,
  });

  useEffect(() => {
    // setExamResult([
    //   ...examResult.filter((fi) => fi?.groupInfo !== group),
    //   result,
    // ]);
  }, [result, setResult]);

  return (
    <>
      <Paper p={"sm"} withBorder my={"sm"}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
            <Text>
              {
                groups?.find(
                  (g: { title: string; _id: string }) => g._id === group
                )?.title
              }
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
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
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
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
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default AddExamResultCard;
