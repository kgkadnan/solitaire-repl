import React, { useEffect, useState } from 'react';
import { InputField } from '..';
import { IInputFieldProps } from '../interface';
import Select, { components, InputActionMeta } from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { colourStyles } from './country-select';
import { useGetAllCountryCodeQuery } from '@/features/api/get-country-code';
import ind from '@public/v2/assets/png/data-table/IND_NEW.png';
import Image from 'next/image';

interface IMobileInputField extends IInputFieldProps {
  registerFormState: any;
  setRegisterFormState: any;
}
interface IDropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  target: React.ReactNode;
  onClose: () => void;
  errorText: string | undefined;
}
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const MobileInput = ({
  name,
  value,
  label,
  errorText,
  onChange,
  placeholder,
  registerFormState,
  setRegisterFormState
}: IMobileInputField) => {
  const { data: getAllCountryCode } = useGetAllCountryCodeQuery({});
  const [isFlagLoaded, setIsFlagLoaded] = useState(true);

  const [countryOption, setCountryOption] = useState<any>([]);
  useEffect(() => {
    if (getAllCountryCode?.length > 0) {
      setCountryOption(getAllCountryCode);
    } else {
      setCountryOption(countryCode?.countries);
    }
  }, [getAllCountryCode]);

  // useEffect(() => {
  //   setIsOpen(false);
  // }, [registerFormState]);
  const computeCountryDropdownField = (countryCode: any) => {
    return countryCode?.map(({ code, iso, country }: any) => ({
      label: code,
      value: code,
      iso: iso,
      country: country
    }));
  };

  const Option = (props: any) => (
    <components.Option {...props} className="country-option gap-[6px]">
      <Image
        src={`${apiURL}flags/${props.data.iso}.png`}
        width={24}
        height={24}
        onError={(e: any) => {
          e.target.error = null; // prevents looping
          e.target.src = ind;
        }}
        alt="logo"
      />
      +{props.data.label + ' ' + props.data.country}
    </components.Option>
  );

  const SingleValue = ({ children, ...props }: any) => (
    <components.SingleValue {...props} className="gap-[6px]">
      <Image
        src={`${apiURL}flags/${registerFormState?.iso}.png`}
        width={24}
        height={24}
        onError={(e: any) => {
          e.target.error = null; // prevents looping
          e.target.src = ind;
        }}
        alt={registerFormState.iso}
      />
      {children}
    </components.SingleValue>
  );

  const handleSelectChange = (selectValue: any) => {
    setRegisterFormState(() => ({
      ...registerFormState,
      countryCode: selectValue?.value,
      iso: selectValue?.iso
    }));
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    !isFlagLoaded && setIsOpen(!isOpen);
  };

  const customFilter = (option: any, inputValue: any) => {
    if (!inputValue) return true; // Show all options if no input
    const lowercasedInput = inputValue.toLowerCase().replace(/\+/g, '').trim();
    return (
      option.value.toLowerCase().includes(lowercasedInput) ||
      option.label.toLowerCase().includes(lowercasedInput) ||
      option.data.country.toLowerCase().includes(lowercasedInput)
    );
  };

  const onInputChange = (
    inputValue: string,
    { action, prevInputValue }: InputActionMeta
  ) => {
    if (action === 'input-change') return inputValue;

    return prevInputValue;
  };

  return (
    <>
      <div className={`flex text-left  flex-col `}>
        {label && <p className="text-mRegular text-neutral900">{label}</p>}

        <div className={`flex h-[40px]`}>
          <div onClick={() => !isOpen && toggleOpen()}>
            <Dropdown
              isOpen={isOpen}
              onClose={toggleOpen}
              target={
                <>
                  {' '}
                  <div className="relative flex justify-center items-center">
                    {isFlagLoaded && (
                      <div
                        className="absolute  flex justify-center items-center bg-neutral0 rounded-[4px] w-[105px] top-[-7px] h-[37px]"
                        onClick={e => {
                          e.stopPropagation();
                        }}
                      >
                        <div role="status" className="flex justify-center">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-4 text-neutral200 animate-spin fill-primaryMain"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                    {registerFormState.iso && (
                      <div
                        className={`flex justify-between text-neutral900  gap-2`}
                      >
                        <div className="flex items-center gap-[6px]">
                          <Image
                            width={24}
                            height={24}
                            src={`${apiURL}flags/${registerFormState.iso}.png`}
                            onError={(e: any) => {
                              e.target.error = null; // prevents looping
                              e.target.src = ind;
                            }}
                            onLoad={() => {
                              setIsFlagLoaded(false);
                            }}
                            alt="logo"
                          />
                          +{registerFormState.countryCode}
                        </div>
                        <ChevronDown />
                      </div>
                    )}
                  </div>
                </>
              }
              errorText={errorText}
            >
              <div className="relative left-[-9px] h-[275px]  bg-neutral0 p-2 border-neutral200 border-[1px] rounded-[4px]">
                <Select
                  autoFocus
                  backspaceRemovesValue={false}
                  components={{
                    Option,
                    SingleValue,
                    DropdownIndicator,
                    IndicatorSeparator: null
                  }}
                  isDisabled={isFlagLoaded}
                  controlShouldRenderValue={false}
                  hideSelectedOptions={false}
                  isClearable={false}
                  menuIsOpen
                  onChange={handleSelectChange}
                  options={computeCountryDropdownField(countryOption)}
                  placeholder="Search"
                  styles={colourStyles('', isFlagLoaded)}
                  tabSelectsValue={false}
                  onInputChange={onInputChange}
                  value={{
                    label: `+${registerFormState.countryCode}`,
                    value: registerFormState.countryCode
                  }}
                  filterOption={customFilter}
                />
              </div>
            </Dropdown>
          </div>
          <InputField
            label={''}
            onChange={onChange}
            type="number"
            name={name}
            value={value}
            placeholder={placeholder}
            styles={{
              input: `rounded-l-[0px]  focus:border-[1px] ${
                errorText
                  ? 'border-dangerMain focus:border-dangerMain hover:border-dangerMain focus-visible:border-dangerMain'
                  : 'border-neutral200'
              }`
            }}
          />
        </div>
        <p className="text-dangerMain h-auto pt-[4px] leading-[1.2] text-sMedium">
          {errorText && errorText}
        </p>
      </div>
    </>
  );
};

const Menu = (props: any) => {
  return (
    <div
      style={{
        borderRadius: 4,
        marginTop: 8,
        position: 'absolute',
        zIndex: 2
      }}
      {...props}
    />
  );
};

const Blanket: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1
    }}
    {...props}
  />
);

const Dropdown: React.FC<IDropdownProps> = ({
  children,
  isOpen,
  target,
  onClose,
  errorText
}) => (
  <div
    className={`relative h-10 border-[1px]   w-[110px] p-2 ${
      errorText?.length ? 'border-dangerMain' : 'border-neutral200'
    }`}
    style={{
      boxShadow: 'var(--input-shadow) inset',
      borderRadius: '4px 0px 0px 4px',
      borderRight: 'none'
    }}
  >
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);

const Svg: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...props}
  />
);

const DropdownIndicator: React.FC = () => (
  <div style={{ color: 'neutral200', height: 24, width: 24 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);

const ChevronDown: React.FC = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);
