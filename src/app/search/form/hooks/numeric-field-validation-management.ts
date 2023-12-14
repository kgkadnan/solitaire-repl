import { useState } from 'react';

const useNumericFieldValidation = () => {
  const [tablePerError, setTablePerError] = useState('');
  const [depthPerError, setDepthPerError] = useState('');
  const [ratioError, setRatioError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [widthError, setWidthError] = useState('');
  const [depthError, setDepthError] = useState('');
  const [crownAngleError, setCrownAngleError] = useState('');
  const [crownHeightError, setCrownHeightError] = useState('');
  const [girdlePerError, setGirdlePerError] = useState('');
  const [pavilionAngleError, setPavilionAngleError] = useState('');
  const [pavilionHeightError, setPavilionHeightError] = useState('');
  const [lowerHalfError, setLowerHalfError] = useState('');
  const [starLengthError, setStarLengthError] = useState('');
  const [girdleError, setGirdleError] = useState('');
  const [caratError, setCaratError] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [pricePerCaratError, setPricePerCaratError] = useState('');
  const [amountRangeError, setAmountRangeError] = useState('');

  return {
    errorState: {
      tablePerError,
      depthPerError,
      ratioError,
      lengthError,
      widthError,
      depthError,
      crownAngleError,
      crownHeightError,
      girdlePerError,
      pavilionAngleError,
      pavilionHeightError,
      lowerHalfError,
      starLengthError,
      girdleError,
      caratError,
      discountError,
      pricePerCaratError,
      amountRangeError
    },
    errorSetState: {
      setTablePerError,

      setDepthPerError,

      setRatioError,

      setLengthError,

      setWidthError,

      setDepthError,

      setCrownAngleError,

      setCrownHeightError,

      setGirdlePerError,

      setPavilionAngleError,

      setPavilionHeightError,

      setLowerHalfError,

      setStarLengthError,

      setGirdleError,

      setCaratError,

      setDiscountError,

      setPricePerCaratError,

      setAmountRangeError
    }
  };
};

export default useNumericFieldValidation;
