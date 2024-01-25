import { StylesConfig } from 'react-select';

interface IColourOption {
  readonly value: string;
  readonly label: string;
}

export const colourStyles: StylesConfig<IColourOption, true> = {
  control: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',

    backgroundColor: 'neutral0',
    borderRadius: '4px',
    // border: 'none',
    border: '1px solid neutral200',
    // borderBottom: '1px solid hsl(var(--solitaire-quaternary))',
    outline: '1px solid neutral200',
    width: '100%'
    // ':hover': {
    //   border: 'none',
    //   borderBottom: '1px solid neutral200'
    // }
  }),
  singleValue: styles => ({
    ...styles,
    color: 'neutral900'
  }),
  placeholder: styles => ({
    ...styles,
    color: 'neutral900',
    border: 'none'
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'neutral0',
    minHeight: '10vh',
    height: '17vh',
    zIndex: 1000
  }),
  option: styles => {
    return {
      ...styles,
      backgroundColor: 'neutral0',
      color: 'neutral900',
      ':active': {
        ...styles[':active'],
        border: 'none',
        backgroundColor: 'neutral0'
      },
      ':hover': {
        backgroundColor: 'neutral50',
        border: 'none',
        color: 'neutral900'
      }
    };
  },
  multiValue: styles => {
    return {
      ...styles,
      backgroundColor: 'neutral200',
      color: 'neutral900'
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: 'neutral900',
    backgroundColor: 'neutral200'
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'neutral900',
    ':hover': {
      backgroundColor: 'neutral200',
      color: 'neutral900'
    }
  })
};
