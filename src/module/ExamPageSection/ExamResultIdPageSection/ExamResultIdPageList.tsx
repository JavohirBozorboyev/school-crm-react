import { Grid } from "@mantine/core";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import ExamResultIdPageCard from "./ExamResultIdPageCard";
interface Props {
  groupData?: {
    students?: { _id: string; fullname: string }[];
    group: { _id: string; title: string };
  };
  groupId: {
    _id: string;
    subjects: { _id: string; title: string }[];
    teachers?:
      | { firstname: string; lastname: string; _id: string }[]
      | undefined
      | null;
  };
  maxScore: number | string;
}

const ExamResultIdPageList = ({ groupId, groupData, maxScore }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const teacher = groupId?.teachers?.find((item) => item._id === user?._id);

  return (
    <div>
      {user?.role == "teacher" && (
        <Grid mt={"md"}>
          {groupId.subjects
            ?.filter((fil) => fil._id == user?.subject?._id)
            .map((item) => {
              return (
                <Grid.Col key={item?._id} span={{ base: 12, md: 6, xl: 4 }}>
                  <ExamResultIdPageCard
                    item={item}
                    groupData={groupData}
                    teacher={teacher === undefined ? null : teacher}
                    maxScore={maxScore}
                  />
                </Grid.Col>
              );
            })}
        </Grid>
      )}
      {(user?.role == "admin" || user?.role == "supperadmin") && (
        <Grid mt={"md"}>
          {groupId.subjects?.map((item) => {
            return (
              <Grid.Col key={item?._id} span={{ base: 12, md: 6, xl: 4 }}>
                <ExamResultIdPageCard
                  item={item}
                  groupData={groupData}
                  teacher={teacher === undefined ? null : teacher}
                  maxScore={maxScore}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default ExamResultIdPageList;
