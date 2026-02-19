// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscMenu, VscClose, VscSearch, VscArrowRight } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";

// SiteHeader4 - Cyberpunk / Dark Glow
const SiteHeader4 = ({ wr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Read all cart items
    const cartItems = wr.customer.state.cache.cart.data.items || [];

    // Pre-defined routes
    const navigation = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ];

    // Handle SPA navigation
    const handleLinkClick = (e, path) => {
        e.preventDefault();
        // Multi-language navigation
        wr.utils.navigate(path);
        setIsMenuOpen(false);
    };

    // Execute search protocol
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        // Update search state
        wr.shop.setSearch(searchTerm);
        // Apply search to query
        wr.shop.applySearch(searchTerm);
        setSearchOpen(false);
        wr.utils.navigate("/shop");
    };

    return (
        <header className="relative w-full bg-[#0f172a] text-white border-b border-purple-500/30 font-sans z-[100] text-left">
            {/* Top glow accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.8)]" />

            <div className="max-w-[1440px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between relative">

                {/* Inline Search Bar - Absolute within header */}
                {isSearchOpen && (
                    <div className="absolute inset-0 z-[50] bg-[#0f172a] flex items-center px-6 animate-in fade-in slide-in-from-top-2 duration-200">
                        <form onSubmit={handleSearch} className="flex w-full items-center gap-4">
                            <VscSearch className="text-purple-500 text-2xl" />
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="TYPE TO SEARCH..."
                                className="flex-grow bg-transparent border-none text-purple-400 placeholder-purple-900 text-xl md:text-3xl font-black italic outline-none uppercase tracking-tighter"
                            />
                            <button type="submit" className="p-2 text-purple-400 hover:scale-110 transition-transform">
                                <VscArrowRight className="text-3xl" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="p-2 text-gray-500 hover:text-white transition-colors"
                            >
                                <VscClose className="text-3xl" />
                            </button>
                        </form>
                    </div>
                )}

                <div className="flex items-center gap-6 flex-1">
                    <button
                        className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-purple-500/20 transition-all shadow-inner"
                        onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(true); }}
                    >
                        <VscMenu className="text-xl text-purple-400" />
                    </button>
                    <nav className="hidden xl:flex gap-8">
                        {navigation.map((item, idx) => (
                            <a
                                key={idx}
                                href={wr.utils.generateHref(item.path)}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <a
                    href={wr.utils.generateHref("/")}
                    onClick={(e) => handleLinkClick(e, "/")}
                    className="flex-shrink-0 cursor-pointer group z-20"
                >
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-indigo-400 transition-transform group-hover:scale-105 text-center">
                        WEBROUND
                    </h1>
                </a>

                <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
                    <button
                        className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                        onMouseDown={(e) => { e.preventDefault(); setSearchOpen(true); }}
                    >
                        <VscSearch className="text-xl" />
                    </button>
                    <a
                        href={wr.utils.generateHref("/cart")}
                        onClick={(e) => handleLinkClick(e, "/cart")}
                        className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    >
                        <FiShoppingBag className="text-xl text-white" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-[#0f172a] text-[10px] font-black w-5 h-5 rounded-lg flex items-center justify-center border-2 border-[#0f172a]">
                                {cartItems.length}
                            </span>
                        )}
                    </a>
                </div>
            </div>

            {/* Menu Overlay - Absolute within header */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 z-[500] bg-[#070b14] flex flex-col p-8 md:p-16 w-full h-screen overflow-hidden animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-12 max-w-[1440px] mx-auto w-full">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                <span className="h-3 w-3 bg-purple-600 rounded-full animate-pulse" />
                                <span className="h-3 w-3 bg-indigo-400 rounded-full animate-pulse delay-75" />
                            </div>
                            <span className="text-purple-400 font-black italic uppercase tracking-tighter text-sm">
                                Menu Protocol v4
                            </span>
                        </div>
                        <button
                            onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
                            className="p-3 bg-white/5 rounded-2xl text-purple-400 border border-white/10 hover:bg-red-500/20 hover:text-red-400 transition-all"
                        >
                            <VscClose className="text-4xl" />
                        </button>
                    </div>

                    <div className="flex-grow flex flex-col justify-center max-w-[1440px] mx-auto w-full">
                        <div className="flex flex-col gap-6">
                            {navigation.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={wr.utils.generateHref(item.path)}
                                    onClick={(e) => handleLinkClick(e, item.path)}
                                    className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-white/60 hover:text-white hover:translate-x-6 transition-all duration-300 flex items-center gap-6 group leading-none"
                                >
                                    <span className="text-lg md:text-xl font-mono text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-12 border-t border-white/5 flex justify-between items-end max-w-[1440px] mx-auto w-full">
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em] leading-relaxed">
                            System Status: <span className="text-green-500">Verified</span><br />
                            Protocol: Webround_v4.0
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black italic text-purple-400 tracking-widest uppercase">
                                webround.com
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader4;