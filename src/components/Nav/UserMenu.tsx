import { forwardRef } from "react";
import {
  IconArrowsLeftRight,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronRight,
  IconLogout,
  IconMessageCircle,
  IconMoon,
  IconPhoto,
  IconSearch,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  rem,
  ActionIcon,
  Box,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-xs)",
        color: "var(--mantine-color-text)",
      }}
      {...others}
    >
      <Group gap={"xs"}>
        <Avatar src={image} radius="sm" />

        <Box visibleFrom="sm" style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </Box>

        <Box visibleFrom="sm">{icon || <IconChevronRight size="1rem" />}</Box>
      </Group>
    </UnstyledButton>
  )
);

function UserMenu() {
  const { toggle, fullscreen } = useFullscreen();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.auth.user);

  const LogOut = () => {
    dispatch(logout());
  };
  return (
    <Group gap={"xs"}>
      <ActionIcon
        variant="light"
        onClick={toggle}
        color={fullscreen ? "teal" : "blue"}
      >
        {fullscreen ? (
          <IconArrowsMinimize size={16} />
        ) : (
          <IconArrowsMaximize size={16} />
        )}
      </ActionIcon>
      <ActionIcon
        variant="light"
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        color={colorScheme == "dark" ? "teal" : "blue"}
      >
        {colorScheme === "dark" ? (
          <IconSun stroke={1.5} size={16} />
        ) : (
          <IconMoon stroke={1.5} size={16} />
        )}
      </ActionIcon>
      <Menu withArrow>
        <Menu.Target>
          <UserButton
            image=""
            name={`${admin?.firstname} ${admin?.lastname}`}
            email={admin?.email}
          />
        </Menu.Target>

        <Menu.Dropdown w={"220px"}>
          <Menu.Label>Application</Menu.Label>
          <NavLink to={"/profil"}>
            <Menu.Item
              leftSection={
                <IconUserCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Profil
            </Menu.Item>
          </NavLink>

          <Menu.Item
            leftSection={
              <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Messages
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconPhoto style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Gallery
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconSearch style={{ width: rem(14), height: rem(14) }} />
            }
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            leftSection={
              <IconArrowsLeftRight
                style={{ width: rem(14), height: rem(14) }}
              />
            }
          >
            Transfer my data
          </Menu.Item>
          <Menu.Item
            onClick={LogOut}
            color="red"
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Logout my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export default UserMenu;
