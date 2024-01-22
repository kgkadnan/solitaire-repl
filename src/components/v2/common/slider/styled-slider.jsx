import React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

const StyledSliderWrapper = styled(ReactSlider)`
  width: 390px;
  height: 5px;
  position:absolute:
`;

const StyledThumb = styled.div`
  height: 16px;
  line-height: 25px;
  width: 16px;
  background-color: #fff;
  border: 3px solid var(--primary-main);
  border-radius: 50%;
  cursor: grab;
  position: relative;
  top: -5px;
`;

const ThumbComponent = (props, state) => <StyledThumb {...props}></StyledThumb>;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 2
      ? 'var(--neutral-300)'
      : props.index === 1
      ? 'var(--primary-main)'
      : 'var(--neutral-300)'};
  border-radius: 999px;
`;

const TrackComponent = (props, state) => (
  <StyledTrack {...props} index={state.index} />
);

export { StyledSliderWrapper, ThumbComponent, TrackComponent };
