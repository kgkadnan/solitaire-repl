export enum supportedCountries {
  INDIA = 'India',
  BELGIUM = 'Belgium',
  USA = 'USA',
  OTHER = 'Other'
}

export enum countries {
  INDIA = 'India',
  BELGIUM = 'Belgium',
  USA = 'USA',
  OTHER = 'Other'
}

export enum kycAttachmentIdentifier {
  INDIA = 'India',
  BELGIUM = 'Belgium',
  USA = 'USA',
  OTHER = 'Other'
}

export enum kycScreenIdentifierNames {
  PERSONAL_DETAILS = 'personal_details',
  COMPANY_DETAILS = 'company_details',
  COMPANY_OWNER_DETAILS = 'company_owner_details',
  BANKING_DETAILS = 'banking_details',
  ATTACHMENT = 'attachment'
}
export enum fileLimit {
  MAX_FILES = 1,
  MIN_FILES = 1
}

export enum kycStatus {
  INPROGRESS = 'inprogress',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}
export enum kycStatusContent {
  REJECTED = 'Your KYC verification has not been successful. To ensure compliance with our regulatory requirements and for further assistance, please contact your Key Account Manager directly. We appreciate your cooperation and understanding in this matter.',
  PENDING = 'We have received your KYC, we are reviewing it. We will give an update over it soon, by then you can explore our website',
  APPROVED = 'Congratulations! Your KYC verification has been successfully completed. Thank you for your cooperation in this process. You can now fully utilize all the services available.'
}

export enum kycAttachmentIdentifierNames {
  INDIA = 'India',
  USA = 'USA',
  OTHER = 'Other',
  BELGIUM = 'Belgium'
}

export enum kycOption {
  OFFLINE = 'offline',
  ONLINE = 'online'
}
