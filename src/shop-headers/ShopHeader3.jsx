// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState, useRef, useEffect, useMemo } from "react";
import { VscSearch, VscChevronDown, VscArrowUp, VscArrowDown, VscClose } from "react-icons/vsc";
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";

/**
 * Utility to retrieve the correct sorting icon based on type and direction
 */
const getSortIcon = (option) => {
    const asc = option.sortDirection === "asc";
    if (option.type === "string") return asc ? <BsSortAlphaDown size={14} /> : <BsSortAlphaDownAlt size={14} />;
    if (option.type === "number") return asc ? <BsSortNumericDown size={14} /> : <BsSortNumericDownAlt size={14} />;
    return asc ? <VscArrowUp size={14} /> : <VscArrowDown size={14} />;
};

const ShopHeader3 = ({ wr }) => {
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
            { key: "newest", label: currentLocale?.orderByLatest ?? "New Arrivals", sortBy: "createdAt", sortDirection: "desc", type: "date" },
            { key: "price_asc", label: currentLocale?.orderByPriceAsc ?? "Price: Low to High", sortBy: "price", sortDirection: "asc", type: "number" },
            { key: "price_desc", label: currentLocale?.orderByPriceDesc ?? "Price: High to Low", sortBy: "price", sortDirection: "desc", type: "number" },
        ];
        const dynamic = [];
        attributes.filter(a => a.sortable).forEach(attr => {
            dynamic.push({ key: `attr-${attr.id}-asc`, label: attr.name, sortBy: `attribute:${attr.id}`, sortDirection: "asc", type: attr.type });
        });
        return [...base, ...dynamic];
    }, [attributes, currentLocale]);

    const currentSortLabel = sortOptions.find(
        o => sortOption.sortBy === o.sortBy && sortOption.sortDirection === o.sortDirection
    )?.label || "Sort";

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
        <div className="w-full bg-white text-zinc-800 border-b border-zinc-100 font-sans relative">

            {/* SEARCH OVERLAY - LUXURY MINIMAL */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[150] bg-white flex items-center px-6 md:px-12">
                    <form
                        className="flex w-full items-center gap-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            wr.shop.applySearch();
                            setIsSearchOpen(false);
                        }}
                    >
                        <VscSearch className="text-zinc-300 text-xl" />
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => wr.shop.setSearch(e.target.value)}
                            placeholder="Search the collection..."
                            className="w-full bg-transparent border-none text-zinc-800 placeholder-zinc-300 text-xl md:text-2xl font-serif italic outline-none"
                        />
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(false); }}
                            className="p-2 text-zinc-400 hover:text-zinc-800 transition-colors"
                        >
                            <VscClose className="text-2xl" />
                        </button>
                    </form>
                </div>
            )}

            <div className="max-w-[1440px] mx-auto px-6 py-10 md:py-16 flex flex-col items-center text-center">

                {/* BREADCRUMB - MINIMAL */}
                <nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-zinc-300 mb-6 md:mb-8">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(null); }}
                        className="hover:text-zinc-800 transition-colors"
                    >
                        Boutique
                    </button>
                    {breadcrumb.map(b => (
                        <React.Fragment key={b.id}>
                            <span className="text-zinc-200">/</span>
                            <button
                                onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(b.id); }}
                                className="hover:text-zinc-800 transition-colors"
                            >
                                {b.name}
                            </button>
                        </React.Fragment>
                    ))}
                </nav>

                {/* TITLE - SERIF LUXURY */}
                <h1 className="text-4xl md:text-6xl font-serif italic text-zinc-900 mb-10 md:mb-12 tracking-tight">
                    {selectedLeaf?.name || breadcrumb.at(-1)?.name || "Collection"}
                </h1>

                {/* CONTROLS - FLOATING STYLE */}
                <div className="flex items-center gap-8 border-t border-zinc-50 pt-10 w-full justify-center">

                    <button
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors group"
                    >
                        <VscSearch size={14} className="group-hover:scale-110 transition-transform" />
                        <span>Search</span>
                    </button>

                    <div className="w-[1px] h-4 bg-zinc-100" />

                    <div className="relative" ref={sortRef}>
                        <button
                            onMouseDown={toggleSort}
                            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors"
                        >
                            <span>{currentSortLabel}</span>
                            <VscChevronDown className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSortOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 mt-6 w-64 bg-white border border-zinc-100 shadow-[0_30px_60px_rgba(0,0,0,0.1)] z-[200] p-2">
                                {sortOptions.map((option) => {
                                    const isActive = sortOption.sortBy === option.sortBy && sortOption.sortDirection === option.sortDirection;
                                    return (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onMouseDown={(e) => handleSortChange(e, option)}
                                            className={`w-full flex items-center justify-between px-4 py-4 text-[10px] uppercase tracking-widest transition-colors ${isActive ? 'text-zinc-900 font-bold bg-zinc-50' : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50'}`}
                                        >
                                            <span className="flex items-center gap-4">
                                                {getSortIcon(option)}
                                                {option.label}
                                            </span>
                                            {isActive && <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* APPLIED FILTERS - GHOST STYLE */}
            {shopState.appliedTagValueIds?.length > 0 && (
                <div className="max-w-[1440px] mx-auto px-6 pb-12 flex flex-wrap justify-center gap-3">
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
                                className="group flex items-center gap-2 text-[9px] uppercase tracking-widest text-zinc-400 border border-zinc-100 px-4 py-2 hover:border-zinc-300 hover:text-zinc-800 transition-all"
                            >
                                {val.value}
                                <VscClose className="text-zinc-200 group-hover:text-red-500" />
                            </button>
                        );
                    })}
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            wr.shop.resetFilters();
                            wr.shop.applyFilters();
                        }}
                        className="text-[9px] uppercase tracking-[0.2em] text-zinc-300 hover:text-red-500 transition-colors ml-2 underline underline-offset-4"
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopHeader3;