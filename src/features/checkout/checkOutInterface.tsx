 interface CartItem {
    id: number;
    item: string;
    price: number;
    quantity: number
 };

  interface CartInterface {
    carts: CartItem[];
    status: string;
}

export default CartInterface;
