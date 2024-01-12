export enum fieldType {
  FLOATING_INPUT = 'floatingInput',
  PHONE_NUMBER = 'phoneNumber',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  ATTACHMENT = 'attachment'
}

export enum supportedMediaUnit {
  MB = 'MB',
  KB = 'KB'
}

export enum supportedMediaFormat {
  JPEG = 'JPEG',
  PNG = 'PNG',
  JPG = 'JPG',
  PDF = 'PDF',
  DOC = 'DOC',
  DOCX = 'DOCX'
}

export enum supportedCountries {
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

export enum kycAttachmentIdentifierNames {
  INDIA = 'India',
  USA = 'Usa',
  OTHER = 'Other',
  BELGIUM = 'Belgium'
}

export enum kycOption {
  OFFLINE = 'offline',
  ONLINE = 'online'
}
