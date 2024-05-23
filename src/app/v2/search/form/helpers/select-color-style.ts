import { StylesConfig } from 'react-select';

interface IColourOption {
  readonly value: string;
  readonly label: string;
}

export const colourStyles: StylesConfig<IColourOption, true> = {
  control: (styles, state) => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',

    backgroundColor: 'var(--neutral-0)',
    borderRadius: '4px',
    border: '1px solid var(--neutral-200)',
    outline: '1px solid var(--neutral-200)',
    width: '100%',
    boxShadow: state.menuIsOpen ? 'var(--input-shadow) inset' : '',
    // This line disable the blue border
    '&:hover': {
      border: '1px solid var(--neutral-200) !important'
    }
  }),
  singleValue: styles => ({
    ...styles,
    color: 'var(--neutral-900)'
  }),
  placeholder: styles => ({
    ...styles,
    color: 'var(--neutral-900)',
    border: 'none'
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'var(--neutral-0)',
    minHeight: '10vh',
    height: '17vh'
  }),
  option: styles => {
    return {
      ...styles,
      backgroundColor: 'var(--neutral-0)',
      color: 'var(--neutral-900)',

      ':active': {
        ...styles[':active'],
        border: 'none',
        backgroundColor: 'var(--neutral-0)'
      },
      ':hover': {
        backgroundColor: 'var(--neutral-50)',
        border: 'none',
        color: 'var(--neutral-900)'
      }
    };
  },
  multiValue: styles => {
    return {
      ...styles,
      backgroundColor: 'var(--neutral-0)',
      color: 'var(--neutral-900)',
      border: '1px solid var(--neutral-200)',
      borderRadius: '6px'
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: 'var(--neutral-900)',
    backgroundColor: 'var(--neutral-0)',
    borderRadius: '6px'
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'var(--neutral-900)',
    ':hover': {
      backgroundColor: 'var(--neutral-200)',
      color: 'var(--neutral-900)'
    }
  })
};
