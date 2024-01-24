'use client';

import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import { anchor } from '@/constants/v2/form';
import React, { useEffect } from 'react';
import useFormStateManagement from './hooks/form-state';
import { Shape } from './components/shape';
import { Carat } from './components/carat';
import { Color } from './components/color';
import { useGetProductCountQuery } from '@/features/api/product';
import useValidationStateManagement from './hooks/validation-state-management';
import { generateQueryParams } from './helpers/generate-query-parameters';
import { constructUrlParams } from '@/utils/construct-url-param';
import { Clarity } from './components/clarity';
import { PolishSymmetry } from './components/polish-symmetry';
import { Fluorescence } from './components/fluorescence';
import { Lab } from './components/lab';
import { Location } from './components/location';
import { CountryOfOrigin } from './components/country-of-origin';
import { Shade } from './components/shade';
import { Parameters } from './components/parameters';
import { Girdle } from './components/girdle';
import { Culet } from './components/culet';
import { KeyToSymbol } from './components/key-to-symbol';
import { DiscountPrice } from './components/discount-price';
import Inclusions from './components/inclusions';
// import Inclusions from './components/inclusions';

const Form = () => {
  const { state, setState } = useFormStateManagement();

  const { setSearchUrl, searchUrl, isValidationError } =
    useValidationStateManagement();

  const { data } = useGetProductCountQuery(
    {
      searchUrl
    },
    {
      skip: !searchUrl
    }
  );

  console.log('data', data);

  // Update search URL when form state changes
  useEffect(() => {
    const queryParams = generateQueryParams(state);

    // Construct your search URL here
    if (!isValidationError) {
      setSearchUrl(constructUrlParams(queryParams));
    }
  }, [state]);

  return (
    <div>
      {/* <TopNavigationBar/> */}
      <div>
        {/* <SideNavigationBar/> */}
        <div>
          <div className="flex flex-col gap-[16px] w-[calc(100%-148px)]">
            <div>
              <span className="text-neutral900 text-headingM font-medium grid gap-[24px]">
                Search for Diamonds
              </span>
            </div>
            <AnchorLinkNavigation anchorNavigations={anchor} />

            <Shape state={state} setState={setState} />

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <Carat state={state} setState={setState} />
              <Color state={state} setState={setState} />
            </div>
            <Clarity state={state} setState={setState} />

            <PolishSymmetry state={state} setState={setState} />
            <Fluorescence state={state} setState={setState} />
            <Lab state={state} setState={setState} />
            <Location state={state} setState={setState} />
            <CountryOfOrigin state={state} setState={setState} />
            <Shade state={state} setState={setState} />
            <DiscountPrice state={state} setState={setState} />
            <Parameters state={state} setState={setState} />
            <Girdle state={state} setState={setState} />
            <Culet state={state} setState={setState} />
            <Inclusions state={state} setState={setState} />
            <KeyToSymbol state={state} setState={setState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
