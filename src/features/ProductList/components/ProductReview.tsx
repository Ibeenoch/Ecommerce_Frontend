import { StarIcon } from '@heroicons/react/24/outline'
import React from 'react'

const ProductReview = () => {
    const totalRating = 0;
const handleOneStar = () => {
   const ratingGiven = 1;
}
  return (
    <div className="flex border-none" style={{ }}>
    <StarIcon
    onClick={handleOneStar}
      className="h-4 w-4 z-30 cursor-pointer"
      aria-hidden="true"
      color="yellow"
    />
    <StarIcon
      className="h-4 w-4 z-30 cursor-pointer"
      aria-hidden="true"
      color="yellow"
    />
    <StarIcon
      className="h-4 w-4 z-30 cursor-pointer"
      aria-hidden="true"
      color="yellow"
    />
    <StarIcon
      className="h-4 w-4 z-30 cursor-pointer"
      aria-hidden="true"
      color="yellow"
    />
    <StarIcon
      className="h-4 w-4 z-30 cursor-pointer opacity-40"
      aria-hidden="true"
      color="gray"
    />
  </div>
  )
}

export default ProductReview
