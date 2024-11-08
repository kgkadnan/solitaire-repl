import { updateFormState } from '@/features/kyc/kyc';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';

const citiesByState: any = {
  Gujarat: [
    'AHMEDABAD',
    'SURAT',
    'RAJKOT',
    'NAVSARI',
    'PALANPUR',
    'VALSAD',
    'BHAYANDER',
    'BHAVNAGAR',
    'BOTAD',
    'DEESA'
  ],
  Haryana: ['GURGAON'],
  'Tamil Nadu': ['CHENNAI', 'COIMBATORE', 'HOSUR', 'SALEM', 'VELLORE'],
  Telangana: ['HYDERABAD'],
  'Madhya Pradesh': ['INDORE', 'GWALIOR'],
  Rajasthan: ['JAIPUR'],
  Punjab: ['JALANDHAR', 'LUDHIANA', 'AMRITSAR'],
  'West Bengal': ['KOLKATA'],
  'Uttar Pradesh': ['LUCKNOW', 'NEW DELHI', 'AGRA', 'PANT NAGAR'],
  Karnataka: ['MANGALORE', 'BANGALORE'],
  Maharashtra: ['MUMBAI', 'PUNE', 'THANE', 'NAGPUR', 'PALGHAR'],
  Chhattisgarh: ['RAIPUR'],
  Kerala: ['THRISSUR', 'ERNAKULAM'],
  'Andhra Pradesh': ['VIJAYAWADA', 'VISAKHAPATNAM'],
  Odisha: ['BHUBANESWAR'],
  Uttarakhand: ['DEHRADUN']
};

export const handleInputChange = async (
  path: string,
  value: string | string[] | number,
  dispatch: any,
  screenName: string,
  key: string
  //   formState?: any
) => {
  // Convert empty string to null
  const normalizedValue = value === '' ? null : value;

  dispatch(
    updateFormState({
      name: `formErrorState.online.sections.${[screenName]}.${[key]}`,
      value: ''
    })
  );

  dispatch(updateFormState({ name: path, value: normalizedValue }));
  dispatch(isEditingKYC(true));

  // Check if the path is for the city field
  if (
    path ===
    `formState.online.sections[${[
      kycScreenIdentifierNames.COMPANY_DETAILS
    ]}][city]`
  ) {
    const city = value as string;
    const state = Object.keys(citiesByState).find(state =>
      citiesByState[state].includes(city)
    );
    if (state) {
      dispatch(
        updateFormState({
          name: `formErrorState.online.sections[${[
            kycScreenIdentifierNames.COMPANY_DETAILS
          ]}][state]`,
          value: ''
        })
      );
      const statePath = `formState.online.sections[${[
        kycScreenIdentifierNames.COMPANY_DETAILS
      ]}][state]`;
      dispatch(updateFormState({ name: statePath, value: state }));
    }
  }
};
