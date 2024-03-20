import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="staticBoxMain">
      <div className="statiContentBox">
        <h2 className="mainHeadingTitle staticMainTitle text-center mb-8">
          Contact Us
        </h2>
        <div className="staticContentWrapper">
          <div className="office_address_wrap grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* India */}
            <div className="address">
              <div className="country">
                <Image src="/india.svg" alt="India" width={40} height={40} />
                <h1>India</h1>
              </div>
              <h2 className="name">KGK Diamonds (I) Pvt. Ltd</h2>
              <div className="loc">
                <Image
                  className="mt-5"
                  src="/location.svg"
                  alt="Location"
                  width={20}
                  height={20}
                />
                <a
                  href="https://goo.gl/maps/hAGrZxuwXzw8aEQz8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DE 4011 to 4016, Tower D, Bharat Diamond Bourse, Bandra Kurla
                  Complex-Bandra East, Mumbai - 400051
                </a>
              </div>
              <div className="loc">
                <Image
                  src="/phone-call.svg"
                  alt="Phone"
                  width={20}
                  height={20}
                />
                <a href="tel:+912240799994">+91 22 4079 9994</a>
              </div>
              <div className="loc">
                <Image src="/envelope.svg" alt="Email" width={20} height={20} />
                <a href="mailto:sales.mumbai2@kgkmail.com">
                  sales.mumbai2@kgkmail.com
                </a>
              </div>
            </div>
            {/* Belgium */}
            <div className="address">{/* Add Belgium details here */}</div>
            {/* USA */}
            <div className="address">{/* Add USA details here */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
