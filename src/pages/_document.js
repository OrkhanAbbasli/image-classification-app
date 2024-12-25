import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
      <Html lang="en">
          <Head/>
          <link href="https://cdn.jsdelivr.net/npm/pagedone@1.2.2/src/css/pagedone.css " rel="stylesheet"/>
          <body>
          <Main/>
          <NextScript/>
          <script src="https://cdn.jsdelivr.net/npm/pagedone@1.2.2/src/js/pagedone.js"></script>
          </body>
      </Html>
  );
}
