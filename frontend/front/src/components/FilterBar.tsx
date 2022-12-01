import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import FilterIcon from '@mui/icons-material/FilterAlt';
import SubjectIcon from '@mui/icons-material/Subject';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Grade';
import { Checkbox, Divider, FormControlLabel, FormGroup, Rating, Stack, Typography } from '@mui/material';
import Search from './Search';
import './styles.css'

export default function FilterBar() {
  const [filterOpen, setFilterOpen] = React.useState(true);
  const [subjectOpen, setSubjectOpen] = React.useState(true);
  const [ratingOpen, setRatingOpen] = React.useState(true);
  const [priceOpen, setPriceOpen] = React.useState(true);

  const [computerScience, setComputerScience] = React.useState(true);
  const [math, setMath] = React.useState(true);
  const [physics, setPhysics] = React.useState(true);

  const [fourRating, setFourRating] = React.useState(false);
  const [threeRating, setThreeRating] = React.useState(false);
  const [twoRating, setTwoRating] = React.useState(false);
  const [oneRating, setOneRating] = React.useState(false);

  const [fourRatingHover, setFourRatingHover] = React.useState(false);
  const [threeRatingHover, setThreeRatingHover] = React.useState(false);
  const [twoRatingHover, setTwoRatingHover] = React.useState(false);
  const [oneRatingHover, setOneRatingHover] = React.useState(false);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSubjectClick = () => {
    setSubjectOpen(!subjectOpen);
  };

  const handleRatingClick = () => {
    setRatingOpen(!ratingOpen);
  };

  const handlePriceClick = () => {
    setPriceOpen(!priceOpen);
  };

  return (
    <div style={{marginRight:30, width: 400, backgroundColor: 'rgb(240, 240, 240)'}}>
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(240, 240, 240)', color: 'black'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        >
        <Search/>
        <ListItemButton onClick={handleFilterClick}>
            <ListItemIcon>
                <FilterIcon/>
            </ListItemIcon>
            <ListItemText primary="Filter" />
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handleSubjectClick}>
                <ListItemIcon>
                <SubjectIcon/>
                </ListItemIcon>
                <ListItemText primary="Subject" />
                {subjectOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            </List>
        </Collapse>

        <Collapse in={subjectOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <FormControlLabel onClick={() => {setComputerScience(!computerScience)}} sx={{pl: 8}} control={<Checkbox checked={computerScience} />} label="Computer Science" />
            </List>
        </Collapse>

        <Collapse in={subjectOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <FormControlLabel onClick={() => {setMath(!math)}} sx={{pl: 8}} control={<Checkbox  checked={math} />} label="Math" />
            </List>
        </Collapse>

        <Collapse in={subjectOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <FormControlLabel onClick={() => {setPhysics(!physics)}} sx={{pl: 8}} control={<Checkbox checked={physics} />} label="Physics" />
            </List>
        </Collapse>
        
        <Divider color='black' orientation="horizontal" flexItem></Divider>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handleRatingClick}>
                <ListItemIcon>
                <StarIcon/>
                </ListItemIcon>
                <ListItemText primary="Rating" />
                {ratingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            </List>
        </Collapse>

        <Collapse style={{marginBottom: 10}} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <Stack onMouseEnter={() => setFourRatingHover(true)} onMouseLeave={() => setFourRatingHover(false)} spacing={1} direction="row" onClick={() => {if(!fourRating){ setOneRating(false); setTwoRating(false); setThreeRating(false);} setFourRating(!fourRating); }}>
                    <Rating className="grow" sx={{"& .MuiRating-iconFilled": {color: fourRating||fourRatingHover? "#F59200" : "#F5B100"}, pl: 8}} size={(fourRating||fourRatingHover)? 'large' : 'medium'} name="read-only" value={4} readOnly />
                    <Typography color={fourRating||fourRatingHover? '#F59C00' : "black"} fontSize={fourRating||fourRatingHover? 20:16}> & Up </Typography>
                </Stack>
            </List>
        </Collapse>

        <Collapse style={{marginBottom: 10}} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <Stack onMouseEnter={() => setThreeRatingHover(true)} onMouseLeave={() => setThreeRatingHover(false)} spacing={1} direction="row" onClick={() => {if(!threeRating){ setOneRating(false); setTwoRating(false); setFourRating(false);} setThreeRating(!threeRating); }}>
                    <Rating className="grow" sx={{"& .MuiRating-iconFilled": {color: threeRating||threeRatingHover? "#F59200" : "#F5B100"}, pl: 8}} size={(threeRating||threeRatingHover)? 'large' : 'medium'} name="read-only" value={3} readOnly />
                    <Typography color={threeRating||threeRatingHover? '#F59C00' : "black"} fontSize={threeRating||threeRatingHover? 20:16}> & Up </Typography>
                </Stack>
            </List>
        </Collapse>

        <Collapse style={{marginBottom: 10}} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <Stack onMouseEnter={() => setTwoRatingHover(true)} onMouseLeave={() => setTwoRatingHover(false)} spacing={1} direction="row" onClick={() => {if(!twoRating){ setOneRating(false); setThreeRating(false); setFourRating(false);} setTwoRating(!twoRating); }}>
                    <Rating className="grow" sx={{"& .MuiRating-iconFilled": {color: twoRating||twoRatingHover? "#F59200" : "#F5B100"}, pl: 8}} size={(twoRating||twoRatingHover)? 'large' : 'medium'} name="read-only" value={2} readOnly />
                    <Typography color={twoRating||twoRatingHover? '#F59C00' : "black"} fontSize={twoRating||twoRatingHover? 20:16}> & Up </Typography>
                </Stack>
            </List>
        </Collapse>

        <Collapse style={{marginBottom: 10}} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <Stack onMouseEnter={() => setOneRatingHover(true)} onMouseLeave={() => setOneRatingHover(false)} spacing={1} direction="row" onClick={() => {if(!oneRating){ setTwoRating(false); setThreeRating(false); setFourRating(false);} setOneRating(!oneRating); }}>
                    <Rating className="grow" sx={{"& .MuiRating-iconFilled": {color: oneRating||oneRatingHover? "#F59200" : "#F5B100"}, pl: 8}} size={(oneRating||oneRatingHover)? 'large' : 'medium'} name="read-only" value={1} readOnly />
                    <Typography className="growN" color={oneRating||oneRatingHover? '#F59C00' : "black"} fontSize={oneRating||oneRatingHover? 20:16}> & Up </Typography>
                </Stack>
            </List>
        </Collapse>
        
        <Divider color='black' orientation="horizontal" flexItem></Divider>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handlePriceClick}>
                <ListItemIcon>
                <MoneyIcon/>
                </ListItemIcon>
                <ListItemText primary="Price" />
                {priceOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            </List>
        </Collapse>

        
        <Collapse in={priceOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 8 }}>
                <ListItemIcon>
                <MoneyIcon/>
                </ListItemIcon>
                <ListItemText primary="Price" />
            </ListItemButton>
            </List>
        </Collapse>

        
        <Collapse in={priceOpen && filterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 8 }}>
                <ListItemIcon>
                <MoneyIcon/>
                </ListItemIcon>
                <ListItemText primary="Price" />
            </ListItemButton>
            </List>
        </Collapse>
        </List>
    </div>
  );
}