import React from 'react';
import { styled } from './stitches.config';
import * as SliderPrimitive from '@radix-ui/react-slider';

export const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  '&[data-orientation=horizontal]': { height: 16 },
  '&[data-orientation=vertical]': {
    flexDirection: 'column',
    width: 16,
    height: '100%'
  }
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: 'gainsboro',
  position: 'relative',
  flexGrow: 1,
  '&[data-orientation=horizontal]': { height: 2 },
  '&[data-orientation=vertical]': { width: 2 }
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: 'dodgerblue',
  borderRadius: '9999px',
  '&[data-orientation=horizontal]': { height: '100%' },
  '&[data-orientation=vertical]': { width: '100%' }
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  display: 'block',
  width: 16,
  height: 16,
  backgroundColor: 'white',
  border: '1px solid lightgray',
  borderRadius: '20px',
  ':focus': {
    outline: 'none',
    borderColor: 'dodgerblue'
  }
});

export function Slider(props: any) {
  const value = props.value || props.defaultValue;

  return (
    <StyledSlider {...props}>
      <StyledTrack>
        <StyledRange />
      </StyledTrack>
      {value.map((_: any, i: any) => (
        <StyledThumb key={i} />
      ))}
    </StyledSlider>
  );
}
