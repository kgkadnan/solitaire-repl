"use client";
import { CustomInputlabel } from "@/components/Common/input-label";
import React, { useState } from "react";
import styles from "./advance-search.module.scss";
import CustomImageTile, {
  IImageTileProps,
} from "@/components/Common/image-tile";
import Round from "../../../public/assets/images/Round.png";
import { CustomInputField } from "@/components/Common/input-field";
import { SelectionButton } from "@/components/Common/Buttons/selection-button/selection-button";
import { CustomSelect } from "@/components/Common/select";
import { RadioButton } from "@/components/Common/Buttons/radio-button/radio-button";

const AdvanceSearch = () => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedGirdleStep, setSelectedGirdleStep] = useState("");
  const [selectedCaratRange, setSelectedCaratRange] = useState<string>("");

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
    "YELLOW",
    "PINK",
    "BLUE",
    "RED",
    "GREEN",
    "PURPLE",
    "ORANGE",
    "BLACK",
    "GRAY",
    "VIOLET",
    "BROWN",
    "WHITE",
    "OTHER",
    "LIGHT YELLOW",
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
    "FAINT",
    "LIGHT",
    "FANCY LIGHT",
    "FANCY",
    " FANCY DARK",
    "FANCY INTENSE",
    "FANCY VIVID",
    "FANCY DEEP",
    "VERY LIGHT",
  ];

  let overtoneData = [
    "NONE",
    "YELLOW",
    "YELLOWISH",
    "PINK",
    "PINKISH",
    "BLUE",
    "BLUISH",
    "RED",
    "REDDISH",
    "GREEN",
    "GREENISH",
    "PURPLE",
    "PURPLISH",
    "ORANGE",
    "ORANGY",
    "GRAY",
    "GRAYISH",
    "BLACK",
    "BROWN",
    "BROWNISH",
    "VIOLETISH",
    "WHITE",
    "W-X LIGHT BROWN",
    "BROWNISH ORANGY",
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
  const handleShapeChange = (shape: string, index: number) => {
    // console.log(shape)
    // if(shape==="All"){
    //   setSelectedShape((shapeData) =>
    //   shapeData.map((selected) => selected)
    // );
    // }
    // else {
    if (selectedShape.includes(shape)) {
      setSelectedShape((prevSelectedShape) =>
        prevSelectedShape.filter((selected) => selected !== shape)
      );
    } else {
      setSelectedShape((prevSelectedShape) => [...prevSelectedShape, shape]);
    }
    // }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleGirdleStepChange = (radioValue: string) => {
    setSelectedGirdleStep(radioValue);
  };

  ///reusable jsx
  const renderSelectionButtons = (data: string[], className?: string) => {
    console.log(className, "className");
    const selectionButtonStyle = {
      selectionButtonStyle: className ?? "",
    };
    return data.map((color: string) => (
      <SelectionButton
        key={color}
        selectionButtonLabel={color}
        handleClick={handleColorChange}
        data={color}
        selectionButtonAllStyles={selectionButtonStyle}
      />
    ));
  };

  const renderParameterFields = () => {
    return parameterData.map((parameter) => (
      <div key={parameter}>
        <CustomInputlabel
          htmlfor="text"
          label={parameter}
          overriddenStyles={{ label: styles.labelPlainColor }}
        />
        <div className={styles.filterSection}>
          <CustomInputField
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
            placeholder="From"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
            placeholder="To"
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
            <div>{renderSelectionButtons(data.elementValue)}</div>
          </div>
        ))}
      </div>
    ));
  };
  return (
    <div style={{ background: "#0C1F1F", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            imageTileData={shapeData}
            selectedTile={selectedShape}
            handleSelectTile={handleShapeChange}
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Color" />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderSelectionButtons(colorData, styles.colorFilterStyles)}
          </div>
          <div>
            {selectedColor === "White" &&
              renderSelectionButtons(whiteData, styles.whiteColorFilterStyle)}
            {selectedColor === "Fancy" && renderSelectionButtons(fancyData)}
            {selectedColor === "Range" && renderSelectionButtons(rangeData)}
          </div>
        </div>
      </div>

      {selectedColor === "Fancy" && (
        <>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel htmlfor="text" label="Intensity" />
            </div>

            <div
              className={`${styles.filterSection} ${styles.filterSectionData}`}
            >
              {renderSelectionButtons(intensityData)}
            </div>
          </div>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel htmlfor="text" label="Overtone" />
            </div>
            <div className={styles.filterSectionData}>
              <div className={styles.filterSection}>
                {renderSelectionButtons(overtoneData)}
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
          {renderSelectionButtons(tingeData)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Tinge Intensity" />
        </div>
        <div>
          {renderSelectionButtons(
            tingeIntensityData,
            styles.commonSelectionStyle
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Clarity" />
        </div>
        <div>{renderSelectionButtons(clarityData)}</div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Carat Range" />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.caratRangeFilter}`}
        >
          <div className={styles.filterSection}>
            <CustomInputField
              // style={className}
              type="text"
              name="{name}"
              onChange={() => {}}
              value={selectedCaratRange}
              placeholder="From"
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <CustomInputField
              // style={className}
              type="text"
              name="{name}"
              onChange={() => {}}
              value={selectedCaratRange}
              placeholder="To"
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <SelectionButton
              selectionButtonLabel={"Add Carat"}
              handleClick={handleColorChange}
              //  data={color}
            />
          </div>
          <div>{renderSelectionButtons(caratRangeData)}</div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Make" />
        </div>
        <div>
          {renderSelectionButtons(makeData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Cut" />
        </div>
        <div>
          {renderSelectionButtons(qualityData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Polish" />
        </div>
        <div>
          {renderSelectionButtons(qualityData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Symmetry" />
        </div>
        <div>
          {renderSelectionButtons(qualityData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Fluorescence" />
        </div>
        <div>
          {renderSelectionButtons(
            fluorescenceData,
            styles.commonSelectionStyle
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Lab" />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(labData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="H&A" />
        </div>
        <div>
          {renderSelectionButtons(brillianceData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Brilliance" />
        </div>
        <div>
          {renderSelectionButtons(brillianceData, styles.commonSelectionStyle)}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Location" />
        </div>
        <div>
          <CustomSelect data={locationData} placeholder="Location" />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Country of origin" />
        </div>
        <div>
          <CustomSelect data={locationData} placeholder="Country of origin" />
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Discount" />
        </div>
        <div className={styles.filterSection}>
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
            placeholder="From"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
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
        <div className={styles.filterSection}>
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
            placeholder="From"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
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
        <div className={styles.filterSection}>
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
            placeholder="From"
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            type="text"
            name="{name}"
            onChange={() => {}}
            value={selectedCaratRange}
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
          <CustomInputlabel htmlfor="text" label="Parameter" />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.filterWrapSection}`}
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
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderOtherParameterFields()}
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        {" "}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel htmlfor="text" label="Girdle" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className={styles.filterSectionData}
        >
          <div className={styles.filterSectionData}>
            <div className={styles.filterSection}>
              {renderSelectionButtons(girdleData)}
            </div>
          </div>
          <CustomInputlabel htmlfor="text" label="STEP1" />
          <div style={{ margin: "10px" }}>
            <RadioButton
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
          <CustomInputlabel htmlfor="text" label="STEP2" />
          <div
            className={`${styles.filterSection} ${styles.filterWrapSection}`}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {renderSelectionButtons(girdleStepData)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearch;
