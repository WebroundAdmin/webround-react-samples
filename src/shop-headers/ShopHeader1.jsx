// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    VscSearch, VscChevronDown, VscChevronRight, VscCheck, VscArrowUp, VscArrowDown, VscClose
} from "react-icons/vsc";
import {
    BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericDown, BsSortNumericDownAlt
} from "react-icons/bs";

const getSortIcon = (option) => {
    const asc = option.sortDirection === "asc";
    if (option.type === "string") return asc ? <BsSortAlphaDown size={16} /> : <BsSortAlphaDownAlt size={16} />;
    if (option.type === "number") return asc ? <BsSortNumericDown size={16} /> : <BsSortNumericDownAlt size={16} />;
    return asc ? <VscArrowUp size={14} /> : <VscArrowDown size={14} />;
};

const ShopHeader1 = ({ wr }) => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef(null);

    const shopState = wr?.shop?.state || {};
    const {
        breadcrumb = [],
        selectedLeaf = null,
        searchTerm = "",
        sortOption = {}
    } = shopState;

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
    )?.label || "Sort By";

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
     * Use onMouseDown to intercept the event before the 
     * document-level "handleClickOutside" closes the menu.
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

    return (
        <div className="w-full bg-white border-b border-zinc-100 font-sans relative z-50">
            <div className="max-w-[1440px] mx-auto px-6 py-8 md:py-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

                    {/* TITLE & NAVIGATION */}
                    <div className="flex flex-col gap-3">
                        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                            <button onClick={() => wr.shop.navigateToCollection(null)} className="hover:text-black transition-colors">Shop</button>
                            {breadcrumb.map(b => (
                                <React.Fragment key={b.id}>
                                    <VscChevronRight size={12} className="text-zinc-300" />
                                    <button onClick={() => wr.shop.navigateToCollection(b.id)} className="hover:text-black transition-colors">{b.name}</button>
                                </React.Fragment>
                            ))}
                        </nav>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] text-black">
                            {selectedLeaf?.name || breadcrumb.at(-1)?.name || "Catalog"}
                        </h1>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center gap-6 md:gap-10">
                        <div className="group flex items-center gap-3 border-b-2 border-zinc-200 focus-within:border-black py-2">
                            <input
                                type="text"
                                value={searchTerm}
                                placeholder="SEARCH"
                                onChange={(e) => wr.shop.setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && wr.shop.applySearch()}
                                className="bg-transparent text-xs font-bold tracking-widest outline-none w-28 md:w-40 focus:w-56 transition-all uppercase"
                            />
                            <VscSearch className="cursor-pointer text-zinc-400 group-hover:text-black" onClick={() => wr.shop.applySearch()} />
                        </div>

                        <div className="relative" ref={sortRef}>
                            <button
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsSortOpen(!isSortOpen);
                                }}
                                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest h-12 border-b-2 border-transparent hover:border-black transition-all"
                            >
                                <span className="text-zinc-400 font-medium mr-1">Sort:</span>
                                {currentSortLabel}
                                <VscChevronDown className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isSortOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white border border-zinc-100 shadow-[20px_40px_80px_rgba(0,0,0,0.08)] p-2 z-[1000]">
                                    {sortOptions.map((option) => {
                                        const isActive = sortOption.sortBy === option.sortBy && sortOption.sortDirection === option.sortDirection;
                                        return (
                                            <button
                                                key={option.key}
                                                type="button"
                                                onMouseDown={(e) => handleSortChange(e, option)}
                                                className={`w-full flex items-center justify-between px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${isActive ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-50 text-zinc-500 hover:text-black'}`}
                                            >
                                                <span className="flex items-center gap-4">
                                                    {getSortIcon(option)} {option.label}
                                                </span>
                                                {isActive && <VscCheck size={16} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTIVE FILTERS BAR */}
            {shopState.appliedTagValueIds?.length > 0 && (
                <div className="border-t border-zinc-100 bg-zinc-50/30">
                    <div className="max-w-[1440px] mx-auto px-6 py-5 flex flex-wrap gap-3 items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-2">Filters:</span>
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
                                    className="flex items-center gap-3 px-4 py-2 bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-tighter hover:border-black transition-all group"
                                >
                                    {val.value}
                                    <VscClose className="text-zinc-300 group-hover:text-red-500" />
                                </button>
                            );
                        })}
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                wr.shop.resetFilters();
                                wr.shop.applyFilters();
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 ml-4"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopHeader1;