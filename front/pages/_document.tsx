import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="
          모임 관리 서비스, 몽글입니다.
        "
        />
        <meta
          name="keywords"
          content="
          몽글,몽글몽글,몽글몽글몽글,몽글몽글몽글몽글,몽글몽글몽글몽글몽글,몽글몽글몽글몽글몽글몽글,몽글몽글몽글몽글몽글몽글몽글,몽글몽글몽글몽글몽글몽글몽글몽글,몽글몽글몽글몽글몽글몽글몽글몽글몽글,몽글몽글몽글몽글몽글몽글몽글몽글몽글몽글
        "
        />
        <meta name="author" content="몽글" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="몽글" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moim.monggeul.online" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
