import {
  Avatar,
  Box,
  Grid,
  Paper,
  Title,
  Text,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { IconId, IconMail, IconPhone } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const ProfilPage = () => {
  return (
    <>
      <div>
        <Paper withBorder>
          <Paper p={"md"} bg={"blue.3"} h={"80px"} radius={"xs"}>
            <Avatar variant="filled" color={"blue"} size={"xl"} mt={"lg"} />
          </Paper>
          <Box mt={"50px"} p={"md"}>
            <Title order={2}>John doe</Title>
            <Text c={"dimmed"} mt={"xs"}>
              Teacher
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
      </div>
    </>
  );
};

export default ProfilPage;
