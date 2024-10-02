import AdminNavUrlData from "../../data/AdminNavUrlData";
import { NavLink, Box, ActionIcon } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

const AppShellNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Box>
        {AdminNavUrlData.map((item, i) => {
          return (
            <NavLink
              key={i}
              label={`${item.name}`}
              leftSection={
                <ActionIcon variant="light">{item?.icon}</ActionIcon>
              }
              childrenOffset={28}
              variant="light"
              onClick={() => {
                if (!item.sub) {
                  navigate(item.url);
                }
              }}
              active={!item.sub && location.pathname == item.url}
              defaultOpened={item.sub && location.pathname.includes(item.url)}
              style={{
                borderRadius: "4px",
                fontWeight: "500",
              }}
              my={"xs"}
            >
              {item.sub
                ? item.sub.map((url, index) => {
                    return (
                      <NavLink
                        key={index}
                        label={url.name}
                        variant="light"
                        active={location.pathname == url.url}
                        onClick={() => {
                          navigate(url.url);
                        }}
                        style={{
                          borderRadius: "4px",
                          fontWeight: "400",
                        }}
                      />
                    );
                  })
                : null}
            </NavLink>
          );
        })}
      </Box>
    </>
  );
};

export default AppShellNavbar;
