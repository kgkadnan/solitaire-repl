import React from 'react'
import CustomSearchResultCard from '.'
import Edit from "../../../../public/assets/icons/edit.png";
import ImageTileExample from '../image-tile/example';

const SearchResultCardExample=()=> {
    const cardData = {
        cardIcon: Edit,
        cardhandleIcon:Edit,
        cardHeader:<p>header</p>,
        cardDescription:<p>desc</p>,
        cardContent:<ImageTileExample/>,
        
        
      }
  return (
    <CustomSearchResultCard cardData={cardData} defaultCardPosition={false}/>
  )
}

export default SearchResultCardExample