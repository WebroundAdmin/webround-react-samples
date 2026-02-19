// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { motion } from "framer-motion";

/**
 * LANDING PAGE STYLE 2: BOLD BRUTALIST
 * Concept: High-contrast typography, structural elements, and spring-based motion.
 */
const LandingPage2 = ({ wr }) => {

    // Side stripes animation
    const stripeVariants = {
        initial: { height: 0 },
        animate: {
            height: "100%",
            transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] }
        }
    };

    // Typography entrance animation with custom stagger logic
    const textVariants = {
        initial: { x: -200, opacity: 0 },
        animate: (custom) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.2 + custom * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 15
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
        <div className="h-screen w-full flex flex-col items-center justify-center bg-yellow-400 border-[12px] border-black font-black italic overflow-hidden relative">

            {/* SIDE STRIPES */}
            <motion.div
                variants={stripeVariants}
                initial="initial"
                animate="animate"
                className="absolute left-10 top-0 w-4 bg-black hidden md:block"
            />
            <motion.div
                variants={stripeVariants}
                initial="initial"
                animate="animate"
                className="absolute right-10 bottom-0 w-4 bg-black hidden md:block"
            />

            {/* MAIN CONTENT STACK */}
            <div className="relative z-10 flex flex-col items-center select-none">
                <div className="flex flex-col text-[18vw] md:text-[14vw] leading-[0.75] tracking-[-0.05em] uppercase text-black">
                    <motion.div
                        custom={0}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        className="flex items-center"
                    >
                        <span className="bg-black text-yellow-400 px-4 py-2 transform -rotate-2">NEW</span>
                        <span className="ml-4">DROP</span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        className="text-right"
                    >
                        ONLINE
                    </motion.div>
                </div>

                {/* SUBTITLE BOX */}
                <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 2 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="mt-8 bg-black text-white px-6 py-2 text-xl md:text-2xl shadow-[8px_8px_0px_#fff]"
                >
                    COLLECTIVE // 2026
                </motion.div>
            </div>

            {/* CTA ANCHOR */}
            <motion.a
                href={wr.utils.generateHref("shop")}
                onClick={(e) => handleNavigation(e, "shop")}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="absolute bottom-0 w-full h-24 md:h-32 bg-black text-yellow-400 text-2xl md:text-4xl font-black uppercase tracking-tighter hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center group no-underline"
            >
                <span className="group-hover:mr-8 transition-all duration-300">ENTER NOW</span>
                <span className="hidden group-hover:inline">[→]</span>
            </motion.a>
        </div>
    );
};

export default LandingPage2;