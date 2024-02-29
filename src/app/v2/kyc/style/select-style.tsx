export const colourStyles = (error: any, isDisabled?: boolean) => {
  return {
    control: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',

      backgroundColor: 'var(--neutral-25)',
      borderRadius: '4px 4px 4px 4px',
      // border: 'none',
      border: error.length
        ? '1px solid var(--danger-main)'
        : '1px solid var(--neutral-200)',

      // outline: '1px solid var(--neutral-200)',
      width: '100%',
      boxShadow: 'var(--input-shadow) inset',

      // This line disable the blue border
      cursor: isDisabled ? 'not-allowed' : 'default', // Change cursor to "not allowed" if isDisabled is true

      '&:hover': {
        border: error.length
          ? '1px solid var(--danger-main)'
          : '1px solid var(--neutral-200)'
      },
      height: '39px'
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
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)'
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-400)',
      border: 'none',
      height: '38px',
      padding: '7px 0px'
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
        color: isDisabled ? 'var(--neutral-500)' : 'var(--neutral-900)',
        cursor: isDisabled ? 'not-allowed' : 'default',
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
