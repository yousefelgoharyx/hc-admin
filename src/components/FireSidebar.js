import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import {
  SportsSoccerRounded,
  NewspaperRounded,
  PersonPinCircleRounded,
  RestaurantRounded,
  SportsScoreRounded,
  Dashboard,
  LogoutRounded,
  AnalyticsRounded,
  InfoRounded,
  HistoryRounded,
  ManageAccountsRounded,
  SnowshoeingRounded,
  GroupsRounded,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
const data = [
  { icon: <NewspaperRounded />, label: "الاخبار", href: "/" },
  {
    icon: <AnalyticsRounded />,
    label: "الاعلانات",
    href: "/ads",
  },
  {
    icon: <InfoRounded />,
    label: "عن النادي",
    href: "/about",
  },
  {
    icon: <HistoryRounded />,
    label: "تاريخ النادي",
    href: "/history",
  },
  {
    icon: <SportsSoccerRounded />,
    label: "الالعاب الرياضية",
    href: "/sports",
  },
  {
    icon: <ManageAccountsRounded />,
    label: "مديرين الالعاب",
    href: "/game-moderators",
  },
  {
    icon: <ManageAccountsRounded />,
    label: "مديرين الفرق",
    href: "/team-moderators",
  },
  {
    icon: <SnowshoeingRounded />,
    label: "اللاعبين",
    href: "/players",
  },
  {
    icon: <GroupsRounded />,
    label: "الفرق",
    href: "/team",
  },
  {
    icon: <PersonPinCircleRounded />,
    label: "شخصيات مؤثرة",
    href: "/people",
  },
  {
    icon: <RestaurantRounded />,
    label: "المطاعم - اماكن عامة",
    href: "/PublicPlaces",
  },
  {
    icon: <SportsScoreRounded />,
    label: "المباريات القادمة",
    href: "/matches",
  },
  {
    icon: <LogoutRounded />,
    label: "خروج",
    href: "/login",
  },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const mobileStyles = {
  "@media (max-width: 567px)": {
    position: "fixed",
    height: "100vh",
    zIndex: 9999,
  },
};

export default function CustomizedList() {
  const location = useLocation();
  const auth = useAuth();
  return (
    <Box sx={{ display: "flex", ...mobileStyles }}>
      <Paper elevation={0} sx={{ maxWidth: 300, width: 250 }}>
        <FireNav component="nav" disablePadding>
          <ListItemButton component="div">
            <ListItemText
              sx={{ my: 0, paddingY: 1 }}
              primary="نادي الجياد"
              primaryTypographyProps={{
                fontSize: 18,
                fontWeight: "700",
                letterSpacing: 0,
                height: 32,
                lineHeight: 1.6,
              }}
            />
          </ListItemButton>
          <Divider />
          <ListItem component="div" disablePadding>
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Dashboard color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="منصة النادي"
                primaryTypographyProps={{
                  color: "primary",
                  fontWeight: "medium",
                  variant: "body2",
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Box pb={2}>
            <ListItem sx={{ paddingX: 3, paddingY: 2 }}>
              <ListItemText
                primary="الاقسام الرئيسية"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "500",
                  lineHeight: "20px",
                }}
              />
            </ListItem>
            {data.map((item) =>
              item.href === "/login" ? (
                <ListItemButton
                  onClick={auth.signout}
                  selected={location.pathname === item.href}
                  key={item.label}
                  sx={{
                    py: 1,
                    minHeight: 32,
                    color: "rgba(255,255,255,.8)",
                    textDecoration: "none",
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                    sx={{ textDecoration: "none" }}
                  />
                </ListItemButton>
              ) : (
                <Link
                  to={item.href}
                  key={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemButton
                    selected={location.pathname === item.href}
                    key={item.label}
                    sx={{
                      py: 1,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                      textDecoration: "none",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                      sx={{ textDecoration: "none" }}
                    />
                  </ListItemButton>
                </Link>
              )
            )}
          </Box>
        </FireNav>
      </Paper>
    </Box>
  );
}
