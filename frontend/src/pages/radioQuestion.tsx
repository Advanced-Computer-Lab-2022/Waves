import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioQuestion(props:any) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Correct Answer:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) => { props.setAnswerIndex(parseInt(event.target.value)) }}
        value={props.correctAnswerIndex.toString()}
      >
        {new Array(props.possibleAnswersNum).fill(0).map((_, idx) => (<FormControlLabel value={idx.toString()} control={<Radio size="small" />} label={"Choice " + idx} />))}

      </RadioGroup>
    </FormControl>
  );
}
