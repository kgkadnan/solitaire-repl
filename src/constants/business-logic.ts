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

export const PROFILE_ALLOWED_FILE_TYPES = {
  'image/jpeg': [],
  'image/jpg': [],
  'image/png': [],
  'image/svg': []
};

export const REPORT_BUG_MAX_CHARACTERS = 1000;
export const CONFIRM_STONE_COMMENT_MAX_CHARACTERS = 1000;
export const BOOK_APPOINTMENT_COMMENT_MAX_CHARACTERS = 256;

export const MAX_COMPARE_STONE = 10;
export const MIN_COMPARE_STONE = 2;

export const MAX_DAYS_TO_PAY = 120;

export const PAGINATION_INTITAL_LIMIT = 50;

export const SOLD_STATUS = 'Sold';
export const AVAILABLE_STATUS = 'Available';
export const MEMO_STATUS = 'Memo';
export const HOLD_STATUS = 'Hold';
export const BID_TO_BUY_STATUS = 'BidToBuy';
export const PENDING = 'pending';
export const IN_TRANSIT = 'inTransit';
export const PAST = 'past';

export const UPCOMING_APPOINTMENTS = 'upcomingAppointments';
export const PAST_APPOINTMENTS = 'pastAppointments';

export const PENING_INVOICE_BREADCRUMB_LABEL = 'Pending Orders';
export const ACTIVE_INVOICE_BREADCRUMB_LABEL = 'In-Transit Orders';
export const PAST_INVOICE_BREADCRUMB_LABEL = 'Past Orders';
export const DASHBOARD_BREADCRUMB_LABEL = 'Dashboard';

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
export const MATCHING_PAIR_DATA_LIMIT = 150;

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
export const BREADCRUM_CHARACTER_LIMIT = 15;

export const LAB_LINKS = {
  GIA_LINK: 'https://www.gia.edu/report-check?reportno=',
  IGI_LINK: 'https://www.igi.org/verify-your-report/?r=',
  HRD_LINK: 'https://my.hrdantwerp.com/?id=34&record_number='
};
export const VOLUME_DISCOUNT_LIMIT = 300000;
