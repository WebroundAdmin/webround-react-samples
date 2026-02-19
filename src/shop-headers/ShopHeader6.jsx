// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    VscSearch, VscChevronDown, VscCheck,
    VscArrowUp, VscArrowDown, VscClose, VscChevronRight
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

const ShopHeader6 = ({ wr }) => {
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
            { key: "newest", label: currentLocale?.orderByLatest ?? "DATA INSERIMENTO", sortBy: "createdAt", sortDirection: "desc", type: "date" },
            { key: "price_asc", label: "VALORE CRESCENTE", sortBy: "price", sortDirection: "asc", type: "number" },
            { key: "price_desc", label: "VALORE DECRESCENTE", sortBy: "price", sortDirection: "desc", type: "number" },
        ];
        const dynamic = [];
        attributes.filter(a => a.sortable).forEach(attr => {
            dynamic.push({ key: `attr-${attr.id}-asc`, label: attr.name.toUpperCase(), sortBy: `attribute:${attr.id}`, sortDirection: "asc", type: attr.type });
        });
        return [...base, ...dynamic];
    }, [attributes, currentLocale]);

    const currentSortLabel = sortOptions.find(
        o => sortOption.sortBy === o.sortBy && sortOption.sortDirection === o.sortDirection
    )?.label || "ORDINAMENTO";

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
        <div className="w-full bg-[#fdfbf7] text-black border-b border-[#d1d1d1] font-mono relative">

            {/* SEARCH OVERLAY - BAUHAUS BLUE */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[1000] bg-blue-600 flex items-center px-6 md:px-12">
                    <form
                        className="flex w-full items-center gap-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            wr.shop.applySearch();
                            setIsSearchOpen(false);
                        }}
                    >
                        <VscSearch className="text-white text-2xl" />
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => wr.shop.setSearch(e.target.value)}
                            placeholder="SEARCH..."
                            className="w-full bg-transparent border-none text-white placeholder-blue-300 text-xl md:text-3xl font-serif italic outline-none uppercase"
                        />
                        <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(false); }}
                            className="p-2 text-white border-2 border-white hover:bg-white hover:text-blue-600 transition-all"
                        >
                            <VscClose size={24} />
                        </button>
                    </form>
                </div>
            )}

            {/* INFO BAR */}
            <div className="flex h-10 border-b border-[#d1d1d1] divide-x divide-[#d1d1d1] text-[10px] font-bold uppercase tracking-tight overflow-hidden">
                <div className="flex-grow flex items-center px-6 bg-white">
                    <span className="text-blue-600 mr-2">●</span>
                    Catalog: {selectedLeaf?.name || "Root_Archive"}
                </div>
                <div className="hidden md:flex items-center px-4 text-gray-400">
                    ID_Session: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
            </div>

            <div className="flex flex-col md:flex-row min-h-28 divide-y md:divide-y-0 md:divide-x divide-[#d1d1d1]">

                {/* TITLE & BREADCRUMB */}
                <div className="flex-grow p-6 md:p-10 flex flex-col justify-center">
                    <nav className="flex items-center gap-1 text-[9px] font-bold text-gray-400 mb-3">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(null); }}
                            className="hover:text-blue-600"
                        >
                            HOME
                        </button>
                        {breadcrumb.map(b => (
                            <React.Fragment key={b.id}>
                                <VscChevronRight size={10} className="text-gray-300" />
                                <button
                                    onMouseDown={(e) => { e.preventDefault(); wr.shop.navigateToCollection(b.id); }}
                                    className="hover:text-blue-600"
                                >
                                    {b.name.toUpperCase()}
                                </button>
                            </React.Fragment>
                        ))}
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-serif italic text-blue-900 leading-tight">
                        {selectedLeaf?.name || breadcrumb.at(-1)?.name || "Store"}<span className="inline-block w-3 h-3 bg-red-500 rounded-full ml-3" />
                    </h1>
                </div>

                {/* CONTROLS */}
                <div className="flex divide-x divide-[#d1d1d1] shrink-0">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                        className="py-3 w-24 md:w-32 flex items-center justify-center hover:bg-yellow-400 transition-colors"
                    >
                        <VscSearch size={26} />
                    </button>

                    <div className="relative flex" ref={sortRef}>
                        <button
                            onMouseDown={toggleSort}
                            className={`px-10 md:px-14 py-3 flex items-center gap-4 text-[11px] font-black uppercase transition-all ${isSortOpen ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}
                        >
                            <span>{currentSortLabel}</span>
                            <VscChevronDown className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* DROPDOWN BAUHAUS */}
                        {isSortOpen && (
                            <div className="absolute top-full right-0 w-72 bg-[#f3f3f3] border-2 border-black shadow-[12px_12px_0px_#d1d1d1] z-[1000] p-1">
                                {sortOptions.map((option) => {
                                    const isActive = sortOption.sortBy === option.sortBy && sortOption.sortDirection === option.sortDirection;
                                    return (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onMouseDown={(e) => handleSortChange(e, option)}
                                            className={`w-full flex items-center justify-between px-6 py-4 text-[11px] font-bold border-b border-black/5 last:border-b-0 transition-all ${isActive ? 'bg-red-500 text-white' : 'hover:bg-white hover:text-blue-600'}`}
                                        >
                                            <span className="flex items-center gap-4 italic">
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

            {/* ACTIVE TAGS */}
            {shopState.appliedTagValueIds?.length > 0 && (
                <div className="bg-white border-t border-b border-dotted border-gray-300 px-8 py-5 flex flex-wrap gap-5 items-center">
                    <span className="text-[10px] font-black text-gray-400 tracking-widest">ACTIVE_FILTERS:</span>
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
                                className="flex items-center gap-3 px-4 py-2 bg-yellow-400 text-[11px] font-black border border-black shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                            >
                                {val.value.toUpperCase()} <VscClose size={14} />
                            </button>
                        );
                    })}
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            wr.shop.resetFilters();
                            wr.shop.applyFilters();
                        }}
                        className="text-[10px] font-black uppercase text-red-500 hover:underline underline-offset-4 ml-4"
                    >
                        RESET_ALL
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopHeader6;