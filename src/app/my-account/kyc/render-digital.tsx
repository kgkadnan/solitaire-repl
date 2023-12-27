import React from 'react';
import { RenderField } from './components/render-field';
import Image from 'next/image';

type RenderDigitalFormProps = {
  screen: any;
  isLastStep: boolean;
  formState: any;
  formErrorState: any;
  screenId: number;
};
export const RenderDigitalForm: React.FC<RenderDigitalFormProps> = ({
  screen,
  isLastStep,
  formState,
  formErrorState,
  screenId
}) => {
  return (
    // const renderDigitalForm = ( screen: any, isLastStep: any) => (
    <div key={screen.screen}>
      <div className="flex items-center mt-[30px] mb-[30px] ">
        <Image src={screen.icon} alt="Backhand image" />
        <h3 className="ml-[10px] text-[18px] text-solitaireTertiary">
          {screen.screen}
        </h3>
      </div>
      <div className="h-[950px] flex flex-col flex-wrap">
        {screen.fields.map((field: any) => (
          <div key={field.name} className={`mb-[20px] w-[40%] `}>
            <RenderField
              data={field}
              formState={formState}
              formErrorState={formErrorState}
              screenId={screenId}
              // screenName={screen.screen}
            />
          </div>
        ))}
        {/* {isLastStep && renderAttachment()}{' '} */}
      </div>
    </div>
    //   );
  );
};
