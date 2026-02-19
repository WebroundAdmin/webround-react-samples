// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    VscSearch, VscChevronDown, VscChevronRight, VscCheck,
    VscArrowUp, VscArrowDown, VscClose
} from "react-icons/vsc";
import {
    BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt
} from "react-icons/bs";

/**
 * Utility to retrieve the correct sorting icon based on type and direction
 */
const getSortIcon = (option) => {
    const asc = option.sortDirection === "asc";
    if (option.type === "string") return asc ? <BsSortAlphaDown size={14} /> : <BsSortAlphaDownAlt size={14} />;
    if (option.type === "number") return asc ? <BsSortNumericDown size={14} /> : <BsSortNumericDownAlt size={14} />;
    return asc ? <VscArrowUp size={14} /> : <VscArrowDown size={14} />;
};

const ShopHeader5 = ({ wr }) => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const sortRef = useRef(null);

    const shopState = wr?.shop?.state || {};
    const { breadcrumb = [], selectedLeaf = null, searchTerm = "", sortOption = {} } = shopState;

    const tags = shopState.cache?.tags?.items || [];
    const attributes = shopState.cache?.attributes?.items || [];
    const currentLocale = wr?.utils?.currentLocale || {};

    const sortOptions = useMemo(() => {
        const base = [
            { key: "newest", label: currentLocale?.orderByLatest ?? "RECENT", sortBy: "createdAt", sortDirection: "desc", type: "date" },
            { key: "price_asc", label: "PRICE: LOW", sortBy: "price", sortDirection: "asc", type: "number" },
            { key: "price_desc", label: "PRICE: HIGH", sortBy: "price", sortDirection: "desc", type: "number" },
        ];
        const dynamic = [];
        attributes.filter(a => a.sortable).forEach(attr => {
            dynamic.push({ key: `attr-${attr.id}-asc`, label: attr.name.toUpperCase(), sortBy: `attribute:${attr.id}`, sortDirection: "asc", type: attr.type });
        });
        return [...base, ...dynamic];
    }, [attributes, currentLocale]);

    const currentSortLabel = sortOptions.find(
        o => sortOption.sortBy === o.sortBy && sortOption.sortDirection === o.sortDirection
    )?.label || "SORTING";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSortChange = (e, option) => {
        e.preventDefault();
        e.stopPropagation();
        if (wr?.shop?.setSort) {
            wr.shop.setSort({
                sortBy: option.sortBy,
                sortDirection: option.sortDirection
            });
            wr.shop.setPage(1);
        }
        setIsSortOpen(false);
    };

    const toggleSort = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSortOpen((prev) => !prev);
    };

    return (
        <div className="w-full bg-[#1a365d] text-white border-b border-white/20 font-sans relative">

            {/* SEARCH BAR SWISS STYLE OVERLAY */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[999] bg-white text-[#1a365d] flex items-center px-6 md:px-12">
                    <form
                        className="flex w-full items-center gap-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            wr.shop.applySearch();
                            setIsSearchOpen(false);
                        }}
                    >
                        <VscSearch className="text-2xl" />
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => wr.shop.setSearch(e.target.value)}
                            placeholder="SEARCH CATALOG..."
                            className="w-full bg-transparent border-none text-[#1a365d] placeholder-[#1a365d]/20 text-xl md:text-3xl font-black uppercase outline-none"
                        />
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(false); }}
                            className="p-4 border-l border-[#1a365d]/10 hover:text-[#c2410c] transition-colors"
                        >
                            <VscClose className="text-3xl" />
                        </button>
                    </form>
                </div>
            )}

            <div className="flex flex-col md:flex-row min-h-28 md:min-h-32">

                {/* TITLE AREA */}
                <div className="flex-grow border-r border-white/10 p-8 md:p-12 flex flex-col justify-center">
                    <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(null); }}
                            className="hover:text-white transition-colors"
                        >
                            STORE
                        </button>
                        {breadcrumb.map(b => (
                            <React.Fragment key={b.id}>
                                <VscChevronRight size={10} />
                                <button
                                    onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(b.id); }}
                                    className="hover:text-white transition-colors"
                                >
                                    {b.name}
                                </button>
                            </React.Fragment>
                        ))}
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                        {selectedLeaf?.name || breadcrumb.at(-1)?.name || "CATALOG"}
                    </h1>
                </div>

                {/* TOOLS AREA (GRID BLOCKS) */}
                <div className="flex border-t md:border-t-0 border-white/10 shrink-0">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                        className="py-4 w-24 md:w-32 flex items-center justify-center border-r border-white/10 hover:bg-white hover:text-[#1a365d] transition-all group"
                    >
                        <VscSearch size={26} className="group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="relative flex" ref={sortRef}>
                        <button
                            onMouseDown={toggleSort}
                            className={`px-10 md:px-14 py-4 flex items-center gap-5 text-[11px] font-black uppercase tracking-widest transition-all ${isSortOpen ? 'bg-[#c2410c] text-white' : 'hover:bg-white hover:text-[#1a365d]'}`}
                        >
                            {currentSortLabel}
                            <VscChevronDown className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* DROPDOWN - SWISS PRECISION */}
                        {isSortOpen && (
                            <div className="absolute top-full right-0 w-72 bg-white text-[#1a365d] shadow-[30px_30px_0px_rgba(0,0,0,0.25)] z-[1000] border-t-2 border-[#c2410c]">
                                {sortOptions.map((option) => {
                                    const isActive = sortOption.sortBy === option.sortBy && sortOption.sortDirection === option.sortDirection;
                                    return (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onMouseDown={(e) => handleSortChange(e, option)}
                                            className={`w-full flex items-center justify-between px-8 py-5 text-[11px] font-bold uppercase border-b border-[#1a365d]/5 transition-all ${isActive ? 'bg-[#1a365d] text-white' : 'hover:bg-[#f8fafc]'}`}
                                        >
                                            <span className="flex items-center gap-4">
                                                {getSortIcon(option)}
                                                {option.label}
                                            </span>
                                            {isActive && <VscCheck size={18} />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ACTIVE FILTERS BAR */}
            {shopState.appliedTagValueIds?.length > 0 && (
                <div className="flex flex-row bg-[#c2410c] border-t border-white/10 overflow-x-auto no-scrollbar p-4">
                    <div className="border-r border-white/20 flex items-center shrink-0">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">ACTIVE_FILTERS</span>
                    </div>
                    <div className="flex divide-x divide-white/10">
                        {shopState.appliedTagValueIds.map(id => {
                            const val = tags.flatMap(t => t.values).find(v => v.id === id);
                            return val && (
                                <button
                                    key={id}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        wr.shop.toggleTagSelection(id);
                                        wr.shop.applyFilters();
                                    }}
                                    className="text-[10px] font-bold uppercase hover:bg-white hover:text-[#c2410c] transition-all flex items-center gap-3 whitespace-nowrap"
                                >
                                    {val.value} <VscClose size={14} />
                                </button>
                            );
                        })}
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                wr.shop.resetFilters();
                                wr.shop.applyFilters();
                            }}
                            className="text-[10px] font-black uppercase bg-black/20 hover:bg-black transition-all"
                        >
                            CLEAR ALL
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopHeader5;