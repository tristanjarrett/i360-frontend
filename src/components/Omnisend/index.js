import Script from 'next/script';

const Omnisend = () => {
  return (
    <>
      <Script
        type="text/javascript"
        id="Omnisend"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.omnisend = window.omnisend || [];
          omnisend.push(["accountID", "5dc2bd638a48f72c4fcb4bbc"]);
          omnisend.push(["track", "$pageViewed"]);
          !function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://omnisnippet1.com/inshop/launcher-v2.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(); `,
        }}
      />
    </>
  );
};

export default Omnisend;
