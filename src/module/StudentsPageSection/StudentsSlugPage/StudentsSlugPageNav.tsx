import {
  Paper,
  Avatar,
  Box,
  Title,
  Grid,
  Flex,
  ActionIcon,
  Text,
  Badge,
} from "@mantine/core";
import { IconPhone, IconMail, IconId } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import StudentsSlugPaymentTable from "./StudentsSlugPaymetTable";

const StundetsSlugPageNav = () => {
  return (
    <>
      <Paper withBorder>
        <Paper bg={"blue.3"} h={"80px"}></Paper>
        <Flex
          mt={"-40px"}
          justify={"space-between"}
          align={"center"}
          p={"md"}
          h={"80px"}
        >
          <Avatar variant="filled" color={"blue"} size={"xl"} />
          <Badge size="xl">O'quvchi</Badge>
        </Flex>
        <Box p={"md"} mt={"sm"}>
          <Title order={2}>John doe</Title>
          <Text c={"dimmed"} mt={"xs"}>
            Sinf: 7-class
          </Text>
        </Box>
        <Grid p={"md"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NavLink to={"tel:+998993912505"}>
              <Text c={"dimmed"} size="sm">
                Phone:
              </Text>
              <Flex mt={"sm"} align={"center"} gap={"sm"}>
                <ActionIcon size={"lg"} radius={"xl"}>
                  <IconPhone size={"18"} />
                </ActionIcon>
                <Text size="md" c={"blue"}>
                  +998 99 391 25 05
                </Text>
              </Flex>
            </NavLink>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NavLink to={"#"}>
              <Text c={"dimmed"} size="sm">
                Email:
              </Text>
              <Flex mt={"sm"} align={"center"} gap={"sm"}>
                <ActionIcon size={"lg"} radius={"xl"}>
                  <IconMail size={"18"} />
                </ActionIcon>
                <Text size="md" c={"blue"}>
                  bmmaktab@gmail.com
                </Text>
              </Flex>
            </NavLink>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Text c={"dimmed"} size="sm">
              Passport:
            </Text>
            <Flex mt={"sm"} align={"center"} gap={"sm"}>
              <ActionIcon size={"lg"} radius={"xl"}>
                <IconId size={"18"} />
              </ActionIcon>
              <Text size="md" c={"blue"}>
                AB 100 12 12
              </Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Paper>
      <StudentsSlugPaymentTable />
    </>
  );
};

export default StundetsSlugPageNav;
