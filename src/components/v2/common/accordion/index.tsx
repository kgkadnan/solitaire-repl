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
}

export const AccordionComponent: React.FC<IAccordionCompProps> = ({
  isDisable = false,
  accordionContent,
  accordionTrigger,
  value,
  hasError
}) => {
  return (
    <Accordion
      type="single"
      className="w-[100%]"
      defaultValue={value}
      collapsible
    >
      <AccordionItem value={value}>
        <AccordionTrigger
          className={`${
            hasError ? styles.accordionErrorStyle : styles.accordionSuccessStyle
          } ${styles.accordionTriggerStyle}`}
          disabled={isDisable}
        >
          <div className="flex items-center gap-2">{accordionTrigger}</div>
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
