// Test ID: IIDSAT || CQE92U
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { OrderInterface } from "../../interfaces/OrderInterface";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
	const order = useLoaderData() as OrderInterface;

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = estimatedDelivery ? calcMinutesLeft(estimatedDelivery) : 0;

  return (
	<div className="space-y-8 px-4 py-6">
	  <div className="flex flex-wrap items-center justify-between gap-2">
		 <h2 className="text-xl font-semibold">Order #{id} status</h2>

		 <div className="space-x-2">
			{priority && (
			  <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
				 Priority
			  </span>
			)}
			<span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
			  {status} order
			</span>
		 </div>
	  </div>

	  <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
		 <p className="font-medium">
			{deliveryIn >= 0
			  ? `Only ${estimatedDelivery && calcMinutesLeft(estimatedDelivery)} minutes left 😃`
			  : 'Order should have arrived'}
		 </p>
		 <p className="text-xs text-stone-500">
			(Estimated delivery: {estimatedDelivery && formatDate(estimatedDelivery)})
		 </p>
	  </div>

	  <ul className="dive-stone-200 divide-y border-b border-t">
		 {cart.map((item) => (
			<OrderItem item={item} key={item.id} />
		 ))}
	  </ul>

	  <div className="space-y-2 bg-stone-200 px-6 py-5">
		 <p className="text-sm font-medium text-stone-600">
			Price pizza: {orderPrice && formatCurrency(orderPrice)}
		 </p>
		 {priority && (
			<p className="text-sm font-medium text-stone-600">
			  Price priority: {priorityPrice && formatCurrency(priorityPrice)}
			</p>
		 )}
		 <p className="font-bold">
			To pay on delivery: {orderPrice && priorityPrice && formatCurrency(orderPrice + priorityPrice)}
		 </p>
	  </div>
	</div>
 );
}

export async function loader({params}: LoaderFunctionArgs): Promise<OrderInterface> {
	if(!params.orderId) throw new Error('Order ID is missing')
	const order = await getOrder(params.orderId);
	return order;
}

export default Order;
