'use client'

import Script from 'next/script'

/* Meta (Facebook) Pixel. Live pixel 1585888179629830 ("A-Level Accelerators"),
   hardcoded as the default; a pixel ID is public (it ships in every page's HTML),
   so it is not a secret. NEXT_PUBLIC_META_PIXEL_ID overrides it. This is the same
   base-pixel loader Meta hands out; the site loads it once here, so nothing needs
   pasting into the site by hand. The fbq('track', 'Lead') calls in the diagnostic,
   parents, newsletter, tracker and workshop forms then record conversions. */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1585888179629830'

export default function MetaPixel() {
  if (!PIXEL_ID) return null
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
