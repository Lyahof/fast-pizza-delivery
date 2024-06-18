import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError() as { message?: string; data?: string } | null;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error?.data || error?.message || 'Unknown error'}</p>

		<LinkButton to="-1">&larr; Back to menu</LinkButton>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
