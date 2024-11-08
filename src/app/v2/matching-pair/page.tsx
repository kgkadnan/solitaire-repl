'use client';
import React, { useEffect, useState } from 'react';
import { MatchSubRoutes, Routes } from '@/constants/v2/enums/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import EmptyScreen from '@/components/v2/common/empty-screen';
import empty from '@public/v2/assets/icons/data-table/empty-cart.svg';
import Image from 'next/image';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';
import Cross from '@public/v2/assets/icons/cross.svg?url';
import Drag from '@public/v2/assets/icons/drag.svg';
import { useAddSavedSearchMutation } from '@/features/api/saved-searches';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { InputField } from '@/components/v2/common/input-field';
import bookmarkIcon from '@public/v2/assets/icons/modal/bookmark.svg';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { handleSaveSearch } from '../search/result/helpers/handle-save-search';
import Form, { ISavedSearch } from '../search/form/form';
import { handleReset } from '../search/form/helpers/reset';
import useFormStateManagement from '../search/form/hooks/form-state';
import useNumericFieldValidation from '../search/form/hooks/numeric-field-validation-management';
import useValidationStateManagement from '../search/hooks/validation-state-management';
import SavedSearch from '../search/saved-search/saved-search';
import MatchingPairResult from './result';
import {
  useApplyMatchingPairSettingMutation,
  useGetMatchingPairCountQuery,
  useLazyGetMatchingPairSettingQuery,
  useLazyGetResetMatchingPairSettingQuery
} from '@/features/api/match-pair';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { MPSDialogComponent } from './components/mps';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CommonPoppup from '../login/component/common-poppup';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
const defaultMatchPairSetting = [
  {
    up: 0,
    key: 'color',
    down: 0,
    display: 'Color',
    is_equal: true,
    priority: 1,
    start: 0,
    end: 10
  },
  {
    up: 1,
    key: 'clarity',
    down: 1,
    display: 'Clarity',
    is_equal: false,
    priority: 2,
    start: 0,
    end: 10
  },
  {
    up: 0.05,
    key: 'length',
    down: 0.05,
    display: 'Length',
    is_equal: false,
    priority: 3,
    start: 0,
    end: 100
  },
  {
    up: 0.05,
    key: 'width',
    down: 0.05,
    display: 'Width',
    is_equal: false,
    priority: 4,
    start: 0,
    end: 100
  },
  {
    up: 2,
    key: 'table_percentage',
    down: 2,
    display: 'Table%',
    is_equal: false,
    priority: 5,
    start: 0,
    end: 100
  },
  {
    up: 1.7,
    key: 'depth_percentage',
    down: 1.7,
    display: 'Depth%',
    is_equal: false,
    priority: 6,
    start: 0,
    end: 100
  },
  {
    up: 0,
    key: 'fluorescence',
    down: 0,
    display: 'Fluorescence',
    is_equal: true,
    priority: 7,
    start: 0,
    end: 10
  },
  {
    up: 0.05,
    key: 'carats',
    down: 0.05,
    display: 'Carats',
    is_equal: false,
    priority: 8,
    range_to: 50,
    range_from: 5,
    start: 0,
    end: 100
  }
];

const MatchingPair = () => {
  const subRoute = useSearchParams().get('active-tab');
  const editRoute = useSearchParams().get('edit');
  // const currentPath = usePathname();
  const [activeTab, setActiveTab] = useState(0);
  const [isAddDemand, setIsAddDemand] = useState(false);
  const [globalFilterActive, setGlobalFilterActive] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [searchParameters, setSearchParameters] = useState<ISavedSearch[] | []>(
    []
  );
  const [resetMPS] = useLazyGetResetMatchingPairSettingQuery({});
  const [applyMPS] = useApplyMatchingPairSettingMutation({});
  const { setSearchUrl, searchUrl, addSearches, setAddSearches } =
    useValidationStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent, isInputDialogOpen } = modalState;

  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;
  const { state, setState, carat } = useFormStateManagement();
  const { errorState, errorSetState } = useNumericFieldValidation();
  const { errorState: inputErrorState, errorSetState: inputErrorSetState } =
    useErrorStateManagement();

  const { inputError } = inputErrorState;
  const { setInputError } = inputErrorSetState;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [searchLoading, setSearchLoading] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [addSavedSearch] = useAddSavedSearchMutation();
  const [getMatchingPairSetting] = useLazyGetMatchingPairSettingQuery();
  const { data } = useGetMatchingPairCountQuery(
    {
      searchUrl
    },
    {
      skip: !searchUrl
    }
  );

  const [mps, setMps] = useState([
    {
      up: 0,
      key: 'color',
      down: 0,
      display: 'Color',
      is_equal: true,
      priority: 1,
      start: 0,
      end: 10,
      placeHolder: '0'
    },
    {
      up: 0,
      key: 'clarity',
      down: 0,
      display: 'Clarity',
      is_equal: false,
      priority: 2,
      start: 0,
      end: 10,
      placeHolder: '0'
    },
    {
      up: 0.0,
      key: 'length',
      down: 0.0,
      display: 'Length',
      is_equal: false,
      priority: 3,
      start: 0,
      end: 100,
      placeHolder: '0.00'
    },
    {
      up: 0.0,
      key: 'width',
      down: 0.0,
      display: 'Width',
      is_equal: false,
      priority: 4,
      start: 0,
      end: 100,
      placeHolder: '0.00'
    },
    {
      up: 1.0,
      key: 'table_percentage',
      down: 0.0,
      display: 'Table %',
      is_equal: false,
      priority: 5,
      start: 0,
      end: 100,
      placeHolder: '0.00'
    },
    {
      up: 1.0,
      key: 'depth_percentage',
      down: 0.0,
      display: 'Depth %',
      is_equal: false,
      priority: 6,
      start: 0,
      end: 100,
      placeHolder: '0.00'
    },
    {
      up: 0,
      key: 'fluorescence',
      down: 0,
      display: 'Fluorescence',
      is_equal: true,
      priority: 7,
      start: 0,
      end: 10,
      placeHolder: '0'
    },

    {
      up: 0.0,
      key: 'carats',
      down: 0.0,
      display: 'Carat',
      is_equal: false,
      priority: 8,
      range_to: 50,
      range_from: 5,
      start: 0,
      end: 100,
      placeHolder: '0.00'
    }
  ]);
  const [isMPSOpen, setIsMPSOpen] = useState(false);
  const [initialMps, setInitialMps] = useState(mps); // Store the initial MPS state
  const [isModified, setIsModified] = useState(false); // Track whether there are any changes
  const [initialMpsState, setInitialMpsState] = useState(mps); // Store the initial MPS state
  const [settingApplied, setSettingApplied] = useState(false);

  useEffect(() => {
    let selection = JSON.parse(localStorage.getItem('MatchingPair')!) || [];
    const filteredSelection = selection.filter(
      (obj: any) => Object.keys(obj).length !== 0
    );
    if (
      subRoute !== MatchSubRoutes.NEW_SEARCH &&
      subRoute !== MatchSubRoutes.SAVED_SEARCH
    ) {
      const replaceSubrouteWithSearchResult = subRoute?.replace(
        `${MatchSubRoutes.RESULT}-`,
        ''
      );
      if (
        parseInt(replaceSubrouteWithSearchResult!) &&
        parseInt(replaceSubrouteWithSearchResult!) <= filteredSelection.length
      ) {
        setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
      } else setActiveTab(-1);
    } else {
      setActiveTab(0);
    }
  }, [subRoute]);

  useEffect(() => {
    getMatchingPairSetting({})
      .unwrap()
      .then(res => {
        let tempMps = mps;
        tempMps.forEach(itemA => {
          res.forEach((itemB: any) => {
            if (itemA.key === itemB.key) {
              // Update values in 'a' if they differ from 'b'
              let itemACast = itemA as Record<string, any>;
              let itemBCast = itemB as Record<string, any>;

              // Update values in 'a' if they differ from 'b'
              for (let key in itemBCast) {
                if (itemACast[key] !== itemBCast[key]) {
                  itemACast[key] = itemBCast[key];
                }
              }
            }
          });
        });
        tempMps.sort((a, b) => a.priority - b.priority);

        setMps([...tempMps]);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const yourSelection = localStorage.getItem('MatchingPair');

      if (yourSelection) {
        let parseYourSelection = JSON.parse(yourSelection);

        // Filter out empty objects
        const filteredSelection = parseYourSelection.filter(
          (obj: any) => Object.keys(obj).length !== 0
        );

        // Update local storage only if empty objects were found and removed
        if (filteredSelection.length !== parseYourSelection.length) {
          localStorage.setItem(
            'MatchingPair',
            JSON.stringify(filteredSelection)
          );
        }

        // Check if there are valid entries after filtering
        if (filteredSelection.length > 0) {
          // Always fetch data, even on initial load
          const url = constructUrlParams(
            filteredSelection[activeTab]?.queryParams
          );

          if (activeTab) {
            setSearchUrl(url);
          }

          setSearchParameters(filteredSelection);
        }
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('MatchingPair')!]);

  const handleCloseAllTabs = () => {
    localStorage.removeItem('MatchingPair');
    setIsDialogOpen(false),
      router.push(
        `${Routes.MATCHING_PAIR}?active-tab=${MatchSubRoutes.NEW_SEARCH}`
      ),
      setSearchParameters([]);
    setAddSearches([]);
  };

  const closeSearch = (
    removeDataIndex: number,
    yourSelection: ISavedSearch[]
  ) => {
    let closeSpecificSearch = yourSelection.filter(
      (_items: ISavedSearch, index: number) => {
        return index !== removeDataIndex - 1;
      }
    );

    if (removeDataIndex === 1) {
      setSearchParameters([]);
      setAddSearches([]);
      handleReset(setState, errorSetState);
      router.push(
        `${Routes.MATCHING_PAIR}?active-tab=${MatchSubRoutes.NEW_SEARCH}`
      );
    } else {
      setSearchParameters(closeSpecificSearch);
      setAddSearches(closeSpecificSearch);
      setActiveTab(removeDataIndex);
      router.push(
        `${Routes.MATCHING_PAIR}?active-tab=${MatchSubRoutes.RESULT}-${
          removeDataIndex - 1
        }`
      );
    }

    localStorage.setItem('MatchingPair', JSON.stringify(closeSpecificSearch));
  };

  const handleCloseSpecificTab = (id: number) => {
    let yourSelection = JSON.parse(localStorage.getItem('MatchingPair')!);

    closeSearch(id, yourSelection);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setSaveSearchName(inputValue);
    } else {
      setSaveSearchName(inputValue.slice(0, 20));
      setInputError('Input cannot exceed 20 characters');
    }
  };

  const handleResetMPS = () => {
    resetMPS({})
      .unwrap()
      .then(res => {
        const resMap = new Map(res.map((itemB: any) => [itemB.key, itemB]));

        const updatedMps = mps.map((itemA: any) => {
          const itemB: any = resMap.get(itemA.key);

          if (itemB) {
            const updatedItem = { ...itemA };
            Object.keys(itemB).forEach(key => {
              if (itemA[key] !== itemB[key]) {
                updatedItem[key] = itemB[key];
              }
            });
            return updatedItem;
          }

          return itemA;
        });

        updatedMps.sort((a: any, b: any) => a.priority - b.priority);

        // Update state with the new array and reset isModified
        setMps(updatedMps);
        setInitialMps(updatedMps); // Update the initial state to the new reset state
        setIsModified(false); // Disable the buttons
        setIsMPSOpen(false);
        setSettingApplied(!settingApplied);
        setGlobalFilterActive(false);
        setGlobalFilter('');
      });
  };

  // Function to compare the current MPS state with the initial state
  const checkForChanges = (currentMps: any[]) => {
    return JSON.stringify(currentMps) !== JSON.stringify(initialMps);
  };
  // Function to compare the current MPS state with the initial state
  const isDefaultSetting = () => {
    return JSON.stringify(mps) !== JSON.stringify(defaultMatchPairSetting);
  };

  const handleApplyMPS = () => {
    const filteredMps = mps.map(
      ({ start, end, placeHolder, up, down, ...rest }) => ({
        ...rest,
        // @ts-ignore
        up: parseInt(up, 10),
        // @ts-ignore
        down: parseInt(down, 10)
      })
    );
    applyMPS({ setting: filteredMps }).unwrap();
    setIsMPSOpen(false);
    setInitialMps(mps); // Set the current MPS as the new initial state after applying changes
    setIsModified(false); // Disable the buttons
    setSettingApplied(!settingApplied);
    setGlobalFilterActive(false);
    setGlobalFilter('');
  };

  const handleMPSInputChange = (
    index: number,
    newValue: string,
    field: string
  ) => {
    // Allow input to be freely typed, even with leading zeros
    const updatedMps = [...mps];
    updatedMps[index] = { ...updatedMps[index], [field]: newValue }; // Keep as string while typing
    setMps(updatedMps);
    setIsModified(checkForChanges(updatedMps));
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(mps);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index + 1, 0, reorderedItem);

    // Update priority based on new position
    const updatedItems = newItems.map((item: any, index) => ({
      ...item,
      priority: index + 1 // Priority is set to index+1 to reflect the new order
    }));

    setMps(updatedItems);
    setIsModified(true);
  };

  const handleInputBlur = (index: number, field: string) => {
    const endValue = mps[index].end;
    // @ts-ignore
    let value = parseFloat(mps[index][field]) || 0; // Convert to number on blur

    // Validate the value
    if (value < 0) value = 0;
    if (value > endValue) value = endValue;

    // If endValue is 10, ensure the input is an integer
    if (endValue === 10) {
      value = Math.round(value); // Round to nearest integer
    } else {
      // If endValue is not 10, allow up to 2 decimal places
      value = parseFloat(value.toFixed(2)); // Limit to 2 decimal places
    }

    const updatedMps = [...mps];
    updatedMps[index] = { ...updatedMps[index], [field]: value.toString() }; // Set final validated value as string
    setMps(updatedMps);
  };
  const handleIsEqualChange = (index: number) => {
    const updatedMps = [...mps];

    updatedMps[index] = {
      ...updatedMps[index],
      is_equal: !updatedMps[index].is_equal,
      // @ts-ignore
      up: updatedMps[index].end === 100 ? '0.00' : '0',
      // @ts-ignore
      down: updatedMps[index].end === 100 ? '0.00' : '0'
    };

    setMps(updatedMps);
    setIsModified(checkForChanges(updatedMps)); // Check if the state has been modified
  };

  const renderContentMPS = () => {
    return (
      <div>
        <div className="flex justify-between w-full p-4 items-center">
          <p className="text-headingS font-medium text-neutral900">
            Match Pair Settings
          </p>
          <div
            className="cursor-pointer"
            onClick={() => {
              if (isModified) {
                modalSetState.setIsDialogOpen(true);
                modalSetState.setDialogContent(
                  <CommonPoppup
                    content={
                      'You have unsaved changes. Are you sure you want to exit?'
                    }
                    status="warning"
                    customPoppupBodyStyle="!mt-[70px]"
                    header="Exit Without Saving?"
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: 'No, Stay',
                        handler: () => {
                          modalSetState.setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1'
                      },
                      {
                        variant: 'primary',
                        label: 'Yes, Exit',
                        handler: () => {
                          modalSetState.setIsDialogOpen(false);
                          setIsMPSOpen(false);
                          setMps(initialMpsState);
                          setIsModified(false);
                          setInitialMps(initialMpsState);
                        },
                        customStyle: 'flex-1'
                      }
                    ]}
                  />
                );
              } else {
                setIsMPSOpen(false);
              }
            }}
          >
            <Cross style={{ stroke: 'var(--neutral-900)' }} />
          </div>
        </div>

        {/* Header for the table */}
        <div className="w-full flex justify-between items-center bg-[#F9FAFB] h-[50px] border-t-[1px] border-b-[1px] border-neutral200">
          <p className="w-[60px] px-3">Rank</p>
          <p className="w-[150px]">Name</p>
          <div className="w-[80px] flex justify-center">Equal</div>
          <p className="w-[67px] flex justify-start">Up</p>
          <p className="w-[80px] flex justify-start mr-[12px]">Down</p>
          <div className="w-[87px]">Action</div>
        </div>

        {/* Main draggable container */}
        <div className=" relative overflow-auto h-[392px]">
          {' '}
          {/* Add scroll and limit height */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {mps.map((item: any, index: number) => (
                    <div
                      className={`flex gap-[23px] bg-neutral0 text-[14px] rounded-lg border-b-[1px] `}
                    >
                      <p className="w-[60px] flex items-center bg-[#F9FAFB] justify-center">
                        {item.priority}
                      </p>

                      <Draggable
                        key={item.key}
                        draggableId={item.key.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex gap-[23px]  text-[14px]  ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <div className="flex gap-[12px] bg-neutral0">
                              <p className="w-[150px] flex items-center">
                                {item.display}
                              </p>

                              <div className="w-[99px] flex items-center justify-center">
                                <CheckboxComponent
                                  onClick={() => handleIsEqualChange(index)}
                                  isChecked={item.is_equal}
                                />
                              </div>

                              <div className="w-[80px] py-1">
                                <InputField
                                  onChange={e =>
                                    handleMPSInputChange(
                                      index,
                                      e.target.value,
                                      'up'
                                    )
                                  }
                                  onBlur={() => handleInputBlur(index, 'up')}
                                  type="number"
                                  value={item.up}
                                  placeholder={item.placeHolder}
                                  styles={{ inputMain: 'h-[40px]' }}
                                  disabled={item.is_equal}
                                />
                              </div>

                              <div className="w-[80px] py-1">
                                <InputField
                                  onChange={e =>
                                    handleMPSInputChange(
                                      index,
                                      e.target.value,
                                      'down'
                                    )
                                  }
                                  onBlur={() => handleInputBlur(index, 'down')}
                                  type="number"
                                  value={item.down}
                                  placeholder={item.placeHolder}
                                  styles={{ inputMain: 'h-[40px]' }}
                                  disabled={item.is_equal}
                                />
                              </div>

                              <div
                                className="w-[80px] flex justify-center"
                                {...provided.dragHandleProps}
                              >
                                <Image src={Drag} alt="MPS drag" />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Buttons at the bottom */}
        <div className="flex p-4 h-[56px] items-center gap-4">
          <IndividualActionButton
            onClick={handleResetMPS}
            variant="secondary"
            size="custom"
            className="rounded-[4px] w-[100%] h-[40px]"
            disabled={!isDefaultSetting()}
          >
            Reset
          </IndividualActionButton>
          <IndividualActionButton
            onClick={handleApplyMPS}
            variant="primary"
            size="custom"
            className="rounded-[4px] w-[100%] h-[40px]"
            disabled={!isModified}
          >
            Apply
          </IndividualActionButton>
        </div>
      </div>
    );
  };
  // This useEffect sets the initialMps state once MPS data is loaded
  useEffect(() => {
    setInitialMps(mps);
  }, [mps]);

  const renderContentWithInput = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={bookmarkIcon} alt="bookmarkIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px] ">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.advanceSearch.savedSearch.input.header')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.advanceSearch.savedSearch.input.content')}
            </p>
          </div>
          <div>
            <InputField
              type="text"
              value={saveSearchName}
              name={'savedSearch'}
              placeholder={'Search Name'}
              onChange={handleInputChange}
              styles={{
                inputMain: 'w-full',
                input: `h-[40px] p-2 flex-grow block w-[100%] !text-primaryMain min-w-0 rounded-r-sm text-mRegular shadow-[var(--input-shadow)] border-[1px] border-neutral200 rounded-r-[4px]
                ${inputError ? 'border-dangerMain' : 'border-neutral200'}`
              }}
            />

            <div className=" text-dangerMain text-sRegular font-regular flex text-left h-[5px]">
              {inputError ?? ''}
            </div>
          </div>

          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.cancel'),
                handler: () => {
                  setSaveSearchName('');
                  setInputError('');
                  setIsInputDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.save'),
                isDisable: !saveSearchName.length,
                handler: () => {
                  if (!saveSearchName.length) {
                    setInputError('Please enter name');
                  } else {
                    if (!inputError?.length) {
                      handleSaveSearch({
                        addSavedSearch,
                        saveSearchName,
                        activeTab,
                        data,
                        setIsInputDialogOpen,
                        setStoredSelection: setSearchParameters,
                        setSaveSearchName,
                        setInputError,
                        isMatchingPair: true
                      });
                    }
                  }
                },
                customStyle: 'flex-1 h-10'
              }
            ]}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <MPSDialogComponent
        isOpen={isMPSOpen}
        onClose={() => setIsMPSOpen(false)}
        renderContent={renderContentMPS}
      />
      {isLoading && <CustomKGKLoader />}
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        dialogStyle={{ dialogContent: isAddDemand ? 'min-h-[280px]' : '' }}
      />
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />

      {subRoute === MatchSubRoutes.NEW_SEARCH ||
      // currentPath === Routes.MATCHING_PAIR ||
      editRoute === MatchSubRoutes.SAVED_SEARCH ||
      editRoute === MatchSubRoutes.RESULT ? (
        <Form
          searchUrl={searchUrl}
          setSearchUrl={setSearchUrl}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchParameters={searchParameters}
          handleCloseAllTabs={handleCloseAllTabs}
          handleCloseSpecificTab={handleCloseSpecificTab}
          state={state}
          setState={setState}
          carat={carat}
          errorState={errorState}
          errorSetState={errorSetState}
          setIsDialogOpen={setIsDialogOpen}
          setDialogContent={setDialogContent}
          addSearches={addSearches}
          setAddSearches={setAddSearches}
          setIsLoading={setSearchLoading}
          setIsAddDemand={setIsAddDemand}
          isMatchingPair={true}
          setIsCommonLoading={setIsLoading}
          isLoading={searchLoading}
          setIsMPSOpen={setIsMPSOpen}
        />
      ) : subRoute === MatchSubRoutes.SAVED_SEARCH ? (
        <SavedSearch setIsLoading={setIsLoading} />
      ) : activeTab === -1 ? (
        <div className="h-screen">
          {' '}
          <EmptyScreen
            label="Page not found"
            contentReactNode={
              <p className="text-neutral900  w-[17%] text-center">
                Page you are looking for doesnot exists
              </p>
            }
            onClickHandler={() => {}}
            imageSrc={empty}
          />
        </div>
      ) : (
        <MatchingPairResult
          activeTab={activeTab}
          searchParameters={searchParameters}
          setSearchParameters={setSearchParameters}
          setActiveTab={setActiveTab}
          handleCloseAllTabs={handleCloseAllTabs}
          handleCloseSpecificTab={handleCloseSpecificTab}
          setIsLoading={setIsLoading}
          setIsInputDialogOpen={setIsInputDialogOpen}
          isLoading={isLoading}
          mps={mps}
          setMps={setMps}
          setSettingApplied={setSettingApplied}
          settingApplied={settingApplied}
          setIsMPSOpen={setIsMPSOpen}
          setGlobalFilterActive={setGlobalFilterActive}
          globalFilterActive={globalFilterActive}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
      )}
    </div>
  );
};

export default MatchingPair;
