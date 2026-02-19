// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * LANDING PAGE STYLE 1: MINIMAL SOFT
 * Concept: Minimalist aesthetics, high whitespace, and automated ethereal entry animations.
 */
const LandingPage1 = ({ wr }) => {

    // Container variants for staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            }
        }
    };

    // Variants for text and button elements
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
        }
    };

    // Background decoration variants
    const bgVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2 } }
    };

    /**
     * Handles navigation by preventing default anchor behavior
     * and triggering the SDK navigation utility.
     */
    const handleNavigation = (e, path) => {
        e.preventDefault();
        wr.utils.navigate(path);
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white font-sans overflow-hidden relative">

            {/* BACKGROUND DECORATION */}
            <motion.div
                variants={bgVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-100 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-200 rounded-full blur-[120px]" />
            </motion.div>

            <motion.div
                className="relative z-10 text-center px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* SUBTITLE */}
                <motion.span
                    variants={itemVariants}
                    className="text-[10px] md:text-[12px] font-medium tracking-[0.5em] uppercase text-zinc-400 block mb-4"
                >
                    New Collection
                </motion.span>

                {/* MAIN TITLE */}
                <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-[10vw] font-light tracking-tighter text-zinc-900 leading-[0.9] mb-12"
                >
                    Essenza <br />
                    <span className="italic font-serif opacity-80 pl-8 md:pl-20">2026.</span>
                </motion.h1>

                {/* CTA ANCHOR */}
                <motion.div variants={itemVariants}>
                    <a
                        href={wr.utils.generateHref("shop")}
                        onClick={(e) => handleNavigation(e, "shop")}
                        className="group relative inline-flex items-center gap-6 mx-auto px-10 py-5 bg-transparent border border-zinc-200 hover:border-zinc-900 transition-all duration-700 rounded-full overflow-hidden no-underline"
                    >
                        <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-900 group-hover:text-white transition-colors duration-500">
                            Shop Now
                        </span>
                        <ArrowRight
                            size={18}
                            className="relative z-10 text-zinc-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-500"
                        />
                    </a>
                </motion.div>
            </motion.div>

            {/* FOOTER HINT */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-300 text-[9px] uppercase tracking-[0.2em]"
            >
                Welcome
            </motion.div>
        </div>
    );
};

export default LandingPage1;