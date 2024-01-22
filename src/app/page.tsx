'use client';

import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import logger from 'logging/log-util';

export default function Home() {
  logger.info('test log! pinotest stream from reactjs application.');

  let linkItems = ['a', 'b', 'c', 'd', 'f', 'g', 'h'];

  return (
    <>
      {' '}
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
      <h1
        style={{
          fontSize: '100px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '180px'
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        Building Digital Diamond Platform
      </h1>
    </>
  );
}
