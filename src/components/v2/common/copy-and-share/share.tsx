import React, { useEffect, useState } from 'react';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ShareDialog } from './share-dialog';
import { IndividualActionButton } from '../action-button/individual-button';
import CheckboxComponent from '../checkbox';
import ShareButtonSvg from '@public/v2/assets/icons/data-table/share-button.svg?url';
import Image from 'next/image';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import notepadIcon from '@public/v2/assets/icons/detail-page/notepad.svg';
import whatsappIcon from '@public/v2/assets/icons/detail-page/whatsapp.svg';
import emailIcon from '@public/v2/assets/icons/detail-page/email.svg';
import { SELECT_STONE_TO_PERFORM_ACTION } from '@/constants/error-messages/search';
import { Toast } from './toast';
import { IProduct } from '@/app/v2/search/interface';
import Tooltip from '../tooltip';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { useLazyShareEventQuery } from '@/features/api/track-interaction';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';

import { Tracking_Search_By_Text } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';
import { Dropdown } from '../dropdown-menu';
import { dashboardIndentifier } from '@/app/v2/page';

const Share = ({
  rows,
  selectedProducts,
  setErrorText,
  setIsError,
  identifier,
  activeTab = 0,
  shareTrackIdentifier,
  dynamicTrackIdentifier,
  customerMobileNumber,
  isDisable,
  isDnaPage,
  filteredImages,
  imageIndex
}: any) => {
  const [selectedRows, setSelectedRows] = useState<IProduct[]>(
    rows?.filter((row: IProduct) => row.id in selectedProducts)
  );
  useEffect(() => {
    setSelectedRows(
      rows?.filter((row: IProduct) => row.id in selectedProducts)
    );
  }, [selectedProducts]);
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;
  const [showToast, setShowToast] = useState(false);

  const [trackShareEvent] = useLazyShareEventQuery({});

  const [shareOptions, setShareOptions] = useState([
    { name: 'Stock No', state: 'lot_id' },
    { name: 'Shape', state: 'shape' },
    { name: 'Carats', state: 'carats' },
    { name: 'Color', state: 'color' },
    { name: 'Clarity', state: 'clarity' },
    { name: 'Cut', state: 'cut' },
    { name: 'Polish', state: 'polish' },
    { name: 'Symmetry', state: 'symmetry' },
    { name: 'Fluorescence', state: 'fluorescence' },
    { name: 'Measurements', state: 'measurements' },
    { name: 'Table %', state: 'table_percentage' },
    { name: 'Depth %', state: 'depth_percentage' },
    {
      name: 'Certificate Number',
      state: 'certificate_number'
    },
    { name: 'Rap Val ($)', state: 'rap_value' },
    { name: 'Rap ($)', state: 'rap' },
    {
      name: 'Disc %',
      state: identifier === 'Bid to Buy' ? 'original_discount' : 'discount'
    },
    { name: 'Pr/Ct', state: 'price_per_carat' },
    { name: 'Amt ($)', state: 'amount' },

    { name: 'Public URL', state: 'public_url' }
  ]);

  useEffect(() => {
    if (
      identifier?.length > 0 &&
      (identifier === 'Bid to Buy' || identifier === 'New Arrival')
    ) {
      // Define the field to add based on activeTab
      let fieldToAdd: any;
      let fieldToRemove: any;
      if (identifier === 'Bid to Buy') {
        if (activeTab === 2) {
          fieldToAdd = { name: 'Date', state: 'last_bid_date' };
          fieldToRemove = { state: 'my_current_bid' };
        } else {
          fieldToAdd = {
            name: 'Max Disc %',
            state: activeTab === 0 ? 'discount' : 'my_current_bid'
          };
          fieldToRemove = { state: 'last_bid_date' };
        }
      } else if (identifier === 'New Arrival') {
        if (activeTab === 2) {
          fieldToAdd = { name: 'Date', state: 'last_bid_date' };
          fieldToRemove = { state: 'current_max_bid' };
        } else {
          fieldToAdd = { name: 'Current Max Bid', state: 'current_max_bid' };
          fieldToRemove = { state: 'last_bid_date' };
        }
      }

      // Check if the field to remove exists in shareOptions
      const isFieldToRemoveExist = shareOptions.some(
        option => option?.state === fieldToRemove?.state
      );

      // Remove the field to remove if it exists
      if (isFieldToRemoveExist) {
        setShareOptions(prev =>
          prev.filter(option => option.state !== fieldToRemove.state)
        );

        // Update selected attributes
        setSelectedAttributes((prev: any) => {
          const updatedAttributes = { ...prev };
          delete updatedAttributes[fieldToRemove.state];
          return updatedAttributes;
        });
      }

      // Check if the field to add is already added to shareOptions
      const isFieldToAddAlreadyAdded = shareOptions.some(
        option => option?.state === fieldToAdd?.state
      );

      if (!isFieldToAddAlreadyAdded) {
        // Add the field to shareOptions
        setShareOptions(prev => [...prev, fieldToAdd]);

        // Update selected attributes
        setSelectedAttributes((prev: any) => ({
          ...prev,
          [fieldToAdd.state]: true
        }));
      }
    }
  }, [identifier, activeTab, shareOptions]);

  const { setIsInputDialogOpen } = modalSetState;

  const [selectedAttributes, setSelectedAttributes] = useState(
    shareOptions.reduce((acc: any, option) => {
      acc[option?.state] = true; // Initialize all options as selected
      return acc;
    }, {})
  );
  const handleAttributeToggle = (attribute: any) => {
    setSelectedAttributes((prev: any) => ({
      ...prev,
      [attribute]: !prev[attribute]
    }));
  };

  const copyToClipboard = async () => {
    const selectedData = selectedRows
      .map((product: any) => {
        return Object.entries(selectedAttributes)
          .filter(([_attribute, isSelected]) => isSelected)
          .map(([attribute]) => {
            // Handle measurements separately if it's selected
            if (
              attribute === 'measurements' &&
              selectedAttributes['measurements']
            ) {
              const length = product.length || 0;
              const width = product.width || 0;
              const depth = product.depth || 0;
              return `Measurements: ${length} x ${width} x ${depth}`;
            }
            // Handle amount separately if it's selected
            if (attribute === 'amount' && selectedAttributes['amount']) {
              const amount =
                product?.variants && product?.variants[0]?.prices[0]?.amount
                  ? product?.variants[0]?.prices[0]?.amount
                  : product?.price || product?.amount;
              return `Amt ($): ${
                amount === undefined || amount === null
                  ? '-'
                  : `$${formatNumberWithCommas(amount)}`
              }`;
            }
            if (attribute === 'rap_value' && selectedAttributes['rap_value']) {
              const rapValue = product.rap_value;
              return `Rap Val ($):  ${
                rapValue === undefined || rapValue === null
                  ? '-'
                  : `$${formatNumberWithCommas(rapValue)}`
              }`;
            }
            if (
              attribute === 'table_percentage' &&
              selectedAttributes['table_percentage']
            ) {
              const rapValue = product.table_percentage;
              return `Table %:  ${
                rapValue === undefined || rapValue === null
                  ? '-'
                  : `${formatNumberWithCommas(rapValue)}%`
              }`;
            }
            if (
              attribute === 'depth_percentage' &&
              selectedAttributes['depth_percentage']
            ) {
              const rapValue = product.depth_percentage;
              return `Depth %:  ${
                rapValue === undefined || rapValue === null
                  ? '-'
                  : `${formatNumberWithCommas(rapValue)}%`
              }`;
            }
            if (identifier === 'Bid to Buy') {
              if (
                attribute === 'original_discount' &&
                selectedAttributes['original_discount']
              ) {
                const rapValue = product.original_discount;
                return `Disc %:  ${
                  rapValue === undefined || rapValue === null
                    ? '-'
                    : `${formatNumberWithCommas(rapValue)}%`
                }`;
              }
            } else {
              if (attribute === 'discount' && selectedAttributes['discount']) {
                const rapValue = product.discount;
                return `Disc %:  ${
                  rapValue === undefined || rapValue === null
                    ? '-'
                    : `${formatNumberWithCommas(rapValue)}%`
                }`;
              }
            }
            if (attribute === 'rap' && selectedAttributes['rap']) {
              const rap = product.rap;
              return `Rap ($): ${
                rap === undefined || rap === null
                  ? '-'
                  : `$${formatNumberWithCommas(rap)}`
              } `;
            }
            if (
              attribute === 'price_per_carat' &&
              selectedAttributes['price_per_carat']
            ) {
              const pricePerCarat = product.price_per_carat;
              return `Pr/Ct: ${
                pricePerCarat === undefined || pricePerCarat === null
                  ? '-'
                  : `$${formatNumberWithCommas(pricePerCarat)}`
              }`;
            }
            if (
              attribute === 'current_max_bid' &&
              selectedAttributes['current_max_bid']
            ) {
              return `Current Max Bid %: ${formatNumber(
                product?.current_max_bid
              )}%`;
            }
            if (
              attribute === 'table_percentage' &&
              selectedAttributes['table_percentage']
            ) {
              return `Table %: ${formatNumber(product?.table_percentage)}`;
            }
            if (
              attribute === 'depth_percentage' &&
              selectedAttributes['depth_percentage']
            ) {
              return `Depth %: ${formatNumber(product?.depth_percentage)}`;
            }
            if (attribute === 'carats' && selectedAttributes['carats']) {
              return `Carats: ${formatNumber(product?.carats)}`;
            }
            if (
              attribute === 'my_current_bid' &&
              selectedAttributes['my_current_bid']
            ) {
              return `Max Disc %: ${formatNumber(product?.my_current_bid)}`;
            }

            if (attribute === 'discount' && selectedAttributes['discount']) {
              return `Max Disc %: ${formatNumber(product?.discount)}%`;
            }
            if (
              attribute === 'last_bid_date' &&
              selectedAttributes['last_bid_date']
            ) {
              const date = new Date(product?.last_bid_date);

              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const year = date.getFullYear().toString().slice(2);

              const formattedDate = `${day}/${month}/${year}`;
              return `Date: ${formattedDate}`;
            }
            if (
              attribute === 'public_url' &&
              selectedAttributes['public_url']
            ) {
              return `Public URL: ${
                process.env.NEXT_PUBLIC_DNA_URL
              }${product?.public_url
                .split('/')
                .pop()}?location=${product?.location}`;
            }
            // For other attributes, continue as before
            const option = shareOptions.find(opt => opt.state === attribute);
            return option ? `${option.name}: ${product[attribute] ?? '-'}` : '';
          })
          .filter(line => line) // Remove any undefined entries
          .join('\n');
      })
      .join('\n\n'); // Separate each product block with two newlines

    try {
      await navigator.clipboard.writeText(selectedData);
      ///Track event
      trackShareEvent({
        page: shareTrackIdentifier,
        lot_ids: selectedRows.map(data => data['lot_id']),
        stone_fields: Object.keys(selectedAttributes).filter(
          key => selectedAttributes[key] === true
        )
      });
      setShowToast(true); // Show the toast notification
      setTimeout(() => {
        setShowToast(false); // Hide the toast notification after some time
      }, 4000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const renderContentWithInput = () => {
    return (
      <div className="flex flex-col gap-[24px] ">
        <div className="flex justify-between">
          <p className="text-headingS font-medium text-neutral900">
            Share Diamond Details
          </p>
          <div
            onClick={() => setIsInputDialogOpen(false)}
            className="cursor-pointer"
          >
            {' '}
            <Image src={crossIcon} alt="crossIcon" />
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-lMedium font-medium text-neutral900">
            Select columns to share
          </p>
          <div
            className="text-infoMain text-mRegular cursor-pointer"
            onClick={() => {
              const allSelected = !Object.values(selectedAttributes).every(
                val => val
              );
              const newSelectedAttributes = Object.keys(
                selectedAttributes
              ).reduce((acc, key) => ({ ...acc, [key]: allSelected }), {});
              setSelectedAttributes(newSelectedAttributes);
            }}
          >
            {Object.values(selectedAttributes).every(val => val)
              ? 'Clear'
              : 'Select All'}
          </div>
        </div>
        <div className="flex gap-[14px] flex-wrap items-center">
          {shareOptions.map(item => (
            <div
              key={item.state}
              className={`w-[187px] border-[1px] text-mMedium font-medium flex items-center rounded-[4px]   ${
                item.name === 'Public URL'
                  ? 'text-infoMain border-primaryMain'
                  : 'text-neutral900 border-neutral200'
              }`}
              onClick={() => handleAttributeToggle(item.state)}
            >
              <div className="p-[6px] h-[35px]">
                <CheckboxComponent isChecked={selectedAttributes[item.state]} />
              </div>
              <p className="py-1 pl-1">{item.name}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-[16px]">
          <IndividualActionButton
            onClick={() => setIsInputDialogOpen(false)}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[450px] h-10"
          >
            Cancel
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              copyToClipboard();
              setIsInputDialogOpen(false);
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[450px] h-10"
          >
            Copy
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  return (
    <>
      <ShareDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <Toast show={showToast} message="Copied Successfully" />
      {isDnaPage ? (
        <Dropdown
          dropdownTrigger={
            <div className="w-[39px] h-[39px]">
              <Tooltip
                tooltipTrigger={
                  <button
                    className={`disabled:!bg-neutral100 disabled:cursor-not-allowed disabled:text-neutral400 rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                  >
                    <ShareButtonSvg className={`${'stroke-neutral900'}`} />
                  </button>
                }
                tooltipContent={'Share'}
                tooltipContentStyles={'z-[1000]'}
              />
              {/* <Image src={shareButtonSvg} alt={'share'} width={38} height={38} /> */}
            </div>
          }
          dropdownMenu={[
            {
              label: 'Share Diamond Details',
              handler: () => {
                if (Object.keys(selectedProducts).length > 0) {
                  setIsError(false);
                  setErrorText('');
                  setIsInputDialogOpen(true);
                  if (
                    dynamicTrackIdentifier === dashboardIndentifier ||
                    dynamicTrackIdentifier === 'dashboardSearchResult'
                  ) {
                    trackEvent({
                      action:
                        dynamicTrackIdentifier === 'dashboardSearchResult'
                          ? Tracking_Search_By_Text.click_share_result_page
                          : Tracking_Search_By_Text.click_share_dna_page,
                      category: 'SearchByText',
                      mobile_number: customerMobileNumber
                    });
                  }
                } else {
                  setIsError(true);
                  setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
                }
                // handleCreateAppointment();
              },
              icon: notepadIcon,
              isDisable: false
            },
            {
              label: `Email ${
                shareTrackIdentifier === 'Details'
                  ? filteredImages[imageIndex]?.name ?? ''
                  : filteredImages[0][imageIndex].name ?? ''
              } Link`,
              handler: () => {
                if (Object.keys(selectedProducts).length > 0) {
                  if (shareTrackIdentifier === 'Details') {
                    // Email subject and body
                    const emailSubject = 'Check out this link!';
                    const emailBody = `Here is a link I wanted to share with you: ${filteredImages[imageIndex].downloadUrl}`;

                    // Create mailto URL
                    const mailtoURL = `mailto:?subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${encodeURIComponent(emailBody)}`;

                    // Open the user's default email client
                    window.location.href = mailtoURL;
                  } else {
                    // Filter images based on selected product IDs and url_check
                    const selectedImageLinks = filteredImages
                      .filter(
                        (images: any) =>
                          Object.keys(selectedProducts).includes(
                            images[imageIndex].id
                          ) && images[imageIndex].url_check !== false
                      )
                      .map((images: any) => images[imageIndex].downloadUrl);
                    if (selectedImageLinks.length > 0) {
                      // Email subject and body
                      const emailSubject = 'Check out these links!';
                      const emailBody = `Here are the links I wanted to share with you:\n\n${selectedImageLinks.join(
                        '\n'
                      )}`;

                      // Create mailto URL
                      const mailtoURL = `mailto:?subject=${encodeURIComponent(
                        emailSubject
                      )}&body=${encodeURIComponent(emailBody)}`;

                      // Open the user's default email client
                      window.location.href = mailtoURL;
                    } else {
                      setIsError(true);
                      setErrorText('Link not found');
                    }
                  }
                } else {
                  setIsError(true);
                  setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
                }
              },
              icon: emailIcon,
              isDisable:
                shareTrackIdentifier === 'Details'
                  ? !filteredImages[imageIndex]?.name
                  : Object.keys(selectedProducts).length > 0
                  ? !filteredImages
                      .filter((images: any) => {
                        return Object.keys(selectedProducts).includes(
                          images[imageIndex].id
                        );
                      })
                      .some(
                        (images: any) => images[imageIndex]?.url_check === true
                      )
                  : !filteredImages.some(
                      (images: any) => images[imageIndex]?.url_check === true
                    )
            },
            {
              label: `WhatsApp ${
                shareTrackIdentifier === 'Details'
                  ? filteredImages[imageIndex]?.name ?? ''
                  : filteredImages[0][imageIndex].name ?? ''
              } Link`,
              handler: () => {
                if (Object.keys(selectedProducts).length > 0) {
                  // Filter images based on selected product IDs

                  if (shareTrackIdentifier === 'Details') {
                    // Encode the URL for safety
                    const encodedLink = encodeURIComponent(
                      filteredImages[imageIndex].downloadUrl
                    );

                    // Create WhatsApp sharing URL
                    const whatsappURL = `https://wa.me/?text=${encodedLink}`;

                    // Open WhatsApp in a new tab or window
                    window.open(whatsappURL, '_blank');
                  } else {
                    // Filter images based on selected product IDs and url_check
                    const selectedImageLinks = filteredImages
                      .filter(
                        (images: any) =>
                          Object.keys(selectedProducts).includes(
                            images[imageIndex].id
                          ) && images[imageIndex].url_check !== false
                      )
                      .map((images: any) => images[imageIndex].downloadUrl);

                    if (selectedImageLinks.length > 0) {
                      // Create a single WhatsApp message with all the links
                      const message = selectedImageLinks.join('\n'); // Separate links by a newline
                      const encodedMessage = encodeURIComponent(message);

                      // WhatsApp URL with all links
                      const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

                      // Open WhatsApp in a new tab or window
                      window.open(whatsappURL, '_blank');
                    } else {
                      setIsError(true);
                      setErrorText('Link not found');
                    }
                  }
                } else {
                  setIsError(true);
                  setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
                }
              },
              icon: whatsappIcon,
              isDisable:
                shareTrackIdentifier === 'Details'
                  ? !filteredImages[imageIndex]?.name
                  : Object.keys(selectedProducts).length > 0
                  ? !filteredImages
                      .filter((images: any) => {
                        return Object.keys(selectedProducts).includes(
                          images[imageIndex].id
                        );
                      })
                      .some(
                        (images: any) => images[imageIndex]?.url_check === true
                      )
                  : !filteredImages.some(
                      (images: any) => images[imageIndex]?.url_check === true
                    )
            }
          ]}
        />
      ) : (
        <div
          onClick={() => {
            if (!isDisable || !rows.length) {
              if (Object.keys(selectedProducts).length > 0) {
                setIsError(false);
                setErrorText('');
                setIsInputDialogOpen(true);
                if (
                  dynamicTrackIdentifier === dashboardIndentifier ||
                  dynamicTrackIdentifier === 'dashboardSearchResult'
                ) {
                  trackEvent({
                    action:
                      dynamicTrackIdentifier === 'dashboardSearchResult'
                        ? Tracking_Search_By_Text.click_share_result_page
                        : Tracking_Search_By_Text.click_share_dna_page,
                    category: 'SearchByText',
                    mobile_number: customerMobileNumber
                  });
                }
              } else {
                setIsError(true);
                setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
              }
            }
          }}
          className="w-[39px] h-[39px]"
        >
          <Tooltip
            tooltipTrigger={
              <button
                disabled={!rows.length || isDisable}
                className={`disabled:!bg-neutral100 disabled:cursor-not-allowed disabled:text-neutral400 rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
              >
                <ShareButtonSvg
                  className={`${
                    !rows.length || isDisable
                      ? 'stroke-neutral400'
                      : 'stroke-neutral900'
                  }`}
                />
              </button>
            }
            tooltipContent={'Share'}
            tooltipContentStyles={'z-[1000]'}
          />
          {/* <Image src={shareButtonSvg} alt={'share'} width={38} height={38} /> */}
        </div>
      )}

      {/* {copied && <span>Copied!</span>} */}
    </>
  );
};

export default Share;
