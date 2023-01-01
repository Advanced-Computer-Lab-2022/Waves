import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, Stack, ThemeProvider } from "@mui/material";

const customRed = "rgb(150,40,40)";

const theme = createTheme({
  status: {
    danger: "rgb(200,25,25)",
  },
  palette: {
    primary: {
      main: customRed,
      darker: "#053e85",
    },
    secondary: {
      main: "rgb(255,255,255)",
      darker: "rgb(255,255,255)",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const settings = ["Account", "Logout"];

const ResponsiveNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [pages, setPages] = React.useState<Array<string>>([]);
  const [isNotLoggedIn, setIsNotLoggedIn] = React.useState<boolean>(false);
  const [avatar, setAvatar] = React.useState<string>(
    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );

  const adminPages = [
    "All Courses",
    "Instructors",
    "Corporate Trainees",
    "Individual Trainees",
    "Admins",
    "View Reports",
    "About Us",
  ];
  const instructorPages = [
    "My Courses",
    "All Courses",
    "Add Course",
    "Add Exam",
    "Review Rating",
    "About Us",
  ];
  const individualPages = ["My Courses", "All Courses", "About Us"];
  const corporatePages = ["My Courses", "All Courses", "About Us"];
  const guestPages = ["All Courses", "About Us"];

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/getType", { withCredentials: true })
      .then((response) => {
        if (response.data == "admin") setPages(adminPages);
        else if (response.data == "instructor") setPages(instructorPages);
        else if (response.data == "individualTrainee")
          setPages(individualPages);
        else if (response.data == "corporateTrainee") setPages(corporatePages);
        else {
          setPages(guestPages);
          setIsNotLoggedIn(true);
        }
      });

    axios
      .get("http://localhost:3001/getProfilePic", { withCredentials: true })
      .then((response) => {
        setAvatar(response.data);
      });
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    const pageArr = page.split(" ");
    page = "";

    pageArr.forEach((element) => {
      if (element == pageArr[pageArr.length - 1]) {
        page += element.toLocaleLowerCase();
      } else {
        page += element.toLocaleLowerCase() + "-";
      }
    });
    navigate("../" + page);
  };

  function handleCloseNavMenu(page: string) {
    if (page == "Add User") {
      navigate("../add-user");
    }
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = (key: string) => {
    if (key == "Logout") {
      axios
        .get("http://localhost:3001/logout", { withCredentials: true })
        .then(() => {
          navigate("../");
        });
    }
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        style={{
          paddingTop: 1,
          height: 80,
          width: "122rem",
          minWidth: "100%",
        }}
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              style={{ width: 30, height: 40, marginRight: "20px" }}
              src={"../AlienwareLogo.png"}
              alt="Alien"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              style={{ color: "white" }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: 25,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Alien Learning
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages?.map((page: string) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      navigateToPage(page);
                    }}
                  >
                    <Typography
                      color={"black"}
                      fontSize={45}
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages?.map((page: string) => (
                <Button
                  style={{ fontSize: 20, fontFamily: "Cairo" }}
                  key={page}
                  onClick={() => {
                    navigateToPage(page);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isNotLoggedIn ? (
                <Stack justifySelf={"end"} spacing={3} direction="row">
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      navigate("../login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      navigate("../signup");
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              ) : (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile Pic" src={avatar} />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting == "Logout") {
                        axios
                          .get("http://localhost:3001/logout", {
                            withCredentials: true,
                          })
                          .then(() => {
                            navigate("../");
                          });
                      } else {
                        navigate("/" + setting.toLowerCase());
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveNavBar;
