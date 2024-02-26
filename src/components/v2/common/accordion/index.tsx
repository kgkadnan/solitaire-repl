import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/v2/ui/accordion';
import styles from './accordion.module.scss';

interface IAccordionCompProps {
  isDisable?: boolean;
  accordionContent: React.ReactNode;
  accordionTrigger: string;
  value: string;
  hasError?: boolean;
  defaultValue?: string;
}

export const AccordionComponent: React.FC<IAccordionCompProps> = ({
  isDisable = false,
  accordionContent,
  accordionTrigger,
  value,
  hasError,
  defaultValue
}) => {
  return (
    <Accordion
      type="single"
      className="w-[100%]"
      defaultValue={value}
      collapsible
    >
      <AccordionItem value={defaultValue ? defaultValue : value}>
        <AccordionTrigger
          className={`${
            hasError ? styles.accordionErrorStyle : styles.accordionSuccessStyle
          } ${styles.accordionTriggerStyle}`}
          disabled={isDisable}
        >
          {accordionTrigger}
        </AccordionTrigger>
        <AccordionContent
          className={`${styles.accordionSuccessStyle} ${styles.accordionContentStyle}`}
        >
          {accordionContent}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
