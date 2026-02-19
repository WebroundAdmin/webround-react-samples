// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { VscArrowLeft, VscChevronRight } from "react-icons/vsc";

/**
 * Collections3: Minimalist and elegant category navigation with serif typography
 */
const Collections3 = ({ wr }) => {
    const shopState = wr?.shop?.state || {};
    const breadcrumb = shopState.breadcrumb || [];
    const selectedLeaf = shopState.selectedLeaf;
    const rootCollections = shopState.cache?.collections?.items || [];

    const lastCrumb = breadcrumb[breadcrumb.length - 1];
    let currentLevel = rootCollections;

    // Determine deep-level navigation state
    if (lastCrumb?.children?.length > 0) {
        currentLevel = lastCrumb.children;
    }

    return (
        <div className="flex flex-col gap-6 text-left">
            {/* Minimal back button with wide tracking */}
            {(breadcrumb.length > 0 || selectedLeaf) && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.goBackCollection(); }}
                    className="flex items-center gap-3 group self-start"
                >
                    <VscArrowLeft className="text-zinc-300 group-hover:text-zinc-800 transition-colors" />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-800">
                        BACK
                    </span>
                </button>
            )}

            {/* List of categories with refined border-bottom dividers */}
            <div className="flex flex-col">
                {currentLevel?.map(cat => {
                    const isSelected = selectedLeaf?.id === cat.id;
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                        <button
                            key={cat.id}
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(cat.id); }}
                            className="group flex items-center justify-between py-3 border-b border-zinc-50 transition-all text-left w-full"
                        >
                            {/* Selected state features an elegant serif italic style */}
                            <span className={`text-[12px] tracking-[0.1em] transition-all ${isSelected
                                ? 'text-zinc-900 font-serif italic font-medium'
                                : 'text-zinc-400 group-hover:text-zinc-900'
                                }`}>
                                {cat.name}
                            </span>

                            {/* Dot indicator for active selection */}
                            {isSelected && <div className="w-1 h-1 bg-orange-600 rounded-full" />}

                            {/* Subtle chevron for nested levels */}
                            {hasChildren && !isSelected && (
                                <VscChevronRight className="text-zinc-200 group-hover:text-zinc-400 text-[10px]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Collections3;