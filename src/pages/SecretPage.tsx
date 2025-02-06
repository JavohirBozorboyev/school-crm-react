import { Container, Title, Group, Button, Flex } from "@mantine/core";
import { NavLink } from "react-router-dom";

const SecretPage = () => {
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
          <Title order={1}>Kechirasiz</Title>
          <Title order={3} ta={'center'}>
            Sizga bu sahifaga kirish uchun ruxsat berilmagan
          </Title>

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

export default SecretPage;
