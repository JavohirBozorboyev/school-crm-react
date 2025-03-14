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
          <Tabs.Tab value="/ratings">Natijalar</Tabs.Tab>
          <Tabs.Tab value="/ratings/top">Eng yuqori</Tabs.Tab>
          <Tabs.Tab value="/ratings/subjects">Fanlar</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
};

export default Rating_Nav;
