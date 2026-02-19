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

const ShopHeader4 = ({ wr }) => {
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
            { key: "newest", label: currentLocale?.orderByLatest ?? "NEW ARRIVALS", sortBy: "createdAt", sortDirection: "desc", type: "date" },
            { key: "price_asc", label: "PRICE: LOW TO HIGH", sortBy: "price", sortDirection: "asc", type: "number" },
            { key: "price_desc", label: "PRICE: HIGH TO LOW", sortBy: "price", sortDirection: "desc", type: "number" },
        ];
        const dynamic = [];
        attributes.filter(a => a.sortable).forEach(attr => {
            dynamic.push({ key: `attr-${attr.id}-asc`, label: attr.name.toUpperCase(), sortBy: `attribute:${attr.id}`, sortDirection: "asc", type: attr.type });
        });
        return [...base, ...dynamic];
    }, [attributes, currentLocale]);

    const currentSortLabel = sortOptions.find(
        o => sortOption.sortBy === o.sortBy && sortOption.sortDirection === o.sortDirection
    )?.label || "SORT BY";

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
        <div className="w-full bg-[#0f172a] text-white border-b border-purple-500/20 font-sans relative">

            {/* SEARCH BAR INLINE (Purple Neon Overlay) */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[999] bg-[#0f172a] flex items-center px-6 md:px-12">
                    <form
                        className="flex w-full items-center gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            wr.shop.applySearch();
                            setIsSearchOpen(false);
                        }}
                    >
                        <VscSearch className="text-purple-500 text-xl" />
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => wr.shop.setSearch(e.target.value)}
                            placeholder="SEARCH CATALOG..."
                            className="w-full bg-transparent border-none text-white placeholder-white/20 text-xl md:text-2xl font-black italic outline-none uppercase tracking-tighter"
                        />
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(false); }}
                            className="p-2 text-purple-400 hover:text-white transition-colors"
                        >
                            <VscClose className="text-2xl" />
                        </button>
                    </form>
                </div>
            )}

            <div className="max-w-[1440px] mx-auto px-6 py-10 flex flex-col md:flex-row md:items-end justify-between gap-8">

                {/* TITLE & NAVIGATION */}
                <div className="flex flex-col gap-3">
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-400/60">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(null); }}
                            className="hover:text-purple-400 transition-colors"
                        >
                            SHOP
                        </button>
                        {breadcrumb.map(b => (
                            <React.Fragment key={b.id}>
                                <VscChevronRight size={10} className="text-white/20" />
                                <button
                                    onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(b.id); }}
                                    className="hover:text-purple-400 transition-colors"
                                >
                                    {b.name}
                                </button>
                            </React.Fragment>
                        ))}
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.85]">
                        {selectedLeaf?.name || breadcrumb.at(-1)?.name || "CATALOG"}<span className="text-purple-500">.</span>
                    </h1>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-4">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                        className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    >
                        <VscSearch size={22} />
                    </button>

                    <div className="relative" ref={sortRef}>
                        <button
                            onMouseDown={toggleSort}
                            className="h-14 px-8 flex items-center gap-4 bg-purple-600/20 border border-purple-500/40 text-white hover:bg-purple-500 transition-all rounded-lg font-bold uppercase italic text-sm tracking-tight"
                        >
                            {currentSortLabel}
                            <VscChevronDown className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 mt-3 w-72 bg-[#1e293b] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-[1000] p-2 rounded-xl">
                                {sortOptions.map((option) => {
                                    const isActive = sortOption.sortBy === option.sortBy && sortOption.sortDirection === option.sortDirection;
                                    return (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onMouseDown={(e) => handleSortChange(e, option)}
                                            className={`w-full flex items-center justify-between px-4 py-4 text-[11px] font-bold uppercase italic rounded-lg transition-all ${isActive ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
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

            {/* ACTIVE FILTERS */}
            {shopState.appliedTagValueIds?.length > 0 && (
                <div className="bg-black/20 border-t border-white/5 px-6 py-4 flex flex-wrap gap-3 items-center">
                    <span className="text-[10px] font-black text-purple-400/50 uppercase tracking-[0.2em] mr-2">ACTIVE_FILTERS:</span>
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
                                className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold uppercase italic text-purple-300 hover:bg-purple-500 hover:text-white transition-all rounded-md"
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
                        className="text-[10px] font-black uppercase italic text-red-400 hover:text-red-500 ml-4 border-b border-transparent hover:border-red-500 transition-all"
                    >
                        CLEAR_ALL
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopHeader4;