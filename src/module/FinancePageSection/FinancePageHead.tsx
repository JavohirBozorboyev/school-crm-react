import { ActionIcon, Box, Grid, Group, Paper, Text } from "@mantine/core";
import {
  IconCoin,
  IconUserHexagon,
  IconUsersGroup,
  IconUserStar,
} from "@tabler/icons-react";
import PriceFormatter from "../../utils/PriceFormatter";
import { BarChart } from "@mantine/charts";

export const data = [
  { month: "January", Smartphones: 400, Laptops: 300, Tablets: 100 },
  { month: "February", Smartphones: 400, Laptops: 100, Tablets: 300 },
  { month: "March", Smartphones: 400, Laptops: 200, Tablets: 200 },
  { month: "April", Smartphones: 400, Laptops: 300, Tablets: 100 },
  { month: "May", Smartphones: 400, Laptops: 390, Tablets: 10 },
  { month: "June", Smartphones: 350, Laptops: 50, Tablets: 100 },
];

const FinancePageHead = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, xl: 3 }}>
          <Paper withBorder p={"sm"}>
            <Group>
              <ActionIcon size={"xl"}>
                <IconUsersGroup />
              </ActionIcon>
              <Box>
                <Text size="xs" c={"dimmed"} tt={"uppercase"} fw={"600"}>
                  Umumiy O'quvchilar
                </Text>
                <Text fw={"bold"} size="xl">
                  450
                </Text>
              </Box>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, xl: 3 }}>
          <Paper withBorder p={"sm"}>
            <Group>
              <ActionIcon size={"xl"} color="cyan">
                <IconUserHexagon />
              </ActionIcon>
              <Box>
                <Text size="xs" c={"dimmed"} tt={"uppercase"} fw={"600"}>
                  Umumiy O'qtuvchilar
                </Text>
                <Text fw={"bold"} size="xl">
                  36
                </Text>
              </Box>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, xl: 3 }}>
          <Paper withBorder p={"sm"}>
            <Group>
              <ActionIcon size={"xl"} color="indigo">
                <IconUserStar />
              </ActionIcon>
              <Box>
                <Text size="xs" c={"dimmed"} tt={"uppercase"} fw={"600"}>
                  Umumiy Ishchilar
                </Text>
                <Text fw={"bold"} size="xl">
                  16
                </Text>
              </Box>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, xl: 3 }}>
          <Paper withBorder p={"sm"}>
            <Group>
              <ActionIcon size={"xl"} color="yellow">
                <IconCoin />
              </ActionIcon>
              <Box>
                <Text size="xs" c={"dimmed"} tt={"uppercase"} fw={"600"}>
                  Maktab Balansi
                </Text>
                <Text fw={"bold"} size="xl">
                  <PriceFormatter value={20000000} />
                </Text>
              </Box>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper withBorder mt={"md"}>
        <Text fw={"600"} p={"sm"} size="xl">
          To'lovlar
        </Text>
        <BarChart
          h={500}
          data={data}
          dataKey="month"
          series={[
            { name: "Smartphones", color: "blue" },
            { name: "Laptops", color: "teal" },
            { name: "Tablets", color: "red" },
          ]}
          tickLine="none"
          withLegend
          withYAxis={true}
          legendProps={{ verticalAlign: "bottom", height: 50 }}
        />
      </Paper>
    </div>
  );
};

export default FinancePageHead;
