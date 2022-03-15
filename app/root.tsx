import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import {createTheme, NextUIProvider} from "@nextui-org/react"
import {magenta} from 'kleur/colors'

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>Proper challenge</title>
      </head>
      <body>
        <NextUIProvider theme={darkTheme}>
          <Outlet />
        </NextUIProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

// This is a tenant system for developers, dark mode is default
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
        background: '$purple900',
    }
  }
})