import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { TupleType } from 'typescript';

interface props {
    rating: Array<number>;
    children?: React.ReactNode;
    customChild?: React.ReactNode;
  }

const BasicRating: React.FC<props> = ({rating}) => {
    const [value, setValue] = React.useState<Array<number> | null>(rating);
    return (
        <Box
            sx={{
            '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Rating</Typography>
            <Stack direction="row">
            <Box marginRight={1} marginTop={0.25}>
                <Typography color="orange" component="legend">{value![0]}</Typography>
            </Box>
            <Rating name="read-only" value={value![0]} readOnly />
            <Box marginLeft={1} marginTop={0.25}>
                <Typography color="grey" variant="body2" component="legend">{"(" + value![1] + ")"}</Typography>
            </Box>
            </Stack>
        </Box>
    )};

export default BasicRating;
  

 