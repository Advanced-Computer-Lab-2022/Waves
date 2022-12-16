import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { Divider, Stack } from '@mui/material';
import { color } from '@mui/system';
import axios from 'axios';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

var user: any;
const PurchaseCourse = (props: any) => {
  const location = useLocation();
  const data = location.state?.data;
  const [username, setUsername] = React.useState<string>();

  axios.get('http://localhost:3001/getUsername', { withCredentials: true }).then(response => {
    setUsername(response.data)
  });
  const add = () => {
    axios.put('http://localhost:3001/purchase-course', {
      username: username,
      title: data.courseName
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        console.log(user + " XX ")
      });
  }

  var cardStyle = {
    width: '50vw',
    height: '23vw',
    display: "flex",
    //alignItems:"center",
    justifyContent: "center",
    marginLeft: 400,
    marginTop: 40
  }

  var textSpace = {
    marginLeft: 70
  }

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography sx={{ fontSize: 34, mb: 1.5 }} component="div" gutterBottom>
          Purchase Confirmation
          <Divider sx={{ borderBottomWidth: 5 }} color='black' />
        </Typography>

        <Stack direction="row">
          <Typography sx={{ fontSize: 24, mb: 1.5 }} style={textSpace} component="div">
            {data.courseName}
          </Typography>
          <Typography sx={{ fontSize: 24, mb: 1.5, marginLeft:37}}  component="div">
            {data.coursePrice}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={47}>
          <Typography sx={{ fontSize: 24, mb: 1.5 }} style={textSpace} component="div">
            Tax
          </Typography>
          <Typography sx={{ fontSize: 24, mb: 1.5 }} component="div">
            $0.00
          </Typography>
        </Stack>
        <Stack direction="row" spacing={40}>
          <Typography sx={{ fontSize: 24, mb: 1.5 }} style={textSpace} component="div">
            Discount
          </Typography>
          <Typography sx={{ fontSize: 24, mb: 1.5 }} component="div">
            $0.00
          </Typography>
        </Stack>
        <Divider sx={{ borderBottomWidth: 2 }} color='black' />
        <Stack direction="row" spacing={24}>
          <Typography sx={{ fontSize: 34, mb: 1.5 }} style={textSpace} component="div" gutterBottom>
            Total Payment
          </Typography>
          <Typography sx={{ fontSize: 34, mb: 1.5 }} component="div">
            {data[1]}
          </Typography>
        </Stack>

        <Stack marginTop={5} marginLeft={8.8} direction="row" spacing={2}>
          <Button variant="contained" style={{ width: '15vw', height: '2.5vw' }}
            onClick={() => {
              alert('clicked');
            }}
          >
            Change Payment Method
          </Button>

          <Button variant="contained" style={{ width: '15vw' }}
            onClick={() => add()} href='individualTrainee'
          >
            Confirm Purchase
          </Button>
        </Stack>
      </CardContent>
    </Card >

  )
}

export default PurchaseCourse