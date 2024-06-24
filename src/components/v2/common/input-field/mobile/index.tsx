import React, { useEffect, useState } from 'react';
import { InputField } from '..';
import { IInputFieldProps } from '../interface';
import Select, { components } from 'react-select';
import countryCode from '../../../../../constants/country-code.json';
import { colourStyles } from './country-select';
import { useGetAllCountryCodeQuery } from '@/features/api/get-country-code';

interface IMobileInputField extends IInputFieldProps {
  registerFormState: any;
  setRegisterFormState: any;
}
interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  target: React.ReactNode;
  onClose: () => void;
  errorText: string | undefined;
}

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
  const [countryOption, setCountryOption] = useState<any>([]);
  useEffect(() => {
    if (getAllCountryCode?.length > 0) {
      setCountryOption(getAllCountryCode);
    } else {
      setCountryOption(countryCode?.countries);
    }
  }, [getAllCountryCode]);
  const computeCountryDropdownField = (countryCode: any) => {
    return countryCode?.map(({ code, iso, country }: any) => ({
      label: code,
      value: code,
      iso: iso,
      country: country
    }));
  };

  const Option = (props: any) => (
    <components.Option {...props} className="country-option">
      <img
        src={`https://flagsapi.com/${props.data.iso}/flat/64.png`}
        style={{ width: 24 }}
        alt="logo"
      />
      +{props.data.label + ' ' + props.data.country}
    </components.Option>
  );

  const SingleValue = ({ children, ...props }: any) => (
    <components.SingleValue {...props}>
      <img
        src={`https://flagsapi.com/${registerFormState.iso}/flat/64.png`}
        style={{ width: 24 }}
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
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const customFilter = (option: any, inputValue: any) => {
    if (!inputValue) return true; // Show all options if no input
    const lowercasedInput = inputValue.toLowerCase();
    return (
      option.value.toLowerCase().includes(lowercasedInput) ||
      option.label.toLowerCase().includes(lowercasedInput) ||
      option.data.country.toLowerCase().includes(lowercasedInput)
    );
  };
  return (
    <>
      <div className={`flex text-left  flex-col`}>
        {label && <p className="text-mRegular text-neutral900">{label}</p>}

        <div className={`flex`}>
          <div onClick={() => !isOpen && toggleOpen()}>
            <Dropdown
              isOpen={isOpen}
              onClose={toggleOpen}
              target={
                <div className={`flex justify-between text-neutral900 `}>
                  <div className="flex items-center">
                    {' '}
                    <img
                      src={`https://flagsapi.com/${registerFormState.iso}/flat/64.png`}
                      style={{ width: 24 }}
                      alt="logo"
                    />{' '}
                    +{registerFormState.countryCode}
                  </div>
                  <ChevronDown />
                </div>
              }
              errorText={errorText}
            >
              <div className="relative left-[-9px] h-[275px] bg-neutral0 p-2 border-neutral200 border-[1px] rounded-[4px]">
                <Select
                  autoFocus
                  backspaceRemovesValue={false}
                  components={{
                    Option,
                    SingleValue,
                    DropdownIndicator,
                    IndicatorSeparator: null
                  }}
                  controlShouldRenderValue={false}
                  hideSelectedOptions={false}
                  isClearable={false}
                  menuIsOpen
                  onChange={handleSelectChange}
                  options={computeCountryDropdownField(countryOption)}
                  placeholder="Search"
                  styles={colourStyles('')}
                  tabSelectsValue={false}
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
        <p className="text-dangerMain h-1">{errorText && errorText}</p>
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

const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpen,
  target,
  onClose,
  errorText
}) => (
  <div
    className={`relative h-10 border-[1px]  w-[110px] p-2 ${
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
