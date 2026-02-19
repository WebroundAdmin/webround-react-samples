// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscChevronDown, VscChevronUp, VscCheck, VscSettings } from "react-icons/vsc";
import RangeFilter2 from "./range-filters/RangeFilter2";
import Collections2 from "./collections/Collections2";

/**
 * ShopSidebar2: High-contrast Neubrutalist sidebar for webround.com
 */
const ShopSidebar2 = ({ wr }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shopState = wr?.shop?.state || {};
    const tags = shopState.cache?.tags?.items || [];
    const rangeFilters = shopState.cache?.filters?.items || [];
    const [openSections, setOpenSections] = useState({ collections: true, price: true });

    // Handle accordion toggle logic
    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

    // Detect state changes for UI feedback
    const isDirty = JSON.stringify(shopState.selectedTagValueIds) !== JSON.stringify(shopState.appliedTagValueIds) ||
        JSON.stringify(shopState.selectedRangeFilters) !== JSON.stringify(shopState.appliedRangeFilters);

    return (
        /* Wide sidebar with heavy borders and left-aligned content */
        <div className="w-full lg:w-96 flex flex-col font-sans text-black bg-white lg:border-r-4 border-black lg:min-h-screen text-left">

            {/* Mobile accordion trigger: Brutalist theme */}
            <div className="lg:hidden w-full border-b-4 border-black bg-white sticky top-0 z-[60]">
                <button
                    onMouseDown={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                    className="w-full h-16 px-4 flex items-center justify-between text-sm font-black uppercase italic tracking-tighter"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-1 border-2 border-black ${isDirty ? 'bg-yellow-400' : 'bg-white'}`}>
                            <VscSettings size={18} />
                        </div>
                        <span>{isDirty ? 'CHANGES DETECTED' : 'FILTER SYSTEM'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {isDirty && <span className="text-[10px] bg-black text-white px-2 py-0.5">!!!</span>}
                        <div className="p-1 border-2 border-black bg-black text-white">
                            <VscChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </button>
            </div>

            {/* Main scrollable content with solid shadow on buttons */}
            <div className={`
                ${isExpanded ? 'max-h-[5000px] opacity-100 p-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:p-8'} 
                overflow-hidden transition-all duration-500 ease-in flex flex-col gap-10 bg-white
            `}>

                {/* Main Filter Actions */}
                <div className="flex flex-col gap-2 sticky top-0 bg-white z-50 pb-4 border-b-4 border-black lg:relative lg:top-auto">
                    <button
                        disabled={!isDirty}
                        onMouseDown={(e) => {
                            if (!isDirty) return;
                            e.preventDefault();
                            wr.shop.applyFilters();
                            setIsExpanded(false);
                        }}
                        className={`w-full py-4 text-xs font-black uppercase italic tracking-tighter transition-all border-4 border-black shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 ${isDirty ? 'bg-yellow-400 text-black' : 'bg-zinc-100 text-zinc-400 border-zinc-200 shadow-none cursor-not-allowed'
                            }`}
                    >
                        APPLY FILTERS
                    </button>
                    {isDirty && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.resetFilters(); }}
                            className="w-full py-2 text-[10px] font-black uppercase italic text-zinc-400 hover:text-black transition-colors text-left"
                        >
                            RESET ALL
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-10">
                    {/* Category Navigation Section */}
                    <section>
                        <header onMouseDown={() => toggleSection('collections')} className="flex items-center justify-between cursor-pointer group mb-4">
                            <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center gap-2">
                                <span className="w-2 h-6 bg-black"></span> BROWSE
                            </h3>
                            {openSections.collections ? <VscChevronUp /> : <VscChevronDown />}
                        </header>
                        {openSections.collections && <Collections2 wr={wr} />}
                    </section>

                    {/* Numeric and Date Range Filters */}
                    {rangeFilters.map(filter => (
                        <section key={filter.id}>
                            <header onMouseDown={() => toggleSection(filter.id)} className="flex items-center justify-between cursor-pointer mb-4">
                                <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center gap-2">
                                    <span className="w-2 h-6 bg-black"></span> {filter.name?.toUpperCase()}
                                </h3>
                                {openSections[filter.id] ? <VscChevronUp /> : <VscChevronDown />}
                            </header>
                            {openSections[filter.id] && <RangeFilter2 filter={filter} wr={wr} />}
                        </section>
                    ))}

                    {/* Multi-select Attribute Tags */}
                    {tags.map(tag => (
                        <section key={tag.id}>
                            <header onMouseDown={() => toggleSection(tag.id)} className="flex items-center justify-between cursor-pointer mb-4">
                                <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center gap-2">
                                    <span className="w-2 h-6 bg-black"></span> {tag.name?.toUpperCase()}
                                </h3>
                                {openSections[tag.id] ? <VscChevronUp /> : <VscChevronDown />}
                            </header>
                            {openSections[tag.id] && (
                                <div className="grid grid-cols-1 gap-2">
                                    {tag.values.map(val => {
                                        const isSelected = shopState.selectedTagValueIds?.includes(val.id);
                                        return (
                                            <button
                                                key={val.id}
                                                onMouseDown={(e) => { e.preventDefault(); wr.shop.toggleTagSelection(val.id); }}
                                                className={`flex items-center justify-between p-3 border-2 border-black font-black uppercase italic text-[10px] transition-all text-left
                                                    ${isSelected ? 'bg-black text-white translate-x-1 shadow-[2px_2px_0px_#facc15]' : 'bg-white text-black hover:bg-zinc-50'}`}
                                            >
                                                {val.value}
                                                {isSelected && <VscCheck size={14} className="text-yellow-400" />}
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

export default ShopSidebar2;