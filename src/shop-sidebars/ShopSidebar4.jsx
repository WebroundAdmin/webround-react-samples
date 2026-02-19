// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscChevronDown, VscChevronUp, VscSettings } from "react-icons/vsc";
import RangeFilter4 from "./range-filters/RangeFilter4";
import Collections4 from "./collections/Collections4";

/**
 * ShopSidebar4: Cyberpunk-themed interface with high-tech visual cues and dark mode aesthetics
 */
const ShopSidebar4 = ({ wr }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shopState = wr?.shop?.state || {};
    const tags = shopState.cache?.tags?.items || [];
    const rangeFilters = shopState.cache?.filters?.items || [];
    const [openSections, setOpenSections] = useState({ collections: true });

    // Handle accordion state for system directories and filter protocols
    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

    // Detect if the shop state differs from the last applied state
    const isDirty = JSON.stringify(shopState.selectedTagValueIds) !== JSON.stringify(shopState.appliedTagValueIds) ||
        JSON.stringify(shopState.selectedRangeFilters) !== JSON.stringify(shopState.appliedRangeFilters);

    return (
        /* Left-aligned cyber-interface container with dark background and purple accents */
        <div className="w-full lg:min-w-96 flex flex-col font-sans bg-[#0f172a] text-white lg:border-r border-purple-500/20 lg:min-h-screen shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)] text-left">

            {/* Mobile trigger: Features animated pulse status when filters are modified */}
            <div className="lg:hidden w-full border-b border-purple-500/20 bg-[#0f172a] sticky top-0 z-[60]">
                <button
                    onMouseDown={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                    className="w-full h-16 px-6 flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest"
                >
                    <div className="flex items-center gap-3 text-purple-400">
                        <VscSettings className={isDirty ? "animate-pulse text-purple-300" : "opacity-50"} />
                        <span>{isDirty ? "// PROTOCOL_MODIFIED" : "// SYSTEM_FILTERS"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {isDirty && <div className="h-1 w-8 bg-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />}
                        <VscChevronDown className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Expandable content area with "Data Stream" ease-out animation */}
            <div className={`
                ${isExpanded ? 'max-h-[5000px] opacity-100 p-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:p-6'} 
                overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col gap-8
            `}>

                {/* Primary Action Bar: Apply and Reset with gradient styling */}
                <div className="sticky top-0 bg-[#0f172a] z-50 pb-6 border-b border-white/5 lg:relative lg:top-auto">
                    <button
                        disabled={!isDirty}
                        onMouseDown={(e) => {
                            if (!isDirty) return;
                            e.preventDefault();
                            wr.shop.applyFilters();
                            setIsExpanded(false);
                        }}
                        className={`relative w-full py-4 rounded-xl font-black uppercase italic tracking-[0.1em] text-xs overflow-hidden transition-all group ${isDirty
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-95'
                            : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
                            }`}
                    >
                        <span className="relative z-10">INITIALIZE FILTERS</span>
                        {isDirty && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
                    </button>
                    {isDirty && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.resetFilters(); }}
                            className="w-full mt-3 py-1 text-[9px] font-mono text-gray-500 hover:text-red-400 transition-colors uppercase text-left"
                        >
                            {`// HARD_RESET`}
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-10">
                    {/* Categories / Directories Section */}
                    <section>
                        <header onMouseDown={() => toggleSection('collections')} className="flex items-center justify-between cursor-pointer group mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                <h3 className="text-[10px] font-black uppercase italic tracking-widest text-purple-400">DIRECTORIES</h3>
                            </div>
                            {openSections.collections ? <VscChevronUp className="text-gray-600" /> : <VscChevronDown className="text-gray-600" />}
                        </header>
                        {openSections.collections && <Collections4 wr={wr} />}
                    </section>

                    {/* Numeric and Range Protocol Section */}
                    {rangeFilters.map(filter => (
                        <section key={filter.id} className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <header onMouseDown={() => toggleSection(filter.id)} className="flex items-center justify-between cursor-pointer mb-4">
                                <h3 className="text-[10px] font-black uppercase italic tracking-widest text-purple-400 flex items-center gap-2">
                                    <span className="opacity-30">#</span> {filter.name?.toUpperCase()}
                                </h3>
                                {openSections[filter.id] ? <VscChevronUp className="text-gray-600" /> : <VscChevronDown className="text-gray-600" />}
                            </header>
                            {openSections[filter.id] && <RangeFilter4 filter={filter} wr={wr} />}
                        </section>
                    ))}

                    {/* Multi-selection Attribute Grid */}
                    {tags.map(tag => (
                        <section key={tag.id}>
                            <header onMouseDown={() => toggleSection(tag.id)} className="flex items-center justify-between cursor-pointer mb-4 group">
                                <h3 className="text-[10px] font-black uppercase italic tracking-widest text-purple-400 group-hover:text-purple-300 transition-colors">
                                    {tag.name?.toUpperCase()}
                                </h3>
                                {openSections[tag.id] ? <VscChevronUp className="text-gray-600" /> : <VscChevronDown className="text-gray-600" />}
                            </header>
                            {openSections[tag.id] && (
                                <div className="flex flex-wrap gap-2">
                                    {tag.values.map(val => {
                                        const isSelected = shopState.selectedTagValueIds?.includes(val.id);
                                        return (
                                            <button
                                                key={val.id}
                                                onMouseDown={(e) => { e.preventDefault(); wr.shop.toggleTagSelection(val.id); }}
                                                className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase italic border transition-all ${isSelected
                                                    ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-purple-500/30 hover:text-purple-300'
                                                    }`}
                                            >
                                                {val.value}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* System Information Footer: Constant branding for webround.com */}
                <div className="mt-auto pt-8 border-t border-white/5 opacity-20">
                    <div className="font-mono text-[8px] uppercase leading-relaxed text-left">
                        PLATFORM: WEBROUND<br />
                        STATUS: CORE_READY
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar4;