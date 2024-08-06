import React, { Component, Fragment } from 'react';
import Image from 'next/image';
import VisibilitySensor from 'react-visibility-sensor';
import classNames from 'classnames';
// import AnimationSection from '../animated-text/scroll';

interface ITimelineItemProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  dateStyle?: React.CSSProperties;
  dateInnerStyle?: React.CSSProperties;
  bodyContainerStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  dateText?: string;
  dateComponent?: React.ReactNode;
  visibilitySensorProps?: any; // You can replace 'any' with the actual type if available
  image?: any;
  icon?: any;
  isLast?: boolean;
  isFirst?: boolean;
}

interface ITimelineItemState {
  visible: boolean;
}

class TimelineItem extends Component<ITimelineItemProps, ITimelineItemState> {
  constructor(props: ITimelineItemProps) {
    super(props);
    this.state = { visible: false };
    this.onVisibilitySensorChange = this.onVisibilitySensorChange.bind(this);
  }

  onVisibilitySensorChange(isVisible: boolean) {
    if (isVisible) {
      this.setState({ visible: true });
    }
  }

  render() {
    const {
      id,
      children,
      bodyContainerStyle,
      style,
      className,
      visibilitySensorProps,
      image,
      icon,
      isLast,
      isFirst
    } = this.props;
    const { visible } = this.state;

    return (
      <div
        id={id}
        className={classNames(
          className,
          'relative flex w-full  items-center ',
          'h-auto mb-40'
        )}
        style={style}
      >
        {/*  */}

        <VisibilitySensor
          {...visibilitySensorProps}
          onChange={this.onVisibilitySensorChange}
        >
          <Fragment>
            <div className=" flex flex-row w-full items-center">
              <div className="relative flex-shrink-0 w-[50%] flex flex-row-reverse pr-[64px]">
                <div
                  className={classNames(
                    'relative w-[350px] h-[250px] transition-transform duration-500 bg-primaryMain ',
                    visible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  )}
                >
                  {/* <AnimationSection> */}
                  <Image
                    src={image}
                    alt="timelineImage"
                    layout="fill"
                    objectFit="cover"
                  />
                  {/* </AnimationSection> */}
                </div>
                <div
                  className={`absolute top-2 right-10 w-[350px] h-[250px] bg-primaryMain transform -translate-x-10 translate-y-2 z-[-1] shadow-lg ${
                    visible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                ></div>
              </div>
              <div className="flex-grow flex items-center   w-[50%]">
                <div
                  className={classNames(
                    'transition-transform duration-500',
                    visible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  )}
                  style={bodyContainerStyle}
                >
                  <div className="flex items-center w-[500px]">{children}</div>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                'absolute left-1/2 -translate-x-1/2 w-[2px] ',
                !isLast
                  ? 'h-[calc(100%+300px)] mt-[300px]'
                  : 'h-[calc(100%+100px)] -mt-[20px]',
                isFirst && 'h-[calc(100%+310px)] !mt-40',
                visible ? 'bg-timeline-gradient' : 'bg-neutral300'
              )}
            ></div>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 ">
              <Image src={icon} alt="timeline separator" />
            </div>
          </Fragment>
        </VisibilitySensor>
      </div>
    );
  }
}

export default TimelineItem;
