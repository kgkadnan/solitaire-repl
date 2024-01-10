import React from 'react';
import { RenderField } from './components/render-field';
import Image from 'next/image';

type RenderOnlineFormProps = {
  screen: any;
  formState: any;
  formErrorState: any;
};
export const RenderOnlineForm: React.FC<RenderOnlineFormProps> = ({
  screen,
  formState,
  formErrorState
}) => {
  return (
    // const renderOnlineForm = ( screen: any, isLastStep: any) => (

    <div key={screen.screen}>
      <div className="flex items-center mt-[30px] mb-[30px] ">
        <Image src={screen.icon} alt="Backhand image" />
        <h3 className="ml-[10px] text-[18px] text-solitaireTertiary">
          {screen.screen}
        </h3>
      </div>
      <div className="max-h-[1200px] flex flex-col flex-wrap">
        {screen.fields.map((field: any) => (
          <div key={field.name} className={`mb-[20px] w-[40%] `}>
            <RenderField
              data={field}
              formState={formState}
              formErrorState={formErrorState}
              screenName={screen.screenName}
            />
          </div>
        ))}
      </div>
    </div>
    //   );
  );
};
