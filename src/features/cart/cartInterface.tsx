 interface CartItem {
    id: number;
    item: string;
    price: number;
    quantity: number
 };

  interface CartInterface {
    carts: any;
    status: string;
}

export default CartInterface;
