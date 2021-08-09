export interface wishlist {
  customerId: string;
  productId: string;
  productdetail: {
    p_img: string;
    p_name: string;
    status:boolean;
  };
  quantity: number;
  totalPrice: number;
  userdetail: {
    uname: string;
  };
  _id: string;
}
