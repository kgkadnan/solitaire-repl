import React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

const StyledSliderWrapper = styled(ReactSlider)`
  width: 390px;
  height: 5px;
  position: absolute;
  z-index: 1;
`;

const StyledThumb = styled.div`
  height: 16px;
  width: 16px;
  background-color: var(--neutral-0);
  border: 3px solid var(--primary-main);
  border-radius: 50%;
  cursor: grab;
  position: relative;
  top: -5px;
  &:focus {
    outline: 2px solid var(--primary-focus) !important;
  }
  &:focus-visible {
    outline: 2px solid var(--primary-focus) !important;
  }
`;

const ThumbComponent = ({ key, ...restProps }: any) => (
  <StyledThumb key={key} {...restProps}></StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;

  background: ${(props: any) =>
    props.index === 2
      ? 'var(--neutral-300)'
      : props.index === 1
      ? 'var(--primary-main)'
      : 'var(--neutral-300)'};
  border-radius: 999px;
`;

const TrackComponent = ({ key, ...restProps }: any, state: any) => (
  <StyledTrack key={key} {...restProps} index={state.index} />
);

export { StyledSliderWrapper, ThumbComponent, TrackComponent };
