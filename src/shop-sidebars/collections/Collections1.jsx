// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { VscArrowLeft, VscChevronRight } from "react-icons/vsc";

/**
 * Collections1: Handles hierarchical category navigation and breadcrumbs
 */
const Collections1 = ({ wr }) => {
    // Extracting collection and breadcrumb state from the core
    const shopState = wr?.shop?.state || {};
    const breadcrumb = shopState.breadcrumb || [];
    const selectedLeaf = shopState.selectedLeaf;
    const rootCollections = shopState.cache?.collections?.items || [];

    const lastCrumb = breadcrumb[breadcrumb.length - 1];

    // Determine which level of the category tree to display
    let currentLevel = rootCollections;
    if (lastCrumb) {
        if (lastCrumb.children && lastCrumb.children.length > 0) {
            currentLevel = lastCrumb.children;
        } else {
            currentLevel = rootCollections.find(c => c.id === lastCrumb.id)?.children || rootCollections;
        }
    }

    // Force children display if a leaf node is selected
    if (selectedLeaf && lastCrumb?.children) {
        currentLevel = lastCrumb.children;
    }

    return (
        <div className="flex flex-col gap-2 pt-2">
            {/* Back button: navigation to parent level */}
            {(breadcrumb.length > 0 || selectedLeaf) && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.goBackCollection(); }}
                    className="text-[10px] font-black uppercase text-zinc-400 hover:text-black flex items-center gap-2 mb-4 group transition-all"
                >
                    <VscArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    {selectedLeaf ? `BACK TO ${lastCrumb?.name?.toUpperCase() || 'COLLECTIONS'}` : "BACK"}
                </button>
            )}

            {/* List of current level categories */}
            <div className="flex flex-col gap-1">
                {currentLevel?.map(cat => {
                    const isSelected = selectedLeaf?.id === cat.id;
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                        <button
                            key={cat.id}
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(cat.id); }}
                            className={`group flex items-center justify-between text-left text-[13px] py-2 px-1 transition-all border-b border-transparent hover:border-zinc-100 
                                ${isSelected ? 'font-black italic underline text-black bg-zinc-50' : 'font-medium text-zinc-500 hover:text-black'}`}
                        >
                            <span className="uppercase tracking-tight">{cat.name}</span>
                            {/* Visual indicator for categories with sub-items */}
                            {hasChildren && (
                                <VscChevronRight className={`text-[10px] transition-all ${isSelected ? 'rotate-90' : 'opacity-30 group-hover:opacity-100'}`} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Collections1;