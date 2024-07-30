import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { RenderAttachment } from '@/app/v2/kyc/components/attachement';
import { AttachmentData } from '@/app/v2/kyc/components/attachment-data/attachement-data';
import BankingDetails from '@/app/v2/kyc/components/banking-details';
import CountrySelection from '@/app/v2/kyc/components/country-selection';
import PersonalDetail from '@/app/v2/kyc/components/personal-detail';
import { RenderOffline } from '@/app/v2/kyc/components/render-offline';
import SubmissionOption from '@/app/v2/kyc/components/submission-option';
import {
  ITermsDialog,
  TermsDialogComponent
} from '@/app/v2/kyc/components/terms-and-conditions';
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import CompanyOwnerDetail from '@/app/v2/kyc/components/company-owner-detail';

// Default export for Storybook
export default {
  title: 'Modules/auth/KYC',
  component: RenderAttachment,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {}
} as Meta;

export const Docs = () => {
  const [showCode, setShowCode] = useState<string | null>(null);

  const toggleCode = (componentName: string) => {
    setShowCode(showCode === componentName ? null : componentName);
  };

  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">KYC Components Documentation</h1>
      <p className="text-base text-gray-600">
        This documentation provides details on the various components used in
        the KYC module. Each component serves a specific function in the KYC
        process and includes props and usage examples.
      </p>
      <section>
        <h2 className="text-xl text-gray-800 mt-5">
          CompanyOwnerDetail Component
        </h2>
        <p className="text-base text-gray-600 mt-3">
          The{' '}
          <code className="bg-gray-200 p-1 rounded">CompanyOwnerDetail</code>{' '}
          component displays and manages details of the company owner, including
          form fields for personal and contact information. It integrates form
          error handling and state management.
        </p>
        <button
          className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
          onClick={() => toggleCode('CompanyOwnerDetail')}
        >
          {showCode === 'CompanyOwnerDetail' ? 'Hide Code' : 'Show Code'}
        </button>
        {showCode === 'CompanyOwnerDetail' && (
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
            {`<CompanyOwnerDetail
                        formErrorState={{
                            online: {
                            sections: {
                                [kycScreenIdentifierNames.COMPANY_OWNER_DETAILS]: {
                                owner_first_name: '',
                                owner_last_name: '',
                                owner_pan_or_aadhaar_number: '',
                                owner_phone: '',
                                owner_email: '',
                                },
                            },
                            },
                        }}
                        formState={{
                            online: {
                            sections: {
                                [kycScreenIdentifierNames.COMPANY_OWNER_DETAILS]: {
                                owner_first_name: '',
                                owner_last_name: '',
                                owner_pan_or_aadhaar_number: '',
                                owner_phone: '',
                                owner_email: '',
                                owner_country_code: '91',
                                },
                            },
                            },
                        }}
                        dispatch={(action: any) => console.log('Dispatching action:', action)}
                        currentStepperStep={0}
                        />`}
          </pre>
        )}
        <h3 className="text-lg text-gray-800 mt-5">Props</h3>
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
              <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
              <th className="bg-gray-100 text-gray-800 p-3 border">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border text-gray-700">formErrorState</td>
              <td className="p-3 border text-gray-700">Object</td>
              <td className="p-3 border text-gray-700">
                The error state of the form fields
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">formState</td>
              <td className="p-3 border text-gray-700">Object</td>
              <td className="p-3 border text-gray-700">
                The current state of the form fields
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">dispatch</td>
              <td className="p-3 border text-gray-700">
                (action: any) =&gt ;void
              </td>
              <td className="p-3 border text-gray-700">
                Function to dispatch actions
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">currentStepperStep</td>
              <td className="p-3 border text-gray-700">number</td>
              <td className="p-3 border text-gray-700">
                The current step in the stepper
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <h2 className="text-xl text-gray-800 mt-5">RenderAttachment Component</h2>
      <p className="text-base text-gray-600 mt-3">
        The <code className="bg-gray-200 p-1 rounded">RenderAttachment</code>{' '}
        component handles the display and management of attachments. It includes
        functionalities for file upload and attachment management.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('RenderAttachment')}
      >
        {showCode === 'RenderAttachment' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'RenderAttachment' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<RenderAttachment
              formErrorState={mockFormErrorState}
              formState={mockFormState}
              modalSetState={() => {}}
              modalState={false}
              country="USA"
              handleTermAndCondition={(val) => AttachmentData({ name: 'formState.termAndCondition', value: val })}
              selectedSubmissionOption="online"
              currentStepperStep={1}
              AttachmentData={AttachmentData}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">formErrorState</td>
            <td className="p-3 border text-gray-700">FormErrorState</td>
            <td className="p-3 border text-gray-700">
              State object containing form error details
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">formState</td>
            <td className="p-3 border text-gray-700">FormState</td>
            <td className="p-3 border text-gray-700">
              Current state of the form
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">modalSetState</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to set modal state
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">modalState</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Boolean indicating if the modal is open
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">country</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Country code for the form
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleTermAndCondition</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to handle term and condition changes
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">
              selectedSubmissionOption
            </td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Selected submission option
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">currentStepperStep</td>
            <td className="p-3 border text-gray-700">number</td>
            <td className="p-3 border text-gray-700">
              Current step in the form wizard
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">AttachmentData</td>
            <td className="p-3 border text-gray-700">AttachmentData</td>
            <td className="p-3 border text-gray-700">
              Attachment data details
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl text-gray-800 mt-5">BankingDetails Component</h2>
      <p className="text-base text-gray-600 mt-3">
        The <code className="bg-gray-200 p-1 rounded">BankingDetails</code>{' '}
        component displays and manages banking information. It includes fields
        for bank details and error handling.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('BankingDetails')}
      >
        {showCode === 'BankingDetails' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'BankingDetails' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<BankingDetails
              formErrorState={mockFormErrorState}
              formState={mockFormState}
              dispatch={() => {}}
              country={countries.INDIA}
              currentStepperStep={1}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">formErrorState</td>
            <td className="p-3 border text-gray-700">FormErrorState</td>
            <td className="p-3 border text-gray-700">
              State object containing form error details
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">formState</td>
            <td className="p-3 border text-gray-700">FormState</td>
            <td className="p-3 border text-gray-700">
              Current state of the form
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">dispatch</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to dispatch actions
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">country</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">Country code</td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">currentStepperStep</td>
            <td className="p-3 border text-gray-700">number</td>
            <td className="p-3 border text-gray-700">
              Current step in the form wizard
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl text-gray-800 mt-5">CountrySelection Component</h2>
      <p className="text-base text-gray-600 mt-3">
        The <code className="bg-gray-200 p-1 rounded">CountrySelection</code>{' '}
        component allows users to select a country. It includes a state for the
        selected country and a handler for country changes.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('CountrySelection')}
      >
        {showCode === 'CountrySelection' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'CountrySelection' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<CountrySelection
              selectedCountry={selectedCountry}
              handleCountrySelection={(country) => setSelectedCountry(country)}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">selectedCountry</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Currently selected country
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleCountrySelection</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to handle country selection
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl text-gray-800 mt-5">PersonalDetail Component</h2>
      <p className="text-base text-gray-600 mt-3">
        The <code className="bg-gray-200 p-1 rounded">PersonalDetail</code>{' '}
        component captures and displays personal details such as name, phone
        number, and email.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('PersonalDetail')}
      >
        {showCode === 'PersonalDetail' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'PersonalDetail' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<PersonalDetail
              formState={mockFormState}
              formErrorState={mockFormErrorState}
              dispatch={() => {}}
              currentStepperStep={0}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">formState</td>
            <td className="p-3 border text-gray-700">FormState</td>
            <td className="p-3 border text-gray-700">
              Current state of the form
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">formErrorState</td>
            <td className="p-3 border text-gray-700">FormErrorState</td>
            <td className="p-3 border text-gray-700">
              State object containing form error details
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">dispatch</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to dispatch actions
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">currentStepperStep</td>
            <td className="p-3 border text-gray-700">number</td>
            <td className="p-3 border text-gray-700">
              Current step in the form wizard
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl text-gray-800 mt-5">RenderOffline Component</h2>
      <p className="text-base text-gray-600 mt-3">
        The <code className="bg-gray-200 p-1 rounded">RenderOffline</code>{' '}
        component displays content when the user is offline and handles
        offline-related errors.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('RenderOffline')}
      >
        {showCode === 'RenderOffline' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'RenderOffline' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<RenderOffline
              formState={mockFormState}
              formErrorState={mockFormErrorState}
              modalSetState={() => {}}
              modalState={false}
              country={countries.INDIA}
              handleTermAndCondition={() => {}}
              selectedSubmissionOption="online"
              fromWhere={countries.INDIA}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">formState</td>
            <td className="p-3 border text-gray-700">FormState</td>
            <td className="p-3 border text-gray-700">
              Current state of the form
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">formErrorState</td>
            <td className="p-3 border text-gray-700">FormErrorState</td>
            <td className="p-3 border text-gray-700">
              State object containing form error details
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">modalSetState</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to set modal state
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">modalState</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Boolean indicating if the modal is open
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">country</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">Country code</td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleTermAndCondition</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to handle term and condition changes
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">
              selectedSubmissionOption
            </td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Selected submission option
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">fromWhere</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Country code indicating where the form was submitted from
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl text-gray-800 mt-5">SubmissionOption Component</h2>
      <p className="text-base text-gray-600 mt-3">
        The <code className="bg-gray-200 p-1 rounded">SubmissionOption</code>{' '}
        component lets users select a submission option and handles navigation.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('SubmissionOption')}
      >
        {showCode === 'SubmissionOption' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'SubmissionOption' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<SubmissionOption
              selectedSubmissionOption="online"
              handleSubmissionOptionClick={(option) => console.log('Selected Option:', option)}
              handleBack={(currentState) => console.log('Back to:', currentState)}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">
              selectedSubmissionOption
            </td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Currently selected submission option
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">
              handleSubmissionOptionClick
            </td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to handle submission option click
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleBack</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to handle navigation back
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl text-gray-800 mt-5">TermsDialogComponent</h2>
      <p className="text-base text-gray-600 mt-3">
        The{' '}
        <code className="bg-gray-200 p-1 rounded">TermsDialogComponent</code>{' '}
        displays a dialog for terms and conditions with customizable styles.
      </p>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-5"
        onClick={() => toggleCode('TermsDialogComponent')}
      >
        {showCode === 'TermsDialogComponent' ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === 'TermsDialogComponent' && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<TermsDialogComponent
              isOpens={false}
              dialogStyle={{ dialogContent: '' }}
            />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">isOpens</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Boolean indicating if the dialog is open
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">dialogStyle</td>
            <td className="p-3 border text-gray-700">object</td>
            <td className="p-3 border text-gray-700">
              Custom styles for the dialog
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const companyOwnerDerail: Story<any> = args => <CompanyOwnerDetail {...args} />;
export const CompanyOwnerDerailStory = companyOwnerDerail.bind({});

CompanyOwnerDerailStory.args = {
  formErrorState: {
    online: {
      sections: {
        [kycScreenIdentifierNames.COMPANY_OWNER_DETAILS]: {
          owner_first_name: '',
          owner_last_name: '',
          owner_pan_or_aadhaar_number: '',
          owner_phone: '',
          owner_email: ''
        }
      }
    }
  },
  formState: {
    online: {
      sections: {
        [kycScreenIdentifierNames.COMPANY_OWNER_DETAILS]: {
          owner_first_name: '',
          owner_last_name: '',
          owner_pan_or_aadhaar_number: '',
          owner_phone: '',
          owner_email: '',
          owner_country_code: '91'
        }
      }
    }
  },
  dispatch: (action: any) => console.log('Dispatching action:', action),
  currentStepperStep: 0
};
// Stories for RenderAttachment
const RenderAttachmentTemplate: Story<any> = args => (
  <RenderAttachment {...args} />
);

export const RenderAttachmentStory = RenderAttachmentTemplate.bind({});
RenderAttachmentStory.args = {
  formErrorState: { attachment: {}, termAndCondition: '' },
  formState: { attachment: {}, termAndCondition: false },
  modalSetState: () => {},
  modalState: false,
  country: 'USA',
  handleTermAndCondition: (val: boolean) =>
    AttachmentData({ name: 'formState.termAndCondition', value: val }),
  selectedSubmissionOption: 'online',
  currentStepperStep: 1,
  AttachmentData: AttachmentData
};

// Stories for BankingDetails
const BankingDetailsTemplate: Story<any> = args => <BankingDetails {...args} />;

export const BankingDetailsStory = BankingDetailsTemplate.bind({});
BankingDetailsStory.args = {
  formErrorState: {
    online: {
      sections: {
        [kycScreenIdentifierNames.BANKING_DETAILS]: {
          bank_name: '',
          account_holder_name: '',
          account_number: '',
          ifsc_code: '',
          bank_address: ''
        }
      }
    }
  },
  formState: {
    online: {
      sections: {
        [kycScreenIdentifierNames.BANKING_DETAILS]: {
          bank_name: 'Sample Bank',
          account_holder_name: 'John Doe',
          account_number: '1234567890',
          ifsc_code: 'ABC1234',
          bank_address: '123 Bank St'
        }
      }
    }
  },
  dispatch: () => {},
  country: countries.INDIA,
  currentStepperStep: 1
};

// Stories for CountrySelection
const CountrySelectionTemplate: Story<any> = args => {
  const [selectedCountry, setSelectedCountry] = useState(args.selectedCountry);

  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
    args.handleCountrySelection(country);
  };

  return (
    <CountrySelection
      {...args}
      selectedCountry={selectedCountry}
      handleCountrySelection={handleCountrySelection}
    />
  );
};

export const CountrySelectionStory = CountrySelectionTemplate.bind({});
CountrySelectionStory.args = {
  selectedCountry: ''
};

// Stories for PersonalDetail
const PersonalDetailTemplate: Story<any> = args => <PersonalDetail {...args} />;

export const PersonalDetailStory = PersonalDetailTemplate.bind({});
PersonalDetailStory.args = {
  formState: {
    online: {
      sections: {
        [kycScreenIdentifierNames.PERSONAL_DETAILS]: {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          country_code: 'IN'
        }
      }
    }
  },
  formErrorState: {
    online: {
      sections: {
        [kycScreenIdentifierNames.PERSONAL_DETAILS]: {
          first_name: '',
          last_name: '',
          phone: '',
          email: ''
        }
      }
    }
  },
  dispatch: () => {},
  currentStepperStep: 0
};

// Stories for RenderOffline
const RenderOfflineTemplate: Story<any> = args => <RenderOffline {...args} />;

export const RenderOfflineStory = RenderOfflineTemplate.bind({});
RenderOfflineStory.args = {
  formState: {
    attachment: {},
    termAndCondition: false
  },
  formErrorState: {
    attachment: {},
    termAndCondition: ''
  },
  modalSetState: () => {},
  modalState: false,
  country: countries.INDIA,
  handleTermAndCondition: () => {},
  selectedSubmissionOption: 'online',
  fromWhere: countries.INDIA
};

// Stories for SubmissionOption
const SubmissionOptionTemplate: Story<any> = args => (
  <SubmissionOption {...args} />
);

export const SubmissionOptionStory = SubmissionOptionTemplate.bind({});
SubmissionOptionStory.args = {
  selectedSubmissionOption: 'online',
  handleSubmissionOptionClick: (option: string) =>
    console.log('Selected Option:', option),
  handleBack: (currentState: string) => console.log('Back to:', currentState)
};

// Stories for TermsDialogComponent
const TermsDialogTemplate: Story<ITermsDialog> = args => {
  const [isOpen, setIsOpen] = useState(args.isOpens);

  return (
    <TermsDialogComponent {...args} isOpens={isOpen} setIsOpen={setIsOpen} />
  );
};
export const TermsDialogOpen = TermsDialogTemplate.bind({});
TermsDialogOpen.args = {
  isOpens: true,
  dialogStyle: {
    dialogContent: ''
  }
};

export const TermsDialogCustomStyle = TermsDialogTemplate.bind({});
TermsDialogCustomStyle.args = {
  isOpens: true,
  dialogStyle: {
    dialogContent: 'bg-blue-500 text-white'
  }
};
