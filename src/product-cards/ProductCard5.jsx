// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * CustomProductCard5 - Architectural / Swiss Grid Template
 * @param {Object} props.wr - Global object with webround.com utilities
 */
const CustomProductCard5 = ({ wr }) => {
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

        wr.utils.navigate(productPath);
    };

    return (
        <a
            href={wr.utils.generateHref(productPath)}
            onClick={handleProductClick}
            className="group relative block w-full h-[520px] bg-[#1a365d] flex flex-row overflow-hidden transition-all duration-700 hover:bg-[#c2410c] no-underline"
        >
            {/* Left Sidebar - Typographic HUD */}
            <div className="w-16 h-full border-r border-white/20 flex flex-col justify-between py-6 items-center">
                <span className="text-white/40 text-[10px] font-bold uppercase rotate-180 [writing-mode:vertical-lr] tracking-widest">
                    Collection 2026
                </span>
                <div className="w-1 h-24 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full bg-white transition-all duration-1000 h-0 group-hover:h-full" />
                </div>
                <span className="text-white font-black text-xl tracking-tighter uppercase rotate-180 [writing-mode:vertical-lr]">
                    {formatPrice(price)}
                </span>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col p-8">
                {/* Layered Giant Title */}
                <div className="relative z-10">
                    <h3 className="text-5xl font-black text-white leading-none tracking-tighter mb-4 transition-transform duration-500 group-hover:translate-x-4">
                        {product.name?.split(' ')[0]}
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] group-hover:text-white transition-all">
                            {product.name?.split(' ').slice(1).join(' ') || "ITEM"}
                        </span>
                    </h3>
                </div>

                {/* Image with Custom Crop */}
                <div className="relative flex-grow mt-4 mb-8 overflow-hidden rounded-tr-[80px]">
                    <img
                        src={coverUrl}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
                    />

                    {/* Angular CTA Badge */}
                    <div className="absolute bottom-0 right-0 bg-white text-black p-4 font-mono text-xs font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        VIEW
                    </div>
                </div>

                {/* Footer Info Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/30 pt-4">
                    <div>
                        <p className="text-[10px] text-white/60 uppercase font-bold mb-1">Stock status</p>
                        <p className="text-xs text-white font-medium">Limited Edition / 042</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-white/60 uppercase font-bold mb-1">Details</p>
                        <div className="flex justify-end gap-1">
                            <span className="w-2 h-2 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="w-2 h-2 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                            <span className="w-2 h-2 rounded-full bg-white opacity-10 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Geometric Accent Overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-[3] transition-transform duration-700 pointer-events-none" />
        </a>
    );
};

export default CustomProductCard5;