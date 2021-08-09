export interface product {
  _id:string;
  category: string;
  discount: number;
  p_disc: string;
  p_img: string;
  p_name: string;
  p_price: number;
  status: boolean;
  stock: string;
  stock_range: number;
  quantity?:number;
  wishlistStatus:boolean;
}
