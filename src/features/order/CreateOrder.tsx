import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { FormDataInterface, OrderInterface } from "../../interfaces/OrderInterface";
import store from '../../store';
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { createOrder } from "../../services/apiRestaurant";
import { fetchAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string): boolean =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

interface CartItem {
	pizzaId: number;
	name: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

interface OrderErrors {
	phone?: string;
	email?: string;
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const formErrors = useActionData() as OrderErrors;
  const navigation = useNavigation();
  const cart: CartItem[] = useSelector(getCart);
  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const isSubmitting = navigation.state === 'submitting';

  const totalCartPrice: number = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice: number = totalCartPrice + priorityPrice;

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

		  <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
				  disabled={isLoadingAddress}
				  defaultValue={address}
              required
            />
				{addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                	{errorAddress}
              </p>
            )}
          </div>
				{!position.latitude && !position.longitude &&  
					<span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
					<Button
						disabled={isLoadingAddress}
						type="small"
						onClick={(e) => {
							e.preventDefault();
							dispatch(fetchAddress());
						}}
					>
						Get position
					</Button>
					</span>
				}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
			 <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>

      </Form>
    </div>
  );
}

export async function action ({request}): Promise<OrderErrors | Response> {
	const formData = await request.formData();
	const data: FormDataInterface = Object.fromEntries(formData) as FormDataInterface;

	const order: OrderInterface = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'true',
	}

	const errors: OrderErrors = {};
	if(!isValidPhone(order.phone))
		errors.phone = 'Please, provide the correct phone number';

	if(Object.keys(errors).length > 0) return errors;

	const newOrder = await createOrder(order)
	store.dispatch(clearCart())

	return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
