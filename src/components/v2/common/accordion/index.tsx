import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/v2/ui/accordion';
import styles from './accordion.module.scss';
import { useRef } from 'react';

interface IAccordionCompProps {
  isDisable?: boolean;
  accordionContent: React.ReactNode;
  accordionTrigger: string;
  value: string;
  hasError: boolean;
}

export const AccordionComp: React.FC<IAccordionCompProps> = ({
  isDisable = false,
  accordionContent,
  accordionTrigger,
  value,
  hasError
}) => {
  const accordionTriggerRef = useRef(null);

  const checkIsErrorExist = hasError => {
    console.log('hasErrir');
  };

  const onValueChanged = () => {
    const accordionTriggerElement = accordionTriggerRef.current;
    const dataState = accordionTriggerElement.getAttribute('data-state');

    if (dataState === 'closed') {
      checkIsErrorExist(hasError);
    }
    console.log('dataState', dataState);
  };

  return (
    <Accordion
      type="single"
      className="w-full"
      defaultValue={value}
      collapsible
      onValueChange={onValueChanged}
    >
      <AccordionItem value={value} ref={accordionTriggerRef}>
        <AccordionTrigger
          className={styles.accordionTriggerStyle}
          disabled={isDisable}
        >
          {accordionTrigger}
        </AccordionTrigger>
        <AccordionContent className={styles.accordionContentStyle}>
          {accordionContent}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
