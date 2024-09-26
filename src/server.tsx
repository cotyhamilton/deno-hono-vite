import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { jsxRenderer } from "hono/jsx-renderer";
import { logger } from "hono/logger";

const isProduction = !import.meta.env?.DEV;
const app = new Hono();

app.use(logger());

if (isProduction) {
  // don't match '/', due to bug in serveStatic function
  app.use("/:hack{.+}", serveStatic({ root: "./dist/" }));
}

app.use(
  "*",
  jsxRenderer(({ children }) => (
    <html>
      <head>
        <title>Deno + Hono + Vite</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {isProduction
          ? <link rel="stylesheet" href="/assets/client.css" />
          : null}
      </head>
      <body class="container">
        {children}
        {isProduction
          ? <script type="module" src="/assets/client.js" />
          : <script type="module" src="/src/client.ts" />}
      </body>
    </html>
  )),
);

app.get("/", (c) => {
  return c.render(
    <div class="flex flex-col items-center justify-center h-screen space-y-4">
      <header>Deno + Hono + Vite</header>
      <h1 class="font-bold text-2xl">Hello, World!</h1>
      <button
        id="theme-switch"
        class="rounded ps-4 pe-3 py-2 bg-primary text-primary-foreground font-bold"
      >
        click ✨
      </button>
      <footer>
        <span id="mode"></span>
        <span id="time" class="font-bold">
          {Temporal.Now.plainDateISO().toString()}
        </span>
      </footer>
    </div>,
  );
});

export default app;
