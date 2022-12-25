import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";

export default function NestedList(props: any) {
  const course = props.course;

  const [open, setOpen] = React.useState<boolean[]>([]);

  const isNotPurchased = props.isNotPurchased;

  const [courseVideo, setCourseVideo] = React.useState(
    course.courseVideoPreview
  );

  const subtitles: string[][] = course.courseSubtitles;

  React.useEffect(() => {
    setOpen(new Array(subtitles?.length ?? 0).fill(false));
  }, [subtitles?.length]);

  const handleClick = (idx: number) => {
    setOpen((o) => o.map((v, i) => (i == idx ? !v : v)));
  };

  const handleSubtitleClick = (idx: number) => {
    setCourseVideo(course.courseVideoLinks[idx]);
  };

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
          {subtitles &&
            subtitles.map((subtitle, idx) =>
              subtitle.map((element) => {
                if (element == subtitle[0]) {
                  return (
                    <ListItemButton onClick={() => handleClick(idx)}>
                      <ListItemText>
                        <Typography fontSize={19}> {subtitle[0]} </Typography>
                      </ListItemText>
                      {open[idx] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  );
                } else {
                  return (
                    <Collapse in={open[idx]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {isNotPurchased ? (
                          <ListItemText sx={{ pl: 4 }} primary={element} />
                        ) : (
                          <ListItemButton
                            onClick={() => handleSubtitleClick(idx)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={element} />
                          </ListItemButton>
                        )}
                      </List>
                    </Collapse>
                  );
                }
              })
            )}
          <></>
        </List>
      </div>
    </Stack>
  );
}
