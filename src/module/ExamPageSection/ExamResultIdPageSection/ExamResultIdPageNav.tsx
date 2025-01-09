/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Breadcrumbs,
  Grid,
  Group,
  Paper,
  SegmentedControl,
  Title,
  Text,
  Divider,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { NavLink, useParams } from "react-router-dom";

interface Props {
  groupId: GroupData;
  segment: string;
  setSegment: any;
}

interface GroupData {
  groupInfo: {
    _id: string;
    title: string;
    status: string;
  };
  teachers: { firstname: string; _id: string }[];
}

const ExamResultIdPageNav = ({ groupId, segment, setSegment }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { slug } = useParams();

  const items = [
    { title: "Imtixon Natijalari", href: "/exam/exam-results" },
    { title: "Slug", href: `/exam/exam-results/${slug}` },
    { title: groupId?.groupInfo?.title, href: "" },
  ].map((item, index) => (
    <NavLink to={item.href} key={index}>
      <Text c={"blue"}>{item.title}</Text>
    </NavLink>
  ));


  return (
    <>
      <Paper>
        <Grid justify="center" align="center">
          <Grid.Col span={{ base: 12, xs: 5, sm: 4 }}>
            <Breadcrumbs>{items}</Breadcrumbs>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 7, sm: 8 }}>
            <Group justify="end" gap={"xs"}>
              <SegmentedControl
                value={segment}
                onChange={setSegment}
                data={[
                  { label: "Baxolash", value: "/exam" },
                  { label: "Natijalarni Ko'rish", value: "/grade" },
                ]}
                fullWidth
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper p={"sm"}>
              <Group justify="space-between">
                <Title order={3}>{groupId?.groupInfo?.title}</Title>
                <Group gap="xs">
                  {groupId?.teachers?.map((teacher, i) => (
                    <Badge
                      color={user?._id == teacher._id ? "blue" : "gray"}
                      variant="light"
                      key={i}
                    >
                      {teacher?.firstname}
                    </Badge>
                  ))}
                </Group>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
      <Divider />
    </>
  );
};

export default ExamResultIdPageNav;
