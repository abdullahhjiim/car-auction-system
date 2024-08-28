import LayoutWrap from '@/components/common/LayoutWrap';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://gulfcarauction.com",
  "logo": "https://gulfcarauction.com/favicon.png"
}

const schemaData2 = {
  "@context": "https://schema.org/", 
  "@type": "BreadcrumbList", 
  "itemListElement": [{
    "@type": "ListItem", 
    "position": 1, 
    "name": "Home",
    "item": "https://gulfcarauction.com"  
  },{
    "@type": "ListItem", 
    "position": 2, 
    "name": "All Vehicle",
    "item": "https://gulfcarauction.com/all-vehicle"  
  }]
}


export default function layout({ children }) {
  return (
    <>
      <head>
        
        <link rel="icon" href="/favicon.png" type="image/png" />

        <meta name="title" content="Gulf Cars Auction" />
        <meta property="og:title" content="Gulf Cars Auction" />
        <meta property="og:description" content="Gulf Cars Auction | Salvage Cars Auction Sharjah, Dubai" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:type" content="website" />

        <meta name="keywords" content="buy second hand car dubai uae,  accidental cars for sale in dubai, accidental cars for sale in sharjah, al sajaa car auction, alsajaa auctions, alsajaa cars auction, alsajaa used cars, Auction, Auto Auction, Bidding on Car, buy abandoned car in dubai uae, buy accidental damaged car in dubai uae, Buy Car Dubai, Buy Car Sharjah, Buy Car UAE, buy second hand car sharjah, Car Auction, car auction dubai, car auction in UAE, car auction uae, car use, car used, Cars for Auction in UAE, Cheap Cars In Dubai, Cheap Cars in Sharjah, Cheap Cars In UAE, classic car auctions, copart auction, Damage Car Auction In Dubai, Damage Car Auction In UAE, dubai auction cars, Dubai auto auction, dubai car auction, dubai car auctions, Dubai Cars, dubai use car, emirates auction, gulf, gulf alsajaa, Gulf cars, gulf cars alsajaa, gulf cars auction, insurance auto auction, junk cars for sale Dubai uae, oman auction, online car auction, Purchase Car, Purchase Car UAE, Racing Cars, Sale Car, salvage, salvage auto auction, salvage car auction, Salvage Car Auction In Dubai, Salvage Car Auction In UAE, salvage cars for sale, sharjah auction, sharjah car auction, Sharjah Cars, UAE auto auction, uae car auction In dubai, uae used cars, use car dubai, used car, Used Car Auction In Dubai, Used car auction In uae, used car dealers in dubai uae, used car dealers in sharjah, used cars, Used Cars for Auction in UAE, used cars for sale in dubai, used cars for sale in sharjah, used cars for sale in uae, used cars in alsajaa, used cars in dubai, used cars in sharjah, Vehicle for Auction in UAE, use car"></meta>

        <link rel="canonical" href="https://gulfcarauction.com" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        <script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        
        <script
          id="schema2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData2),
          }}
        />

      </head>
      <body className={`${inter.className} relative`}>
        <LayoutWrap>{children}</LayoutWrap>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/663f73009a809f19fb2fd979/1htjtifg1';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
          }}
        />
      </body>
    </>
  );
}
