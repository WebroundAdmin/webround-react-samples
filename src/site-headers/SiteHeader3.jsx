// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState } from "react";
import { VscMenu, VscClose, VscSearch, VscArrowRight } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";

// SiteHeader3 - Luxury Minimal
const SiteHeader3 = ({ wr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const brandName = "WEBROUND";

    // Pre-defined routes
    const navigation = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ];

    // Read the count of cart items
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
        <header className="relative w-full bg-white text-zinc-900 border-b border-zinc-100 z-[100] text-left">
            <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between relative">

                {/* Inline Search Overlay */}
                {isSearchOpen && (
                    <div className="absolute inset-0 z-[110] bg-white flex items-center px-6 animate-in fade-in duration-200">
                        <form onSubmit={handleSearch} className="flex w-full items-center gap-4">
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search the boutique..."
                                className="flex-grow bg-white border-none text-zinc-800 placeholder-zinc-300 text-xl md:text-2xl font-serif italic outline-none"
                            />
                            <button type="submit" className="p-2 text-zinc-800 hover:text-orange-600">
                                <VscArrowRight className="text-2xl" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="p-2 text-zinc-400"
                            >
                                <VscClose className="text-2xl" />
                            </button>
                        </form>
                    </div>
                )}

                {/* Desktop Nav / Mobile Trigger */}
                <div className="flex-1 flex items-center">
                    <nav className="hidden lg:flex items-center gap-10">
                        {navigation.map((item, idx) => (
                            <a
                                key={idx}
                                href={wr.utils.generateHref(item.path)}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                className="text-[10px] font-light uppercase tracking-[0.3em] hover:text-orange-600 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <button
                        className="lg:hidden p-2 text-zinc-500 hover:text-zinc-900"
                        onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(true); }}
                    >
                        <VscMenu className="text-xl" />
                    </button>
                </div>

                {/* Branding */}
                <a
                    href={wr.utils.generateHref("/")}
                    onClick={(e) => handleLinkClick(e, "/")}
                    className="flex-shrink-0 text-center px-4 group"
                >
                    <h1 className="text-2xl md:text-3xl font-serif italic tracking-tight text-zinc-900">
                        {brandName}
                    </h1>
                    <div className="w-8 h-[1px] bg-orange-200 mx-auto mt-1 group-hover:w-12 transition-all duration-500" />
                </a>

                {/* Right Utilities */}
                <div className="flex-1 flex items-center justify-end gap-6 md:gap-8">
                    <button
                        className="text-zinc-400 hover:text-zinc-900 transition-colors"
                        onMouseDown={(e) => { e.preventDefault(); setSearchOpen(true); }}
                    >
                        <VscSearch className="text-lg" />
                    </button>

                    <a
                        href={wr.utils.generateHref("/cart")}
                        onClick={(e) => handleLinkClick(e, "/cart")}
                        className="group relative flex items-center gap-2"
                    >
                        <span className="hidden md:block text-[10px] font-light uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                            Bag
                        </span>
                        <div className="relative">
                            <FiShoppingBag className="text-xl font-light" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full border border-white animate-pulse" />
                            )}
                        </div>
                    </a>
                </div>
            </div>

            {/* Menu Overlay - Absolute Positioning */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 z-[500] bg-white w-full h-screen flex flex-col items-center justify-between p-8 pt-32 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
                        className="absolute top-8 right-8 p-4 text-zinc-400 hover:text-zinc-900"
                    >
                        <VscClose className="text-4xl" />
                    </button>

                    <div className="flex flex-col items-center gap-12 w-full">
                        <div className="text-center">
                            <p className="text-[10px] uppercase tracking-[.5em] text-orange-600 font-bold mb-4">Directory</p>
                            <div className="w-12 h-[1px] bg-orange-200 mx-auto" />
                        </div>

                        <nav className="flex flex-col items-center gap-8">
                            {navigation.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={wr.utils.generateHref(item.path)}
                                    onClick={(e) => handleLinkClick(e, item.path)}
                                    className="text-4xl md:text-5xl font-serif italic text-zinc-800 hover:text-orange-600 transition-all"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto flex flex-col items-center gap-6 pb-12 w-full text-center">
                        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                            <span className="hover:text-zinc-900 cursor-pointer">Instagram</span>
                            <span className="hover:text-zinc-900 cursor-pointer">Contact</span>
                        </div>
                        <div>
                            <p className="text-[9px] text-zinc-300 italic">© {brandName} Archive</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-200 mt-2">
                                webround.com
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader3;