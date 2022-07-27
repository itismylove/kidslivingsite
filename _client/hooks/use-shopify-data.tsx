import { useShopifyData } from "_client/stores/shopify-data-store";
import { useCallback, useEffect } from "react";
import { Sections } from ".shopify-cms/types/sections";
import { GlobalSettings } from ".shopify-cms/types/shopify";

export const useInitShopifyData = <G extends GlobalSettings, S extends Sections[]>() => {
  const [{ global, sections }, setShopifyData] = useShopifyData();

  const messageSectionSizes = useCallback(() => {
    window?.parent?.postMessage(
      {
        source: "theme-content",
        topic: "resize",
        totalHeight: document.body.clientHeight,
        sections: sections?.map(({ id }) => ({
          id,
          height: document.getElementById(`section--${id}`)?.clientHeight ?? 0,
        })),
      },
      "*"
    );
  }, [sections]);

  const handleMessages = useCallback((e) => {
    if (e?.data?.source === "theme-editor") {
      document.body.classList.add("overflow-hidden");
      console.log(e.data);
      setShopifyData({ global: e.data.global, sections: e.data.sections });

      window?.parent?.postMessage(
        {
          source: "theme-content",
          topic: "resize",
          totalHeight: document.body.clientHeight,
          sections: sections?.map(({ id }) => ({
            id,
            height: document.getElementById(`section--${id}`)?.clientHeight ?? 0,
          })),
        },
        "*"
      );

      if (e.data.topic === "shopify:section:select") {
        const sectionElement = document.getElementById(`section--${e.data.detail.sectionId}`);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [sections, setShopifyData]);

  useEffect(() => {
    window.addEventListener("message", handleMessages);
    window.addEventListener("resize", messageSectionSizes);
    return () => {
      window.removeEventListener("message", handleMessages);
      window.removeEventListener("resize", messageSectionSizes);
    };
  }, [handleMessages, messageSectionSizes, sections]);

  useEffect(() => {
    window?.parent?.postMessage(
      {
        source: "theme-content",
        topic: "resize",
        totalHeight: document.body.clientHeight,
        sections: sections?.map(({ id }) => ({
          id,
          height: document.getElementById(`section--${id}`)?.clientHeight ?? 0,
        })),
      },
      "*"
    );
  }, [sections]);

  return { sections, global };
};
