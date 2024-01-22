'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import React from 'react';

const Form = () => {
  let linkItems = ['a', 'b', 'c', 'd', 'f', 'g', 'h'];
  return (
    <>
      <AccordionComponent
        value="shape"
        isDisable={true}
        accordionContent={<>Hello</>}
        accordionTrigger={'shape'}
        hasError={false}
      />
      <AccordionComponent
        value="parameter"
        isDisable={false}
        accordionContent={<>Hello</>}
        accordionTrigger={'parameter'}
        hasError={false}
      />
      <AnchorLinkNavigation linkItems={linkItems} />
      <p className="mt-10" id="a">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
      <p className="mt-10" id="b">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
      <p className="mt-10" id="c">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
      <p className="mt-10" id="d">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
      <p className="mt-10" id="f">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
      <p className="mt-10" id="g">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
      <p className="mt-10" id="h">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laudantium
        maxime adipisci, eaque repellendus minus doloribus, animi molestiae
        asperiores quod, deleniti veritatis accusamus. Aliquid ut optio libero
        fugiat dignissimos corporis explicabo, autem consectetur natus vitae,
        totam amet fugit dolore? Incidunt numquam dolorum ipsum id beatae quo
        reprehenderit saepe, cum esse quisquam mollitia tempore sunt reiciendis
      </p>
    </>
  );
};

export default Form;
