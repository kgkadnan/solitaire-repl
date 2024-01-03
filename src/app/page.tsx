'use client';

import logger from 'logging/log-util';
import countryCode from '../constants/country-code.json';
import Select from 'react-select';
import { countryCodeSelectStyles } from './my-account/kyc/styles/country-code-select-style';
export default function Home() {
  logger.info('test log! pinotest stream from reactjs application.');

  const handleChangesss = (datas: any) => {
    console.log('datas', datas);
  };
  const computeCountryDropdownField = (countryCode: any) => {
    console.log('countryCode', countryCode.countries);
    return countryCode?.countries?.map(({ code }: any) => ({
      label: `+${code}`,
      value: `+${code}`
    }));
  };

  return (
    <>
      <h1
        style={{
          fontSize: '100px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '180px'
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        Building Digital Diamond Platform
      </h1>
      <Select
        options={computeCountryDropdownField(countryCode)}
        onChange={data => {
          handleChangesss(data);
        }}
        styles={countryCodeSelectStyles}
      />
    </>
  );
}
