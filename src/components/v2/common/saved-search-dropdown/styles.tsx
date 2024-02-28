import { StylesConfig } from 'react-select';

interface IColourOption {
  readonly value: string;
  readonly label: string;
}

export const savedSearchDropDownStyle: StylesConfig<IColourOption, true> = {
  control: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',

    backgroundColor: 'var(--neutral-0)',
    borderRadius: '4px',
    // border: 'none',
    border: '1px solid var(--neutral-200)',
    // borderBottom: '1px solid hsl(var(--solitaire-quaternary))',
    // outline: '1px solid var(--neutral-200)',
    width: '100%',
    boxShadow: 'var(--input-shadow) inset',

    // This line disable the blue border
    '&:hover': {
      border: '1px solid var(--neutral-200) !important'
    }
    // ':hover': {
    //   border: 'none',
    //   borderBottom: '1px solid var(--neutral-200)'
    // }
  }),
  valueContainer: styles => ({
    ...styles,
    padding: '2px 4px 2px 40px',
    cursor: 'text'
  }),
  dropdownIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  singleValue: styles => ({
    ...styles,
    color: 'var(--neutral-900)'
  }),
  placeholder: styles => ({
    ...styles,
    color: 'var(--neutral-500)',
    fontSize: 'var(--font-size-mRegular)',
    border: 'none'
  }),
  menu: styles => ({
    ...styles,
    boxShadow: 'none',
    borderRadius: '8px',
    marginTop: '12px',
    position: 'relative'
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'var(--neutral-0)',
    padding: '0px',
    borderRadius: '8px',
    maxHeight: '265px',
    border: '1px solid var(--neutral-200)'
  }),
  option: styles => {
    return {
      ...styles,
      backgroundColor: 'var(--neutral-0)',
      color: 'var(--neutral-900)',
      padding: '16px',
      borderBottom: '1px solid var(--neutral-200)',
      ':active': {
        ...styles[':active'],
        backgroundColor: 'var(--neutral-0)'
      },
      ':hover': {
        backgroundColor: 'var(--neutral-50)',
        color: 'var(--neutral-900)'
      },
      cursor: 'pointer'
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
    backgroundColor: 'var(--neutral-0)'
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
