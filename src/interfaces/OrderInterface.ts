export interface FormDataInterface {
	customer: string;
	phone: string;
	address: string;
	status: string;
	priority: string;
	cart: string; 
 }

interface CartItem {
	pizzaId: number,
   name: string,
   quantity: number,
   unitPrice: number,
   totalPrice: number,
}

export interface OrderInterface {
	id?: string;
	customer: string;
	phone: string;
	address: string;
	priority: boolean;
	estimatedDelivery?: string;
	cart: CartItem[];
	position?: string;
	orderPrice?: number;
	priorityPrice?: number;
	status?: string;
 }