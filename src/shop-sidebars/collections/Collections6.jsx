// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * Collections6: Brutalist Brut-Minimal navigation with monospace typography
 */
const Collections6 = ({ wr }) => {
    const shopState = wr?.shop?.state || {};
    const breadcrumb = shopState.breadcrumb || [];
    const selectedLeaf = shopState.selectedLeaf;
    const rootCollections = shopState.cache?.collections?.items || [];

    const lastCrumb = breadcrumb[breadcrumb.length - 1];
    let currentLevel = lastCrumb?.children?.length > 0 ? lastCrumb.children : rootCollections;

    return (
        /* Monospaced, left-aligned container with a raw brutalist feel */
        <div className="flex flex-col font-mono text-left">
            {/* Functional back button with high-contrast warning colors */}
            {(breadcrumb.length > 0 || selectedLeaf) && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.goBackCollection(); }}
                    className="flex items-center gap-2 py-4 px-4 text-[10px] font-black text-red-500 border-b border-[#d1d1d1] hover:bg-red-50 transition-colors uppercase text-left"
                >
                    <span className="border border-red-500 px-1">←</span> RETURN_TO_ROOT
                </button>
            )}

            {/* List items with indexed numbering and overflow-hidden for the selection bar */}
            {currentLevel?.map((cat, idx) => {
                const isSelected = selectedLeaf?.id === cat.id;
                return (
                    <button
                        key={cat.id}
                        onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(cat.id); }}
                        className={`group flex items-center py-4 px-4 border-b border-[#d1d1d1] transition-all text-left relative overflow-hidden w-full ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-white text-gray-700'
                            }`}
                    >
                        {/* Numerical index for an archival aesthetic */}
                        <span className={`text-[9px] mr-4 shrink-0 ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                            0{idx + 1}
                        </span>

                        <span className="text-[11px] font-black uppercase tracking-tighter z-10">
                            {cat.name}
                        </span>

                        {/* Interactive prompt visible on hover for desktop users */}
                        {!isSelected && (
                            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-blue-600">
                                [SELECT]
                            </span>
                        )}

                        {/* Yellow selection accent for high-contrast visibility */}
                        {isSelected && <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400" />}
                    </button>
                );
            })}
        </div>
    );
};

export default Collections6;