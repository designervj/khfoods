import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { type ReactNode } from "react";

import { type Locale } from "@/i18n/config";
import { type Product } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { WithImageGalleryExpandableDetails } from "./variants/WithImageGalleryExpandableDetails";

import { ProductBreadcrumbs } from "../../../../components/(ecommerce)/ProductBreadcrumbs";

export const ProductDetails = async ({
  variant,
  product
}: {
  variant?: string;
  product: Product;
}) => {
  try {
    const locale = (await getLocale()) as Locale;
    const { productDetails } = await getCachedGlobal("shopLayout", locale, 1)();

      let ProductDetailsComponent: ReactNode = null;
    switch (productDetails.type) {
      case "WithImageGalleryExpandableDetails":
        ProductDetailsComponent = (
          <WithImageGalleryExpandableDetails
            variant={variant}
            productSettings={productDetails}
            product={product}
          />
        );
        break;
    }

    if (!ProductDetailsComponent) {
      notFound();
    }


    const category =
      (product as any)?.category &&
      typeof (product as any).category === "object"
        ? ((product as any).category as { title?: string })
        : null;

    return (
      <>
        <section className="py-20 text-center">
          <p className="uppercase tracking-widest text-sm">
            PRODUCTS / {category?.title}
          </p>

          <h1 className="text-5xl font-bold mt-4">
            {category?.title}
          </h1>
        </section>

        <ProductBreadcrumbs product={product} />
        {ProductDetailsComponent}
      </>
    );


  } catch (error) {
    // console.log(error);
    notFound();
  }
};
