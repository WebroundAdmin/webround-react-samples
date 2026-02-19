// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { motion } from "framer-motion";

/**
 * LANDING PAGE STYLE 4: CYBER TECH
 * Concept: Terminal-inspired, neon purple aesthetics, mono fonts, and digital glitches.
 */
const LandingPage4 = ({ wr }) => {

    // Screen "boot" animation (monitor turn-on effect)
    const screenVariants = {
        initial: { opacity: 0, scaleY: 0.005, scaleX: 0 },
        animate: {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            transition: { duration: 0.4, ease: "circOut" }
        }
    };

    const textVariants = {
        initial: { opacity: 0, x: -20 },
        animate: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.5 + (i * 0.1), duration: 0.2 }
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
        <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0c] overflow-hidden relative font-mono">

            <motion.div
                variants={screenVariants}
                initial="initial"
                animate="animate"
                className="w-full h-full relative flex flex-col p-10 md:p-20 text-purple-500"
            >
                {/* SCANLINE EFFECT */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50" />

                {/* GLOW OVERLAY */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1)_0%,transparent_80%)]" />

                {/* TOP DATA HUD */}
                <div className="flex justify-between items-start z-10 opacity-50 text-[10px] tracking-widest">
                    <motion.div custom={0} variants={textVariants}>ID: WR_2026_COLLECTION</motion.div>
                    <motion.div custom={1} variants={textVariants}>LOC: 40.8518° N, 14.2681° E</motion.div>
                </div>

                {/* MAIN CONTENT */}
                <div className="mt-auto mb-auto z-10">
                    <motion.div
                        custom={2}
                        variants={textVariants}
                        className="text-purple-400 text-xs mb-4 flex items-center gap-2"
                    >
                        <span className="w-2 h-2 bg-purple-500 animate-pulse" />
                        // SYSTEM_OVERRIDE_ACTIVE
                    </motion.div>

                    <motion.h1
                        custom={3}
                        variants={textVariants}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    >
                        Webround.
                    </motion.h1>

                    <motion.div custom={4} variants={textVariants}>
                        <a
                            href={wr.utils.generateHref("shop")}
                            onClick={(e) => handleNavigation(e, "shop")}
                            className="relative group inline-block overflow-hidden border border-purple-500 px-8 py-4 uppercase font-bold tracking-[0.3em] text-sm hover:text-black transition-colors duration-300 no-underline"
                        >
                            <span className="relative z-10">Access_Store</span>
                            {/* Glitch fill effect */}
                            <div className="absolute inset-0 w-full h-full bg-purple-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                        </a>
                    </motion.div>
                </div>

                {/* FOOTER STATS */}
                <div className="mt-auto z-10 flex gap-12 opacity-40 text-[9px] uppercase tracking-widest">
                    <motion.div custom={5} variants={textVariants}>
                        Bitrate: 45.2 MB/S
                    </motion.div>
                    <motion.div custom={6} variants={textVariants}>
                        Status: Stable
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage4;