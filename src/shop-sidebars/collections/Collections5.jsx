// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { VscArrowRight } from "react-icons/vsc";

/**
 * Collections5: Solid, high-contrast navigation with industrial-style borders
 */
const Collections5 = ({ wr }) => {
    const shopState = wr?.shop?.state || {};
    const breadcrumb = shopState.breadcrumb || [];
    const selectedLeaf = shopState.selectedLeaf;
    const rootCollections = shopState.cache?.collections?.items || [];

    const lastCrumb = breadcrumb[breadcrumb.length - 1];
    let currentLevel = lastCrumb?.children?.length > 0 ? lastCrumb.children : rootCollections;

    return (
        <div className="flex flex-col border-t border-[#1a365d]/10 text-left">
            {/* High-contrast back button with solid hover state */}
            {(breadcrumb.length > 0 || selectedLeaf) && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.goBackCollection(); }}
                    className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#c2410c] hover:bg-[#c2410c] hover:text-white transition-all px-4 border-b border-[#1a365d]/10 text-left"
                >
                    ← GO BACK
                </button>
            )}

            {/* List of categories with sliding arrow animation on hover */}
            {currentLevel?.map(cat => {
                const isSelected = selectedLeaf?.id === cat.id;
                return (
                    <button
                        key={cat.id}
                        onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(cat.id); }}
                        className={`group flex items-center justify-between py-5 px-4 border-b border-[#1a365d]/10 transition-all text-left w-full ${isSelected ? 'bg-[#1a365d] text-white' : 'hover:bg-[#1a365d]/5 text-[#1a365d]'
                            }`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-tight">
                            {cat.name}
                        </span>
                        {/* Hidden arrow that slides into view during interaction */}
                        <VscArrowRight className={`transition-transform duration-500 ${isSelected ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                    </button>
                );
            })}
        </div>
    );
};

export default Collections5;