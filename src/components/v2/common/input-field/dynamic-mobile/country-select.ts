import zIndex from '@mui/material/styles/zIndex';

export const colourStyles = (error?: any, isDisabled?: boolean) => {
  return {
    control: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',

      backgroundColor: 'var(--neutral-0)',
      borderRadius: '4px ',
      border: error?.length
        ? '1px solid var(--danger-main)'
        : '1px solid var(--neutral-200)',
      // borderRight: 'none',
      width: '100px',
      boxShadow: 'var(--input-shadow) inset',
      zIndex: 1000, // Increased z-index to ensure the drawer is not hiding

      // This line disable the blue border
      cursor: isDisabled ? 'not-allowed' : 'default', // Change cursor to "not allowed" if isDisabled is true

      '&:hover': {
        border: error?.length
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
      padding: '8px 8px 8px 0px'
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
      display: 'flex',
      alignItems: 'center'
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
      border: 'none',
      height: '38px',
      paddingTop: '8px'
    }),
    menu: (styles: any) => ({
      ...styles,
      zIndex: 999,
      marginTop: '5px !important'
    }),
    menuList: (styles: any) => ({
      ...styles,
      backgroundColor: 'var(--neutral-0)',
      minHeight: '15vh',
      height: '15vh'
    }),
    option: (styles: { [x: string]: any }) => {
      return {
        ...styles,
        backgroundColor: 'var(--neutral-0)',
        color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
        cursor: isDisabled ? 'not-allowed' : 'default',
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
        color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
        border: '1px solid var(--neutral-200)',
        borderRadius: '6px'
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
      backgroundColor: 'var(--neutral-0)'
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
      ':hover': {
        backgroundColor: 'var(--neutral-200)',
        color: 'var(--neutral-900)'
      }
    })
  };
};
