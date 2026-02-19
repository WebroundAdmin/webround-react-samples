// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscAdd, VscDash, VscCheck, VscSettings, VscChevronDown } from "react-icons/vsc";
import RangeFilter6 from "./range-filters/RangeFilter6";
import Collections6 from "./collections/Collections6";

/**
 * ShopSidebar6: Brutalist "Bauhaus-Tech" interface for webround.com.
 * Features a monospaced, archival aesthetic with high-contrast functional accents.
 */
const ShopSidebar6 = ({ wr }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shopState = wr?.shop?.state || {};
    const tags = shopState.cache?.tags?.items || [];
    const rangeFilters = shopState.cache?.filters?.items || [];
    const [openSections, setOpenSections] = useState({ collections: true });

    // Handle vertical expansion of modular sections
    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

    // Core validation: checks if current UI state is synchronized with the engine
    const isDirty = JSON.stringify(shopState.selectedTagValueIds) !== JSON.stringify(shopState.appliedTagValueIds) ||
        JSON.stringify(shopState.selectedRangeFilters) !== JSON.stringify(shopState.appliedRangeFilters);

    return (
        /* Wide, left-aligned sidebar with ivory background and industrial borders */
        <div className="w-full lg:w-96 flex flex-col font-mono bg-[#fdfbf7] lg:border-r border-[#d1d1d1] lg:min-h-screen text-left">

            {/* Mobile Header: Displays diagnostic status of the filter protocol */}
            <div className="lg:hidden w-full border-b border-[#d1d1d1] bg-white">
                <button
                    onMouseDown={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                    className="w-full h-14 px-4 flex items-center justify-between text-[11px] font-black uppercase tracking-tighter"
                >
                    <div className="flex items-center gap-2 text-blue-900">
                        <VscSettings className={isDirty ? "text-red-500" : ""} />
                        <span>FILTER_SETTINGS</span>
                        {isDirty && (
                            <span className="text-[8px] bg-red-500 text-white px-1.5 py-0.5 animate-pulse">
                                PENDING_CHANGES
                            </span>
                        )}
                    </div>
                    <VscChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Expandable Module Container */}
            <div className={`
                ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'} 
                overflow-hidden lg:overflow-visible transition-all duration-500 ease-in-out flex flex-col
            `}>

                {/* System Status Bar: Desktop-only diagnostic indicator */}
                <div className="hidden lg:flex h-8 border-b border-[#d1d1d1] items-center px-4 justify-between text-[9px] font-black text-gray-400 uppercase bg-white">
                    <span>FILTER_ENGINE_V2.0</span>
                    <span className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${isDirty ? 'bg-yellow-500' : 'bg-blue-600'}`} />
                        {isDirty ? 'AWAITING_EXECUTION' : 'SYNCED'}
                    </span>
                </div>

                {/* Primary Action Module: Features a heavy brutalist red shadow when active */}
                <div className="p-4 border-b border-[#d1d1d1] bg-white">
                    <button
                        disabled={!isDirty}
                        onMouseDown={(e) => {
                            if (!isDirty) return;
                            e.preventDefault();
                            wr.shop.applyFilters();
                            if (window.innerWidth < 1024) setIsExpanded(false);
                        }}
                        className={`w-full py-4 text-[11px] font-black uppercase flex items-center justify-center gap-3 transition-all border-2 ${isDirty
                            ? 'bg-blue-600 border-blue-600 text-white shadow-[4px_4px_0px_#ef4444] active:shadow-none active:translate-x-1 active:translate-y-1'
                            : 'bg-transparent border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        EXECUTE_FILTERS <VscCheck />
                    </button>
                    {isDirty && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.resetFilters(); }}
                            className="w-full mt-4 text-[9px] font-black text-red-500 hover:underline uppercase text-center"
                        >
                            CLEAR_SYSTEM_MEMORY
                        </button>
                    )}
                </div>

                {/* Section Grid: Divided modules for directory and filter parameters */}
                <div className="flex flex-col divide-y divide-[#d1d1d1] bg-[#fdfbf7]">
                    {/* Catalog Index / Collections */}
                    <section>
                        <header onMouseDown={() => toggleSection('collections')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-white group">
                            <h3 className="text-[10px] font-black uppercase text-blue-900 flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-400" /> INDEX_DIRECTORY
                            </h3>
                            {openSections.collections ? <VscDash className="text-red-500" /> : <VscAdd />}
                        </header>
                        {openSections.collections && <Collections6 wr={wr} />}
                    </section>

                    {/* Dynamic Range Protocols */}
                    {rangeFilters.map(filter => (
                        <section key={filter.id}>
                            <header onMouseDown={() => toggleSection(filter.id)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-white">
                                <h3 className="text-[10px] font-black uppercase text-blue-900 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500" /> {filter.name?.toUpperCase()}
                                </h3>
                                {openSections[filter.id] ? <VscDash className="text-red-500" /> : <VscAdd />}
                            </header>
                            {openSections[filter.id] && <RangeFilter6 filter={filter} wr={wr} />}
                        </section>
                    ))}

                    {/* Tag Modules: Rendered with a solid grid and high-contrast active states */}
                    {tags.map(tag => (
                        <section key={tag.id}>
                            <header onMouseDown={() => toggleSection(tag.id)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-white">
                                <h3 className="text-[10px] font-black uppercase text-blue-900 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500" /> {tag.name?.toUpperCase()}
                                </h3>
                                {openSections[tag.id] ? <VscDash className="text-red-500" /> : <VscAdd />}
                            </header>
                            {openSections[tag.id] && (
                                <div className="grid grid-cols-1 gap-px bg-[#d1d1d1]">
                                    {tag.values.map(val => {
                                        const isSelected = shopState.selectedTagValueIds?.includes(val.id);
                                        return (
                                            <button
                                                key={val.id}
                                                onMouseDown={(e) => { e.preventDefault(); wr.shop.toggleTagSelection(val.id); }}
                                                className={`flex items-center justify-between py-3 px-6 text-[11px] font-bold uppercase transition-all text-left w-full ${isSelected ? 'bg-red-500 text-white' : 'bg-[#fdfbf7] text-gray-600 hover:bg-white'}`}
                                            >
                                                {val.value}
                                                {isSelected && <span className="text-[8px] bg-white text-red-500 px-1 font-black shrink-0">ACTIVE</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Sidebar Footer: Bauhaus-inspired signature and build timestamp */}
                <div className="mt-auto p-6 border-t border-[#d1d1d1] bg-[#f3f3f3]">
                    <div className="flex gap-1 mb-2">
                        <div className="w-3 h-1 bg-red-500" />
                        <div className="w-1.5 h-1 bg-blue-500" />
                        <div className="w-1 h-1 bg-yellow-400" />
                    </div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-left">
                        DESIGN_PROTOCOL: 06_BAUHAUS_TECH<br />
                        LUCA_SIVIERO_DEV
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar6;