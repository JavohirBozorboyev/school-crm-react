import AdminNavUrlData from "../../data/AdminNavUrlData";
import { NavLink, Box, ActionIcon } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";

interface AppShellNavbarProps {
  toggle: () => void;
}

const AppShellNavbar = ({ toggle }: AppShellNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);


  return (
    <>
      <Box>
        {AdminNavUrlData?.filter((fill) => {
          if (user?.role === "admin" || user?.role === "supperadmin") {
            return fill;
          } else if (user?.role === "teacher") {
            return fill.role == "teacher";
          }
        }).map(
          (
            item: {
              name: string;
              icon: React.ReactNode;
              url: string;
              sub?: { name: string; url: string }[];
            },
            i
          ) => {
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
                    toggle();
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
                  ? item.sub.map(
                      (
                        url: {
                          name: string;
                          url: string;
                        },
                        index: number
                      ) => {
                        return (
                          <NavLink
                            key={index}
                            label={url.name}
                            variant="light"
                            active={location.pathname == url.url}
                            onClick={() => {
                              toggle();
                              navigate(url.url);
                            }}
                            style={{
                              borderRadius: "4px",
                              fontWeight: "400",
                            }}
                          />
                        );
                      }
                    )
                  : null}
              </NavLink>
            );
          }
        )}
      </Box>
    </>
  );
};

export default AppShellNavbar;
