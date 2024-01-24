import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/v2/ui/accordion';
import styles from './accordion.module.scss';
import essentials from '@public/assets/icons/Essentials.svg';
import Image from 'next/image';

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
          <div className="flex items-center gap-2">
            {hasError ? <Image src={essentials} alt="essentials" /> : null}
            {accordionTrigger}
          </div>
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
