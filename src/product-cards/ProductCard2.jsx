// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * CustomProductCard2 - Urban/Streetwear Bold Template
 * @param {Object} props.wr - Global object with webround.com utilities
 */
const CustomProductCard2 = ({ wr }) => {
    // The wr.product prop is available in Product Card Overrides
    const product = wr?.product;

    if (!product) return null;

    // Select the favorite variant or the first available one
    const variant = product.variants?.find((v) => v.isFavourite) || product.variants?.[0];

    // Access assets via variant or product fallback
    const coverUrl = variant?.assets?.[0]?.url || product?.assets?.[0]?.url || "";

    // Price management using SDK data
    const priceRange = variant?.priceRanges?.[0];
    const price = priceRange?.grossMin || 0;
    const comparePrice = priceRange?.compareGrossMin || 0;
    const currency = priceRange?.currencyCode || "EUR";

    const formatPrice = (value) => {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency,
        }).format(value);
    };

    /**
     * Construct navigation path using the variant slug
     */
    const variantSlug = variant?.slug || "";
    const productPath = `/product/${variantSlug}`;

    /**
     * Updates the global shop state and triggers SPA navigation
     */
    const handleProductClick = (e) => {
        e.preventDefault();

        // Needed to correctly display the ProductPage
        wr.shop.selectProduct(product);
        wr.shop.selectVariant(variant);

        // Trigger SPA navigation using the dynamic product path
        wr.utils.navigate(productPath);
    };

    return (
        <a
            href={wr.utils.generateHref(productPath)}
            onClick={handleProductClick}
            className="group relative flex flex-col w-full h-full bg-black border-2 border-black overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] no-underline"
        >
            {/* Image with brutalist hover filter */}
            <div className="relative aspect-square overflow-hidden bg-gray-200 border-b-2 border-black">
                <img
                    src={coverUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* "Tag" style Discount Badge */}
                {comparePrice > price && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-black px-4 py-2 border-l-2 border-b-2 border-black z-10 rotate-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        -{Math.round(((comparePrice - price) / comparePrice) * 100)}%
                    </div>
                )}
            </div>

            {/* Info Container with high contrast */}
            <div className="p-4 bg-white flex flex-col flex-grow justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black leading-none uppercase italic tracking-tighter w-2/3 text-black">
                            {product.name}
                        </h3>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold bg-black text-white px-1 mb-1">
                                NEW DROP
                            </span>
                        </div>
                    </div>

                    <p className="text-[11px] text-gray-500 font-medium line-clamp-2 mb-4">
                        Limited edition custom piece for the webround.com collection.
                    </p>
                </div>

                <div className="flex items-end justify-between border-t-2 border-black pt-4 mt-auto">
                    <div className="flex flex-col">
                        {comparePrice > price && (
                            <span className="text-xs text-gray-400 line-through font-bold">
                                {formatPrice(comparePrice)}
                            </span>
                        )}
                        <span className="text-2xl font-black text-black leading-none">
                            {formatPrice(price)}
                        </span>
                    </div>

                    {/* CTA Button styled as a label */}
                    <div className="bg-black text-white p-2 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default CustomProductCard2;