import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import MobileNotification from "@/components/moblie/MobileNotification";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen">
      <Analytics />
      <div className="hidden sm:block">
        <ClerkProvider {...pageProps}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ClerkProvider>
      </div>
      <MobileNotification />
    </div>
  );
}
