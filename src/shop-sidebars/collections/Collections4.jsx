// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { VscChevronRight, VscCircleFilled } from "react-icons/vsc";

/**
 * Collections4: Sci-fi / Cyberpunk styled category navigation
 */
const Collections4 = ({ wr }) => {
    const shopState = wr?.shop?.state || {};
    const breadcrumb = shopState.breadcrumb || [];
    const selectedLeaf = shopState.selectedLeaf;
    const rootCollections = shopState.cache?.collections?.items || [];

    const lastCrumb = breadcrumb[breadcrumb.length - 1];
    let currentLevel = (lastCrumb?.children?.length > 0) ? lastCrumb.children : rootCollections;

    return (
        <div className="flex flex-col gap-2 text-left">
            {/* Monospaced back button with code-style syntax */}
            {(breadcrumb.length > 0 || selectedLeaf) && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.goBackCollection(); }}
                    className="flex items-center gap-2 mb-2 text-[10px] font-mono text-purple-400/60 hover:text-purple-400 transition-colors uppercase tracking-widest"
                >
                    <span>{`// BACK`}</span>
                </button>
            )}

            {/* Grid of futuristic buttons with glow effects */}
            <div className="grid grid-cols-1 gap-1">
                {currentLevel?.map(cat => {
                    const isSelected = selectedLeaf?.id === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(cat.id); }}
                            className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-300 w-full text-left ${isSelected
                                ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Pulse animation for the active selection indicator */}
                                <VscCircleFilled className={`text-[8px] ${isSelected ? 'text-purple-500 animate-pulse' : 'text-gray-600'}`} />
                                <span className={`text-[11px] font-black uppercase italic tracking-tighter ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                    {cat.name}
                                </span>
                            </div>
                            <VscChevronRight className={`transition-transform ${isSelected ? 'translate-x-1 text-purple-500' : 'text-gray-700'}`} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Collections4;