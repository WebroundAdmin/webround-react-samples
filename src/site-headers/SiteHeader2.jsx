// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscMenu, VscClose, VscSearch, VscArrowRight } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";

// SiteHeader2 - Streetwear Brutalist
const SiteHeader2 = ({ wr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const brandName = "WEBROUND";
    // Pre-defined routs
    const navigation = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ];

    // Read the number of cart items
    const cartCount = wr.customer.state.cache.cart.data.items.length || 0;

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
        <header className="relative w-full bg-white text-black border-b-4 border-black z-[100]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative">

                {/* Brutalist Search Overlay - Absolute within relative header */}
                {isSearchOpen && (
                    <div className="absolute inset-0 z-[110] bg-yellow-400 flex items-center px-4 md:px-8 border-b-4 border-black animate-in slide-in-from-top duration-150">
                        <form onSubmit={handleSearch} className="flex w-full items-center gap-4">
                            <VscSearch className="text-2xl md:text-3xl" />
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="SEARCH DROP..."
                                className="flex-grow bg-transparent border-none text-black placeholder-black/30 text-2xl md:text-4xl font-black italic outline-none uppercase tracking-tighter"
                            />
                            <button type="submit" className="p-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all">
                                <VscArrowRight className="text-2xl" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                            >
                                <VscClose className="text-2xl" />
                            </button>
                        </form>
                    </div>
                )}

                <div className="flex items-center gap-4 flex-1">
                    <button
                        className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <VscMenu className="text-xl md:text-2xl" />
                    </button>

                    <nav className="hidden lg:flex gap-6">
                        {navigation.map((item, idx) => (
                            <a
                                key={idx}
                                href={wr.utils.generateHref(item.path)}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                className="text-[11px] font-black uppercase tracking-tighter italic hover:line-through transition-all"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <a
                    href={wr.utils.generateHref("/")}
                    onClick={(e) => handleLinkClick(e, "/")}
                    className="flex-shrink-0 cursor-pointer"
                >
                    <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">
                        {brandName}<span className="text-yellow-400">.</span>
                    </h1>
                </a>

                <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
                    <button
                        className="hidden md:flex items-center justify-center w-10 h-10 border-2 border-black hover:bg-black hover:text-white transition-all"
                        onClick={() => setSearchOpen(true)}
                    >
                        <VscSearch className="text-xl" />
                    </button>

                    <a
                        href={wr.utils.generateHref("/cart")}
                        onClick={(e) => handleLinkClick(e, "/cart")}
                        className="relative flex items-center justify-center w-10 h-10 border-2 border-black bg-black text-white hover:bg-yellow-400 hover:text-black transition-all"
                    >
                        <FiShoppingBag className="text-xl" />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-1 border-2 border-black shadow-[2px_2px_0px_black]">
                            {cartCount}
                        </span>
                    </a>
                </div>
            </div>

            {/* Menu Overlay - absolute positioning instead of fixed */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen z-[9999] bg-yellow-400 text-black flex flex-col p-6 md:p-12 overflow-hidden animate-in fade-in duration-200">
                    <div className="flex justify-between items-center border-b-4 border-black pb-6">
                        <span className="text-4xl font-black italic tracking-tighter uppercase">{brandName}</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-all"
                        >
                            <VscClose className="text-4xl" />
                        </button>
                    </div>

                    <nav className="flex-1 flex flex-col justify-center gap-2">
                        {navigation.map((item, idx) => (
                            <a
                                key={idx}
                                href={wr.utils.generateHref(item.path)}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-left leading-none hover:text-white transition-all"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="border-t-4 border-black pt-6 flex justify-between font-black uppercase italic text-[10px] md:text-xs">
                        <div className="flex flex-col">
                            <span>{brandName} Drop 01</span>
                            <span className="text-black/40 italic tracking-widest text-[8px]">webround.com</span>
                        </div>
                        <span className="self-end">{new Date().getFullYear()}</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader2;