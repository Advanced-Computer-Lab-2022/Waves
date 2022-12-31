import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function CourseProgress(props: any) {
  const progress = props.progress;
  const size = props.size;
  const fontVariant = props.fontVariant;
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" size={size} value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={fontVariant}
          component="div"
          color="text.secondary"
        >{`${Math.round(+progress)}%`}</Typography>
      </Box>
    </Box>
  );
}
