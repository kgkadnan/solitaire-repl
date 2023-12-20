import React from 'react';
import styles from './floating-input.module.scss';

interface FloatingLabelInputProps {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  onChange
}) => {
  return (
    <div className="relative z-0 w-[500px]">
      <input
        type="text"
        id="floating_standard"
        className={`${styles.input} block py-2.5 px-0 w-full bg-transparent border-0 appearance-none focus:outline-none peer`}
        placeholder=""
        onChange={onChange}
      />
      <label
        htmlFor="floating_standard"
        className={`${styles.label} absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-solitaireSenary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
      >
        {label}
      </label>
    </div>
  );
};
