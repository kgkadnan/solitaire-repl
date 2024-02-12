export const colourStyles = (error: any) => {
  return {
    control: (styles: any) => ({
      ...styles,
      color: 'hsl(var(--solitaire-tertiary))',

      backgroundColor: 'var(--neutral-0)',
      borderRadius: '4px 0px 0px 4px',
      // border: 'none',
      border: error.length
        ? '1px solid var(--danger-main)'
        : '1px solid var(--neutral-200)',
      borderRight: 'none',
      // outline: '1px solid var(--neutral-200)',
      width: '90px',
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
    singleValue: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-900)'
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-900)',
      border: 'none'
    }),
    menuList: (styles: any) => ({
      ...styles,
      backgroundColor: 'var(--neutral-0)',
      minHeight: '10vh',
      height: '17vh'
    }),
    option: (styles: { [x: string]: any }) => {
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
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'var(--neutral-0)',
        color: 'var(--neutral-900)',
        border: '1px solid var(--neutral-200)',
        borderRadius: '6px'
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-900)',
      backgroundColor: 'var(--neutral-0)'
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-900)',
      ':hover': {
        backgroundColor: 'var(--neutral-200)',
        color: 'var(--neutral-900)'
      }
    })
  };
};
