import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from '../../store';


function Username() {
	const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

	const username: string = useTypedSelector((state) => state.user.username)
	return <div className="hidden text-sm font-semibold md:block">{username}</div>;
 }
 
 export default Username;