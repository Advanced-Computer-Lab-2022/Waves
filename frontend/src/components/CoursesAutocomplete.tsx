import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function CoursesAutocomplete(props: any) {
  const [courses, setCourses] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/getCourses').then(response => {
      const coursesFeteched: React.SetStateAction<string[]> = []
      {
        response.data && response.data.map((course: { title: string; }) => (
          coursesFeteched.push(course.title)
        ))
      }
      setCourses(coursesFeteched)
    })
  }, [])

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={courses}
      sx={{ width: 300 }} value={props.selectedCourse} onChange={(e, newValue) => props.setSelectedCourse(newValue)}
      renderInput={(params) => <TextField {...params} label="Courses" />}
    />
  );
}