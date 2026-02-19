// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscAdd, VscDash, VscChevronDown } from "react-icons/vsc";
import RangeFilter5 from "./range-filters/RangeFilter5";
import Collections5 from "./collections/Collections5";

/**
 * ShopSidebar5: Industrial/Swiss Architectural style sidebar for webround.com
 */
const ShopSidebar5 = ({ wr }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shopState = wr?.shop?.state || {};
    const tags = shopState.cache?.tags?.items || [];
    const rangeFilters = shopState.cache?.filters?.items || [];
    const [openSections, setOpenSections] = useState({ collections: true });

    // Handles the toggling of individual filter modules
    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

    // Detect if current selection differs from the applied filter set
    const isDirty = JSON.stringify(shopState.selectedTagValueIds) !== JSON.stringify(shopState.appliedTagValueIds) ||
        JSON.stringify(shopState.selectedRangeFilters) !== JSON.stringify(shopState.appliedRangeFilters);

    return (
        /* Wide, solid container with left-aligned industrial typography */
        <div className="w-full lg:min-w-96 flex flex-col font-sans bg-white lg:border-r border-[#1a365d]/10 lg:min-h-screen text-left">

            {/* MOBILE TRIGGER - Swiss Minimalist Style */}
            <div className="lg:hidden w-full border-b border-[#1a365d]/10">
                <button
                    onMouseDown={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                    className="w-full h-16 px-6 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em] text-[#1a365d]"
                >
                    <div className="flex items-center gap-3">
                        <span>FILTER_CATALOG</span>
                        {isDirty && <div className="w-2 h-2 bg-[#c2410c] rounded-full animate-pulse" />}
                    </div>
                    <VscChevronDown className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* WRAPPER ESPANDIBILE - Smooth vertical expansion */}
            <div className={`
                ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'} 
                overflow-hidden transition-all duration-700 ease-in-out flex flex-col
            `}>

                {/* ACTION HEADER: High-impact update button */}
                <div className="sticky top-0 bg-white z-50 border-b border-[#1a365d]/10">
                    <button
                        disabled={!isDirty}
                        onMouseDown={(e) => {
                            if (!isDirty) return;
                            e.preventDefault();
                            wr.shop.applyFilters();
                            setIsExpanded(false);
                        }}
                        className={`w-full h-20 md:h-24 flex items-center justify-center text-[11px] font-black uppercase tracking-[0.4em] transition-all ${isDirty
                            ? 'bg-[#c2410c] text-white hover:bg-[#1a365d]'
                            : 'bg-zinc-50 text-[#1a365d]/30 cursor-not-allowed'
                            }`}
                    >
                        UPDATE_SYSTEM
                    </button>
                    {isDirty && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.resetFilters(); }}
                            className="w-full py-2 bg-white text-[9px] font-black uppercase tracking-[0.2em] text-[#1a365d]/40 hover:text-[#c2410c] transition-colors text-center"
                        >
                            CLEAR_ALL_PARAMETERS
                        </button>
                    )}
                </div>

                {/* GRID SECTIONS: Modular content blocks */}
                <div className="flex flex-col">
                    {/* COLLECTIONS / INDEX */}
                    <section className="border-b border-[#1a365d]/10">
                        <header
                            onMouseDown={() => toggleSection('collections')}
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                        >
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a365d]">INDEX_CATALOG</h3>
                            {openSections.collections ? <VscDash /> : <VscAdd />}
                        </header>
                        {openSections.collections && <Collections5 wr={wr} />}
                    </section>

                    {/* RANGE FILTERS MODULES */}
                    {rangeFilters.map(filter => (
                        <section key={filter.id} className="border-b border-[#1a365d]/10 pb-4">
                            <header
                                onMouseDown={() => toggleSection(filter.id)}
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                            >
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a365d]">{filter.name?.toUpperCase()}_MODULE</h3>
                                {openSections[filter.id] ? <VscDash /> : <VscAdd />}
                            </header>
                            {openSections[filter.id] && <RangeFilter5 filter={filter} wr={wr} />}
                        </section>
                    ))}

                    {/* TAGS MODULES: Full-width toggle rows */}
                    {tags.map(tag => (
                        <section key={tag.id} className="border-b border-[#1a365d]/10">
                            <header
                                onMouseDown={() => toggleSection(tag.id)}
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                            >
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a365d]">{tag.name?.toUpperCase()}</h3>
                                {openSections[tag.id] ? <VscDash /> : <VscAdd />}
                            </header>
                            {openSections[tag.id] && (
                                <div className="flex flex-col border-t border-[#1a365d]/5">
                                    {tag.values.map(val => {
                                        const isSelected = shopState.selectedTagValueIds?.includes(val.id);
                                        return (
                                            <button
                                                key={val.id}
                                                onMouseDown={(e) => { e.preventDefault(); wr.shop.toggleTagSelection(val.id); }}
                                                className={`flex items-center gap-4 py-4 px-6 text-[11px] font-bold uppercase tracking-tight transition-all border-b border-[#1a365d]/5 last:border-0 text-left w-full ${isSelected ? 'bg-[#c2410c] text-white' : 'text-[#1a365d] hover:bg-zinc-50'
                                                    }`}
                                            >
                                                <div className={`shrink-0 w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#1a365d]/20'}`} />
                                                {val.value}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* VERSION FOOTER: Build info and architecture stamp */}
                <div className="mt-auto p-8 border-t border-[#1a365d]/10 bg-white">
                    <p className="text-[9px] font-bold text-[#1a365d]/30 uppercase tracking-[0.5em] leading-relaxed text-left">
                        SYSTEM ARCHITECTURE<br />
                        BUILD 2026.02.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar5;