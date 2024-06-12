import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { MenuItemInterface } from "../../interfaces/MenuItemInterface";
import MenuItem from "./MenuItem";

function Menu() {
	const menu = useLoaderData() as MenuItemInterface[];

  return (
	<ul>
		{menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id}/>)}
	</ul>
	);
}

export async function loader(): Promise<MenuItemInterface[]> {
	const menu = await getMenu();
	return menu;
}

export default Menu;
