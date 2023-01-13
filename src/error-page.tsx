import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const { statusText, message }: any = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText || message}</i>
      </p>
    </div>
  );
}
