export interface ICategory{
    _id:string,
    name:string,
    slug:string
}

export interface IProducts{
    _id:string,
    title:string,
    description:string,
    slug:string,
    price:number,
    mrp:number,
    stock:number,
    category:ICategory,
    weight:string,
    images:Images[];
}

export interface Images {
  _id: string;
  image_url: string;
  product_id: string;
  public_id: string;
}
