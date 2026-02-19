// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscMenu, VscClose, VscSearch, VscArrowRight } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";

// SiteHeader5 - Architectural / Swiss Grid Template
const SiteHeader5 = ({ wr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Reading cart items from customer state
    const cartItems = wr.customer.state.cache.cart.data.items || [];

    // Pre-defined set out routes
    const navigation = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ];

    // Handle SPA navigation protocol
    const handleNavigate = (path) => {
        // Multi-language navigation
        wr.utils.navigate(path);
        setIsMenuOpen(false);
    };

    // Execute search and redirect
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        // The setSearch operation changes state
        wr.shop.setSearch(searchTerm);
        // The applySearch operation pushes the state to the query
        wr.shop.applySearch(searchTerm);
        setIsSearchOpen(false);
        wr.utils.navigate("/shop");
    };

    return (
        <header className="relative w-full bg-[#1a365d] text-white border-b border-white/10 overflow-visible font-sans text-left">

            {/* SEARCH OVERLAY - Absolute positioning within header context */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[200] bg-white text-[#1a365d] flex items-center px-4 md:px-12 animate-in fade-in duration-300">
                    <form onSubmit={handleSearch} className="flex w-full items-center gap-6">
                        <span className="hidden md:block text-xs font-black uppercase tracking-[0.3em]">Search_Module</span>
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="SEARCH PRODUCTS..."
                            className="flex-grow bg-transparent border-none text-[#1a365d] placeholder-[#1a365d]/30 text-2xl md:text-5xl font-black uppercase outline-none"
                        />
                        <button type="submit" className="hover:text-[#c2410c] transition-colors">
                            <VscArrowRight className="text-4xl" />
                        </button>
                        <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-4 border-l border-[#1a365d]/10 pl-4">
                            <VscClose className="text-3xl" />
                        </button>
                    </form>
                </div>
            )}

            <div className="flex flex-row h-20 md:h-24">

                {/* 1. Sidebar Trigger */}
                <button
                    className="w-20 md:w-24 h-full border-r border-white/20 flex items-center justify-center hover:bg-[#c2410c] transition-colors duration-500"
                    onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(true); }}
                >
                    <VscMenu className="text-2xl" />
                </button>

                {/* 2. Brand/Logo Area */}
                <a
                    href={wr.utils.generateHref("/")}
                    className="flex-grow flex items-center px-8 cursor-pointer group"
                    onClick={(e) => { e.preventDefault(); handleNavigate("/"); }}
                >
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-black tracking-[-0.05em] uppercase leading-none">
                            WEBROUND
                        </h1>
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/40 group-hover:text-[#c2410c] transition-colors">
                            Architectural System
                        </span>
                    </div>
                </a>

                {/* 3. Desktop Navigation */}
                <nav className="hidden xl:flex items-center border-l border-white/20">
                    {navigation.map((item, idx) => (
                        <a
                            key={idx}
                            href={wr.utils.generateHref(item.path)}
                            onClick={(e) => { e.preventDefault(); handleNavigate(item.path); }}
                            className="h-full flex items-center px-8 text-[10px] font-bold uppercase tracking-widest border-r border-white/10 hover:bg-white hover:text-[#1a365d] transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* 4. Cart & Utility */}
                <div className="flex items-center border-l border-white/20">
                    <button
                        className="hidden md:flex w-20 h-full items-center justify-center border-r border-white/10 hover:text-[#c2410c] transition-colors"
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                    >
                        <VscSearch className="text-xl" />
                    </button>
                    <a
                        href={wr.utils.generateHref("/cart")}
                        className="w-20 md:w-24 h-full flex items-center justify-center bg-white text-[#1a365d] hover:bg-[#c2410c] hover:text-white transition-all group"
                        onClick={(e) => { e.preventDefault(); handleNavigate("/cart"); }}
                    >
                        <div className="relative">
                            <FiShoppingBag className="text-2xl" />
                            <span className="absolute -top-3 -right-3 text-[10px] font-black group-hover:scale-125 transition-transform">
                                ({cartItems.length})
                            </span>
                        </div>
                    </a>
                </div>
            </div>

            {/* MENU OVERLAY - Absolute positioning */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full min-h-screen z-[300] bg-[#c2410c] flex flex-col md:flex-row">
                    {/* Left decorative column */}
                    <div className="hidden md:flex w-24 border-r border-white/20 flex-col justify-end py-12 items-center">
                        <span className="text-white/60 text-xs font-bold uppercase rotate-180 [writing-mode:vertical-lr] tracking-[0.5em]">
                            WEBROUND — 2026
                        </span>
                    </div>

                    <div className="flex-grow flex flex-col p-8 md:p-16 relative">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
                            className="absolute top-8 right-8 text-white/60 hover:text-white border border-white/20 p-4 rounded-full transition-all"
                        >
                            <VscClose className="text-4xl" />
                        </button>

                        <div className="mt-12 md:mt-24">
                            <p className="text-[12px] font-bold uppercase tracking-[0.3em] mb-8 text-white/60">Index Directory</p>
                            <div className="flex flex-col gap-4">
                                {navigation.map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={wr.utils.generateHref(item.path)}
                                        onClick={(e) => { e.preventDefault(); handleNavigate(item.path); }}
                                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-left leading-none hover:pl-8 transition-all group"
                                    >
                                        <span className="text-transparent [-webkit-text-stroke:1px_white] group-hover:text-white">
                                            {item.label}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/20 pt-8">
                            <div>
                                <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Developed by</p>
                                <p className="text-sm font-black italic">webround.com</p>
                            </div>
                            <div className="md:text-right uppercase">
                                <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Platform Engine</p>
                                <p className="text-sm font-black italic underline">webround.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader5;