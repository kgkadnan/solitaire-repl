import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For simulating user interactions
import Round from '@public/assets/images/round.png';
import CustomImageTile from '@components/common/image-tile';
import Image from 'next/image';

jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({
      src,
      alt,
      width,
      height,
      ...rest
    }: {
      src: string;
      alt: string;
      width: number;
      height: number;
      // Add more specific types for other props if needed
      // ...rest: SomeType;
    }) => <Image src={src} alt={alt} width={width} height={height} {...rest} />,
  };
});

describe('CustomImageTile', () => {
  const imageData = [
    {
      src: Round,
      title: 'Round',
    },
    {
      src: Round,
      title: 'Pear',
    },
    {
      src: Round,
      title: 'Emerald',
    },
  ];

  const overriddenStyles = {
    imageTileMainContainerStyles: 'custom-main-container',
    imageTileContainerStyles: 'custom-container',
  };

  const handleSelectTileMock = jest.fn();
  test('renders image tiles', () => {
    render(
      <CustomImageTile
        imageTileData={imageData}
        selectedTile={[]}
        handleSelectTile={() => {}}
      />
    );

    // Check if the image tiles are
    const imageTiles = screen.getAllByRole('img');
    expect(imageTiles.length).toBe(imageData.length);
  });

  test('renders image tiles correctly', () => {
    const selectedTile = ['Pear'];
    const { getByText } = render(
      <CustomImageTile
        imageTileData={imageData}
        overriddenStyles={overriddenStyles}
        selectedTile={selectedTile}
        handleSelectTile={handleSelectTileMock}
      />
    );

    expect(getByText('Pear')).toBeInTheDocument();
    expect(getByText('Round')).toBeInTheDocument();
  });

  test('selects a tile when clicked', async () => {
    render(
      <CustomImageTile
        imageTileData={imageData}
        selectedTile={[]}
        handleSelectTile={handleSelectTileMock}
      />
    );

    // Click on the Pear tile
    imageData.map(async (items) => {
      const pearTile = screen.getByText(items.title);
      await userEvent.click(pearTile);

      // Check if the handleSelectTile function is called with the correct tile title
      expect(handleSelectTileMock).toHaveBeenCalledWith(items.title, 1);
    });
  });

  test('displays selected tiles', () => {
    const selectedTile = 'Pear';
    render(
      <CustomImageTile
        imageTileData={imageData}
        selectedTile={[selectedTile]}
        handleSelectTile={() => {}}
      />
    );

    // Check if the selected tile is displayed with appropriate styling
    const selectedTileElement = screen.getByText(selectedTile);
    expect(selectedTileElement).toBeInTheDocument();
    expect(selectedTileElement).toHaveClass('imageTileLabel'); // You can adjust this class name based on your code
  });
});
