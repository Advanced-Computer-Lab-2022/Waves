import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { TextField, Button, Stack } from '@mui/material';

const User = (props:any) => {
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [type, setType] = React.useState<String>("");

  const handleClick = () => {
    setOpen(!open);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userInfo = new FormData(e.target)
    const username = Object.fromEntries(userInfo.entries()).username
    const password = Object.fromEntries(userInfo.entries()).password

    axios.post('http://localhost:3001/register', {
            username: username,
            password: password,
            type: type
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
              console.log(username)
              console.log(password)
              console.log(type)
              console.log(response.data);
                alert('User added successfully')
            });
  }

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
      type: string
    ) => {
      setSelectedIndex(index);
      setType(type);
    };        
  
  
  return (
    <>
    <Stack spacing={1.5} direction="column"
            justifyContent="space-evenly"
            alignItems="baseline" marginTop={1.5} marginLeft={1.5}>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Users
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary="User Type" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, 'Admin')}>   
            <ListItemText primary="Admin" />
             </ListItemButton>

             <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, 'Instructor')}>
            <ListItemText primary="Instructor" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2, 'Corporate')}>
            <ListItemText primary="Corporate Trainee" />
            </ListItemButton>
        </List>
      </Collapse>
    </List>
    <form onSubmit={handleSubmit}>
      <div/>
    <TextField id="outlined-basic" label="Username" variant="outlined" name="username"/>
    <div/>
    <TextField id="outlined-basic" label="Password" variant="outlined" name="password"/>
    <div/>
    <button className="ms-2 mt-1 btn btn-primary">Add User</button>
    </form>
    </Stack>
    </>
  );
}

export default User;