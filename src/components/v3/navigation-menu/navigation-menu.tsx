'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Our Story',
    href: '/v3/about-us/our-story',
    description: ''
  },
  {
    title: 'Leadership',
    href: '/v3/about-us/leadership',
    description: ''
  }
];

export function NavigationMenuDemo(
  selectedHeader: string,
  setSelectedHeader: {
    (value: React.SetStateAction<string>): void;
    (arg0: string): void;
  }
) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="bg-neutral0   text-neutral700 !hover:text-neutral900  hover:bg-neutral0  focus:bg-neutral0">
          <Link href="/v3" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                selectedHeader === 'home' && 'text-neutral900 font-medium'
              }`}
              onClick={() => {
                setSelectedHeader('home');
              }}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger
            className={`bg-neutral0   text-neutral700 !hover:text-neutral900  hover:bg-neutral0 focus:bg-neutral0 ${
              selectedHeader === 'aboutUs' && 'text-neutral900 font-medium'
            }`}
          >
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!absolute !rounded-[8px]">
            <ul className="flex flex-col !rounded-[8px] border-[1px] border-neutral200">
              {components.map(component => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem className="bg-neutral0  text-neutral700 !hover:text-neutral900  hover:bg-neutral0 focus:bg-neutral0">
          <Link href="/v3/traceability" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                selectedHeader === 'traceability' &&
                'text-neutral900 font-medium'
              }`}
              onClick={() => {
                setSelectedHeader('traceability');
              }}
            >
              Traceability
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        <NavigationMenuItem className="bg-neutral0   text-neutral700 !hover:text-neutral900  hover:bg-neutral0 focus:bg-neutral0">
          <Link href="/v3/sustainability" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                selectedHeader === 'sustainability' &&
                'text-neutral900 font-medium'
              }`}
              onClick={() => {
                setSelectedHeader('sustainability');
              }}
            >
              Sustainability
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="bg-neutral0   text-neutral700 !hover:text-neutral900  hover:bg-neutral0 focus:bg-neutral0">
          <Link href="/v3/contact-us" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${
                selectedHeader === 'contactUs' && 'text-neutral900 font-medium'
              }`}
              onClick={() => {
                setSelectedHeader('contactUs');
              }}
            >
              Contact Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1  p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral100 hover:text-neutral700 !hover:text-neutral900  focus:neutral100 focus:text-neutral700 !hover:text-neutral900  !w-[200px] !border-none',
            className
          )}
          {...props}
        >
          <div className="   leading-none">{title}</div>
          <p className="line-clamp-2  leading-snug text-neutral700 !hover:text-neutral900 ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
