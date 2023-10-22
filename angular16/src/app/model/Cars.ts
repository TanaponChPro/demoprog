export interface ICar 
{
	Name:string,
	Color:string,
	Price:number,
	width: number;
	Height: number;
	ImageUrl: string;
	calculateDiscount(percent: number): number;
}