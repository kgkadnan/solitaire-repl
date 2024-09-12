export const colourStyles = (error: any) => {
  return {
    control: (styles: any) => ({
      ...styles,
      color: 'var(--neutral-500)',
      alignItem: 'center',
      backgroundColor: 'var(--neutral-0)',
      borderRadius: '4px',
      border: error.length
        ? '1px solid var(--danger-main)'
        : '1px solid var(--neutral-200)',
      // borderRight: 'none',
      width: '250px',
      boxShadow: 'var(--input-shadow) inset',
      // This line disable the blue border
      '&:hover': {
        border: error.length
          ? '1px solid var(--danger-main)'
          : '1px solid var(--neutral-200)'
        // borderRight: 'none'
      },
      height: '40px'
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none'
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: '8px 8px 8px 0px',
      height: '20px'
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
      height: '38px',
      paddingTop: '8px'
    }),
    menuList: (styles: any) => ({
      ...styles,
      backgroundColor: 'var(--neutral-0)',
      minHeight: '28vh',
      height: '17vh',
      borderRadius: '6px'
    }),
    menu: (styles: any) => ({
      ...styles,

      marginTop: '12px !important'
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
        paddingLeft: '8px',
        height: '40px'
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
