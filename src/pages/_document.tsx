import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/react';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#411A08" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
