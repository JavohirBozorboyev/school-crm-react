import { Container, Title, Group, Button, Text, Flex } from "@mantine/core";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Container>
        <Flex
          style={{ minHeight: "100vh" }}
          align={"center"}
          justify={"center"}
          direction="column"
          gap={"lg"}
        >
          <Title order={1}>404</Title>
          <Title order={3}>You have found a secret place.</Title>
          <Text c="dimmed" size="sm" ta="center">
            Unfortunately, this is only a 404 page. You may have mistyped the
            address, or the page has been moved to another URL.
          </Text>
          <Group justify="center">
            <NavLink to={"/"}>
              <Button variant="light" size="md">
                Take me back to home page
              </Button>
            </NavLink>
          </Group>
        </Flex>
      </Container>
    </>
  );
};

export default NotFound;
