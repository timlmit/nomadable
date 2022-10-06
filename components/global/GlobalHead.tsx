import { Fragment } from "react";

export const GlobalHead = () => (
  <Fragment>
    {/* <meta name="google-signin-scope" content="profile email" /> */}
    {/* <meta name="google-signin-client_id" content={process.env.GAPI_CLIENT_ID} /> */}
    <link
      href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css"
      rel="stylesheet"
    />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}

    {/* Favicons */}
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/favicon/apple-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/favicon/apple-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/favicon/apple-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/favicon/apple-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/favicon/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/favicon/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/favicon/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/favicon/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicon/android-icon-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon/favicon-96x96.png"
    />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

    <meta name="msapplication-TileColor" content="#323847" />
    <meta
      name="msapplication-TileImage"
      content="/favicon/ms-icon-144x144.png"
    />

    {/* <link rel="manifest" href="/manifest.json" /> */}
    <meta name="theme-color" content="#323847" />

    <script
      dangerouslySetInnerHTML={{
        __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3159842,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  </Fragment>
);
