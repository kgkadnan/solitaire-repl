import { StylesConfig } from 'react-select';

interface ColourOption {
  readonly value: string;
  readonly label: string;
}

export const colourStyles: StylesConfig<ColourOption, true> = {
  control: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',

    backgroundColor: ' hsl(var(--solitaire-secondary))',
    borderRadius: 'none',
    border: 'none',
    padding: '10px',
    // borderBottom: '1px solid hsl(var(--solitaire-quaternary))',
    outline: '1px solid hsl(var(--solitaire-primary))',
    width: '100%',
    ':hover': {
      border: 'none'
    }
  }),
  singleValue: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))'
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
