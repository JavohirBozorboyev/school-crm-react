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
  SegmentedControl,
} from "@mantine/core";
import { login } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [url, setUrl] = useState("teacherLogin");
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
    // dispatch(
    //   login({
    //     token: "token",
    //     user: {
    //       _id: "673f5b6f7e8cb972bb4e38de",
    //       firstname: "John",
    //       lastname: "Doe",
    //       phone: "+998901234567",
    //       passport: "AB1234567",
    //       email: e.email,
    //       role: "supperadmin",
    //       privileges: [
    //         "manage_users",
    //         "view_reports",
    //         "manage_roles",
    //         "manage_permissions",
    //       ],
    //       permissions: ["read", "write", "delete", "update"],
    //     },
    //   })
    // );
    // navigate("/");
    try {
      const res = await axios.post(`/api/auth/${url}`, {
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
        <Title ta="center">BM Maktab</Title>

        <form onSubmit={form.onSubmit(Login)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <SegmentedControl
              value={url}
              onChange={setUrl}
              data={[
                { label: "Ustoz", value: "teacherLogin" },
                { label: "Admin", value: "login" },
              ]}
              fullWidth
              mb={"lg"}
            />
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
