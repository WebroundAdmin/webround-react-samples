// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { motion } from "framer-motion";

/**
 * LANDING PAGE STYLE 5: SWISS ARCHITECTURAL
 * Concept: International Typographic Style, deep navy (#1a365d), rigid mathematical grid.
 */
const LandingPage5 = ({ wr }) => {

    // Grid container animation
    const gridVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 1, staggerChildren: 0.05 }
        }
    };

    // Cell scaling animation for the grid entry
    const boxVariants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
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
        <div className="h-screen w-full flex items-center justify-center overflow-hidden relative bg-[#1a365d] p-4 md:p-8">

            <motion.div
                variants={gridVariants}
                initial="initial"
                animate="animate"
                className="w-full h-full grid grid-cols-2 md:grid-cols-4 grid-rows-4 gap-px bg-[#ffffff20] border border-[#ffffff20]"
            >
                {/* Generating 16 grid cells */}
                {[...Array(16)].map((_, i) => (
                    <motion.div
                        key={i}
                        variants={boxVariants}
                        className="bg-[#1a365d] relative flex items-center justify-center overflow-hidden"
                    >
                        {/* CELL 5: MAIN TITLE */}
                        {i === 5 && (
                            <div className="text-white p-4 w-full">
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase"
                                >
                                    Web<br />round
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    transition={{ delay: 1.2 }}
                                    className="text-[8px] uppercase tracking-[0.4em] mt-4 font-mono"
                                >
                                    Infrastructure v4.0
                                </motion.p>
                            </div>
                        )}

                        {/* CELL 10: CTA ANCHOR */}
                        {i === 10 && (
                            <motion.a
                                href={wr.utils.generateHref("shop")}
                                onClick={(e) => handleNavigation(e, "shop")}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="w-full h-full bg-[#c2410c] text-white font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:bg-white hover:text-[#1a365d] transition-all duration-500 flex items-center justify-center no-underline text-center"
                            >
                                Enter_Store
                            </motion.a>
                        )}

                        {/* CELL 3: DECORATIVE TAG */}
                        {i === 3 && (
                            <div className="absolute top-4 left-4 text-[#ffffff30] font-mono text-[9px]">
                                03 // ARCHIVE
                            </div>
                        )}

                        {/* CELL 12: STYLIZED BACKGROUND NUMBER */}
                        {i === 12 && (
                            <span className="text-[10vw] font-black text-[#ffffff05] absolute bottom-[-20%] right-[-10%] select-none">
                                26
                            </span>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* EXTERNAL DECORATIVE BORDER */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-2 md:inset-4 border border-[#ffffff10] pointer-events-none"
            />
        </div>
    );
};

export default LandingPage5;