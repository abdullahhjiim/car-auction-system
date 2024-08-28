"use client";
import { authAxios } from "@/app/(home)/axious-config";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import HtmlIframe from "./HtmlFrame";

const FaqAccordion = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    authAxios
      .get("/search/faqs")
      .then((res) => {
        setFaqData(res.data?.data);
      })
      .catch((err) => console.log("err", err.response));
  }, []);

  console.log(faqData);

  return (
    <div className="faq-accordion container mt-2 mb-7">
      <div className="flex justify-center mb-8">
        <h2 className="text-5xl font-semibold">Frequently Asked Question</h2>
      </div>
      <Accordion allowZeroExpanded={true}>
        {faqData.length > 0 &&
          faqData.map((item, i) => {
            return (
              <AccordionItem key={i}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span className="font-semibold text-primary ">
                      {item?.title}
                    </span>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="px-6">
                  {/* <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div> */}
                  <HtmlIframe htmlContent={item?.description} height="auto" />
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
