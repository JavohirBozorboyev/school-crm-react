import { Grid } from "@mantine/core";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import ExamResultIdPageCard from "./ExamResultIdPageCard";
interface Props {
  groupId: GroupData;
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
const ExamResultIdPageList = ({ groupId, group }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);


  return (
    <div>
      {user?.role == "teacher" && (
        <Grid mt={"md"}>
          {groupId.subjects
            ?.filter((fil) => fil._id == user?.subject?._id)
            .map((item) => {
              return (
                <Grid.Col key={item?._id} span={{ base: 12, md: 6, xl: 4 }}>
                  <ExamResultIdPageCard item={item} group={group} />
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
                <ExamResultIdPageCard item={item} group={group} />
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default ExamResultIdPageList;
