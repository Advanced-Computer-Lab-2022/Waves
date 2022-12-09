import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

interface props {
    rating: Array<number>;
    children?: React.ReactNode;
    customChild?: React.ReactNode;
}

const BasicRating: React.FC<props> = ({ rating }) => {

    return (
            <Stack direction="row">
                <Typography style={{maxWidth:'40px'}} marginTop={0.25} color="orange" component="legend">{rating[0]}</Typography>
                <Rating name="read-only" value={rating[0]} readOnly precision={0.1} />
                <Typography marginLeft={1} marginTop={0.25} color="grey" variant="body2" component="legend">{"(" + rating[1] + ")"}</Typography>
            </Stack>
    )
};

export default BasicRating;


