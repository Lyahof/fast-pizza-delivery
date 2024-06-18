// Test ID: IIDSAT || CQE92U
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { OrderInterface } from "../../interfaces/OrderInterface";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

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
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${estimatedDelivery ? calcMinutesLeft(estimatedDelivery ) : 0} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {estimatedDelivery? formatDate(estimatedDelivery) : 0})</p>
      </div>

      <div>
        <p>Price pizza: {orderPrice ? formatCurrency(orderPrice) : 0}</p>
        {priority && <p>Price priority: {priorityPrice ? formatCurrency(priorityPrice) : 0}</p>}
        <p>To pay on delivery: {orderPrice && priorityPrice ? formatCurrency(orderPrice + priorityPrice) : 0}</p>
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
