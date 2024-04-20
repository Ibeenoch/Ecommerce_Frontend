import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCheckout } from "../checkout/checkoutSlice";

const ShippingDetails = () => {
  const { aUserTransactions } = useAppSelector(selectCheckout);

  return (
    <>
      {!aUserTransactions.length ? (
        <div className="pl-5">No transaction record available</div>
      ) : (
        <div>
          <div className="orders" style={{ borderBottom: "2px gray solid" }}>
            {/* <h3>Shipping Details</h3> */}
            <h3 className="flex text-xl py-2 text-bold justify-center">
              {" "}
              <strong>Product Shipping Details</strong>{" "}
            </h3>
            <div className="flex items-center my-1">
              <div className="ml-6 truncate text-lg font-poppins text-center">
                {" "}
                <strong>Shipping Address:</strong>{" "}
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.address}
                ,{" "}
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.city}
                ,{" "}
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.state}
                ,{" "}
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.country}
                {aUserTransactions &&
                  aUserTransactions[0].order.shippingDetails.zipcode}{" "}
              </div>
            </div>
            <div className="flex items-center my-1">
              <div className="ml-6 truncate text-lg  font-poppins text-center">
                {" "}
                <strong>Status:</strong>{" "}
                {aUserTransactions && aUserTransactions[0].order.status}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingDetails;
