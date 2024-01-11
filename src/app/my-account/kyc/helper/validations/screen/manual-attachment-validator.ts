import { UPLOAD_FORM } from '@/constants/error-messages/kyc';
import { IsNotEmpty } from 'class-validator';

export class ManualAttachmentValidation {
  @IsNotEmpty({ message: UPLOAD_FORM })
  upload_form: string;

  constructor(upload_form: string) {
    this.upload_form = upload_form;
  }
}
