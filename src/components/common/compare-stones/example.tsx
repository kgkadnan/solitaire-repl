import React from 'react';
import Edit from '@public/assets/icons/edit.svg';
import diamond from '@public/assets/images/history-of-diamonds1 1.png';
import CustomCompareStones from '.';

const CompareStoneExample = () => {
  const cardData = {
    cardId: '1',
    cardActionIcon: diamond,
    cardhandleIcon: Edit,
    cardContent: (
      <>
        <table>
          <tbody>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
            <tr>
              <td>p1</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  };
  return (
    <CustomCompareStones cardData={cardData} defaultCardPosition={false} />
  );
};

export default CompareStoneExample;
