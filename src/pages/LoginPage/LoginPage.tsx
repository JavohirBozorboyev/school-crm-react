import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { login } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function Login(e: { email: string; password: string }) {
    try {
      const res = await axios.post(`http://localhost:3000/api/admin/login`, {
        email: e.email,
        password: e.password,
      });

      if (res.status == 200) {
        dispatch(
          login({
            token: res?.data?.token,
            user: res?.data?.user,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container size={420} my={40}>
        <Title ta="center">Welcome back!</Title>
        <form onSubmit={form.onSubmit(Login)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor size="sm">Forgot password?</Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
