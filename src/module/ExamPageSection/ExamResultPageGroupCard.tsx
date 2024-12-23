import { Badge, Button, Card, Divider, Grid, Group, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

interface GroupInfo {
  title: string;
  status: string;
  _id: string;
}

interface Subject {
  title: string;
}

interface Teacher {
  firstname: string;
}

interface Item {
  _id: string;
  group: {
    groupInfo: GroupInfo;
    subjects: Subject[];
    teachers: Teacher[];
  }[];
}

interface Element {
  groupInfo: GroupInfo;
  subjects: Subject[];
  teachers: Teacher[];
}

const ExamResultPageGroupCard = ({ item }: { item: Item; search?: string }) => {
  return (
    <div>
      <Grid >
        {item?.group?.map((element: Element, i: number) => {
          return (
            <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 4, xl: 3 }}>
              <Card padding="sm" radius="sm" withBorder>
                <Group justify="space-between">
                  <Text fw={500} size="lg">
                    {" "}
                    {element?.groupInfo?.title}
                  </Text>
                  <Badge color="blue" variant="light">
                    {element?.groupInfo?.status}
                  </Badge>
                </Group>

                <Divider my={"xs"} />
                <Group gap={"xs"}>
                  <Text fw={500} size="xs" c={"gray"}>
                    {"Fanlar:"}
                  </Text>
                  {element?.subjects?.map(
                    (
                      sub: {
                        title: string;
                      },
                      i: number
                    ) => {
                      return (
                        <Badge
                          key={i}
                          color="gray"
                          radius={"sm"}
                          size="xs"
                          variant="light"
                          c={"dark"}
                        >
                          {sub?.title}
                        </Badge>
                      );
                    }
                  )}
                </Group>
                <Divider my={"xs"} />
                <Group gap={"xs"}>
                  <Text fw={500} size="xs" c={"gray"}>
                    {"Ustozlar:"}
                  </Text>
                  {element?.teachers?.map(
                    (
                      sub: {
                        firstname: string;
                      },
                      i: number
                    ) => {
                      return (
                        <Badge
                          key={i}
                          color="gray"
                          radius={"sm"}
                          size="xs"
                          variant="light"
                          c={"dark"}
                        >
                          {sub?.firstname}
                        </Badge>
                      );
                    }
                  )}
                </Group>

                <NavLink
                  to={`/exam/exam-results/${item?._id}/${element?.groupInfo?._id}`}
                >
                  <Button
                    fullWidth
                    color="blue"
                    mt="sm"
                    size="xs"
                  >
                    {"Natijalarni ko'rish"}
                  </Button>
                </NavLink>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ExamResultPageGroupCard;
