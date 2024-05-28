import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../components/carousel.css'; // Ensure this path is correct for your custom CSS
import DashboardCarousel, {
  DashboardCarouselProps
} from '@/components/v2/common/carousel';

export default {
  title: 'Components/DashboardCarousel',
  component: DashboardCarousel
} as Meta;

const sampleImages = [
  {
    link: 'https://example.com/1',
    image_web: 'https://via.placeholder.com/800x400?text=Image+1',
    tag_line: 'Tagline 1',
    description_line: 'Description 1',
    cta: 'Learn More'
  },
  {
    link: 'https://example.com/2',
    image_web: 'https://via.placeholder.com/800x400?text=Image+2',
    tag_line: 'Tagline 2',
    description_line: 'Description 2',
    cta: 'Explore'
  },
  {
    link: 'https://example.com/3',
    image_web: 'https://via.placeholder.com/800x400?text=Image+3',
    tag_line: 'Tagline 3',
    description_line: 'Description 3',
    cta: 'Discover'
  }
];

const Template: Story<DashboardCarouselProps> = args => (
  <DashboardCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  images: sampleImages
};

export const NoImages = Template.bind({});
NoImages.args = {
  images: []
};

export const SingleImage = Template.bind({});
SingleImage.args = {
  images: [sampleImages[0]]
};

const handleActionButtonClick = action('Action button clicked');

const TemplateWithActions: Story<DashboardCarouselProps> = args => (
  <DashboardCarousel
    {...args}
    images={args.images.map(image => ({
      ...image,
      handler: () => handleActionButtonClick(image.cta)
    }))}
  />
);

export const WithActions = TemplateWithActions.bind({});
WithActions.args = {
  images: sampleImages.map(image => ({
    ...image,
    handler: () => handleActionButtonClick(image.cta)
  }))
};
