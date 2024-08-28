"use client";
import { useEffect, useRef } from "react";

const HtmlIframe = ({ htmlContent, iframeUrl, height = "500px" }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    let url = "";

    if (iframeUrl) {
      url = iframeUrl;
    } else if (htmlContent) {
      const blob = new Blob([htmlContent], { type: "text/html" });
      url = URL.createObjectURL(blob);
    }

    if (iframeRef.current) {
      iframeRef.current.src = url;
    }

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [htmlContent, iframeUrl]);

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height={height}
      onload="this.height=this.contentWindow.document.body.scrollHeight;"
    />
  );
};

export default HtmlIframe;
