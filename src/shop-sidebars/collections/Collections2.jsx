// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { VscArrowLeft, VscChevronRight } from "react-icons/vsc";

/**
 * Collections2: Neubrutalism style category navigation
 */
const Collections2 = ({ wr }) => {
    const shopState = wr?.shop?.state || {};
    const breadcrumb = shopState.breadcrumb || [];
    const selectedLeaf = shopState.selectedLeaf;
    const rootCollections = shopState.cache?.collections?.items || [];

    const lastCrumb = breadcrumb[breadcrumb.length - 1];
    let currentLevel = rootCollections;

    // Determine current depth in the category tree
    if (lastCrumb?.children?.length > 0) {
        currentLevel = lastCrumb.children;
    } else if (selectedLeaf && lastCrumb?.children) {
        currentLevel = lastCrumb.children;
    }

    return (
        <div className="flex flex-col gap-2">
            {/* Back button with high-contrast border and hover effect */}
            {(breadcrumb.length > 0 || selectedLeaf) && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.goBackCollection(); }}
                    className="flex items-center gap-2 mb-2 group text-left"
                >
                    <div className="w-6 h-6 border-2 border-black flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                        <VscArrowLeft className="text-xs" />
                    </div>
                    <span className="text-[10px] font-black uppercase italic tracking-tighter">
                        {selectedLeaf ? `BACK TO ${lastCrumb?.name?.toUpperCase() || 'ROOT'}` : "GO BACK"}
                    </span>
                </button>
            )}

            {/* Brutalist-style list container with solid shadow */}
            <div className="flex flex-col border-2 border-black bg-white shadow-[4px_4px_0px_black]">
                {currentLevel?.map(cat => {
                    const isSelected = selectedLeaf?.id === cat.id;
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                        <button
                            key={cat.id}
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(cat.id); }}
                            className={`group flex items-center justify-between text-left p-3 border-b-2 last:border-b-0 border-black transition-all
                                ${isSelected ? 'bg-yellow-400' : 'hover:bg-zinc-100'}`}
                        >
                            <span className={`text-[11px] font-black uppercase italic tracking-tight ${isSelected ? 'text-black' : 'text-zinc-600'}`}>
                                {cat.name}
                            </span>
                            {/* Visual indicator for nested levels */}
                            {hasChildren && !isSelected && (
                                <VscChevronRight className="opacity-40 group-hover:opacity-100" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Collections2;