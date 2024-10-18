import { ActionIcon, Box, Grid, Group, Paper, Text } from "@mantine/core";
import {
  IconCoin,
  IconUserHexagon,
  IconUsersGroup,
  IconUserStar,
} from "@tabler/icons-react";
import PriceFormatter from "../../utils/PriceFormatter";

const FinancePageHead = () => {
  return (
    <div>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
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
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
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
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
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
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
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
    </div>
  );
};

export default FinancePageHead;
