import { ShopifySection } from "types/shopify";

export const imageGallery: ShopifySection = {
  name: "Image gallery",
  settings: [],
  blocks: [
    {
      type: "image",
      name: "Image",
      settings: [
        {
          type: "image_picker",
          id: "image",
          label: "Image",
        },
        {
          type: "range",
          id: "columns",
          label: "Column width",
          default: 4,
          min: 1,
          max: 12,
          step: 1,
        },
        {
          type: "header",
          content: "Hover Effect",
        },
        {
          type: "checkbox",
          id: "hover_effect",
          label: "Show hover effect",
        },
        {
          type: "text",
          id: "title",
          label: "Title",
        },
        {
          type: "color",
          id: "color_text",
          label: "Text Color",
        },
        {
          type: "richtext",
          id: "paragraph",
          label: "Paragraph",
        },
        {
          type: "color_background",
          id: "color_overlay",
          label: "Overlay color",
        },
        {
          type: "product",
          id: "product",
          label: "Product",
        },
      ],
    },
  ],

  presets: [
    {
      name: "Image gallery",
    },
  ],
};