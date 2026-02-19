// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscMenu, VscClose, VscSearch, VscArrowRight } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";

// SiteHeader6 - Bauhaus Tech / Brutalist Archive
const SiteHeader6 = ({ wr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Reading cart items from customer state
    const cartItems = wr.customer.state.cache.cart.data.items || [];

    // Pre-defined list of routes
    const navigation = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ];

    // Handle SPA navigation protocol
    const handleLinkClick = (e, path) => {
        e.preventDefault();
        // This util allows localized navigation for multi-language websites
        wr.utils.navigate(path);
        setIsMenuOpen(false);
    };

    // Execute search protocol
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
        <header className="relative w-full bg-[#fdfbf7] border-b border-[#d1d1d1] font-mono overflow-visible text-left">

            {/* SEARCH OVERLAY - Bauhaus High Contrast */}
            {isSearchOpen && (
                <div className="absolute inset-0 z-[200] bg-blue-600 flex items-center px-4 md:px-12 animate-in fade-in duration-200">
                    <form onSubmit={handleSearch} className="flex w-full items-center gap-4">
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="SEARCH SYSTEM..."
                            className="flex-grow bg-transparent border-none text-white placeholder-blue-300 text-2xl md:text-4xl font-serif italic outline-none uppercase"
                        />
                        <button type="submit" className="text-white hover:scale-110 transition-transform">
                            <VscArrowRight className="text-3xl" />
                        </button>
                        <button type="button" onClick={() => setIsSearchOpen(false)} className="text-white ml-4">
                            <VscClose className="text-2xl" />
                        </button>
                    </form>
                </div>
            )}

            {/* Metadata Top Bar */}
            <div className="flex h-8 border-b border-[#d1d1d1] divide-x divide-[#d1d1d1] text-[9px] font-bold uppercase tracking-tighter text-gray-500">
                <div className="flex-[2] flex items-center px-4">
                    Status: <span className="text-blue-600 ml-1">Verified System 2.0</span>
                </div>
                <div className="flex-1 hidden md:flex items-center justify-center">
                    System_Date: {new Date().toLocaleDateString('en-US')}
                </div>
                <div className="flex-1 flex items-center justify-center bg-yellow-400 text-black font-black">
                    Secure_Access
                </div>
            </div>

            <div className="flex h-20 md:h-24 divide-x divide-[#d1d1d1]">
                {/* 1. Sidebar Trigger */}
                <button
                    className="w-20 md:w-24 flex flex-col items-center justify-center gap-1 hover:bg-red-500 hover:text-white transition-colors group"
                    onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(true); }}
                >
                    <VscMenu className="text-2xl" />
                    <span className="text-[8px] font-black uppercase">Menu</span>
                </button>

                {/* 2. Brand Identity */}
                <a
                    href={wr.utils.generateHref("/")}
                    onClick={(e) => handleLinkClick(e, "/")}
                    className="flex-grow flex items-center px-6 md:px-12 cursor-pointer relative group"
                >
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-4xl font-serif italic text-blue-900 leading-none">WEBROUND</h1>
                        <div className="flex gap-1 mt-1">
                            <span className="w-4 h-1 bg-red-500" />
                            <span className="w-2 h-1 bg-blue-500" />
                            <span className="w-1 h-1 bg-yellow-400" />
                        </div>
                    </div>
                </a>

                {/* 3. Utility Protocol Area */}
                <div className="flex items-center divide-x divide-[#d1d1d1]">
                    <button
                        className="w-16 md:w-20 h-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                        onMouseDown={(e) => { e.preventDefault(); setIsSearchOpen(true); }}
                    >
                        <VscSearch className="text-xl" />
                    </button>

                    <a
                        href={wr.utils.generateHref("/cart")}
                        onClick={(e) => handleLinkClick(e, "/cart")}
                        className="w-16 md:w-24 h-full flex flex-col items-center justify-center relative bg-white hover:bg-gray-50 transition-colors"
                    >
                        <FiShoppingBag className="text-2xl text-black" />
                        <span className="text-[10px] font-black mt-1">[{cartItems.length}]</span>
                        <div className="absolute right-1 flex flex-col gap-1 opacity-20">
                            {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-black" />)}
                        </div>
                    </a>
                </div>
            </div>

            {/* OVERLAY MENU - Absolute positioning */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 z-[100] bg-[#fdfbf7] min-h-screen w-full border-b-8 border-blue-500 flex flex-col md:flex-row shadow-2xl">
                    <div className="flex-1 p-8 md:p-16 border-r border-[#d1d1d1] relative">
                        <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-1 text-xs font-bold uppercase">Directory_v01</div>
                        <div className="mt-12 flex flex-col gap-2">
                            {navigation.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={wr.utils.generateHref(item.path)}
                                    onClick={(e) => handleLinkClick(e, item.path)}
                                    className="text-4xl md:text-6xl font-serif italic text-blue-900 text-left hover:text-red-500 hover:translate-x-4 transition-all flex items-baseline gap-4 group"
                                >
                                    <span className="text-xs font-mono text-gray-400 not-italic">0{idx + 1}</span>
                                    {item.label}
                                    <span className="h-[1px] flex-grow border-b border-dotted border-gray-300 opacity-0 group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-80 bg-[#f3f3f3] p-8 flex flex-col justify-between border-t md:border-t-0 border-[#d1d1d1]">
                        <button
                            onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
                            className="w-full border-2 border-black p-4 flex items-center justify-center gap-2 font-black text-sm hover:bg-black hover:text-white transition-all uppercase"
                        >
                            <VscClose className="text-xl" /> Close
                        </button>
                        <div className="text-[10px] space-y-4 uppercase tracking-wider">
                            <div>
                                <p className="font-black text-blue-600 mb-1">Specifications</p>
                                <p className="text-gray-500">Infrastructure by webround.com</p>
                            </div>
                            <div className="pt-4 border-t border-[#d1d1d1] flex justify-between font-bold">
                                <span>Type: 06_BT</span>
                                <span>Core: 2026.02</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader6;