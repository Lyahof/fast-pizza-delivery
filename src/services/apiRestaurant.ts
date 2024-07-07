import { MenuItemInterface } from "../interfaces/MenuItemInterface";
import { OrderInterface } from "../interfaces/OrderInterface";

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export async function getMenu(): Promise<MenuItemInterface[]> {
	try {
		const res = await fetch(`${API_URL}/menu`);
		if (!res.ok) throw new Error('Failed getting menu');
		const { data } = await res.json();

		return data as MenuItemInterface[];
	} catch (err) {
		console.error('Error fetching menu:', err);
		throw new Error('Failed getting menu');
	 }
}

export async function getOrder(id: string): Promise<OrderInterface> {
	try {
		const res = await fetch(`${API_URL}/order/${id}`);
		if (!res.ok) throw new Error(`Couldn't find order #${id}`); 
		const { data } = await res.json();

		return data;
	} catch(err) {
		console.error(`Error fetching order #${id}:`, err)
		throw new Error(`Couldn't find order #${id}`)
	}

}

export async function createOrder(newOrder: OrderInterface): Promise<OrderInterface> {
  	try {
    	const res = await fetch(`${API_URL}/order`, {
			method: 'POST',
			body: JSON.stringify(newOrder),
			headers: {
			'Content-Type': 'application/json',
			},
    	});
    	if (!res.ok) throw new Error();
    	const { data } = await res.json();

    	return data;
  	} 	catch(err) {
		console.error('Error creating order:', err);
    	throw new Error('Failed creating your order');
  		}
}

export async function updateOrder(id: string, updateObj: {priority: boolean}): Promise<void>{
  	try {
		const res = await fetch(`${API_URL}/order/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(updateObj),
			headers: {
			'Content-Type': 'application/json',
			},
		});

   	if (!res.ok) throw new Error();
  	} catch (err) {
		console.error(`Error updating order #${id}:`, err);
    	throw new Error('Failed updating your order');
  }
}
