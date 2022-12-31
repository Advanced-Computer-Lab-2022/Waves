import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

export default function NestedList(props: any) {
  const course = props.course;

  const [open, setOpen] = React.useState<boolean[]>([]);

  const [currentSection, setCurrentSection] = React.useState();

  const [courseVideo, setCourseVideo] = React.useState(
    course.courseVideoPreview
  );

  const [videoStart, setVideoStart] = React.useState(false)

  const [sectionProgressess, setSectionProgressess] = React.useState<any[]>([]);

  const isNotPurchased = props.isNotPurchased;

  const chapters: Chapter[] = course.courseChapters;

  React.useEffect(() => {
    setOpen(new Array(chapters?.length ?? 0).fill(false));
  }, [chapters?.length]);

  React.useEffect(() => {
    console.log("progress: ", sectionProgressess);

    axios
      .post(
        "http://localhost:3001/getProgresses",
        {
          courseTitle: course.courseName,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setSectionProgressess(response.data);
      });
  }, [currentSection]);

  React.useEffect(() => {

    axios
      .post(
        "http://localhost:3001/getProgresses",
        {
          courseTitle: course.courseName,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setSectionProgressess(response.data);
      });
  }, [videoStart]);

  const handleClick = (idx: number) => {
    setOpen((o) => o.map((v, i) => (i == idx ? !v : v)));
  };

  const handleSubtitleClick = ( subtitle: any) => {
    setCourseVideo(subtitle.videoLink);
    setCurrentSection(subtitle.description);
  };

  interface Chapter {
    name: String;
    exercise: Object;
    videoLink: String;
    description: String;
  }

  function handleVideoStarted(): void {
    axios
      .post(
        "http://localhost:3001/addProgress",
        { section: currentSection, courseTitle: course.courseName },
        { withCredentials: true }
      )
      .then((res) => {setVideoStart(true)});
  }

  return (
    <Stack marginTop={"3%"} direction={"row"} style={{ height: "730px" }}>
      <ReactPlayer
        style={{
          boxShadow: "2px 2px",
          minHeight: "100%",
          minWidth: "68%",
          borderRadius: "5px",
          border: "solid rgb(170,170,170) 3px",
          marginLeft: "1%",
        }}
        onStart={handleVideoStarted}
        url={courseVideo}
      />
      <div
        style={{
          width: "50%",
          maxWidth: "50%",
        }}
      >
        <List
          className="listGrad"
          sx={{
            opacity: "80%",
            boxShadow: "2px 2px",
            borderRadius: "5px",
            border: "solid rgb(170,170,170) 3px",
            marginRight: "1%",
            marginLeft: "auto",
            width: "98%",
            bgcolor: "rgb(200, 200, 200)",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ opacity: "80%", bgcolor: "initial" }}
              component="div"
            >
              <Typography fontSize={27}> Course Content </Typography>
            </ListSubheader>
          }
        >
          {chapters &&
            chapters.map((chapter, idx) => (
              <>
                <ListItemButton onClick={() => handleClick(idx)}>
                  <ListItemText>
                    <Typography fontSize={19}> {chapter.name} </Typography>
                  </ListItemText>
                  {open[idx] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open[idx]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {isNotPurchased ? (
                      <ListItemText
                        sx={{ pl: 4 }}
                        primary={chapter.description}
                      />
                    ) : (
                      <Stack direction={"row"}>
                        <ListItemButton
                          onClick={() => handleSubtitleClick(chapter)}
                          sx={{ pl: 4 }}
                        >
                          {sectionProgressess[idx] ? <CheckIcon /> : <></>}
                          <ListItemText primary={chapter.description} />

                          <Button
                            variant="contained"
                            sx={{ margin: "5%" }}
                            size={"small"}
                          >
                            <Link
                              to="/exercise-session"
                              style={{ textDecoration: "none", color: "white" }}
                              state={{ data: { exercise: chapter.exercise } }}
                              className="link"
                            >
                              Take Exercise
                            </Link>
                          </Button>
                        </ListItemButton>
                      </Stack>
                    )}
                  </List>
                </Collapse>
              </>
            ))}
          <></>
        </List>
      </div>
    </Stack>
  );
}
