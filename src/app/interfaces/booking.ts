export interface booking {
  customerId: string;
  orderId: string;
  productId: { _id: string }[];
  purchasedAt: Date;
  qty: number;
  amount: number;
  status: boolean;
  productdetail:{
    p_disc: string;
    discount: number;
    p_img: string;
    p_name: string;
  }
}
