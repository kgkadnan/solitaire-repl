export const colourStyles = (error: any) => {
  return {
    control: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-500)',

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
        border: error.length
          ? '1px solid var(--danger-main)'
          : '1px solid var(--neutral-200)',
        borderRight: 'none'
      },
      height: '40px'
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none'
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: '8px 2px 8px 0px'
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-500)',
      display: 'flex',
      alignItems: 'center'
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-500)',
      border: 'none',
      height: '38px'
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

        display: 'flex',
        alignItems: 'center',
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
    valueContainer: (styles: any) => {
      return {
        ...styles,
        padding: '2px 0px 2px 8px'
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
