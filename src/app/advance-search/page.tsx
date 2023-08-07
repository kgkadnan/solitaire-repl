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

const AdvanceSearch = () => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const shapeData: IImageTileProps[] = [
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
  ];

  const colorData = ["White", "Fancy", "Range"];
  const whiteData = ["D", "E", "F", "I", "J", "K", "L", "M", "N"];
  const rangeData = [
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
  const fancyData = [
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

  const makeData = ["3EX", "3EX-Non", "3VG+"];

  const qualityData = ["Ideal", "Excellent", "Very Good", "Good", "Fair"];

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

  const handleChange = (shape: string, index: number) => {
    if (selectedShape.includes(shape)) {
      setSelectedShape((prevSelectedShape) =>
        prevSelectedShape.filter((selected) => selected !== shape)
      );
    } else {
      setSelectedShape((prevSelectedShape) => [...prevSelectedShape, shape]);
    }
  };

  const handleColorChange = (color: string) => {
    console.log(color);
    setSelectedColor(color);
    console.log(selectedColor, selectedColor === "White");
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomInputlabel
          htmlfor="text"
          label="Search Diamonds"
          style={{ label: styles.label }}
        />
        <CustomInputlabel htmlfor="text" label="Your Selection:" />
      </div>
      <hr
        style={{
          height: "5px",
          border: "0px solid #5D6A6A",
          borderTopWidth: "1px",
        }}
      />

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Shape" />
        </div>
        <div>
          <CustomImageTile
            imageTileData={shapeData}
            selectedTile={selectedShape}
            handleSelectTile={handleChange}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Color" />
        </div>
        <div>
          <div style={{ display: "flex" }}>
            {colorData.map((color) => {
              return (
                <SelectionButton
                  selectionButtonLabel={color}
                  handleClick={handleColorChange}
                  data={color}
                />
              );
            })}
          </div>
          <div>
            {selectedColor === "White" ? (
              whiteData.map((color) => {
                return (
                  <SelectionButton
                    selectionButtonLabel={color}
                    handleClick={handleColorChange}
                    data={color}
                  />
                );
              })
            ) : selectedColor === "Fancy" ? (
              <>
                {fancyData.map((color) => {
                  return (
                    <SelectionButton
                      selectionButtonLabel={color}
                      handleClick={handleColorChange}
                      data={color}
                    />
                  );
                })}
              </>
            ) : selectedColor === "Range" ? (
              rangeData.map((color) => {
                return (
                  <SelectionButton
                    selectionButtonLabel={color}
                    handleClick={handleColorChange}
                    data={color}
                  />
                );
              })
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {selectedColor === "Fancy" && (
        <>
          <div style={{ display: "flex" }}>
            <div>
              <CustomInputlabel htmlfor="text" label="Intensity" />
            </div>
            <div style={{ display: "flex" }}>
              {colorData.map((color) => {
                return (
                  <SelectionButton
                    selectionButtonLabel={color}
                    handleClick={handleColorChange}
                    data={color}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <CustomInputlabel htmlfor="text" label="Overtone" />
            </div>
            <div style={{ display: "flex" }}>
              {colorData.map((color) => {
                return (
                  <SelectionButton
                    selectionButtonLabel={color}
                    handleClick={handleColorChange}
                    data={color}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Tinge" />
        </div>
        <div>
          {colorData.map((color) => {
            return (
              <SelectionButton
                selectionButtonLabel={color}
                handleClick={handleColorChange}
                data={color}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Tinge Intensity" />
        </div>
        <div>
          {colorData.map((color) => {
            return (
              <SelectionButton
                selectionButtonLabel={color}
                handleClick={handleColorChange}
                data={color}
              />
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Clarity" />
        </div>
        <div>
          {colorData.map((color) => {
            return (
              <SelectionButton
                selectionButtonLabel={color}
                handleClick={handleColorChange}
                data={color}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Carat Range" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <CustomInputField
              // style={className}
              type="text"
              name="{name}"
              onChange={() => {}}
              value=""
              placeholder="From"
            />
            <CustomInputField
              // style={className}
              type="text"
              name="{name}"
              onChange={() => {}}
              value=""
              placeholder="To"
            />
            <SelectionButton
              selectionButtonLabel={"Add Carat"}
              handleClick={handleColorChange}
              //  data={color}
            />
          </div>
          <div>
            {colorData.map((color) => {
              return (
                <SelectionButton
                  selectionButtonLabel={color}
                  handleClick={handleColorChange}
                  data={color}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Make" />
        </div>
        <div>
          {makeData.map((make) => {
            return (
              <SelectionButton
                selectionButtonLabel={make}
                handleClick={handleColorChange}
                data={make}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Cut" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Polish" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Symmetry" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Fluorescence" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Lab" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="H&A" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Brilliance" />
        </div>
        <div>
          {qualityData.map((cut) => {
            return (
              <SelectionButton
                selectionButtonLabel={cut}
                handleClick={handleColorChange}
                data={cut}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Location" />
        </div>
        <div>
          <CustomSelect data={locationData} placeholder="Location" />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Country of origin" />
        </div>
        <div>
          <CustomSelect data={locationData} placeholder="Country of origin" />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Discount" />
        </div>
        <div style={{ display: "flex" }}>
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value=""
            placeholder="From"
          />
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value=""
            placeholder="To"
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Price Range" />
        </div>
        <div style={{ display: "flex" }}>
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value=""
            placeholder="From"
          />
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value=""
            placeholder="To"
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Price/Carat" />
        </div>
        <div style={{ display: "flex" }}>
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value=""
            placeholder="From"
          />
          <CustomInputField
            // style={className}
            type="text"
            name="{name}"
            onChange={() => {}}
            value=""
            placeholder="To"
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <CustomInputlabel htmlfor="text" label="Parameter" />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {parameterData.map((parameter) => {
            return (
              <div>
                {parameter}
                <div style={{ display: "flex" }}>
                  <CustomInputField
                    // style={className}
                    type="text"
                    name="{name}"
                    onChange={() => {}}
                    value=""
                    placeholder="From"
                  />
                  <CustomInputField
                    // style={className}
                    type="text"
                    name="{name}"
                    onChange={() => {}}
                    value=""
                    placeholder="To"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      
    </div>
  );
};

export default AdvanceSearch;
