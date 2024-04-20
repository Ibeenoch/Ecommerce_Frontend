import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectCheckout } from '../checkout/checkoutSlice'



const MoreProfileDetails = () => {
    const { aUserOrderedProducts } = useAppSelector(selectCheckout)
  return (
    <>
    { !aUserOrderedProducts.length ? (
      <div>No Product Order History Available</div>
    ) : (
      aUserOrderedProducts.map((detail: any, index: number) => (
        <div key={detail} className="product" style={{  borderBottom: '2px gray solid' }}>
        <h4>Product Details {index + 1}</h4>
      <div className="flex items-center my-1">
        <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Product Name:</strong> {detail.title}</div>
      </div>

      <div className="flex items-center my-1">
      <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>price:</strong> {detail.price}</div>
      </div>

      <div className="flex items-center my-1">
      <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Quantity:</strong> {detail.quantity}</div>
      </div>
      
      <div className="flex items-center my-1">
      <div className="ml-6 truncate text-lg  font-poppins text-center"> <strong>Brand:</strong> {detail.brand}</div>
      </div>

      <div className="flex items-center my-1">
      <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Category:</strong> {detail.category}</div>
      </div>
    </div>
    ))
    ) }
     </>
  )
}

export default MoreProfileDetails
