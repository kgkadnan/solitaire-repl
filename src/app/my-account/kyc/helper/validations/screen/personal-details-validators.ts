import { IsNotEmpty } from 'class-validator';

export class PersonalDetails {
  @IsNotEmpty({ message: 'first name required' })
  first_name: string;

  @IsNotEmpty({ message: 'last name required' })
  last_name: string;

  @IsNotEmpty({ message: 'email required' })
  email: string;

  @IsNotEmpty({ message: 'country code required' })
  country_code: string;

  @IsNotEmpty({ message: 'phone number required' })
  phone: string;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    country_code: string,
    phone: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.country_code = country_code;
    this.phone = phone;
  }
}
