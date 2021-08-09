export interface payment {
  cartIds?:Array<any>,
  customerId: string,
  fname: string,
  email?: string,
  address?: string,
  mobile?: string,
  paymentResponse: boolean,
  totalAmount?:any,
  discount?:any
}
