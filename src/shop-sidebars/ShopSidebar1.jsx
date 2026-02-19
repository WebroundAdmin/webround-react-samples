// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscChevronDown, VscChevronUp, VscCircleFilled, VscSettings } from "react-icons/vsc";
import RangeFilter1 from "./range-filters/RangeFilter1";
import Collections1 from "./collections/Collections1";

/**
 * ShopSidebar1: Main filtering sidebar for webround.com
 */
const ShopSidebar1 = ({ wr }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shopState = wr?.shop?.state || {};
    const tags = shopState.cache?.tags?.items || [];
    const rangeFilters = shopState.cache?.filters?.items || [];

    const [openSections, setOpenSections] = useState({ collections: true, price: true });

    // Toggle visibility for sidebar sections
    const toggleSection = (id) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Check if filters were modified but not yet applied
    const isDirty = JSON.stringify(shopState.selectedTagValueIds) !== JSON.stringify(shopState.appliedTagValueIds) ||
        JSON.stringify(shopState.selectedRangeFilters) !== JSON.stringify(shopState.appliedRangeFilters);

    return (
        /* Wider container (lg:w-96) with left-aligned text */
        <div className="w-full lg:w-96 flex flex-col font-sans text-black bg-white lg:border-r border-zinc-100 lg:min-h-screen text-left">

            {/* Mobile accordion trigger */}
            <div className="lg:hidden w-full border-b border-zinc-100 bg-white sticky top-0 z-[60]">
                <button
                    onMouseDown={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                    className="w-full h-14 px-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]"
                >
                    <div className="flex items-center gap-2">
                        <VscSettings className={isDirty ? "text-black" : "text-zinc-400"} />
                        <span>FILTERS</span>
                        {isDirty && <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full ml-2">MODIFIED</span>}
                    </div>
                    <VscChevronDown className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Main scrollable filter container */}
            <div className={`
                ${isExpanded ? 'max-h-[5000px] opacity-100 p-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:p-8'} 
                overflow-hidden transition-all duration-500 ease-in-out flex flex-col gap-10 bg-white
            `}>

                {/* Filter actions: Apply and Reset - text-left alignment */}
                <div className="flex flex-col gap-2 sticky top-0 bg-white z-10 pb-4 border-b border-zinc-50 lg:relative lg:top-auto">
                    <button
                        disabled={!isDirty}
                        onMouseDown={(e) => {
                            if (!isDirty) return;
                            e.preventDefault();
                            wr.shop.applyFilters();
                            setIsExpanded(false);
                        }}
                        className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-sm ${isDirty ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                            }`}
                    >
                        APPLY FILTERS
                    </button>
                    {isDirty && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.resetFilters(); }}
                            className="w-full py-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors text-left"
                        >
                            RESET ALL
                        </button>
                    )}
                </div>

                {/* Collections navigation section */}
                <section className="space-y-4">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); toggleSection('collections'); }}
                        className="w-full flex items-center justify-between border-b-2 border-black pb-2 text-left"
                    >
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">BROWSE</span>
                        {openSections.collections ? <VscChevronUp /> : <VscChevronDown />}
                    </button>
                    {openSections.collections && <Collections1 wr={wr} />}
                </section>

                {/* Numerical and date range filters */}
                {rangeFilters.map(filter => (
                    <section key={filter.id} className="border-b border-zinc-100 pb-4">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); toggleSection(filter.id); }}
                            className="w-full flex items-center justify-between mb-4 text-left"
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{filter.name?.toUpperCase()}</span>
                            {openSections[filter.id] ? <VscChevronUp /> : <VscChevronDown />}
                        </button>
                        {openSections[filter.id] && <RangeFilter1 filter={filter} wr={wr} />}
                    </section>
                ))}

                {/* Attribute tags selection */}
                {tags.map(tag => (
                    <section key={tag.id} className="border-b border-zinc-100 pb-4">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); toggleSection(tag.id); }}
                            className="w-full flex items-center justify-between mb-4 text-left"
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{tag.name?.toUpperCase()}</span>
                            {openSections[tag.id] ? <VscChevronUp /> : <VscChevronDown />}
                        </button>
                        {openSections[tag.id] && (
                            <div className="flex flex-col gap-3">
                                {tag.values.map(val => {
                                    const isSelected = shopState.selectedTagValueIds?.includes(val.id);
                                    return (
                                        <button
                                            key={val.id}
                                            onMouseDown={(e) => { e.preventDefault(); wr.shop.toggleTagSelection(val.id); }}
                                            className="flex items-center gap-3 group text-left w-full"
                                        >
                                            <div className={`shrink-0 w-4 h-4 border flex items-center justify-center transition-colors ${isSelected ? 'bg-black border-black' : 'border-zinc-300 group-hover:border-black'
                                                }`}>
                                                {isSelected && <VscCircleFilled className="text-white text-[8px]" />}
                                            </div>
                                            <span className={`text-[12px] uppercase tracking-wider transition-colors ${isSelected ? 'font-black italic' : 'text-zinc-500 group-hover:text-black'
                                                }`}>
                                                {val.value}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ShopSidebar1;