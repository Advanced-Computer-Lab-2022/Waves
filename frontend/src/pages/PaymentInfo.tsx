import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import { Divider, Stack, TextField } from '@mui/material';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const PaymentInfo = (props: any) => {
    const location = useLocation();
    const data = location.state?.data;

    var cardStyle = {
        width: '50vw',
        height: '30vw',
        display:"flex",
        //alignItems:"center",
        justifyContent:"center",
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
          Payment Information
          <Divider sx={{ borderBottomWidth: 5}} color='black'/>
        </Typography>
        <Stack spacing={1.5} direction="column">
        <TextField
            id="CardHolderName"
            name="CardHolderName"
            placeholder="Card holder's Name"
            multiline
        />
        <TextField
            id="CardNumber"
            name="CardNumber"
            placeholder="Card number"
            multiline
        />
        <TextField
            id="ExpiryMonth"
            name="ExpiryMonth"
            placeholder="Expiry Month"
            multiline
        />
        <TextField
            id="ExpiryYear"
            name="ExpiryYear"
            placeholder="Expiry Year"
            multiline
        />
        <TextField
            id="CVV"
            name="CVV"
            placeholder="CVV"
            multiline
        />
        <Button variant="contained" style={{marginTop: 20}}> 
            <Link to="/purchase-course" style={{textDecoration: 'none', color: 'white'}} state={{ data: {courseName:data.courseName, coursePrice:data.coursePrice, courseDiscount: data.courseDiscount, currencySlice: data.currencySlice, courseChapters: data.courseChapters, courseInstructor: data.courseInstructor}}} className="link">
                Purchase Course
            </Link>
        </Button>
        </Stack>
      </CardContent>
    </Card>
    )
}

export default PaymentInfo