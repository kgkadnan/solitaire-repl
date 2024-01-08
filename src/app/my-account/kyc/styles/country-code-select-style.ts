import { ControlProps, GroupBase, StylesConfig } from 'react-select';

interface IColourOption {
  readonly value: string;
  readonly label: string;
}

export const countryCodeSelectStyles: StylesConfig<IColourOption, true> = {
  control: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',
    border: 'none',
    borderBottom: '1px solid hsl(var(--solitaire-quaternary))',
    backgroundColor: ' hsl(var(--solitaire-primary))',
    borderRadius: 'none',
    padding: '2.5px',
    // borderBottom: '1px solid hsl(var(--solitaire-quaternary))',
    outline: '1px solid hsl(var(--solitaire-primary))',
    width: '100%',
    ':hover': {
      border: 'none',
      borderBottom: '1px solid hsl(var(--solitaire-quaternary))'
    }
  }),
  singleValue: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  placeholder: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',
    border: 'none'
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'hsl(var(--solitaire-denary))',
    minHeight: '23vh',
    height: '23vh'
  }),
  option: styles => {
    return {
      ...styles,
      backgroundColor: 'hsl(var(--solitaire-denary))',
      minHeight: '5.5vh',
      height: '5.5vh',
      color: 'hsl(var(--solitaire-tertiary))',
      ':active': {
        ...styles[':active'],
        border: 'none',
        backgroundColor: 'hsl(var(--solitaire-denary))'
      },
      ':hover': {
        backgroundColor: 'hsl(var(--solitaire-secondary))',
        border: 'none',
        color: 'hsl(var(--solitaire-tertiary))'
      }
    };
  },
  multiValue: styles => {
    return {
      ...styles,
      backgroundColor: 'hsl(var(--solitaire-primary))'
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',
    backgroundColor: 'hsl(var(--solitaire-primary))'
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',
    ':hover': {
      backgroundColor: 'hsl(var(--solitaire-primary))',
      color: 'hsl(var(--solitaire-tertiary))'
    }
  })
};

export const countryCodeSelectStyle = (error: any, isDisabled?: boolean) => {
  return {
    control: (styles: any) => ({
      ...styles,
      color: 'hsl(var(--solitaire-tertiary))',
      border: 'none',
      borderBottom: error.length
        ? '1px solid hsl(var(--solitaire-error))'
        : isDisabled
        ? '1px solid hsl(var(--solitaire-denary))'
        : '1px solid hsl(var(--solitaire-quaternary))',
      backgroundColor: 'hsl(var(--solitaire-primary))',
      borderRadius: 'none',
      padding: '2.5px',
      outline: '1px solid hsl(var(--solitaire-primary))',
      cursor: isDisabled ? 'not-allowed' : 'default', // Change cursor to "not allowed" if isDisabled is true
      opacity: isDisabled && 0.6,
      width: '100%',
      ':hover': {
        border: 'none',
        borderBottom: error.length
          ? '1px solid hsl(var(--solitaire-error))'
          : '1px solid hsl(var(--solitaire-quaternary))'
      }
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: error.length ? 'hsl(var(--solitaire-error))' : styles.color
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'hsl(var(--solitaire-tertiary))'
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none'
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: 'hsl(var(--solitaire-tertiary))',
      border: 'none'
    }),
    menuList: (styles: any) => ({
      ...styles,
      backgroundColor: 'hsl(var(--solitaire-denary))',
      minHeight: '23vh',
      height: '23vh'
    }),
    option: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'hsl(var(--solitaire-denary))',
        minHeight: '5.5vh',
        height: '5.5vh',
        color: 'hsl(var(--solitaire-tertiary))',
        ':active': {
          ...styles[':active'],
          border: 'none',
          backgroundColor: 'hsl(var(--solitaire-denary))'
        },
        ':hover': {
          backgroundColor: 'hsl(var(--solitaire-secondary))',
          border: 'none',
          color: 'hsl(var(--solitaire-tertiary))'
        }
      };
    },
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'hsl(var(--solitaire-primary))'
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'hsl(var(--solitaire-tertiary))',
      backgroundColor: 'hsl(var(--solitaire-primary))'
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: 'hsl(var(--solitaire-tertiary))',
      ':hover': {
        backgroundColor: 'hsl(var(--solitaire-primary))',
        color: 'hsl(var(--solitaire-tertiary))'
      }
    })
  };
};
