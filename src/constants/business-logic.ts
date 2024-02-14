export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const ALLOWED_FILE_TYPES = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'image/jpeg': [],
  'image/jpg': [],
  'image/png': [],
  'application/pdf': []
};

export const REPORT_BUG_MAX_CHARACTERS = 1000;
export const CONFIRM_STONE_COMMENT_MAX_CHARACTERS = 1000;

export const MAX_COMPARE_STONE = 10;
export const MIN_COMPARE_STONE = 2;

export const MAX_DAYS_TO_PAY = 120;

export const PAGINATION_INTITAL_LIMIT = 50;

//   diamond_status: 'Available' | 'Hold' | 'Memo' | 'Sold'
export const SOLD_STATUS = 'Sold';
export const AVAILABLE_STATUS = 'Available';
export const MEMO_STATUS = 'Memo';
export const HOLD_STATUS = 'Hold';

export const PENDING_INVOICE = 'pendingInvoice';
export const ACTIVE_INVOICE = 'activeInvoice';
export const INVOICE_HISTORY = 'invoiceHistory';

export const NOTIFICATION_READ_STATUS = 'read';
export const NOTIFICATION_UNSEEN_STATUS = 'unseen';
export const NOTIFICATION_UNREAD_STATUS = 'unread';
export const NOTIFICATION_TYPE = 'APP';

export const MAX_SEARCH_FORM_COUNT = 300;
export const MIN_SEARCH_FORM_COUNT = 0;

export const MAX_SAVED_SEARCH_COUNT = 300;
export const MAX_RECENT_CONFIRMATION_COUNT = 50;
export const MAX_MY_INVOICE_LIMIT_COUNT = 50;

export const MAX_SEARCH_TAB_LIMIT = 10;

export const LISTING_PAGE_DATA_LIMIT = 300;

export const FILE_URLS = {
  IMG: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/still.jpg',
  CERT_FILE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/***.jpeg',
  VIDEO_FILE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=***&autoPlay=1',
  B2B_SPARKLE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=***-S',
  B2B: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=***',
  HEART:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/Heart_Black_BG.jpg',
  ARROW:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/Arrow_Black_BG.jpg',
  ASET: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/ASET_White_BG.jpg',
  IDEAL:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/IDEAL_White_BG.jpg',
  FLUORESCENCE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***-F/still.jpg'
};

export const GIA_LINK = 'https://www.gia.edu/report-check?reportno=';
