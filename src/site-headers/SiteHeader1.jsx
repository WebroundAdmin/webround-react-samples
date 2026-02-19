// Dont'forget to import React in your code, otherwise you will receive error #31
import React, { useState, useEffect } from "react";
import { VscMenu, VscClose, VscSearch, VscArrowRight } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";

/**
 * SiteHeader1: Minimalist & Responsive Header for webround.com
 * Features inline search, solid overlays, and dynamic scroll handling.
 */
const SiteHeader1 = ({ wr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    const brandName = "WEBROUND";
    const navigation = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ];

    // Read the count of cart items
    const cartCount = wr.customer.state.cache.cart.data.items.length || 0;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <header
            className={`w-full bg-white transition-all duration-300 border-b z-[100] ${isScrolled ? "py-3 border-zinc-200 shadow-sm" : "py-6 border-transparent"
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between relative">

                {/* INLINE SEARCH OVERLAY */}
                {isSearchOpen && (
                    <div className="absolute inset-0 z-[110] bg-white flex items-center px-6 md:px-12 animate-in fade-in duration-200">
                        <form onSubmit={handleSearch} className="flex w-full items-center gap-4 border-b border-black py-2">
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search the store..."
                                className="flex-grow bg-white border-none text-black placeholder-zinc-300 text-lg md:text-xl font-medium outline-none"
                            />
                            <button type="submit" className="p-2 text-black hover:opacity-50 transition-opacity">
                                <VscArrowRight className="text-2xl" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="p-2 text-zinc-400 hover:text-black transition-colors"
                            >
                                <VscClose className="text-2xl" />
                            </button>
                        </form>
                    </div>
                )}

                {/* Mobile Menu Trigger */}
                <button
                    className="lg:hidden text-2xl text-black p-1"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <VscMenu />
                </button>

                {/* Navigation Desktop (Left side) */}
                <nav className="hidden lg:flex items-center gap-8 flex-1">
                    {navigation.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.path}
                            onClick={(e) => handleLinkClick(e, item.path)}
                            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black hover:opacity-50 transition-opacity"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Central Brand Logo */}
                <a
                    href={wr.utils.generateHref("/")}
                    onClick={(e) => handleLinkClick(e, "/")}
                    className="flex-shrink-0 cursor-pointer"
                >
                    <h1 className="text-xl md:text-2xl font-black tracking-tighter text-black uppercase">
                        {brandName}
                    </h1>
                </a>

                {/* Actions (Right side) */}
                <div className="flex items-center justify-end gap-6 flex-1">
                    <button
                        className="hidden md:block text-xl text-black hover:opacity-50 transition-opacity"
                        onClick={() => setSearchOpen(true)}
                    >
                        <VscSearch />
                    </button>

                    <a
                        href={wr.utils.generateHref("/cart")}
                        onClick={(e) => handleLinkClick(e, "/cart")}
                        className="relative flex items-center gap-1 group p-1"
                    >
                        <FiShoppingBag className="text-2xl text-black group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </a>
                </div>
            </div>

            {/* FULLSCREEN MOBILE OVERLAY */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[1000] bg-white flex flex-col w-screen h-screen overflow-hidden animate-in fade-in slide-in-from-left duration-300">
                    <div className="p-6 flex justify-between items-center border-b border-zinc-50">
                        <span className="text-lg font-black tracking-tighter uppercase">{brandName}</span>
                        <button onClick={() => setIsMenuOpen(false)} className="text-3xl p-2">
                            <VscClose />
                        </button>
                    </div>

                    <nav className="flex-1 flex flex-col justify-center items-center gap-8">
                        {navigation.map((item, idx) => (
                            <a
                                key={idx}
                                href={wr.utils.generateHref(item.path)}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                className="text-3xl font-bold uppercase tracking-widest text-black hover:opacity-50 transition-opacity"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="border-t border-zinc-100 py-12 text-center bg-zinc-50/50">
                        <p className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase mb-2">
                            © {new Date().getFullYear()} {brandName}
                        </p>
                        <p className="text-[8px] font-black uppercase text-zinc-300 tracking-tighter">
                            webround.com
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SiteHeader1;