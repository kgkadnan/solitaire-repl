import React, { useEffect, useState } from 'react';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ShareDialog } from './share-dialog';
import { IndividualActionButton } from '../action-button/individual-button';
import CheckboxComponent from '../checkbox';
import shareButtonSvg from '@public/v2/assets/icons/data-table/share-button.svg';
import Image from 'next/image';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { SELECT_STONE_TO_PERFORM_ACTION } from '@/constants/error-messages/search';
import { Toast } from './toast';
import { IProduct } from '@/app/v2/search/interface';
import Tooltip from '../tooltip';

const Share = ({ rows, selectedProducts, setErrorText, setIsError }: any) => {
  const [selectedRows, setSelectedRows] = useState<IProduct[]>(
    rows.filter((row: IProduct) => row.id in selectedProducts)
  );
  useEffect(() => {
    // if (Object.keys(selectedProducts).length > 0)
    setSelectedRows(rows.filter((row: IProduct) => row.id in selectedProducts));
  }, [selectedProducts]);
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;
  // const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const shareOptions = [
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
    { name: 'Rap Val ($)', state: 'rap_value' },
    { name: 'Rap ($)', state: 'rap' },
    { name: 'Disc%', state: 'discount' },
    { name: 'Pr/Ct', state: 'price_per_carat' },
    { name: 'Amt ($)', state: 'amount' },
    { name: 'Public URL', state: 'public_url' }
  ];

  const { setIsInputDialogOpen } = modalSetState;

  const [selectedAttributes, setSelectedAttributes] = useState(
    shareOptions.reduce((acc: any, option) => {
      acc[option.state] = true; // Initialize all options as selected
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
              const height = product.height || 0;
              return `Measurements: ${length} x ${width} x ${height}`;
            }
            // Handle amount separately if it's selected
            if (attribute === 'amount' && selectedAttributes['amount']) {
              const amount = product.amount || 0; // Or however you calculate amount
              return `Amt ($): ${amount}`;
            }
            if (
              attribute === 'public_url' &&
              selectedAttributes['public_url']
            ) {
              return `Public URL: ${
                process.env.NEXT_PUBLIC_DNA_URL
              }${product?.public_url.split('/').pop()}`;
            }
            // For other attributes, continue as before
            const option = shareOptions.find(opt => opt.state === attribute);
            return option ? `${option.name}: ${product[attribute]}` : '';
          })
          .filter(line => line) // Remove any undefined entries
          .join('\n');
      })
      .join('\n\n'); // Separate each product block with two newlines

    try {
      await navigator.clipboard.writeText(selectedData);
      // setCopied(true);
      setShowToast(true); // Show the toast notification
      setTimeout(() => {
        // setCopied(false);
        setShowToast(false); // Hide the toast notification after some time
      }, 2000);
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
              className={`w-[187px] border-[1px] text-mMedium font-medium flex items-center rounded-[4px] border-neutral200  ${
                item.name === 'Public URL' ? 'text-infoMain' : 'text-neutral900'
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
      <div
        onClick={() => {
          if (Object.keys(selectedProducts).length > 0) {
            setIsError(false);
            setErrorText('');
            setIsInputDialogOpen(true);
          } else {
            setIsError(true);
            setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
          }
        }}
      >
        <Tooltip
          tooltipTrigger={
            <Image
              className="cursor-pointer"
              src={shareButtonSvg}
              alt={'share'}
              height={38}
              width={38}
            />
          }
          tooltipContent={'Share'}
          tooltipContentStyles={'z-[4]'}
        />
        {/* <Image src={shareButtonSvg} alt={'share'} width={38} height={38} /> */}
      </div>
      {/* {copied && <span>Copied!</span>} */}
    </>
  );
};

export default Share;
