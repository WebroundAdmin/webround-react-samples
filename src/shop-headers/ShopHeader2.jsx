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
    if (option.type === "string") return asc ? <BsSortAlphaDown size={18} /> : <BsSortAlphaDownAlt size={18} />;
    if (option.type === "number") return asc ? <BsSortNumericDown size={18} /> : <BsSortNumericDownAlt size={18} />;
    return asc ? <VscArrowUp size={16} /> : <VscArrowDown size={16} />;
};

const ShopHeader2 = ({ wr }) => {
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
            { key: "price_asc", label: currentLocale?.orderByPriceAsc ?? "PRICE: LOW", sortBy: "price", sortDirection: "asc", type: "number" },
            { key: "price_desc", label: currentLocale?.orderByPriceDesc ?? "PRICE: HIGH", sortBy: "price", sortDirection: "desc", type: "number" },
        ];
        const dynamic = [];
        attributes.filter(a => a.sortable).forEach(attr => {
            dynamic.push({ key: `attr-${attr.id}-asc`, label: attr.name.toUpperCase(), sortBy: `attribute:${attr.id}`, sortDirection: "asc", type: attr.type });
        });
        return [...base, ...dynamic];
    }, [attributes, currentLocale]);

    const currentSortLabel = sortOptions.find(
        o => sortOption.sortBy === o.sortBy && sortOption.sortDirection === o.sortDirection
    )?.label || "SORT";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Fixed: Use onMouseDown to intercept before document listener closes the component
     */
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
        <div className="w-full bg-white text-black border-b-4 border-black font-sans relative overflow-visible">

            {/* SEARCH BAR INLINE - Yellow overlay within header */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[150] bg-yellow-400 flex items-center px-4 md:px-8">
                    <form
                        className="flex w-full items-center gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            wr.shop.applySearch();
                            setIsSearchOpen(false);
                        }}
                    >
                        <VscSearch className="text-xl md:text-2xl shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => wr.shop.setSearch(e.target.value)}
                            placeholder="SEARCH..."
                            className="w-full bg-transparent border-none text-black placeholder-black/30 text-xl md:text-3xl font-black italic outline-none uppercase tracking-tighter"
                        />
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(false); }}
                            className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shrink-0"
                        >
                            <VscClose className="text-xl md:text-2xl" />
                        </button>
                    </form>
                </div>
            )}

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row md:items-end justify-between gap-8">

                {/* NAVIGATION & TITLE */}
                <div className="flex flex-col gap-2 min-w-0">
                    <nav className="flex items-center gap-1 text-[10px] font-black uppercase italic tracking-tighter text-black/30">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(null); }}
                            className="hover:text-black shrink-0"
                        >
                            STORE
                        </button>
                        {breadcrumb.map(b => (
                            <React.Fragment key={b.id}>
                                <VscChevronRight size={10} className="shrink-0" />
                                <span
                                    className="hover:text-black truncate cursor-pointer"
                                    onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(b.id); }}
                                >
                                    {b.name}
                                </span>
                            </React.Fragment>
                        ))}
                    </nav>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] truncate">
                        {selectedLeaf?.name || breadcrumb.at(-1)?.name || "SHOP"}<span className="text-yellow-400">.</span>
                    </h1>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-4 shrink-0">

                    <button
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                        className="w-14 h-14 flex items-center justify-center border-4 border-black hover:bg-yellow-400 transition-all shadow-[6px_6px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                        <VscSearch size={24} />
                    </button>

                    <div className="relative" ref={sortRef}>
                        <button
                            onMouseDown={toggleSort}
                            className="h-14 px-6 flex items-center gap-4 border-4 border-black bg-black text-white hover:bg-yellow-400 hover:text-black transition-all shadow-[6px_6px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 font-black uppercase italic text-sm"
                        >
                            {currentSortLabel}
                            <VscChevronDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 mt-4 w-72 bg-white border-4 border-black shadow-[10px_10px_0px_black] z-[200] p-1 max-h-[60vh] overflow-y-auto">
                                {sortOptions.map((option) => {
                                    const isActive = sortOption.sortBy === option.sortBy && sortOption.sortDirection === option.sortDirection;
                                    return (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onMouseDown={(e) => handleSortChange(e, option)}
                                            className={`w-full flex items-center justify-between px-4 py-4 text-xs font-black uppercase italic border-b-2 last:border-b-0 border-black/5 transition-all ${isActive ? 'bg-yellow-400 text-black' : 'hover:bg-zinc-50'}`}
                                        >
                                            <span className="flex items-center gap-4">
                                                {getSortIcon(option)}
                                                {option.label}
                                            </span>
                                            {isActive && <VscCheck size={20} />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* APPLIED FILTERS */}
            {shopState.appliedTagValueIds?.length > 0 && (
                <div className="bg-zinc-100 px-4 md:px-8 py-3 flex flex-wrap gap-3 items-center border-t-4 border-black">
                    <span className="text-[10px] font-black uppercase italic text-black/40 mr-2 tracking-widest">Active Filters:</span>
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
                                className="text-[10px] font-black uppercase italic px-3 py-1.5 border-2 border-black bg-white hover:bg-yellow-400 transition-all flex items-center gap-2"
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
                        className="text-[10px] font-black uppercase italic text-red-600 hover:underline ml-2"
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopHeader2;