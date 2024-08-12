import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { Carat } from '@/app/v2/search/form/components/carat';
import { Clarity } from '@/app/v2/search/form/components/clarity';
import { Color } from '@/app/v2/search/form/components/color';
import { CountryOfOrigin } from '@/app/v2/search/form/components/country-of-origin';
import { Culet } from '@/app/v2/search/form/components/culet';
import { DiscountPrice } from '@/app/v2/search/form/components/discount-price';
import { Fluorescence } from '@/app/v2/search/form/components/fluorescence';
import { Girdle } from '@/app/v2/search/form/components/girdle';
import Inclusions from '@/app/v2/search/form/components/inclusions';
import { KeyToSymbol } from '@/app/v2/search/form/components/key-to-symbol';
import { Lab } from '@/app/v2/search/form/components/lab';
import { Location } from '@/app/v2/search/form/components/location';
import { MakeCutPolishSymmetry } from '@/app/v2/search/form/components/make-cut-polish-symmetry';
import { Parameters } from '@/app/v2/search/form/components/parameters';
import { IProduct } from '@/app/v2/search/interface';
import CompareStone from '@/app/v2/search/result/components/compare-stone';

export default {
  title: 'modules/Search/Search',
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ]
} as Meta;
interface IToggleCodeProps {
  children: React.ReactNode;
}
const ToggleCode = ({ children }: IToggleCodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-white bg-blue-600 rounded"
      >
        {isOpen ? 'Hide Code' : 'Show Code'}
      </button>
      {isOpen && (
        <pre className="p-4 mt-2 bg-gray-100 rounded">
          <code>{children}</code>
        </pre>
      )}
    </div>
  );
};

interface IProp {
  prop: string;
  type: string;
  description: string;
}

interface IPropsTableProps {
  props: IProp[];
}

const PropsTable = ({ props }: IPropsTableProps) => (
  <table className="w-full mt-4 table-auto">
    <thead>
      <tr>
        <th className="px-4 py-2 border">Prop</th>
        <th className="px-4 py-2 border">Type</th>
        <th className="px-4 py-2 border">Description</th>
      </tr>
    </thead>
    <tbody>
      {props.map(({ prop, type, description }) => (
        <tr key={prop}>
          <td className="px-4 py-2 border">{prop}</td>
          <td className="px-4 py-2 border">{type}</td>
          <td className="px-4 py-2 border">{description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
interface IDocumentationSectionProps {
  title: string;
  description: string;
  usage: string;
  props: IProp[];
}

const DocumentationSection = ({
  title,
  description,
  usage,
  props
}: IDocumentationSectionProps) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-gray-800">{title} Component</h2>
    <p className="mt-4 text-gray-600">
      The <code className="text-blue-600">{title}</code> {description}
    </p>
    <h3 className="mt-6 text-lg font-semibold text-gray-800">Usage</h3>
    <ToggleCode>{usage}</ToggleCode>
    <h3 className="mt-6 text-lg font-semibold text-gray-800">Props</h3>
    <PropsTable props={props} />
  </div>
);

export const Docs = () => (
  <div className="p-8 bg-white rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-gray-800">
      Component Documentation
    </h1>

    <DocumentationSection
      title="Carat"
      description="component allows users to filter diamonds by their carat size."
      usage={`<Carat
              caratMax=""
              caratMin=""
              selectedCaratRange={[]}
              caratRangeSelectionTemp={[]}
              caratRangeSelection={[]}
              caratError=""
              validationError=""
            />`}
      props={[
        {
          prop: 'caratMax',
          type: 'string',
          description: 'The maximum carat value for the filter.'
        },
        {
          prop: 'caratMin',
          type: 'string',
          description: 'The minimum carat value for the filter.'
        },
        {
          prop: 'selectedCaratRange',
          type: 'Array',
          description: 'The currently selected carat range.'
        },
        {
          prop: 'caratRangeSelectionTemp',
          type: 'Array',
          description: 'Temporary selection for carat range.'
        },
        {
          prop: 'caratRangeSelection',
          type: 'Array',
          description: 'Persisted carat range selections.'
        },
        {
          prop: 'caratError',
          type: 'string',
          description: 'Error message related to carat selection.'
        },
        {
          prop: 'validationError',
          type: 'string',
          description: 'Validation error message.'
        }
      ]}
    />

    <DocumentationSection
      title="Clarity"
      description="component allows users to filter diamonds by their clarity."
      usage={`<Clarity
              selectedClarity={[]}
              setSelectedClarity={() => {}}
            />`}
      props={[
        {
          prop: 'selectedClarity',
          type: 'Array',
          description: 'The currently selected clarity values.'
        },
        {
          prop: 'setSelectedClarity',
          type: 'Function',
          description: 'Function to update selected clarity values.'
        }
      ]}
    />

    <DocumentationSection
      title="Color"
      description="component allows users to filter diamonds by their color."
      usage={`<Color
              selectedColor={[]}
              selectedWhiteColor={[]}
              selectedFancyColor={[]}
              selectedIntensity={[]}
              selectedOvertone={[]}
              setSelectedColor={() => {}}
              setSelectedWhiteColor={() => {}}
              setSelectedFancyColor={() => {}}
              setSelectedIntensity={() => {}}
              setSelectedOvertone={() => {}}
            />`}
      props={[
        {
          prop: 'selectedColor',
          type: 'Array',
          description: 'The currently selected colors.'
        },
        {
          prop: 'selectedWhiteColor',
          type: 'Array',
          description: 'The currently selected white colors.'
        },
        {
          prop: 'selectedFancyColor',
          type: 'Array',
          description: 'The currently selected fancy colors.'
        },
        {
          prop: 'selectedIntensity',
          type: 'Array',
          description: 'The currently selected intensities.'
        },
        {
          prop: 'selectedOvertone',
          type: 'Array',
          description: 'The currently selected overtones.'
        },
        {
          prop: 'setSelectedColor',
          type: 'Function',
          description: 'Function to update selected colors.'
        },
        {
          prop: 'setSelectedWhiteColor',
          type: 'Function',
          description: 'Function to update selected white colors.'
        },
        {
          prop: 'setSelectedFancyColor',
          type: 'Function',
          description: 'Function to update selected fancy colors.'
        },
        {
          prop: 'setSelectedIntensity',
          type: 'Function',
          description: 'Function to update selected intensities.'
        },
        {
          prop: 'setSelectedOvertone',
          type: 'Function',
          description: 'Function to update selected overtones.'
        }
      ]}
    />

    <DocumentationSection
      title="CountryOfOrigin"
      description="component allows users to filter diamonds by their country of origin."
      usage={`<CountryOfOrigin
              selectedCountries={[]}
              setSelectedCountries={() => {}}
            />`}
      props={[
        {
          prop: 'selectedCountries',
          type: 'Array',
          description: 'The currently selected countries.'
        },
        {
          prop: 'setSelectedCountries',
          type: 'Function',
          description: 'Function to update selected countries.'
        }
      ]}
    />

    <DocumentationSection
      title="Culet"
      description="component allows users to filter diamonds by their culet size."
      usage={`<Culet
              selectedCulet={[]}
              setSelectedCulet={() => {}}
            />`}
      props={[
        {
          prop: 'selectedCulet',
          type: 'Array',
          description: 'The currently selected culet sizes.'
        },
        {
          prop: 'setSelectedCulet',
          type: 'Function',
          description: 'Function to update selected culet sizes.'
        }
      ]}
    />

    <DocumentationSection
      title="DiscountPrice"
      description="component allows users to filter diamonds by their discount price."
      usage={`<DiscountPrice
              discountPriceMax=""
              discountPriceMin=""
              selectedDiscountPriceRange={[]}
              discountPriceRangeSelectionTemp={[]}
              discountPriceRangeSelection={[]}
              discountPriceError=""
              validationError=""
            />`}
      props={[
        {
          prop: 'discountPriceMax',
          type: 'string',
          description: 'The maximum discount price for the filter.'
        },
        {
          prop: 'discountPriceMin',
          type: 'string',
          description: 'The minimum discount price for the filter.'
        },
        {
          prop: 'selectedDiscountPriceRange',
          type: 'Array',
          description: 'The currently selected discount price range.'
        },
        {
          prop: 'discountPriceRangeSelectionTemp',
          type: 'Array',
          description: 'Temporary selection for discount price range.'
        },
        {
          prop: 'discountPriceRangeSelection',
          type: 'Array',
          description: 'Persisted discount price range selections.'
        },
        {
          prop: 'discountPriceError',
          type: 'string',
          description: 'Error message related to discount price selection.'
        },
        {
          prop: 'validationError',
          type: 'string',
          description: 'Validation error message.'
        }
      ]}
    />

    <DocumentationSection
      title="Fluorescence"
      description="component allows users to filter diamonds by their fluorescence."
      usage={`<Fluorescence
              selectedFluorescence={[]}
              setSelectedFluorescence={() => {}}
            />`}
      props={[
        {
          prop: 'selectedFluorescence',
          type: 'Array',
          description: 'The currently selected fluorescence values.'
        },
        {
          prop: 'setSelectedFluorescence',
          type: 'Function',
          description: 'Function to update selected fluorescence values.'
        }
      ]}
    />

    <DocumentationSection
      title="Girdle"
      description="component allows users to filter diamonds by their girdle size."
      usage={`<Girdle
              selectedGirdle={[]}
              setSelectedGirdle={() => {}}
            />`}
      props={[
        {
          prop: 'selectedGirdle',
          type: 'Array',
          description: 'The currently selected girdle sizes.'
        },
        {
          prop: 'setSelectedGirdle',
          type: 'Function',
          description: 'Function to update selected girdle sizes.'
        }
      ]}
    />

    <DocumentationSection
      title="Inclusions"
      description="component allows users to filter diamonds by their inclusions."
      usage={`<Inclusions
              selectedInclusions={[]}
              setSelectedInclusions={() => {}}
            />`}
      props={[
        {
          prop: 'selectedInclusions',
          type: 'Array',
          description: 'The currently selected inclusions.'
        },
        {
          prop: 'setSelectedInclusions',
          type: 'Function',
          description: 'Function to update selected inclusions.'
        }
      ]}
    />

    <DocumentationSection
      title="KeyToSymbol"
      description="component allows users to filter diamonds by their key to symbol."
      usage={`<KeyToSymbol
              selectedKeyToSymbol={[]}
              setSelectedKeyToSymbol={() => {}}
            />`}
      props={[
        {
          prop: 'selectedKeyToSymbol',
          type: 'Array',
          description: 'The currently selected key to symbols.'
        },
        {
          prop: 'setSelectedKeyToSymbol',
          type: 'Function',
          description: 'Function to update selected key to symbols.'
        }
      ]}
    />

    <DocumentationSection
      title="Lab"
      description="component allows users to filter diamonds by their lab."
      usage={`<Lab
              selectedLab={[]}
              setSelectedLab={() => {}}
            />`}
      props={[
        {
          prop: 'selectedLab',
          type: 'Array',
          description: 'The currently selected labs.'
        },
        {
          prop: 'setSelectedLab',
          type: 'Function',
          description: 'Function to update selected labs.'
        }
      ]}
    />

    <DocumentationSection
      title="Location"
      description="component allows users to filter diamonds by their location."
      usage={`<Location
              selectedLocation={[]}
              setSelectedLocation={() => {}}
            />`}
      props={[
        {
          prop: 'selectedLocation',
          type: 'Array',
          description: 'The currently selected locations.'
        },
        {
          prop: 'setSelectedLocation',
          type: 'Function',
          description: 'Function to update selected locations.'
        }
      ]}
    />

    <DocumentationSection
      title="MakeCutPolishSymmetry"
      description="component allows users to filter diamonds by their make, cut, polish, and symmetry."
      usage={`<MakeCutPolishSymmetry
              selectedMake={[]}
              selectedCut={[]}
              selectedPolish={[]}
              selectedSymmetry={[]}
              setSelectedMake={() => {}}
              setSelectedCut={() => {}}
              setSelectedPolish={() => {}}
              setSelectedSymmetry={() => {}}
            />`}
      props={[
        {
          prop: 'selectedMake',
          type: 'Array',
          description: 'The currently selected makes.'
        },
        {
          prop: 'selectedCut',
          type: 'Array',
          description: 'The currently selected cuts.'
        },
        {
          prop: 'selectedPolish',
          type: 'Array',
          description: 'The currently selected polishes.'
        },
        {
          prop: 'selectedSymmetry',
          type: 'Array',
          description: 'The currently selected symmetries.'
        },
        {
          prop: 'setSelectedMake',
          type: 'Function',
          description: 'Function to update selected makes.'
        },
        {
          prop: 'setSelectedCut',
          type: 'Function',
          description: 'Function to update selected cuts.'
        },
        {
          prop: 'setSelectedPolish',
          type: 'Function',
          description: 'Function to update selected polishes.'
        },
        {
          prop: 'setSelectedSymmetry',
          type: 'Function',
          description: 'Function to update selected symmetries.'
        }
      ]}
    />

    <DocumentationSection
      title="Parameters"
      description="component allows users to filter diamonds by their parameters."
      usage={`<Parameters
              selectedParameters={[]}
              setSelectedParameters={() => {}}
            />`}
      props={[
        {
          prop: 'selectedParameters',
          type: 'Array',
          description: 'The currently selected parameters.'
        },
        {
          prop: 'setSelectedParameters',
          type: 'Function',
          description: 'Function to update selected parameters.'
        }
      ]}
    />

    <DocumentationSection
      title="CompareStone"
      description="component allows users to compare multiple diamonds."
      usage={`<CompareStone
              stones={[]}
              onCompare={() => {}}
            />`}
      props={[
        {
          prop: 'stones',
          type: 'Array<IProduct>',
          description: 'List of stones to compare.'
        },
        {
          prop: 'onCompare',
          type: 'Function',
          description: 'Callback function when comparing stones.'
        }
      ]}
    />
  </div>
);

// Carat Component
const CaratTemplate: Story<any> = args => {
  const [caratMax, setCaratMax] = useState(args.caratMax);
  const [caratMin, setCaratMin] = useState(args.caratMin);
  const [selectedCaratRange, setSelectedCaratRange] = useState(
    args.selectedCaratRange
  );
  const [caratRangeSelectionTemp, setCaratRangeSelectionTemp] = useState(
    args.caratRangeSelectionTemp
  );
  const [caratRangeSelection, setCaratRangeSelection] = useState(
    args.caratRangeSelection
  );
  const [caratError, setCaratError] = useState(args.caratError);
  const [validationError, setValidationError] = useState(args.validationError);

  return (
    <Carat
      caratMax={caratMax}
      setCaratMax={setCaratMax}
      caratMin={caratMin}
      setCaratMin={setCaratMin}
      selectedCaratRange={selectedCaratRange}
      setSelectedCaratRange={setSelectedCaratRange}
      caratRangeSelectionTemp={caratRangeSelectionTemp}
      setCaratRangeSelectionTemp={setCaratRangeSelectionTemp}
      caratRangeSelection={caratRangeSelection}
      setCaratRangeSelection={setCaratRangeSelection}
      caratError={caratError}
      setCaratError={setCaratError}
      validationError={validationError}
      setValidationError={setValidationError}
    />
  );
};

export const CaratComponent = CaratTemplate.bind({});
CaratComponent.args = {
  caratMax: '',
  caratMin: '',
  selectedCaratRange: [],
  caratRangeSelectionTemp: [],
  caratRangeSelection: [],
  caratError: '',
  validationError: ''
};

// Clarity Component
const ClarityTemplate: Story<any> = args => {
  const [selectedClarity, setSelectedClarity] = useState(args.selectedClarity);

  return (
    <Clarity
      selectedClarity={selectedClarity}
      setSelectedClarity={setSelectedClarity}
    />
  );
};

export const ClarityComponent = ClarityTemplate.bind({});
ClarityComponent.args = {
  selectedClarity: []
};

// Color Component
const ColorTemplate: Story<any> = args => {
  const [selectedColor, setSelectedColor] = useState(args.selectedColor);
  const [selectedWhiteColor, setSelectedWhiteColor] = useState(
    args.selectedWhiteColor
  );
  const [selectedFancyColor, setSelectedFancyColor] = useState(
    args.selectedFancyColor
  );
  const [selectedIntensity, setSelectedIntensity] = useState(
    args.selectedIntensity
  );
  const [selectedOvertone, setSelectedOvertone] = useState(
    args.selectedOvertone
  );

  return (
    <Color
      selectedColor={selectedColor}
      selectedWhiteColor={selectedWhiteColor}
      selectedFancyColor={selectedFancyColor}
      selectedIntensity={selectedIntensity}
      selectedOvertone={selectedOvertone}
      setSelectedColor={setSelectedColor}
      setSelectedWhiteColor={setSelectedWhiteColor}
      setSelectedFancyColor={setSelectedFancyColor}
      setSelectedIntensity={setSelectedIntensity}
      setSelectedOvertone={setSelectedOvertone}
    />
  );
};

export const ColorComponent = ColorTemplate.bind({});
ColorComponent.args = {
  selectedColor: 'white',
  selectedFancyColor: [],
  selectedIntensity: [],
  selectedOvertone: [],
  selectedWhiteColor: []
};

// CountryOfOrigin Component
const CountryOfOriginTemplate: Story<any> = args => {
  const [selectedOrigin, setSelectedOrigin] = useState(args.selectedOrigin);

  return (
    <CountryOfOrigin
      selectedOrigin={selectedOrigin}
      setSelectedOrigin={setSelectedOrigin}
    />
  );
};

export const CountryOfOriginComponent = CountryOfOriginTemplate.bind({});
CountryOfOriginComponent.args = {
  selectedOrigin: []
};

// Culet Component
const CuletTemplate: Story<any> = args => {
  const [selectedCulet, setSelectedCulet] = useState(args.selectedCulet);

  return (
    <Culet selectedCulet={selectedCulet} setSelectedCulet={setSelectedCulet} />
  );
};

export const CuletComponent = CuletTemplate.bind({});
CuletComponent.args = {
  selectedCulet: []
};

// DiscountPrice Component
const DiscountPriceTemplate: Story<any> = args => {
  const [discountMin, setDiscountMin] = useState(args.discountMin);
  const [discountMax, setDiscountMax] = useState(args.discountMax);
  const [amountRangeMin, setAmountRangeMin] = useState(args.amountRangeMin);
  const [amountRangeMax, setAmountRangeMax] = useState(args.amountRangeMax);
  const [pricePerCaratMin, setPricePerCaratMin] = useState(
    args.pricePerCaratMin
  );
  const [pricePerCaratMax, setPricePerCaratMax] = useState(
    args.pricePerCaratMax
  );
  const [discountError, setDiscountError] = useState(args.discountError);
  const [pricePerCaratError, setPricePerCaratError] = useState(
    args.pricePerCaratError
  );
  const [amountRangeError, setAmountRangeError] = useState(
    args.amountRangeError
  );

  return (
    <DiscountPrice
      discountMin={discountMin}
      discountMax={discountMax}
      amountRangeMin={amountRangeMin}
      amountRangeMax={amountRangeMax}
      pricePerCaratMin={pricePerCaratMin}
      pricePerCaratMax={pricePerCaratMax}
      discountError={discountError}
      pricePerCaratError={pricePerCaratError}
      amountRangeError={amountRangeError}
      setDiscountMin={setDiscountMin}
      setDiscountMax={setDiscountMax}
      setAmountRangeMin={setAmountRangeMin}
      setAmountRangeMax={setAmountRangeMax}
      setPricePerCaratMin={setPricePerCaratMin}
      setPricePerCaratMax={setPricePerCaratMax}
      setDiscountError={setDiscountError}
      setPricePerCaratError={setPricePerCaratError}
      setAmountRangeError={setAmountRangeError}
      setIsSliderActive={() => ''}
    />
  );
};

export const DiscountPriceComponent = DiscountPriceTemplate.bind({});
DiscountPriceComponent.args = {
  discountMin: '',
  discountMax: '',
  amountRangeMin: '',
  amountRangeMax: '',
  pricePerCaratMin: '',
  pricePerCaratMax: '',
  discountError: '',
  pricePerCaratError: '',
  amountRangeError: '',
  isSliderActive: false
};

// Fluorescence Component
const FluorescenceTemplate: Story<any> = args => {
  const [selectedFluorescence, setSelectedFluorescence] = useState(
    args.selectedFluorescence
  );

  return (
    <Fluorescence
      selectedFluorescence={selectedFluorescence}
      setSelectedFluorescence={setSelectedFluorescence}
    />
  );
};

export const FluorescenceComponent = FluorescenceTemplate.bind({});
FluorescenceComponent.args = {
  selectedFluorescence: []
};

// Girdle Component
const GirdleTemplate: Story<any> = args => {
  const [selectedGirdle, setSelectedGirdle] = useState(args.selectedGirdle);

  return (
    <Girdle
      selectedGirdle={selectedGirdle}
      setSelectedGirdle={setSelectedGirdle}
    />
  );
};

export const GirdleComponent = GirdleTemplate.bind({});
GirdleComponent.args = {
  selectedGirdle: []
};

// Inclusions Component
const InclusionsTemplate: Story<any> = args => {
  const [selectedInclusions, setSelectedInclusions] = useState(
    args.selectedInclusions
  );

  return (
    <Inclusions
      selectedInclusions={selectedInclusions}
      setSelectedInclusions={setSelectedInclusions}
    />
  );
};

export const InclusionsComponent = InclusionsTemplate.bind({});
InclusionsComponent.args = {
  selectedInclusions: []
};

// KeyToSymbol Component
const KeyToSymbolTemplate: Story<any> = args => {
  const [selectedKeyToSymbol, setSelectedKeyToSymbol] = useState(
    args.selectedKeyToSymbol
  );

  return (
    <KeyToSymbol
      selectedKeyToSymbol={selectedKeyToSymbol}
      setSelectedKeyToSymbol={setSelectedKeyToSymbol}
      selectionChecked=""
      setSelectionChecked=""
    />
  );
};

export const KeyToSymbolComponent = KeyToSymbolTemplate.bind({});
KeyToSymbolComponent.args = {
  selectedKeyToSymbol: []
};

// Lab Component
const LabTemplate: Story<any> = args => {
  const [selectedLab, setSelectedLab] = useState(args.selectedLab);

  return <Lab selectedLab={selectedLab} setSelectedLab={setSelectedLab} />;
};

export const LabComponent = LabTemplate.bind({});
LabComponent.args = {
  selectedLab: []
};

// Location Component
const LocationTemplate: Story<any> = args => {
  const [selectedLocation, setSelectedLocation] = useState(
    args.selectedLocation
  );

  return (
    <Location
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
    />
  );
};

export const LocationComponent = LocationTemplate.bind({});
LocationComponent.args = {
  selectedLocation: []
};

// MakeCutPolishSymmetry Component
const MakeCutPolishSymmetryTemplate: Story<any> = args => {
  const [selectedMake, setSelectedMake] = useState(args.selectedMake);
  const [selectedCut, setSelectedCut] = useState(args.selectedCut);
  const [selectedPolish, setSelectedPolish] = useState(args.selectedPolish);
  const [selectedSymmetry, setSelectedSymmetry] = useState(
    args.selectedSymmetry
  );

  return (
    <MakeCutPolishSymmetry
      selectedMake={selectedMake}
      selectedCut={selectedCut}
      selectedPolish={selectedPolish}
      selectedSymmetry={selectedSymmetry}
      setSelectedMake={setSelectedMake}
      setSelectedCut={setSelectedCut}
      setSelectedPolish={setSelectedPolish}
      setSelectedSymmetry={setSelectedSymmetry}
    />
  );
};

export const MakeCutPolishSymmetryComponent =
  MakeCutPolishSymmetryTemplate.bind({});
MakeCutPolishSymmetryComponent.args = {
  selectedMake: [],
  selectedCut: [],
  selectedPolish: [],
  selectedSymmetry: []
};

// Parameters Component
const ParametersTemplate: Story<any> = args => {
  const [min, setMin] = useState(args.min);
  const [max, setMax] = useState(args.max);
  const [value, setValue] = useState(args.value);
  const [isRange, setIsRange] = useState(args.isRange);

  return (
    <Parameters
      min={min}
      max={max}
      value={value}
      isRange={isRange}
      setMin={setMin}
      setMax={setMax}
      setValue={setValue}
      setIsRange={setIsRange}
    />
  );
};

export const ParametersComponent = ParametersTemplate.bind({});
ParametersComponent.args = {
  min: '',
  max: '',
  value: '',
  isRange: false
};

const ComponentStory: Story<any> = () => {
  const [compareStoneData, setCompareStoneData] = useState<IProduct[]>([]);

  return (
    <CompareStone
      rows={compareStoneData}
      columns={[{ accessor: 'example', short_label: 'Example' }]} // Adjust as needed
      goBackToListView={() => ''}
      activeTab={1}
      isFrom="Example Source"
      handleDetailImage={() => ''}
      setCompareStoneData={setCompareStoneData}
      compareStoneData={compareStoneData}
      setIsError={() => ''}
      setErrorText={() => ''}
      setIsLoading={() => ''}
      setIsDialogOpen={() => ''}
      setDialogContent={() => ''}
      setIsConfirmStone={() => ''}
      setConfirmStoneData={() => ''}
      setIsDetailPage={() => ''}
      isMatchingPair={false}
    />
  );
};
export const CompareStoneComponent = ComponentStory.bind({});
