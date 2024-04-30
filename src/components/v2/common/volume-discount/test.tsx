import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const PrettoSlider = styled(Slider)({
  color: 'red',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(to right, red, blue)' // Gradient color from red to blue
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&::before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

export default function CustomizedSlider() {
  return (
    <PrettoSlider
      valueLabelDisplay="on"
      aria-label="pretto slider"
      defaultValue={[90 / 3, 300 / 3]} // Set the initial range values
      onChange={(event, newValue) => console.log(newValue)} // Handle the range change
      //   disabled
    />
  );
}
