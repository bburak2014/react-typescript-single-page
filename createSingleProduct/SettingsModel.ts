 
export interface IAddProduct {
  ProductName: string
  category: string
  ModeID: string
  Marka: string
  color: string
  size:string
  explain:string
  image:string
  barcode:string
  price:string
  tlprice:string
  stock:string
  kdv:string
  stockCode:string
  process:string
 }
export const AddProductInitValues: IAddProduct = {
  
  ProductName: 'Ürün Adı',
  category: 'Kategori',
  ModeID: 'Model Kodu',
  Marka: 'Tommy Life',
  color: '',
  size:"",
  explain:"",
  image:"",
  barcode:"",
  price:"",
  tlprice:"",
  stock:"",
  kdv:"",
  stockCode:"",
  process:""
   
 }

 