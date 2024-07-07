import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { OrderInterface } from '../../interfaces/OrderInterface';

interface UpdateOrderProps {
	order: OrderInterface;
 }

function UpdateOrder({ order }: UpdateOrderProps) {
  const fetcher = useFetcher();

  return (
	/* Does not create navigation to any other page */
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }: { params: { orderId: string }}): Promise<null> {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}