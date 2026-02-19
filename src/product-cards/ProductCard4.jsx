// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * CustomProductCard4 - Pop Vibrant / Cyber Template
 * @param {Object} props.wr - Global object with webround.com utilities
 */
const CustomProductCard4 = ({ wr }) => {
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
            className="group relative block w-full h-[450px] bg-[#0f172a] rounded-[2rem] overflow-hidden p-2 transition-all duration-500 hover:ring-4 hover:ring-purple-500/50 no-underline"
        >
            {/* Animated Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Image Container with Glassmorphism effect */}
            <div className="relative w-full h-[65%] rounded-[1.8rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                    src={coverUrl}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-lighten group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-700"
                />

                {/* Suspended Neon-style Price Tag */}
                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <span className="text-slate-800 font-black text-xl tracking-tighter">
                        {formatPrice(price)}
                    </span>
                </div>
            </div>

            {/* Content Area - Exploded Layout */}
            <div className="relative p-6 flex flex-col justify-end h-[35%]">
                {/* Dynamic Title */}
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-none uppercase italic transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    {product.name}
                </h3>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-1">
                        <span className="h-1 w-8 bg-purple-500 rounded-full" />
                        <span className="h-1 w-4 bg-pink-500 rounded-full" />
                        <span className="h-1 w-2 bg-indigo-500 rounded-full" />
                    </div>

                    <p className="text-[10px] font-bold text-purple-300 tracking-[0.3em] uppercase">
                        Edition 2026
                    </p>
                </div>

                {/* Floating Action Circle */}
                <div className="absolute -top-10 left-8 w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 border-4 border-[#0f172a]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Technical Decoration */}
            <div className="absolute top-8 left-8 text-white/5 font-mono text-6xl font-black -rotate-90 pointer-events-none">
                {currency}
            </div>
        </a>
    );
};

export default CustomProductCard4;