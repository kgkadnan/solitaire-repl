"use client";
import React, { useState } from "react";
import styles from "./advance-search.module.scss";

import Round from "@public/assets/images/Round.png";
import CustomImageTile, {
  IImageTileProps,
} from "@components/common/image-tile";
import { CustomInputlabel } from "@components/common/input-label";
import { CustomInputField } from "@components/common/input-field";
import { CustomSelect } from "@components/common/select";
import { CustomSelectionButton } from "@/components/common/buttons/selection-button";
import { CustomRadioButton } from "@/components/common/buttons/radio-button";

const AdvanceSearch = () => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
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

  const [, setSelectedGirdleStep] = useState("");
  const [selectedCaratRange, setSelectedCaratRange] = useState<string[]>([]);
  const [selectedAdditionalCaratRange, setSelectedAditionalCaratRange] =
    useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
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

  const [priceRangeFrom, setPriceRangeFrom] = useState("");
  const [priceRangeTo, setPriceRangeTo] = useState("");
  const [discountFrom, setDiscountFrom] = useState("");
  const [discountTo, setDiscountTo] = useState("");
  const [pricePerCaratFrom, setPricePerCaratFrom] = useState("");
  const [pricePerCaratTo, setPricePerCaratTo] = useState("");
  const [caratRangeFrom, setCaratRangeFrom] = useState("");
  const [caratRangeTo, setCaratRangeTo] = useState("");

  const imageTileStyles = {
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeIndicatorStyles,
  };

  let shapeData: IImageTileProps[] = [
    {
      src: Round,
      title: "Round",
    },
    {
      src: Round,
      title: "Pear",
    },
    {
      src: Round,
      title: "Emerald",
    },
    {
      src: Round,
      title: "Asscher",
    },
    {
      src: Round,
      title: "Cushion",
    },
    {
      src: Round,
      title: "Princess",
    },
    {
      src: Round,
      title: "Marquise",
    },
    {
      src: Round,
      title: "Oval",
    },
    {
      src: Round,
      title: "Heart",
    },
    {
      src: Round,
      title: "Radiant",
    },
    {
      src: Round,
      title: "Others",
    },
    {
      src: Round,
      title: "All",
    },
  ];

  let colorData = ["White", "Fancy", "Range"];
  let whiteData = ["D", "E", "F", "I", "J", "K", "L", "M", "N"];
  let rangeData = [
    "FANCY",
    "N-O",
    "O-P",
    "S-T",
    "P-R",
    "Q-R",
    "W-X",
    "Y-Z",
    "U-V",
  ];
  let fancyData = [
    "Yellow",
    "Pink",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Orange",
    "Black",
    "Gray",
    "Violet",
    "Brown",
    "White",
    "Other",
    "Light Yellow",
  ];

  let makeData = ["3EX", "3EX-Non", "3VG+"];

  let qualityData = ["Ideal", "Excellent", "Very Good", "Good", "Fair"];

  let locationData = [
    { id: 1, value: "Dubai" },
    { id: 2, value: "India" },
    { id: 3, value: "Belgium" },
  ];

  let parameterData = [
    "Table%",
    "Crown Angle",
    "Length",
    "Pavillion Depth",
    "Depth%",
    "Crown Height",
    "Width",
    "Lower Half",
    "Ratio",
    "Girdle%",
    "Pavillion Angle",
    "Star Length",
  ];

  let otherParameterData = [
    {
      key: "Black Inclusion",
      value: [
        {
          elementKey: "Black Table",
          elementValue: ["BO", "BPP", "B1", "B2", "B3"],
        },
        {
          elementKey: "Side Table",
          elementValue: ["SBO", "SBPP", "SB1", "SB2", "SB3"],
        },
        {
          elementKey: "Open Crown",
          elementValue: ["None", "VS", "S", "M", "D"],
        },
        {
          elementKey: "Open Table",
          elementValue: ["None", "VS", "S", "M", "D"],
        },
        {
          elementKey: "Open Pavilion",
          elementValue: ["None", "VS", "S", "M", "L"],
        },
        {
          elementKey: "Milky",
          elementValue: ["MO", "M1", "M2", "M3"],
        },
        {
          elementKey: "Luster",
          elementValue: ["EX", "VG", "G", "P"],
        },
        {
          elementKey: "Eye Clean",
          elementValue: ["Yes", "No", "B"],
        },
      ],
    },
    {
      key: "White Inclusion",
      value: [
        {
          elementKey: "Table Inclusion",
          elementValue: ["TO", "T1", "B1", "T2", "T3"],
        },
        {
          elementKey: "Side Inclusion",
          elementValue: ["SO", "S1", "SB1", "SB2", "S3"],
        },
        {
          elementKey: "Natural Crown",
          elementValue: ["None", "VS", "S", "M", "L"],
        },
        {
          elementKey: "Natural Girdle",
          elementValue: ["None", "VS", "S", "M", "L"],
        },
        {
          elementKey: "Natural Pavilion",
          elementValue: ["None", "VS", "S", "M", "L"],
        },
        {
          elementKey: "Surface Graining",
          elementValue: ["GO", "G1", "G2", "G3"],
        },
        {
          elementKey: "Luster",
          elementValue: ["IGO", "IG1", "IG2", "IG3"],
        },
      ],
    },
  ];

  let intensityData = [
    "Faint",
    "Light",
    "Fancy light",
    "Fancy",
    "Fancy dark",
    "Fancy intense",
    "Fancy vivid",
    "Fancy deep",
    "Very light",
  ];

  let overtoneData = [
    "None",
    "Yellow",
    "Yellowish",
    "Pink",
    "Pinkish",
    "Blue",
    "Bluish",
    "Red",
    "Reddish",
    "Green",
    "Greenish",
    "Purple",
    "Purplish",
    "Orange",
    "Orangy",
    "Gray",
    "Grayish",
    "Black",
    "Brown",
    "Brownish",
    "Violetish",
    "White",
    "W-x Light Brown",
    "Brownish Orangy",
  ];

  let tingeData = [
    "WH",
    "YEL",
    "BR",
    "GRN",
    "MIXED",
    "PINK",
    "BLACKISH",
    "Gry",
    "FY",
    "MIX",
    "OR",
    "BGM",
    "NO BGM",
    "NO BLACK",
  ];

  let tingeIntensityData = ["None", "Faint", "Medium", "Strong"];

  let clarityData = [
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "SI3",
    "I1",
    "I2",
    "I3",
  ];

  let fluorescenceData = ["NON", "FNT", "VSL", "MED", "STG", "SLT", "VSTG"];

  let labData = [
    "GIA",
    "HRD",
    "IGI",
    "FM",
    "AGS",
    "FAC",
    "DBCOO",
    "NGTC",
    "IIDGR",
    "KGK",
    "OTHER",
    "STP",
  ];
  let brillianceData = ["Excellent", "Very Good", "Good"];

  let girdleData = [
    "ETN",
    "VTN",
    "STN",
    "THN",
    "MED",
    "STK",
    "THK",
    "VTK",
    "ETK",
  ];

  let girdleStepData = [
    "All",
    "Bearding",
    "Brown patch of color",
    "Bruise",
    "Cavity",
    "Chip",
    "Cleavage",
    "Cloud",
    "Crystal",
    "Crystal Surface",
    "Etch Channel",
    "Extra Facet",
    "Feather",
    "Flux Remnant",
    "Indented Natural",
    "Internal Graining",
    "Internal Inscription",
    "Internal Laser Drilling",
    "Knot",
    "Laser Drill Hole",
    "Manufacturing Remnant",
    "Minor Details of Polish",
    "Natural",
    "Needle",
    "No Inclusion",
    "Pinpoint",
    "Reflecting Surface Graining",
    "Surface Graining",
    "Twinning Wisp",
  ];

  let caratRangeData = [
    "0.01-0.29",
    "0.30-0.39",
    "0.40-0.49",
    "0.50-0.69",
    "0.70-0.89",
    "0.90-0.99",
    "1.00-1.49",
    "1.50-1.99",
    "2.00-2.99",
    "3.00-3.99",
    "4.00-4.99",
    "5.00-5.99",
    "6.00-6.99",
    "7.00 - 7.99",
    "8.00 - 8.99",
    " 9.00 - 9.99",
    "10+",
  ];

  //// All user actions

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleFilterChange = (
    filterData: string,
    selectedFilters: string[],
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedFilters.includes(filterData)) {
      setSelectedFilters((prevSelectedColors) =>
        prevSelectedColors.filter((selected) => selected !== filterData)
      );
    } else {
      setSelectedFilters((prevSelectedColors) => [
        ...prevSelectedColors,
        filterData,
      ]);
    }
  };

  const handleShapeChange = (shape: string) => {
    if (shape.toLowerCase() === "all") {
      let filteredShape: string[] = shapeData.map((data) => data.title);
      setSelectedShape(filteredShape);
      if (selectedShape.includes("All")) {
        setSelectedShape([]);
      }
    } else {
      handleFilterChange(shape, selectedShape, setSelectedShape);
    }
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
    if (data.toLowerCase() === "3ex" || data.toLowerCase() === "3ex-non") {
      if (
        !(
          selectedCut.includes("Excellent") &&
          selectedPolish.includes("Excellent") &&
          selectedSymmetry.includes("Excellent")
        )
      ) {
        handleCutChange("Excellent");
        handlePolishChange("Excellent");
        handleSymmetryChange("Excellent");
      }
    }

    if (data.toLowerCase() === "3ex-non") {
      handleFluorescenceChange("NON");
    }
    data === selectedMake ? setSelectedMake("") : setSelectedMake(data);
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
    if (data.toLowerCase() === "all") {
      let filteredGirdleStep: string[] = girdleStepData.map((data1) =>
        data1.toLowerCase() !== "all" ? data1 : ""
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
          selectionButtonStyle: `${className ?? ""}   ${
            typeof relatedState !== "string"
              ? relatedState?.includes(data) && activeStyle
              : relatedState === data && activeStyle
          }`,
          selectionButtonLabelStyle: `${
            highlightIndicator &&
            relatedState === data &&
            styles.colorDataActiveStyle
          }`,
        }}
      />
    ));
  };

  const renderParameterFields = () => {
    return parameterData.map((parameter) => (
      <div key={parameter} className={styles.parameterContainer}>
        <CustomInputlabel
          htmlfor="text"
          label={parameter}
          overriddenStyles={{ label: styles.labelPlainColor }}
        />
        <div className={`${styles.filterSection}  ${styles.parameterFilter}`}>
          <CustomInputField
            type="text"
            name="{name}"
            onChange={(e) => {
              setSelectedAditionalCaratRange(e.target.value);
            }}
            value={selectedAdditionalCaratRange}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <div className={styles.parameterLabel}>to</div>
          <CustomInputField
            type="text"
            name="{name}"
            onChange={(e) => {
              setSelectedAditionalCaratRange(e.target.value);
            }}
            value={selectedAdditionalCaratRange}
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
              {renderSelectionButtons(
                data.elementValue,
                "",
                styles.activeOtherStyles
              )}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div className={styles.advanceSearchHeader}>
        <CustomInputlabel
          htmlfor="text"
          label="Search Diamonds"
          overriddenStyles={{ label: styles.label }}
        />
        <CustomInputlabel htmlfor="text" label="Your Selection:" />
      </div>
      <hr className={styles.dividerLine} />

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          {" "}
          <CustomInputlabel htmlfor="text" label="Shape" />
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
            label="Color"
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
          <div>
            {selectedColor.toLowerCase() === "white" &&
              renderSelectionButtons(
                whiteData,
                styles.whiteColorFilterStyle,
                styles.activeOtherStyles,
                selectedWhiteColor,
                handleWhiteFilterChange
              )}
            {selectedColor.toLowerCase() === "fancy" &&
              renderSelectionButtons(
                fancyData,
                "",
                styles.activeOtherStyles,
                selectedFancyColor,
                handleFancyFilterChange
              )}
            {selectedColor.toLowerCase() === "range" &&
              renderSelectionButtons(
                rangeData,
                "",
                styles.activeOtherStyles,
                selectedRangeColor,
                handleRangeFilterChange
              )}
          </div>
        </div>
      </div>

      {selectedColor.toLowerCase() === "fancy" && (
        <>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel htmlfor="text" label="Intensity" />
            </div>

            <div
              className={`${styles.filterSection} ${styles.filterSectionData}`}
            >
              {renderSelectionButtons(
                intensityData,
                "",
                styles.activeOtherStyles,
                selectedIntensity,
                handleIntensityChange
              )}
            </div>
          </div>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel htmlfor="text" label="Overtone" />
            </div>
            <div className={styles.filterSectionData}>
              <div className={styles.filterSection}>
                {renderSelectionButtons(
                  overtoneData,
                  "",
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
          <CustomInputlabel htmlfor="text" label="Tinge" />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            tingeData,
            "",
            styles.activeOtherStyles,
            selectedTinge,
            handleTingeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Tinge Intensity" />
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
          <CustomInputlabel htmlfor="text" label="Clarity" />
        </div>
        <div>
          {renderSelectionButtons(
            clarityData,
            "",
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
            label="Carat Range"
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.caratRangeFilter}`}
        >
          <div
            className={`${styles.filterSection} ${styles.rangeFilter}`}
            style={{ width: "420px" }}
          >
            <CustomInputField
              // style={className}
              type="number"
              name="caratRangeFrom"
              onChange={(e) => {
                setCaratRangeFrom(e.target.value);
              }}
              value={caratRangeFrom}
              placeholder="From"
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
              placeholder="To"
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <CustomSelectionButton
              selectionButtonLabel={"Add Carat"}
              handleClick={() => {}}
              selectionButtonAllStyles={{
                selectionButtonStyle: styles.addCarat,
              }}
            />
          </div>
          <div>
            {renderSelectionButtons(
              caratRangeData,
              "",
              styles.activeOtherStyles,
              selectedCaratRange,
              handleCaratRangeChange
            )}
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Make" />
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
          <CustomInputlabel htmlfor="text" label="Cut" />
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
          <CustomInputlabel htmlfor="text" label="Polish" />
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
          <CustomInputlabel htmlfor="text" label="Symmetry" />
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
          <CustomInputlabel htmlfor="text" label="Fluorescence" />
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
          <CustomInputlabel htmlfor="text" label="Lab" />
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
          <CustomInputlabel htmlfor="text" label="H&A" />
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
          <CustomInputlabel htmlfor="text" label="Brilliance" />
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
          <CustomInputlabel htmlfor="text" label="Location" />
        </div>
        <div>
          <CustomSelect
            data={locationData}
            placeholder="Location"
            style={{
              selectTrigger: styles.dropdownHeader,
              selectContent: styles.dropdownData,
            }}
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Country of origin" />
        </div>
        <div>
          <CustomSelect
            data={locationData}
            placeholder="Country of origin"
            style={{
              selectTrigger: styles.dropdownHeader,
              selectContent: styles.dropdownData,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Discount" />
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
            placeholder="From"
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
            placeholder="To"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {" "}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Price Range" />
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
            placeholder="From"
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
            placeholder="To"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {" "}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Price/Carat" />
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
            placeholder="From"
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
            placeholder="To"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {" "}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label="Parameter"
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
        {" "}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label="Inclusions & other parameters"
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
        {" "}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label="Girdle"
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className={styles.filterSectionData}
        >
          <div className={styles.filterSectionData}>
            <div
              className={`${styles.filterSection} ${styles.filterWrapSection}`}
            >
              {renderSelectionButtons(
                girdleData,
                "",
                styles.activeOtherStyles,
                selectedGirdle,
                handleGirdleChange
              )}
            </div>
          </div>
          <CustomInputlabel
            htmlfor="text"
            label="STEP1"
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div style={{ margin: "10px" }}>
            <CustomRadioButton
              radioData={[
                {
                  id: "1",
                  value: "1",
                  radioButtonLabel: "Contains",
                },
                {
                  id: "2",
                  value: "2",
                  radioButtonLabel: "Does Not Contains",
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
            label="STEP2"
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div
            className={`${styles.filterSection} ${styles.filterWrapSection}`}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {renderSelectionButtons(
              girdleStepData,
              "",
              styles.activeOtherStyles,
              selectedGirdleStep2,
              handleGirdleStep2Change
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearch;
