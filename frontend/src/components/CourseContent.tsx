import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function NestedList(props: any) {
  const [open, setOpen] = React.useState<boolean[]>([]);

  const subtitles: string[][] = props.course.courseSubtitles;

  React.useEffect(() => {
    setOpen(new Array(subtitles?.length ?? 0).fill(false));
  }, [subtitles?.length])

  const handleClick = (idx: number) => {
    setOpen((o) => o.map((v, i) => i == idx ? !v : v));
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Course Content
        </ListSubheader>
      }
    >
      {subtitles && subtitles.map((subtitle,idx) => (
        subtitle.map((element) => {
          if (element == subtitle[0]) {
            return <ListItemButton onClick={()=>handleClick(idx)}>
              <ListItemText primary={subtitle[0]} />
              {open[idx] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          }
          else {
            return <Collapse in={open[idx]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={element} />
                </ListItemButton>
              </List>
            </Collapse>
          }
        })
      ))}
      <></>
    </List>
  );
}