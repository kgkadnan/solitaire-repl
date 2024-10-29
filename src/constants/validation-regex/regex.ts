export const PHONE_REGEX = /^(?:\+\d{1,3})?\d{6,15}$/;
export const PHONE_REG = /^\d{6,15}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const PATH_SEPARATOR = /[.[\]]+/; ///[\.\[\]]+/
export const KYC_INDEX_MATCH = /^(\w+)(\d+)?$/;

export const NAME_REGEX = /^[a-zA-Z0-9\s]+$/;
export const PAN_MATCH = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/;
export const GST_NUMBER_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const ACCOUNT_NUMBER_REGEX = /^[0-9a-zA-Z]+$/;
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const SWIFT_CODE_REGEX = /^[a-zA-Z0-9]+$/;
