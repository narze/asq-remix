import {
  MetaFunction,
  LoaderFunction,
  Form,
  ActionFunction,
  useActionData,
  useTransition,
} from "remix";
import { useLoaderData, json, Link } from "remix";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const res = await (
    await fetch("https://watasalim.vercel.app/api/quotes")
  ).json();

  return json(res.quotes.length);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  let res = await (
    await fetch("https://watasalim.vercel.app/api/quotes/random")
  ).json();

  return json(res.quote.body, { status: 200 });
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<Number>();
  let actionMessage = useActionData<string>();
  let transition = useTransition();

  return (
    <div className="remix__page">
      <main>
        <Form method="post" className="remix__form">
          <div>
            <button disabled={!!transition.submission}>
              Random Salim Quote from {data} quotes
            </button>
          </div>
        </Form>
      </main>
      <aside>
        {transition.state === "submitting" ? (
          "Loading..."
        ) : actionMessage ? (
          <p>
            <b>{actionMessage}</b>
          </p>
        ) : (
          "Click the button!"
        )}
        {}
      </aside>
    </div>
  );
}
