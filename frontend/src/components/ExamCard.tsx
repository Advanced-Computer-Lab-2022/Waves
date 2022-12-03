import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import { Link } from '@mui/material';
import { Link } from 'react-router-dom';

interface props {
    belongsToCourse: string;
    name: string;
  }

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ExamCard: React.FC<props> = ({belongsToCourse, name}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {belongsToCourse}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
        <Typography variant="body2">
          
        </Typography>
      </CardContent>
      <CardActions>
      
       <Link to="/exam-session" state={{ data: [belongsToCourse, name]}} className="link">
           Take Exam
       </Link>
        
      </CardActions>
    </Card>
  );
}

export default ExamCard
