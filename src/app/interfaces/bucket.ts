export interface bucket {
  _id?: string;
  customerId?: string;
  productId?: string;
  quantity: number;
  p_price: number;
  totalPrice: number;
  cartStatus: boolean;
  productdetail: {
    p_img: string;
    p_name: string;
    status: boolean;
    discount: number;
    p_disc:string;
  };
}
