import { Burger, Flex, Title } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import UserMenu from "./UserMenu";

type Props = {
  opened: boolean;
  toggle: () => void;
};

const AppShellHeader = ({ opened, toggle }: Props) => {
  const matches = useMediaQuery("(min-width: 48em)");
  return (
    <>
      <Flex h="100%" px="md" justify="space-between" align="center">
        <Flex gap={'xs'} align={'center'}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={matches ? 2 : 4} style={{ textTransform: "uppercase" }}>
            Bm Maktab
          </Title>
        </Flex>
        <UserMenu />
      </Flex>
    </>
  );
};

export default AppShellHeader;
