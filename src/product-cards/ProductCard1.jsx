// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * CustomProductCard1 - Minimal/Elegant Template
 * @param {Object} props.wr - Global object with webround.com utilities
 */
const CustomProductCard1 = ({ wr }) => {
    // The wr.product prop is available in Product Card Overrides
    const product = wr.product;
    if (!product) return null;

    // Select the favorite variant or the first one available
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
            className="group flex flex-col w-full h-full bg-white transition-all duration-300 no-underline"
        >
            {/* Image container with fixed Aspect Ratio for grid consistency */}
            <div className="relative overflow-hidden aspect-[3/4] bg-[#f7f7f7]">
                <img
                    src={coverUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Conditional Promo Badge */}
                {comparePrice > price && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] px-3 py-1 font-semibold uppercase">
                        Promo
                    </div>
                )}
            </div>

            {/* Product Information Section */}
            <div className="py-4 px-1 flex flex-col items-start">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">
                    Limited Release
                </span>

                <h3 className="text-sm font-semibold text-black mb-2 line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-black">
                        {formatPrice(price)}
                    </span>
                    {comparePrice > price && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(comparePrice)}
                        </span>
                    )}
                </div>
            </div>
        </a>
    );
};

export default CustomProductCard1;