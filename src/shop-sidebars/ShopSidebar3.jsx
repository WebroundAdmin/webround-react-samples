// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import RangeFilter3 from "./range-filters/RangeFilter3";
import Collections3 from "./collections/Collections3";

/**
 * ShopSidebar3: Luxury minimal sidebar for webround.com with elegant typography
 */
const ShopSidebar3 = ({ wr }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shopState = wr?.shop?.state || {};
    const tags = shopState.cache?.tags?.items || [];
    const rangeFilters = shopState.cache?.filters?.items || [];
    const [openSections, setOpenSections] = useState({ collections: true });

    // Handles expanding/collapsing of sidebar sections
    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

    // Detection of changes between selected and applied filters
    const isDirty = JSON.stringify(shopState.selectedTagValueIds) !== JSON.stringify(shopState.appliedTagValueIds) ||
        JSON.stringify(shopState.selectedRangeFilters) !== JSON.stringify(shopState.appliedRangeFilters);

    return (
        /* Wide container with subtle borders and left-aligned text */
        <div className="w-full lg:w-96 flex flex-col font-sans text-zinc-800 bg-white lg:border-r border-zinc-50 lg:min-h-screen text-left">

            {/* Mobile trigger with high letter-spacing and minimal indicators */}
            <div className="lg:hidden w-full border-b border-zinc-100 bg-white sticky top-0 z-[60]">
                <button
                    onMouseDown={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                    className="w-full h-16 px-8 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-zinc-500"
                >
                    <div className="flex items-center gap-4">
                        <span>FILTERS & OPTIONS</span>
                        {isDirty && <div className="w-1 h-1 bg-orange-600 rounded-full" />}
                    </div>
                    <VscChevronDown className={`transition-transform duration-700 ${isExpanded ? 'rotate-180' : ''}`} size={14} />
                </button>
            </div>

            {/* Main content wrapper with smooth cubic-bezier transition */}
            <div className={`
                ${isExpanded ? 'max-h-[5000px] opacity-100 p-8' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:p-8'} 
                overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col gap-10
            `}>

                {/* Sticky action bar with luxury minimal buttons */}
                <div className="flex flex-col gap-4 sticky top-0 bg-white z-50 pb-6 border-b border-zinc-50 lg:relative lg:top-auto">
                    <button
                        disabled={!isDirty}
                        onMouseDown={(e) => {
                            if (!isDirty) return;
                            e.preventDefault();
                            wr.shop.applyFilters();
                            setIsExpanded(false);
                        }}
                        className={`w-full py-4 text-[10px] uppercase tracking-[0.3em] transition-all border ${isDirty
                            ? 'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800'
                            : 'bg-white text-zinc-300 border-zinc-100 cursor-not-allowed'
                            }`}
                    >
                        UPDATE RESULTS
                    </button>
                    {isDirty && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.resetFilters(); }}
                            className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors text-left"
                        >
                            RESET ALL
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-12">
                    {/* Collection navigation section */}
                    <section>
                        <header
                            onMouseDown={() => toggleSection('collections')}
                            className="flex items-center justify-between cursor-pointer mb-6 group"
                        >
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-900">CATALOG</h3>
                            {openSections.collections ? <VscChevronUp size={12} /> : <VscChevronDown size={12} />}
                        </header>
                        {openSections.collections && <Collections3 wr={wr} />}
                    </section>

                    {/* Numeric/Price range filters */}
                    {rangeFilters.map(filter => (
                        <section key={filter.id}>
                            <header
                                onMouseDown={() => toggleSection(filter.id)}
                                className="flex items-center justify-between cursor-pointer mb-6 group"
                            >
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-900">
                                    {filter.name?.toUpperCase()}
                                </h3>
                                {openSections[filter.id] ? <VscChevronUp size={12} /> : <VscChevronDown size={12} />}
                            </header>
                            {openSections[filter.id] && <RangeFilter3 filter={filter} wr={wr} />}
                        </section>
                    ))}

                    {/* Multi-selection attribute tags */}
                    {tags.map(tag => (
                        <section key={tag.id}>
                            <header
                                onMouseDown={() => toggleSection(tag.id)}
                                className="flex items-center justify-between cursor-pointer mb-6 group"
                            >
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-900">
                                    {tag.name?.toUpperCase()}
                                </h3>
                                {openSections[tag.id] ? <VscChevronUp size={12} /> : <VscChevronDown size={12} />}
                            </header>
                            {openSections[tag.id] && (
                                <div className="flex flex-col gap-1">
                                    {tag.values.map(val => {
                                        const isSelected = shopState.selectedTagValueIds?.includes(val.id);
                                        return (
                                            <button
                                                key={val.id}
                                                onMouseDown={(e) => { e.preventDefault(); wr.shop.toggleTagSelection(val.id); }}
                                                className="flex items-center justify-between py-2.5 group w-full text-left"
                                            >
                                                <span className={`text-[12px] tracking-wide transition-colors ${isSelected ? 'text-zinc-900 font-medium' : 'text-zinc-400 group-hover:text-zinc-800'
                                                    }`}>
                                                    {val.value}
                                                </span>
                                                {/* Elegant rounded indicator */}
                                                <div className={`shrink-0 w-3 h-3 rounded-full border transition-all flex items-center justify-center ${isSelected ? 'border-orange-600 bg-orange-600' : 'border-zinc-200 group-hover:border-zinc-400'
                                                    }`}>
                                                    {isSelected && <div className="w-1 h-1 bg-white rounded-full" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar3;