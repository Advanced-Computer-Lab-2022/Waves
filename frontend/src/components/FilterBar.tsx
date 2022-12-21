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
import { Box, Checkbox, createTheme, Divider, FormControl, FormControlLabel, FormGroup, Input, InputAdornment, InputLabel, ListItem, Rating, Slider, Stack, ThemeProvider, Typography } from '@mui/material';
import Search from './Search';
import './styles.css'
import axios from 'axios';
import { useEffect } from 'react';

interface props {
  setCourses?: any,
  type?: string,
  username?: string
  courseTitles?: Array<String>
}
let currencySymbol: string;
let changeRate: number;
const FilterBar: (React.FC<props>) = ({ setCourses, type, username, courseTitles }) => {
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

  const [search, setSearch] = React.useState("");

  const [rating, setRating] = React.useState(0);

  const [price, setPrice] = React.useState<number[]>([0, 1000*changeRate]);

  const customRed = 'rgb(150,40,40)'

  useEffect(() => {
    setPrice([0, 1000*changeRate])
  },[changeRate])

  const theme = createTheme({
    status: {
      danger: 'rgb(200,25,25)',
    },
    palette: {
      primary: {
        main: customRed,
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

  const [country, setCountry] = React.useState<string>();

  axios.get('http://localhost:3001/getCountry', { withCredentials: true }).then(response => {
    setCountry(response.data)
  });

  if (country == 'Egypt') {
    currencySymbol = 'ج.م'
    changeRate = 25
  }
  else if (country == 'Germany') {
    currencySymbol = '€'
    changeRate = 0.94
  }
  else if (country == 'United Kingdom') {
    currencySymbol = '£'
    changeRate = 0.8
  }
  else {
    currencySymbol = '$'
    changeRate = 1
  }

  function handleSubjectChange() {
    const arr = [];
    if (computerScience)
      arr.push("Computer Science")
    if (math) {
      arr.push("Math")
    }
    if (physics) {
      arr.push("Physics")
    }
    return arr;
  }

  const onFilterChange = () => {
    axios.post('http://localhost:3001/filterCourses', {
      rating: rating,
      subject: handleSubjectChange(),
      minPrice: price[0] /changeRate,
      maxPrice: price[1] /changeRate,
      searchTerm: search,
      username: username,
      type: type,
      courseTitles: courseTitles
    }, { withCredentials: true })
      .then((response: any) => {
        setCourses(response.data);
      });
  }

  useEffect(onFilterChange, [rating, price, computerScience, math, physics, search, username, type, courseTitles]);

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

  const minDistance = 10;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1000*changeRate - minDistance);
        setPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPrice([clamped - minDistance, clamped]);
      }
    } else {
      setPrice(newValue as number[]);
    }
  };

  return (

    <ThemeProvider theme={theme}>
      <List
        className='filterClass'

        sx={{ width: '100%', paddingRight: '15px', maxWidth: 360, bgcolor: 'rgb(240, 240, 240)', color: 'black' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Search setSearch={setSearch} />
        <ListItemButton onClick={handleFilterClick}>
          <ListItemIcon>
            <FilterIcon />
          </ListItemIcon>
          <ListItemText primary="Filter" />
          {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handleSubjectClick}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Subject" />
              {subjectOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </List>
        </Collapse>

        <Collapse in={subjectOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FormControlLabel onClick={() => { setComputerScience(!computerScience); }} sx={{ pl: 8 }} control={<Checkbox checked={computerScience} />} label="Computer Science" />
          </List>
        </Collapse>

        <Collapse in={subjectOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FormControlLabel onClick={() => { setMath(!math); }} sx={{ pl: 8 }} control={<Checkbox checked={math} />} label="Math" />
          </List>
        </Collapse>

        <Collapse in={subjectOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FormControlLabel onClick={() => { setPhysics(!physics); }} sx={{ pl: 8 }} control={<Checkbox checked={physics} />} label="Physics" />
          </List>
        </Collapse>

        <Divider variant='fullWidth' color='black' orientation="horizontal" flexItem></Divider>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handleRatingClick}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Rating" />
              {ratingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </List>
        </Collapse>

        <Collapse style={{ marginBottom: 10 }} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Stack className="pointer-link" onMouseEnter={() => setFourRatingHover(true)} onMouseLeave={() => setFourRatingHover(false)} spacing={1} direction="row" onClick={() => { if (!fourRating) { setOneRating(false); setTwoRating(false); setThreeRating(false); setRating(4) } else { setRating(0) } setFourRating(!fourRating); }}>
              <Rating className="grow" sx={{ "& .MuiRating-iconFilled": { color: fourRating || fourRatingHover ? "#F59200" : "#F5B100" }, pl: 8 }} size={(fourRating || fourRatingHover) ? 'large' : 'medium'} name="read-only" value={4} readOnly />
              <Typography color={fourRating || fourRatingHover ? '#F59C00' : "black"} fontSize={fourRating || fourRatingHover ? 20 : 16}> & Up </Typography>
            </Stack>
          </List>
        </Collapse>

        <Collapse style={{ marginBottom: 10 }} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Stack className="pointer-link" onMouseEnter={() => setThreeRatingHover(true)} onMouseLeave={() => setThreeRatingHover(false)} spacing={1} direction="row" onClick={() => { if (!threeRating) { setOneRating(false); setTwoRating(false); setFourRating(false); setRating(3) } else { setRating(0) } setThreeRating(!threeRating); }}>
              <Rating className="grow" sx={{ "& .MuiRating-iconFilled": { color: threeRating || threeRatingHover ? "#F59200" : "#F5B100" }, pl: 8 }} size={(threeRating || threeRatingHover) ? 'large' : 'medium'} name="read-only" value={3} readOnly />
              <Typography color={threeRating || threeRatingHover ? '#F59C00' : "black"} fontSize={threeRating || threeRatingHover ? 20 : 16}> & Up </Typography>
            </Stack>
          </List>
        </Collapse>

        <Collapse style={{ marginBottom: 10 }} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Stack className="pointer-link" onMouseEnter={() => setTwoRatingHover(true)} onMouseLeave={() => setTwoRatingHover(false)} spacing={1} direction="row" onClick={() => { if (!twoRating) { setOneRating(false); setThreeRating(false); setFourRating(false); setRating(2) } else { setRating(0) } setTwoRating(!twoRating); }}>
              <Rating className="grow" sx={{ "& .MuiRating-iconFilled": { color: twoRating || twoRatingHover ? "#F59200" : "#F5B100" }, pl: 8 }} size={(twoRating || twoRatingHover) ? 'large' : 'medium'} name="read-only" value={2} readOnly />
              <Typography color={twoRating || twoRatingHover ? '#F59C00' : "black"} fontSize={twoRating || twoRatingHover ? 20 : 16}> & Up </Typography>
            </Stack>
          </List>
        </Collapse>

        <Collapse style={{ marginBottom: 10 }} in={ratingOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Stack className="pointer-link" onMouseEnter={() => setOneRatingHover(true)} onMouseLeave={() => setOneRatingHover(false)} spacing={1} direction="row" onClick={() => { if (!oneRating) { setTwoRating(false); setThreeRating(false); setFourRating(false); setRating(1) } else { setRating(0) } setOneRating(!oneRating); }}>
              <Rating className="grow" sx={{ "& .MuiRating-iconFilled": { color: oneRating || oneRatingHover ? "#F59200" : "#F5B100" }, pl: 8 }} size={(oneRating || oneRatingHover) ? 'large' : 'medium'} name="read-only" value={1} readOnly />
              <Typography className="growN" color={oneRating || oneRatingHover ? '#F59C00' : "black"} fontSize={oneRating || oneRatingHover ? 20 : 16}> & Up </Typography>
            </Stack>
          </List>
        </Collapse>

        <Divider color='black' orientation="horizontal" flexItem></Divider>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={handlePriceClick}>
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Price" />
              {priceOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </List>
        </Collapse>


        <Collapse in={priceOpen && filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 8 }}>
              <Box sx={{ width: 300 }}>
                <Stack direction={"row"} sx={{ marginLeft: 2.5, width: 200, marginBottom: 3 }}>
                  <FormControl fullWidth variant="standard" sx={{ marginRight: 5 }}>
                    <InputLabel htmlFor="standard-adornment-amount">Min. Price</InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      startAdornment={<InputAdornment position="start">{currencySymbol}</InputAdornment>}
                      value={(price[0]).toFixed(0)}
                      onChange={(v) => {
                        const u = parseFloat(v.target.value);
                        isNaN(u) || setPrice(([a, b]) => ([u, b]));

                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Max. Price</InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      startAdornment={<InputAdornment position="end">{currencySymbol}</InputAdornment>}
                      value={(price[1]).toFixed(0)}
                      onChange={(v) => {
                        const u = parseFloat(v.target.value);
                        isNaN(u) || setPrice(([a, b]) => ([a, u]));

                      }}
                    />
                  </FormControl>
                </Stack>
                <Slider
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={price}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  disableSwap
                  min={0}
                  max={1000 * changeRate}
                />
              </Box>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
}

export default FilterBar;