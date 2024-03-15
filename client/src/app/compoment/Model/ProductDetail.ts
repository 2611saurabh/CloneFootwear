export class ProductDetail{

    constructor(
    public id:string,
    public name:string,
    public description:string,
    public brand:string,
    public gender:string,
    public category:string,
    public size:string,
    public color:string,
    public price:number,
    public discountPrice: string,
    public is_in_inventory:boolean,
    public items_left:number,
    public imageURL:string,
    public slug:string
    ) {}
}