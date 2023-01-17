import 'bootstrap/dist/css/bootstrap.min.css';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

const Account = (props: any) => {

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/personal-info">
            <ListItemIcon>
              <BadgeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Personal info" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/payment-methods">
            <ListItemIcon>
              <PaymentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Payment methods" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )

}

export default Account