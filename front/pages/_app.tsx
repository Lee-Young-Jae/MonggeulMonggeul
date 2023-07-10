import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../components/layout/AppLayout";
import "./font.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    // 요청 실패 시 1번 재시도
    queries: {
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
