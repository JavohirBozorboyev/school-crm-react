import { Tabs } from "@mantine/core";

import { useLocation, useNavigate } from "react-router-dom";

const Rating_Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Tabs
        mb={"md"}
        value={location?.pathname}
        onChange={(value) => navigate(`${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="/exam/ratings">Natijalar</Tabs.Tab>
          <Tabs.Tab value="/exam/ratings/top">Eng yuqori</Tabs.Tab>
          <Tabs.Tab value="/exam/ratings/subjects">Fanlar</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
};

export default Rating_Nav;
