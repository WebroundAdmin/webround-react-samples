// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { motion } from "framer-motion";

/**
 * LANDING PAGE STYLE 6: BAUHAUS TECH
 * Concept: Geometry, modern primary colors, balanced composition, and clean lines.
 */
const LandingPage6 = ({ wr }) => {

    // Variants for background geometric shapes
    const shapeVariants = {
        initial: (i) => ({
            scale: 0,
            rotate: i * 90 + 45,
            opacity: 0
        }),
        animate: (i) => ({
            scale: 1,
            rotate: i * 90,
            opacity: 1,
            transition: {
                delay: 0.2 + i * 0.15,
                duration: 1.2,
                ease: [0.22, 1, 0.0, 1]
            }
        })
    };

    // Content animation variants
    const contentVariants = {
        initial: { opacity: 0, y: 50 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.0 + i * 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.0, 1]
            }
        })
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
        <div className="h-screen w-full flex items-center justify-center font-sans overflow-hidden relative bg-[#f0f0f0]">

            <motion.div
                initial="initial"
                animate="animate"
                className="relative w-full h-full flex flex-col items-center justify-center"
            >
                {/* GEOMETRIC BACKGROUND SHAPES */}
                <motion.div
                    custom={0} variants={shapeVariants}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-600 z-0"
                />
                <motion.div
                    custom={1} variants={shapeVariants}
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-400 rounded-full z-0"
                />
                <motion.div
                    custom={2} variants={shapeVariants}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[30px] border-blue-600 z-0"
                />

                {/* CENTRAL CONTENT */}
                <motion.div className="relative z-10 text-center">
                    <motion.h1
                        custom={0} variants={contentVariants}
                        className="text-8xl md:text-[10vw] font-black tracking-tighter mb-4 text-[#111] leading-[0.9]"
                    >
                        SHOP.
                    </motion.h1>

                    <motion.p
                        custom={1} variants={contentVariants}
                        className="text-xl md:text-2xl text-zinc-600 mb-12 tracking-wide font-light"
                    >
                        Form, Function, Future.
                    </motion.p>

                    <motion.div custom={2} variants={contentVariants}>
                        <a
                            href={wr.utils.generateHref("shop")}
                            onClick={(e) => handleNavigation(e, "shop")}
                            className="inline-block px-12 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:scale-105 transition-transform duration-300 shadow-lg no-underline"
                        >
                            Start Exploring
                        </a>
                    </motion.div>
                </motion.div>

                {/* DECORATIVE YEAR */}
                <motion.span
                    custom={3} variants={contentVariants}
                    className="absolute bottom-10 right-10 text-zinc-400 text-sm font-light tracking-widest opacity-60"
                >
                    2026
                </motion.span>
            </motion.div>
        </div>
    );
};

export default LandingPage6;