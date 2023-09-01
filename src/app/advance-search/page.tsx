'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './advance-search.module.scss';
import { CustomRadioButton } from 'src/components/common/buttons/radio-button';
import { CustomSelectionButton } from 'src/components/common/buttons/selection-button';
import CustomImageTile, {
  IImageTileProps,
} from 'src/components/common/image-tile';
import { CustomInputField } from 'src/components/common/input-field';
import { CustomInputlabel } from 'src/components/common/input-label';
import { CustomSelect } from 'src/components/common/select';
import CustomHeader from '@/components/common/header';
import { CustomFooter } from '@/components/common/footer';
import { useSearchParams } from 'next/navigation';
import Round from '@public/assets/images/round.png';
import { ManageLocales } from '@/utils/translate';
import Tooltip from '@/components/common/tooltip';
import TooltipIcon from '@public/assets/icons/information-circle-outline.svg?url';

interface IAdvanceSearch {
  shape?: string[];
  color?: string[];
}
const AdvanceSearch = (props?: IAdvanceSearch) => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedWhiteColor, setSelectedWhiteColor] = useState<string[]>([]);
  const [selectedFancyColor, setSelectedFancyColor] = useState<string[]>([]);
  const [selectedRangeColor, setSelectedRangeColor] = useState<string[]>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([]);
  const [selectedOvertone, setSelectedOvertone] = useState<string[]>([]);
  const [selectedTinge, setSelectedTinge] = useState<string[]>([]);
  const [selectedTingeIntensity, setSelectedTingeIntensity] = useState<
    string[]
  >([]);
  const [selectedClarity, setSelectedClarity] = useState<string[]>([]);

  const [, setSelectedGirdleStep] = useState('');
  const [selectedCaratRange, setSelectedCaratRange] = useState<string[]>([]);
  const [selectedAdditionalCaratRange, setSelectedAditionalCaratRange] =
    useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedCut, setSelectedCut] = useState<string[]>([]);
  const [selectedPolish, setSelectedPolish] = useState<string[]>([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState<string[]>([]);
  const [selectedFluorescence, setSelectedFluorescence] = useState<string[]>(
    []
  );
  const [selectedGirdle, setSelectedGirdle] = useState<string[]>([]);
  const [selectedGirdleStep2, setSelectedGirdleStep2] = useState<string[]>([]);

  const [selectedLab, setSelectedLab] = useState<string[]>([]);
  const [selectedHR, setSelectedHR] = useState<string[]>([]);
  const [selectedBrilliance, setSelectedBrilliance] = useState<string[]>([]);

  const [priceRangeFrom, setPriceRangeFrom] = useState('');
  const [priceRangeTo, setPriceRangeTo] = useState('');
  const [discountFrom, setDiscountFrom] = useState('');
  const [discountTo, setDiscountTo] = useState('');
  const [pricePerCaratFrom, setPricePerCaratFrom] = useState('');
  const [pricePerCaratTo, setPricePerCaratTo] = useState('');
  const [caratRangeFrom, setCaratRangeFrom] = useState('');
  const [caratRangeTo, setCaratRangeTo] = useState('');
  //other parameter Inclsuion state
  const [blackTableBI, setBlackTableBI] = useState<string[]>([]);
  const [sideBlackBI, setSideBlackBI] = useState<string[]>([]);
  const [openCrownBI, setOpenCrownBI] = useState<string[]>([]);
  const [openTableBI, setOpenTableBI] = useState<string[]>([]);
  const [openPavilionBI, setOpenPavilionBI] = useState<string[]>([]);
  const [milkyBI, setMilkyBI] = useState<string[]>([]);
  const [lusterBI, setLusterBI] = useState<string[]>([]);
  const [eyeCleanBI, setEyeCleanBI] = useState<string[]>([]);

  const [tableInclusionWI, setTableInclusionWI] = useState<string[]>([]);
  const [sideInclusionWI, setSideInclusionWI] = useState<string[]>([]);
  const [naturalCrownWI, setNaturalCrownWI] = useState<string[]>([]);
  const [naturalGirdleWI, setNaturalGirdleWI] = useState<string[]>([]);
  const [naturalPavilionWI, setNaturalPavilionWI] = useState<string[]>([]);
  const [surfaceGrainingWI, setSurfaceGrainingWI] = useState<string[]>([]);
  const [lusterWI, setLusterWI] = useState<string[]>([]);

  //parameter state
  const [tablePerFrom, setTablePerFrom] = useState('');
  const [tablePerTo, setTablePerTo] = useState('');
  const [crownAngleFrom, setCrownAngleFrom] = useState('');
  const [crownAngleTo, setCrownAngleTo] = useState('');
  const [lengthFrom, setLengthFrom] = useState('');
  const [lengthTo, setLengthTo] = useState('');
  const [pavilionDepthFrom, setPavilionDepthFrom] = useState('');
  const [pavilionDepthTo, setPavilionDepthTo] = useState('');

  const [depthPerFrom, setDepthPerFrom] = useState('');
  const [depthPerTo, setDepthPerTo] = useState('');
  const [crownHeightFrom, setCrownHeightFrom] = useState('');
  const [crownHeightTo, setCrownHeightTo] = useState('');
  const [widthFrom, setWidthFrom] = useState('');
  const [widthTo, setWidthTo] = useState('');
  const [lowerHalfFrom, setLowerHalfFrom] = useState('');
  const [lowerHalfTo, setLowerHalfTo] = useState('');

  const [ratioFrom, setRatioFrom] = useState('');
  const [ratioTo, setRatioTo] = useState('');
  const [girdlePerFrom, setGirdlePerFrom] = useState('');
  const [girdlePerTo, setGirdlePerTo] = useState('');
  const [pavilionAngleFrom, setPavilionAngleFrom] = useState('');
  const [pavilionAngleTo, setPavilionAngleTo] = useState('');
  const [starLengthFrom, setStarLengthFrom] = useState('');
  const [starLengthTo, setStarLengthTo] = useState('');
  const [yourSelection, setYourSelection] = useState<Record<string, any>[]>();
  //handle validation
  // const [isValid, setIsValid] = useState(1);

  ///edit functionality
  const searchParams = useSearchParams();

  const search = searchParams.get('id');

  const searchListNew = useMemo(
    () => [
      {
        cardId: '1',
        header: 'ooooo',
        desc: '12-05-2023 | 10.12 AM',
        body: {
          StoneShape: 'Round',
          color: 'White',
          Carat: '2.01',
          Clarity: 'VVS2',
          Shade: 'WHT',
          Cut: 'Excellent',
          polish: 'EX',
          Rap: '23,500.00',
        },
      },
    ],
    [] // No dependencies
  );
  useEffect(() => {
    if (search !== null) {
      setSelectedShape([...selectedShape, searchListNew[0].body.StoneShape]);
      setSelectedColor([...selectedColor, searchListNew[0].body.color]);
      setSelectedCut([...selectedCut, searchListNew[0].body.Cut]);
      setSelectedClarity([...selectedClarity, searchListNew[0].body.Clarity]);
    }
  }, [search]);

  const imageTileStyles = {
    imageTileMainContainerStyles: styles.imageTileMainContainerStyles,
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeIndicatorStyles,
  };

  let shapeData: IImageTileProps[] = [
    {
      src: Round,
      title: 'Round',
    },
    {
      src: Round,
      title: 'Pear',
    },
    {
      src: Round,
      title: 'Emerald',
    },
    {
      src: Round,
      title: 'Asscher',
    },
    {
      src: Round,
      title: 'Cushion',
    },
    {
      src: Round,
      title: 'Princess',
    },
    {
      src: Round,
      title: 'Marquise',
    },
    {
      src: Round,
      title: 'Oval',
    },
    {
      src: Round,
      title: 'Heart',
    },
    {
      src: Round,
      title: 'Radiant',
    },
    {
      src: Round,
      title: 'Others',
    },
    {
      src: Round,
      title: 'All',
    },
  ];

  let colorData = ['White', 'Fancy', 'Range'];
  let whiteData = ['D', 'E', 'F', 'I', 'J', 'K', 'L', 'M', 'N'];
  let rangeData = [
    'FANCY',
    'N-O',
    'O-P',
    'S-T',
    'P-R',
    'Q-R',
    'W-X',
    'Y-Z',
    'U-V',
  ];
  let fancyData = [
    'Yellow',
    'Pink',
    'Blue',
    'Red',
    'Green',
    'Purple',
    'Orange',
    'Black',
    'Gray',
    'Violet',
    'Brown',
    'White',
    'Other',
    'Light Yellow',
  ];

  let makeData = ['3EX', '3EX-Non', '3VG+'];

  let qualityData = ['Ideal', 'Excellent', 'Very Good', 'Good', 'Fair'];

  let locationData = [
    { id: 1, value: 'Dubai' },
    { id: 2, value: 'India' },
    { id: 3, value: 'Belgium' },
  ];

  let parameterData = [
    {
      label: ManageLocales('app.advanceSearch.tablePer'),
      parameterState: [tablePerFrom, tablePerTo],
      setParameterState: [setTablePerFrom, setTablePerTo],
    },
    {
      label: ManageLocales('app.advanceSearch.crownAngle'),
      parameterState: [crownAngleFrom, crownAngleTo],
      setParameterState: [setCrownAngleFrom, setCrownAngleTo],
    },
    {
      label: ManageLocales('app.advanceSearch.length'),
      parameterState: [lengthFrom, lengthTo],
      setParameterState: [setLengthFrom, setLengthTo],
    },
    {
      label: ManageLocales('app.advanceSearch.pavilionDepth'),
      parameterState: [pavilionDepthFrom, pavilionDepthTo],
      setParameterState: [setPavilionDepthFrom, setPavilionDepthTo],
    },
    {
      label: ManageLocales('app.advanceSearch.depthPer'),
      parameterState: [depthPerFrom, depthPerTo],
      setParameterState: [setDepthPerFrom, setDepthPerTo],
    },
    {
      label: ManageLocales('app.advanceSearch.crownHeight'),
      parameterState: [crownHeightFrom, crownHeightTo],
      setParameterState: [setCrownHeightFrom, setCrownHeightTo],
    },
    {
      label: ManageLocales('app.advanceSearch.width'),
      parameterState: [widthFrom, widthTo],
      setParameterState: [setWidthFrom, setWidthTo],
    },
    {
      label: ManageLocales('app.advanceSearch.lowerHalf'),
      parameterState: [lowerHalfFrom, lowerHalfTo],
      setParameterState: [setLowerHalfFrom, setLowerHalfTo],
    },
    {
      label: ManageLocales('app.advanceSearch.ratio'),
      parameterState: [ratioFrom, ratioTo],
      setParameterState: [setRatioFrom, setRatioTo],
    },
    {
      label: ManageLocales('app.advanceSearch.girdlePer'),
      parameterState: [girdlePerFrom, girdlePerTo],
      setParameterState: [setGirdlePerFrom, setGirdlePerTo],
    },
    {
      label: ManageLocales('app.advanceSearch.pavilionAngle'),
      parameterState: [pavilionAngleFrom, pavilionAngleTo],
      setParameterState: [setPavilionAngleFrom, setPavilionAngleTo],
    },
    {
      label: ManageLocales('app.advanceSearch.starLength'),
      parameterState: [starLengthFrom, starLengthTo],
      setParameterState: [setStarLengthFrom, setStarLengthTo],
    },
  ];

  const handleBlackTableBIChange = (data: string) => {
    handleFilterChange(data, blackTableBI, setBlackTableBI);
  };

  const handleSideBlackBIChange = (data: string) => {
    handleFilterChange(data, sideBlackBI, setSideBlackBI);
  };

  const handleOpenCrownBIChange = (data: string) => {
    handleFilterChange(data, openCrownBI, setOpenCrownBI);
  };
  const handleOpenTableBIChange = (data: string) => {
    handleFilterChange(data, openTableBI, setOpenTableBI);
  };
  const handleOpenPavilionBIChange = (data: string) => {
    handleFilterChange(data, openPavilionBI, setOpenPavilionBI);
  };
  const handleMilkyBIChange = (data: string) => {
    handleFilterChange(data, milkyBI, setMilkyBI);
  };
  const handleLusterBIChange = (data: string) => {
    handleFilterChange(data, lusterBI, setLusterBI);
  };

  const handleEyeCleanBIChange = (data: string) => {
    handleFilterChange(data, eyeCleanBI, setEyeCleanBI);
  };

  const handleTableInclusionWIChange = (data: string) => {
    handleFilterChange(data, tableInclusionWI, setTableInclusionWI);
  };
  const handleSideInclusionWIChange = (data: string) => {
    handleFilterChange(data, sideInclusionWI, setSideInclusionWI);
  };
  const handleNaturalCrownWIChange = (data: string) => {
    handleFilterChange(data, naturalCrownWI, setNaturalCrownWI);
  };
  const handleNaturalGirdleWIChange = (data: string) => {
    handleFilterChange(data, naturalGirdleWI, setNaturalGirdleWI);
  };
  const handleNaturalPavilionWIChange = (data: string) => {
    handleFilterChange(data, naturalPavilionWI, setNaturalPavilionWI);
  };

  const handleSurfaceGrainingIChange = (data: string) => {
    handleFilterChange(data, surfaceGrainingWI, setSurfaceGrainingWI);
  };

  const handleLusterWIChange = (data: string) => {
    handleFilterChange(data, lusterWI, setLusterWI);
  };

  let otherParameterData = [
    {
      key: ManageLocales('app.advanceSearch.blackInclusion'),
      value: [
        {
          elementKey: ManageLocales('app.advanceSearch.otherBIBlackTable'),
          elementValue: ['BO', 'BPP', 'B1', 'B2', 'B3'],
          handleChange: handleBlackTableBIChange,
          state: blackTableBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBISideTable'),
          elementValue: ['SBO', 'SBPP', 'SB1', 'SB2', 'SB3'],
          handleChange: handleSideBlackBIChange,
          state: sideBlackBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBIOpenCrown'),
          elementValue: ['None', 'VS', 'S', 'M', 'D'],
          handleChange: handleOpenCrownBIChange,
          state: openCrownBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBIOpenTable'),
          elementValue: ['None', 'VS', 'S', 'M', 'D'],
          handleChange: handleOpenTableBIChange,
          state: openTableBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBIOpenPavilion'),
          elementValue: ['None', 'VS', 'S', 'M', 'L'],
          handleChange: handleOpenPavilionBIChange,
          state: openPavilionBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBIMilky'),
          elementValue: ['MO', 'M1', 'M2', 'M3'],
          handleChange: handleMilkyBIChange,
          state: milkyBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBILuster'),
          elementValue: ['EX', 'VG', 'G', 'P'],
          handleChange: handleLusterBIChange,
          state: lusterBI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherBIEyeClean'),
          elementValue: ['Yes', 'No', 'B'],
          handleChange: handleEyeCleanBIChange,
          state: eyeCleanBI,
        },
      ],
    },
    {
      key: ManageLocales('app.advanceSearch.whiteInclusion'),
      value: [
        {
          elementKey: ManageLocales('app.advanceSearch.otherWITableInclusion'),
          elementValue: ['TO', 'T1', 'B1', 'T2', 'T3'],
          handleChange: handleTableInclusionWIChange,
          state: tableInclusionWI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherWISideInclusion'),
          elementValue: ['SO', 'S1', 'SB1', 'SB2', 'S3'],
          handleChange: handleSideInclusionWIChange,
          state: sideInclusionWI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherWINaturalCrown'),
          elementValue: ['None', 'VS', 'S', 'M', 'L'],
          handleChange: handleNaturalCrownWIChange,
          state: naturalCrownWI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherWINaturalGirdle'),
          elementValue: ['None', 'VS', 'S', 'M', 'L'],
          handleChange: handleNaturalGirdleWIChange,
          state: naturalGirdleWI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherWINaturalPavilion'),
          elementValue: ['None', 'VS', 'S', 'M', 'L'],
          handleChange: handleNaturalPavilionWIChange,
          state: naturalPavilionWI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherWISurfaceGraining'),
          elementValue: ['GO', 'G1', 'G2', 'G3'],
          handleChange: handleSurfaceGrainingIChange,
          state: surfaceGrainingWI,
        },
        {
          elementKey: ManageLocales('app.advanceSearch.otherWILuster'),
          elementValue: ['IGO', 'IG1', 'IG2', 'IG3'],
          handleChange: handleLusterWIChange,
          state: lusterWI,
        },
      ],
    },
  ];

  let intensityData = [
    'Faint',
    'Light',
    'Fancy light',
    'Fancy',
    'Fancy dark',
    'Fancy intense',
    'Fancy vivid',
    'Fancy deep',
    'Very light',
  ];

  let overtoneData = [
    'None',
    'Yellow',
    'Yellowish',
    'Pink',
    'Pinkish',
    'Blue',
    'Bluish',
    'Red',
    'Reddish',
    'Green',
    'Greenish',
    'Purple',
    'Purplish',
    'Orange',
    'Orangy',
    'Gray',
    'Grayish',
    'Black',
    'Brown',
    'Brownish',
    'Violetish',
    'White',
    'W-x Light Brown',
    'Brownish Orangy',
  ];

  let tingeData = [
    'WH',
    'YEL',
    'BR',
    'GRN',
    'MIXED',
    'PINK',
    'BLACKISH',
    'Gry',
    'FY',
    'MIX',
    'OR',
    'BGM',
    'NO BGM',
    'NO BLACK',
  ];

  let tingeIntensityData = ['None', 'Faint', 'Medium', 'Strong'];

  let clarityData = [
    'FL',
    'IF',
    'VVS1',
    'VVS2',
    'VS1',
    'VS2',
    'SI1',
    'SI2',
    'SI3',
    'I1',
    'I2',
    'I3',
  ];

  let fluorescenceData = ['NON', 'FNT', 'VSL', 'MED', 'STG', 'SLT', 'VSTG'];

  let labData = [
    'GIA',
    'HRD',
    'IGI',
    'FM',
    'AGS',
    'FAC',
    'DBCOO',
    'NGTC',
    'IIDGR',
    'KGK',
    'OTHER',
    'STP',
  ];
  let brillianceData = ['Excellent', 'Very Good', 'Good'];

  let girdleData = [
    'ETN',
    'VTN',
    'STN',
    'THN',
    'MED',
    'STK',
    'THK',
    'VTK',
    'ETK',
  ];

  let girdleStepData = [
    'All',
    'Bearding',
    'Brown patch of color',
    'Bruise',
    'Cavity',
    'Chip',
    'Cleavage',
    'Cloud',
    'Crystal',
    'Crystal Surface',
    'Etch Channel',
    'Extra Facet',
    'Feather',
    'Flux Remnant',
    'Indented Natural',
    'Internal Graining',
    'Internal Inscription',
    'Internal Laser Drilling',
    'Knot',
    'Laser Drill Hole',
    'Manufacturing Remnant',
    'Minor Details of Polish',
    'Natural',
    'Needle',
    'No Inclusion',
    'Pinpoint',
    'Reflecting Surface Graining',
    'Surface Graining',
    'Twinning Wisp',
  ];

  const [caratRangeData, setCaratRangeData] = useState<string[]>([
    '0.01-0.29',
    '0.30-0.39',
    '0.40-0.49',
    '0.50-0.69',
    '0.70-0.89',
    '0.90-0.99',
    '1.00-1.49',
    '1.50-1.99',
    '2.00-2.99',
    '3.00-3.99',
    '4.00-4.99',
    '5.00-5.99',
    '6.00-6.99',
    '7.00 - 7.99',
    '8.00 - 8.99',
    ' 9.00 - 9.99',
    '10+',
  ]);

  //// All user actions

  const handleFilterChange = (
    filterData: string,
    selectedFilters: string[] | string,
    setSelectedFilters: any
  ) => {
    if (selectedFilters.includes(filterData)) {
      setSelectedFilters((prevSelectedColors: any[]) =>
        prevSelectedColors.filter((selected) => selected !== filterData)
      );
    } else {
      setSelectedFilters((prevSelectedColors: any) => [
        ...prevSelectedColors,
        filterData,
      ]);
    }
  };

  const handleShapeChange = (shape: string) => {
    if (shape.toLowerCase() === 'all') {
      let filteredShape: string[] = shapeData.map((data) => data.title);
      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      handleFilterChange(shape, selectedShape, setSelectedShape);
    }
  };

  const handleColorChange = (data: string) => {
    handleFilterChange(data, selectedColor, setSelectedColor);
  };

  const handleWhiteFilterChange = (data: string) => {
    handleFilterChange(data, selectedWhiteColor, setSelectedWhiteColor);
  };

  const handleFancyFilterChange = (data: string) => {
    handleFilterChange(data, selectedFancyColor, setSelectedFancyColor);
  };

  const handleRangeFilterChange = (data: string) => {
    handleFilterChange(data, selectedRangeColor, setSelectedRangeColor);
  };

  const handleIntensityChange = (data: string) => {
    handleFilterChange(data, selectedIntensity, setSelectedIntensity);
  };
  const handleOvertoneChange = (data: string) => {
    handleFilterChange(data, selectedOvertone, setSelectedOvertone);
  };

  const handleTingeChange = (data: string) => {
    handleFilterChange(data, selectedTinge, setSelectedTinge);
  };

  const handleTingeIntensityChange = (data: string) => {
    handleFilterChange(data, selectedTingeIntensity, setSelectedTingeIntensity);
  };
  const handleClarityChange = (data: string) => {
    handleFilterChange(data, selectedClarity, setSelectedClarity);
  };
  const handleCaratRangeChange = (data: string) => {
    handleFilterChange(data, selectedCaratRange, setSelectedCaratRange);
  };
  // let prevMakeData=""
  const handleMakeChange = (data: string) => {
    if (data.toLowerCase() === '3ex' || data.toLowerCase() === '3ex-non') {
      if (
        !(
          selectedCut.includes('Excellent') &&
          selectedPolish.includes('Excellent') &&
          selectedSymmetry.includes('Excellent')
        )
      ) {
        handleCutChange('Excellent');
        handlePolishChange('Excellent');
        handleSymmetryChange('Excellent');
      }
    }

    if (data.toLowerCase() === '3ex-non') {
      handleFluorescenceChange('NON');
    }
    data === selectedMake ? setSelectedMake('') : setSelectedMake(data);
    // prevMakeData=data
  };

  const handleCutChange = (data: string) => {
    handleFilterChange(data, selectedCut, setSelectedCut);
  };
  const handlePolishChange = (data: string) => {
    handleFilterChange(data, selectedPolish, setSelectedPolish);
  };
  const handleSymmetryChange = (data: string) => {
    handleFilterChange(data, selectedSymmetry, setSelectedSymmetry);
  };

  const handleFluorescenceChange = (data: string) => {
    handleFilterChange(data, selectedFluorescence, setSelectedFluorescence);
  };
  const handleGirdleChange = (data: string) => {
    handleFilterChange(data, selectedGirdle, setSelectedGirdle);
  };
  const handleGirdleStep2Change = (data: string) => {
    if (data.toLowerCase() === 'all') {
      let filteredGirdleStep: string[] = girdleStepData.map((data1) =>
        data1.toLowerCase() !== 'all' ? data1 : ''
      );
      setSelectedGirdleStep2(filteredGirdleStep);
    } else {
      handleFilterChange(data, selectedGirdleStep2, setSelectedGirdleStep2);
    }
  };

  const handleLabChange = (data: string) => {
    handleFilterChange(data, selectedLab, setSelectedLab);
  };
  const handleHRChange = (data: string) => {
    handleFilterChange(data, selectedHR, setSelectedHR);
  };
  const handleBrillianceChange = (data: string) => {
    handleFilterChange(data, selectedBrilliance, setSelectedBrilliance);
  };

  const handleGirdleStepChange = (radioValue: string) => {
    setSelectedGirdleStep(radioValue);
  };

  const handleAddCarat = (data: string) => {
    setCaratRangeData([...caratRangeData, data]);
    setSelectedCaratRange([...selectedCaratRange, data]);
    setCaratRangeFrom('');
    setCaratRangeTo('');
  };

  const handleSearch = () => {
    window.alert('success');
  };

  const formatSelection = (data: string[]) => {
    return data.length > 1
      ? data.toString().substring(0, 4).concat('...')
      : data.toString();
  };

  const handleReset = () => {
    setSelectedShape([]);
    setSelectedColor([]);
    setSelectedWhiteColor([]);
    setSelectedFancyColor([]);
    setSelectedRangeColor([]);
    setSelectedIntensity([]);
    setSelectedOvertone([]);
    setSelectedTinge([]);
    setSelectedTingeIntensity([]);
    setSelectedClarity([]);
    setSelectedCaratRange([]);
    setSelectedMake('');
    setSelectedCut([]);
    setSelectedPolish([]);
    setSelectedSymmetry([]);
    setSelectedFluorescence([]);
    setSelectedLab([]);
    setSelectedHR([]);
    setSelectedBrilliance([]);
  };

  const handleYourSelection = () => {
    selectedColor.length > 0 && setYourSelection([{ [ManageLocales('app.advanceSearch.color')]: selectedColor }]);
  };
  ///reusable jsx
  const renderSelectionButtons = (
    data: string[],
    className?: string,
    activeStyle?: string,
    relatedState?: string | string[],
    handleChange?: (change: string) => void,
    highlightIndicator?: boolean
  ) => {
    return data.map((data: string) => (
      <CustomSelectionButton
        key={data}
        selectionButtonLabel={data}
        handleClick={handleChange}
        data={data}
        selectionButtonAllStyles={{
          selectionButtonStyle: `${className ?? ''}   ${
            typeof relatedState !== 'string'
              ? relatedState?.includes(data) && activeStyle
              : relatedState === data && activeStyle
          }`,
          selectionButtonLabelStyle: `${
            highlightIndicator &&
            relatedState?.includes(data) &&
            styles.colorDataActiveStyle
          }`,
        }}
      />
    ));
  };

  const renderParameterFields = () => {
    return parameterData.map((parameter) => (
      <div key={parameter.label} className={styles.parameterContainer}>
        <CustomInputlabel
          htmlfor="text"
          label={parameter.label}
          overriddenStyles={{ label: styles.labelPlainColor }}
        />
        <div className={`${styles.filterSection}  ${styles.parameterFilter}`}>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[0]}`}
            onChange={(e) => {
              parameter.setParameterState[0](e.target.value);
            }}
            value={parameter.parameterState[0]}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <div className={styles.parameterLabel}>to</div>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[1]}`}
            onChange={(e) => {
              parameter.setParameterState[1](e.target.value);
            }}
            value={parameter.parameterState[1]}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>
    ));
  };

  const renderOtherParameterFields = () => {
    return otherParameterData.map((other) => (
      <div
        key={`other-parameter-${other.key}`}
        className={styles.otherParameterContainer}
      >
        <CustomInputlabel
          htmlfor="text"
          label={other.key}
          overriddenStyles={{ label: styles.otherParameterHeader }}
        />
        {other.value.map((data) => (
          <div
            className={`${styles.filterSection} ${styles.otherParameterDataContainer} `}
            key={`${other.key}-${data.elementKey}`}
          >
            <div className={`${styles.otherParameterTitle}`}>
              <CustomInputlabel
                htmlfor="text"
                label={data.elementKey}
                overriddenStyles={{ label: styles.labelPlainColor }}
              />
            </div>
            <div>
              <>
                {renderSelectionButtons(
                  data.elementValue,
                  '',
                  styles.activeOtherStyles,
                  data.state,
                  data.handleChange
                )}
              </>
            </div>
          </div>
        ))}
      </div>
    ));
  };
  return (
    <div>
      <div className="sticky top-0 bg-solitairePrimary mt-16">
        <CustomHeader
          data={{
            headerHeading: ManageLocales('app.advanceSearch.header'),
            headerData: (
              <Tooltip
                tooltipElement={
                  <div style={{ display: 'flex' }}>
                    {' '}
                    <TooltipIcon />
                    <CustomInputlabel
                      htmlfor="text"
                      label={`${ManageLocales(
                        'app.advanceSearch.yourSelection'
                      )}:`}
                    />{' '}
                    <div style={{ color: 'white', width: '300px' }}>
                      {formatSelection(selectedShape)}{' '}
                      {formatSelection(selectedColor)}{' '}
                      {formatSelection(selectedClarity)}{' '}
                      {formatSelection(selectedCaratRange)}
                    </div>
                  </div>
                }
                content={
                  <div style={{ width: '500px' }}>
                    <CustomInputlabel
                      htmlfor="text"
                      label={`${ManageLocales(
                        'app.advanceSearch.yourSelection'
                      )}:`}
                    />

                    <div>
                      {yourSelection?.map((data) => {
                        return (
                          <div key={Object.keys(data)[0]} className={styles.yourSelectionContainer}>
                            <div className={styles.labelContainer}>
                            {' '}
                            <CustomInputlabel
                              htmlfor="text"
                              label={Object.keys(data)[0]}
                            />:
                            {/* Check data type of values and accordingly display the content */}
                            {Array.isArray(Object.values(data)[0])
                              ? Object.values(data)[0].toString()
                              : Object.values(data)[0]}
                              </div>
                          </div>
                        );
                      })}{' '}
                    </div>
                  </div>
                }
                handleEvent={handleYourSelection}
              />
            ),
          }}
        />
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          {' '}
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.shape')}
          />
        </div>
        <div className={styles.filterSectionData}>
          <CustomImageTile
            overriddenStyles={imageTileStyles}
            imageTileData={shapeData}
            selectedTile={selectedShape}
            handleSelectTile={handleShapeChange}
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.color')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderSelectionButtons(
              colorData,
              styles.colorFilterStyles,
              styles.activeColorStyles,
              selectedColor,
              handleColorChange,
              true
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              {selectedColor.includes('White') &&
                renderSelectionButtons(
                  whiteData,
                  styles.whiteColorFilterStyle,
                  styles.activeOtherStyles,
                  selectedWhiteColor,
                  handleWhiteFilterChange
                )}
            </div>
            <div>
              {selectedColor.includes('Fancy') &&
                renderSelectionButtons(
                  fancyData,
                  '',
                  styles.activeOtherStyles,
                  selectedFancyColor,
                  handleFancyFilterChange
                )}
            </div>
            <div>
              {selectedColor.includes('Range') &&
                renderSelectionButtons(
                  rangeData,
                  '',
                  styles.activeOtherStyles,
                  selectedRangeColor,
                  handleRangeFilterChange
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedColor.includes('Fancy') && (
        <>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.intensity')}
              />
            </div>

            <div
              className={`${styles.filterSection} ${styles.filterSectionData}`}
            >
              {renderSelectionButtons(
                intensityData,
                '',
                styles.activeOtherStyles,
                selectedIntensity,
                handleIntensityChange
              )}
            </div>
          </div>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.overtone')}
              />
            </div>
            <div className={styles.filterSectionData}>
              <div
                className={`${styles.filterSection} ${styles.filterWrapSection}`}
              >
                {renderSelectionButtons(
                  overtoneData,
                  '',
                  styles.activeOtherStyles,
                  selectedOvertone,
                  handleOvertoneChange
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.tinge')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            tingeData,
            '',
            styles.activeOtherStyles,
            selectedTinge,
            handleTingeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.tingeIntensity')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            tingeIntensityData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedTingeIntensity,
            handleTingeIntensityChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.clarity')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            clarityData,
            '',
            styles.activeOtherStyles,
            selectedClarity,
            handleClarityChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.caratRange')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.caratRangeFilter}`}
        >
          <div
            className={`${styles.filterSection} ${styles.rangeFilter}`}
            style={{ width: '420px' }}
          >
            <CustomInputField
              // style={className}
              type="number"
              name="caratRangeFrom"
              onChange={(e) => {
                setCaratRangeFrom(e.target.value);
              }}
              value={caratRangeFrom}
              placeholder={ManageLocales('app.advanceSearch.from')}
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <CustomInputField
              // style={className}
              type="number"
              name="caratRangeTO"
              onChange={(e) => {
                setCaratRangeTo(e.target.value);
              }}
              value={caratRangeTo}
              placeholder={ManageLocales('app.advanceSearch.to')}
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <CustomSelectionButton
              selectionButtonLabel={ManageLocales('app.advanceSearch.addCarat')}
              data={`${caratRangeFrom}-${caratRangeTo}`}
              handleClick={handleAddCarat}
              selectionButtonAllStyles={{
                selectionButtonStyle: styles.addCarat,
              }}
            />
          </div>
          <div>
            {renderSelectionButtons(
              caratRangeData,
              '',
              styles.activeOtherStyles,
              selectedCaratRange,
              handleCaratRangeChange
            )}
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.make')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            makeData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedMake,
            handleMakeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.cut')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            qualityData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedCut,
            handleCutChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.polish')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            qualityData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedPolish,
            handlePolishChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.symmetry')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            qualityData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedSymmetry,
            handleSymmetryChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.fluorescence')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            fluorescenceData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedFluorescence,
            handleFluorescenceChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.lab')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            labData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedLab,
            handleLabChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.HA')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            brillianceData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedHR,
            handleHRChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.brilliance')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            brillianceData,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedBrilliance,
            handleBrillianceChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.location')}
          />
        </div>
        <div>
          <CustomSelect
            data={locationData}
            placeholder={ManageLocales('app.advanceSearch.location')}
            style={{
              selectTrigger: styles.dropdownHeader,
              selectContent: styles.dropdownData,
              selectElement: styles.selectElement,
            }}
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.origin')}
          />
        </div>
        <div>
          <CustomSelect
            data={locationData}
            placeholder={ManageLocales('app.advanceSearch.origin')}
            style={{
              selectTrigger: styles.dropdownHeader,
              selectContent: styles.dropdownData,
              selectElement: styles.selectElement,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.discount')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="discountFrom"
            onChange={(e) => {
              setDiscountFrom(e.target.value);
            }}
            value={discountFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="number"
            name="discountTo"
            onChange={(e) => {
              setDiscountTo(e.target.value);
            }}
            value={discountTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.priceRange')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="priceRangeFrom"
            onChange={(e) => {
              setPriceRangeFrom(e.target.value);
            }}
            value={priceRangeFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="number"
            name="priceRangeTo"
            onChange={(e) => {
              setPriceRangeTo(e.target.value);
            }}
            value={priceRangeTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.pricePerCarat')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="pricePerCaratFrom"
            onChange={(e) => {
              setPricePerCaratFrom(e.target.value);
            }}
            value={pricePerCaratFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            type="number"
            name="pricePerCaratTo"
            onChange={(e) => {
              setPricePerCaratTo(e.target.value);
            }}
            value={pricePerCaratTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.parameter')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.filterWrapSection} `}
        >
          {renderParameterFields()}
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales(
              'app.advanceSearch.inclusionsAndOtherParameter'
            )}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderOtherParameterFields()}
          </div>
        </div>
      </div>

      <div className={`${styles.filterSection} ${styles.filterWrapSection}`}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.girdle')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className={styles.filterSectionData}
        >
          <div className={styles.filterSectionData}>
            <div
              className={`${styles.filterSection} ${styles.filterWrapSection}`}
            >
              {renderSelectionButtons(
                girdleData,
                '',
                styles.activeOtherStyles,
                selectedGirdle,
                handleGirdleChange
              )}
            </div>
          </div>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.step1')}
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div style={{ margin: '10px' }}>
            <CustomRadioButton
              radioData={[
                {
                  id: '1',
                  value: '1',
                  radioButtonLabel: ManageLocales(
                    'app.advanceSearch.radioLabel1'
                  ),
                },
                {
                  id: '2',
                  value: '2',
                  radioButtonLabel: ManageLocales(
                    'app.advanceSearch.radioLabel2'
                  ),
                },
              ]}
              onChange={handleGirdleStepChange}
              radioButtonAllStyles={{
                radioButtonStyle: styles.radioStyle,
                radioLabelStyle: styles.radioLabel,
              }}
            />
          </div>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.step2')}
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div
            className={`${styles.filterSection} ${styles.filterWrapSection}`}
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {renderSelectionButtons(
              girdleStepData,
              '',
              styles.activeOtherStyles,
              selectedGirdleStep2,
              handleGirdleStep2Change
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: ManageLocales('app.advanceSearch.reset'),
              style: styles.transparent,
              fn: handleReset,
            },
            {
              id: 2,
              displayButtonLabel: ManageLocales('app.advanceSearch.saveSearch'),
              style: styles.transparent,
            },
            {
              id: 3,
              displayButtonLabel: ManageLocales('app.advanceSearch.search'),
              style: styles.filled,
              fn: handleSearch,
            },
            {
              id: 4,
              displayButtonLabel: ManageLocales(
                'app.advanceSearch.addAnotherSearch'
              ),
              style: ` ${styles.filled} ${styles.anotherSearch}`,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdvanceSearch;
