// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * CustomProductCard6 - Retro-Futurist / Bauhaus Tech Template
 * Optimized with localized price formatting.
 */
const CustomProductCard6 = ({ wr }) => {
    // The wr.product prop is available in Product Card Overrides
    const product = wr?.product;

    if (!product) return null;

    // Select the favorite variant or the first one available
    const variant = product.variants?.find((v) => v.isFavourite) || product.variants?.[0];

    // Access assets via variant or product fallback
    const coverUrl = variant?.assets?.[0]?.url || product?.assets?.[0]?.url || "";

    // Price management using SDK data
    const priceRange = variant?.priceRanges?.[0];
    const price = priceRange?.grossMin || 0;
    const currency = priceRange?.currencyCode || "EUR";

    /**
     * Construct navigation path using the variant slug
     */
    const variantSlug = variant?.slug || "";
    const productPath = `/product/${variantSlug}`;

    /**
     * Formats price according to currency and locale
     */
    const formatPrice = (value) => {
        return new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: currency,
        }).format(value);
    };

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
            className="group relative block w-full bg-[#fdfbf7] border border-[#d1d1d1] p-0 flex flex-col transition-all duration-500 hover:shadow-[20px_20px_0px_#3b82f6] no-underline h-full"
        >
            {/* Header: Technical Table */}
            <div className="flex w-full border-b border-[#d1d1d1] divide-x divide-[#d1d1d1] h-10 bg-white shrink-0">
                <div className="flex-[2] flex items-center px-3">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
                        REF. {product.id?.substring(0, 8).toUpperCase() || "WR-2026"}
                    </span>
                </div>
                <div className="flex-1 flex items-center justify-center bg-[#f3f3f3] group-hover:bg-blue-600 transition-colors duration-300">
                    <span className="text-[10px] font-bold text-black group-hover:text-white uppercase tracking-wider">Info</span>
                </div>
            </div>

            {/* Main Display: Suspended Image with Technical Grid */}
            <div className="relative flex-grow min-h-[250px] flex items-center justify-center bg-[radial-gradient(#d1d1d1_1px,transparent_1px)] [background-size:12px_12px] p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-x-4 bottom-4 h-4 bg-black/5 blur-lg rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    <img
                        src={coverUrl}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain transform transition-all duration-700 group-hover:-translate-y-4 group-hover:rotate-1"
                    />
                </div>

                <div className="absolute top-6 right-0 bg-red-600 text-white px-2 py-0.5 text-[8px] font-black uppercase -rotate-90 origin-right tracking-widest">
                    Originals
                </div>
            </div>

            {/* Footer: Data-Driven Info */}
            <div className="mt-auto p-4 bg-white border-t border-[#d1d1d1] relative shrink-0">
                <div className="flex justify-between items-end gap-2">
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-lg font-serif italic text-blue-900 leading-tight line-clamp-2 min-h-[2.5rem] flex items-center">
                            {product.name}
                        </h3>
                        <div className="flex gap-1.5 mt-2">
                            <span className="w-2.5 h-2.5 border border-black bg-yellow-400" />
                            <span className="w-2.5 h-2.5 border border-black bg-blue-600" />
                            <span className="w-2.5 h-2.5 border border-black bg-red-600" />
                        </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                        <span className="text-[8px] font-mono text-blue-600 font-bold mb-0.5 tracking-tighter uppercase">Unit Price</span>
                        <div className="text-xl font-black tracking-tighter text-black">
                            {formatPrice(price)}
                        </div>
                    </div>
                </div>

                {/* Perforated Decorative Dots */}
                <div className="flex justify-center gap-1 mt-3">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-[#d1d1d1]" />
                    ))}
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-[#fdfbf7] border-l border-b border-[#d1d1d1] -mr-3 -mt-3 rotate-45 z-10" />
        </a>
    );
};

export default CustomProductCard6;