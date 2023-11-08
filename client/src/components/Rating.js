import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import './component.css';

export default function Rating(props) {
  const { rating, numReviews, caption } = props;

  return (
    <>    
      <div className='rating-container'>
         <span>
            {rating >= 1 ?
              <FontAwesomeIcon icon="fas fa-star" className='star'/>
              : rating >= 0.5 ? 
              <FontAwesomeIcon icon="fas fa-star-half-alt" className='star'/>
              :
              <FontAwesomeIcon icon={faStar} className='star'/>}
          </span>
          <span>
            {rating >= 2 ?
              <FontAwesomeIcon icon="fas fa-star" className='star'/>
              : rating >= 1.5 ? 
              <FontAwesomeIcon icon="fas fa-star-half-alt" className='star'/>
              :
              <FontAwesomeIcon icon={faStar} className='star'/>}
          </span>
          <span>
            {rating >= 3 ?
              <FontAwesomeIcon icon="fas fa-star" className='star'/>
              : rating >= 2.5 ? 
              <FontAwesomeIcon icon="fas fa-star-half-alt" className='star'/>
              :
              <FontAwesomeIcon icon={faStar} className='star'/>}
          </span>
          <span>
            {rating >= 4 ?
              <FontAwesomeIcon icon="fas fa-star" className='star'/>
              : rating >= 3.5 ? 
              <FontAwesomeIcon icon="fas fa-star-half-alt" className='star'/>
              :
              <FontAwesomeIcon icon={faStar} className='star'/>}
          </span>
          <span>
            {rating >= 5 ?
              <FontAwesomeIcon icon="fas fa-star" className='star'/>
              : rating >= 4.5 ? 
              <FontAwesomeIcon icon="fas fa-star-half-alt" className='star'/>
              :
              <FontAwesomeIcon icon={faStar} className='star'/>}
          </span>
          {caption ? 
            (<span>{ caption }</span>)
            :
            (<span>{ ' ' + numReviews + ' reviews' }</span>)}
      </div>
    </>
  )
}
