// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * CustomProductCard3 - Luxury Asymmetric Template
 * @param {Object} props.wr - Global object with webround.com utilities
 */
const CustomProductCard3 = ({ wr }) => {
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
            minimumFractionDigits: 0,
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
            className="group relative w-full h-full bg-transparent p-4 transition-all duration-500 no-underline block"
        >
            {/* Floating Price Tag - Minimalist Style */}
            <div className="absolute top-0 left-6 z-20 bg-white/80 backdrop-blur-md px-3 py-1 border border-gray-100 rounded-full shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <span className="text-[11px] font-light tracking-widest italic">
                    {formatPrice(price)}
                </span>
            </div>

            {/* Asymmetric Image Frame (Organic Shape) */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[100px_20px_100px_20px] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500">
                <img
                    src={coverUrl}
                    alt={product.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Product Info - Offset Floating Card */}
            <div className="relative -mt-8 ml-8 mr-2 p-5 bg-white/90 backdrop-blur-lg border border-gray-50 shadow-xl rounded-xl z-30 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex flex-col gap-1">
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em] opacity-80">
                        Premium Selection
                    </p>
                    <h3 className="text-lg font-serif italic text-gray-900 leading-tight">
                        {product.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-1">
                            {/* Color variant visual hints */}
                            <div className="w-2 h-2 rounded-full bg-gray-800 border border-white" />
                            <div className="w-2 h-2 rounded-full bg-gray-300 border border-white" />
                            <div className="w-2 h-2 rounded-full bg-zinc-200 border border-white" />
                        </div>

                        <span className="text-[10px] font-light uppercase tracking-tighter border-b border-black pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-black">
                            Explore
                        </span>
                    </div>
                </div>
            </div>

            {/* Decorative background element */}
            <span className="absolute bottom-4 right-4 text-[40px] font-black text-gray-50 -z-10 select-none">
                03
            </span>
        </a>
    );
};

export default CustomProductCard3;