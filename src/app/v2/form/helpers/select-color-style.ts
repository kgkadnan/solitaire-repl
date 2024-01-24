import { StylesConfig } from 'react-select';

interface IColourOption {
  readonly value: string;
  readonly label: string;
}

export const colourStyles: StylesConfig<IColourOption, true> = {
  control: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',

    backgroundColor: ' hsl(var(--solitaire-primary))',
    borderRadius: 'none',
    border: 'none',
    borderBottom: '1px solid hsl(var(--solitaire-quaternary))',
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
  placeholder: styles => ({
    ...styles,
    color: 'hsl(var(--solitaire-tertiary))',
    border: 'none'
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'hsl(var(--solitaire-denary))',
    minHeight: '10vh',
    height: '17vh'
  }),
  option: styles => {
    return {
      ...styles,
      backgroundColor: 'hsl(var(--solitaire-denary))',
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
