/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, Card, Divider, Grid, Group, Text } from "@mantine/core";

const ExamResultPageGroupCard = ({
  item,
  search,
}: {
  item: any;
  search: string;
}) => {
  console.log(item, search);

  return (
    <div>
      <Grid>
        {item?.group?.map((group: any, i: number) => {
          return (
            <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <Card padding="sm" radius="md" withBorder>
                <Group justify="space-between">
                  <Text fw={500} size="lg">
                    {" "}
                    {group?.groupInfo?.title}
                  </Text>
                  <Badge color="blue" variant="light">
                    {group?.groupInfo?.status}
                  </Badge>
                </Group>

                <Divider my={"xs"} />
                <Group gap={"xs"}>
                  <Text fw={500} size="xs" c={"gray"}>
                    {"Fanlar:"}
                  </Text>
                  {group?.subjects?.map(
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
                  {group?.teachers?.map(
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

                <Button color="blue" fullWidth mt="md" size="xs">
                  Baxolash
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default ExamResultPageGroupCard;
