// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";
import { motion } from "framer-motion";

/**
 * LANDING PAGE STYLE 3: LUXURY MINIMAL
 * Concept: High-class editorial layout, asymmetry, and generous whitespace.
 */
const LandingPage3 = ({ wr }) => {

    // Reveal animation for the image wrapper (shutter effect)
    const imageWrapperVariants = {
        initial: { clipPath: "inset(0 100% 0 0)" },
        animate: {
            clipPath: "inset(0 0% 0 0)",
            transition: { duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 }
        }
    };

    // Text reveal animation with custom stagger logic
    const textVariants = {
        initial: { opacity: 0, y: 30 },
        animate: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.6 + custom * 0.2,
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1]
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
        <div className="h-screen w-full bg-white flex flex-col items-center justify-center font-serif overflow-hidden relative">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 items-center p-8 md:p-20">

                {/* LEFT CONTENT - TEXT SECTION */}
                <div className="col-span-1 md:col-start-1 md:col-span-5 z-10">
                    <motion.span
                        custom={0}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        className="block text-[10px] uppercase tracking-[0.6em] text-zinc-400 mb-8 font-sans"
                    >
                        Software Collective / 2026
                    </motion.span>

                    <motion.h1
                        custom={1}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-zinc-900 mb-12 tracking-tight"
                    >
                        Architecting <br />
                        <span className="italic opacity-60">the everyday.</span>
                    </motion.h1>

                    <motion.div
                        custom={2}
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <a
                            href={wr.utils.generateHref("shop")}
                            onClick={(e) => handleNavigation(e, "shop")}
                            className="group inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.4em] font-sans text-zinc-900 hover:text-zinc-500 transition-colors no-underline"
                        >
                            <span className="pb-1 border-b border-zinc-900 group-hover:border-zinc-300 transition-colors">
                                Discover Selection
                            </span>
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT CONTENT */}
                <motion.div
                    variants={imageWrapperVariants}
                    initial="initial"
                    animate="animate"
                    className="col-span-1 md:col-start-7 md:col-span-6 h-[50vh] md:h-[80vh] bg-zinc-50 relative overflow-hidden mt-12 md:mt-0"
                >
                    <div className="absolute inset-0 bg-zinc-200 animate-pulse opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-[15vw] font-sans font-black mix-blend-difference opacity-20 tracking-tighter">
                            WR.
                        </span>
                    </div>

                    {/* DECORATIVE ELEMENTS */}
                    <div className="absolute top-8 right-8 text-[10px] font-sans uppercase tracking-widest text-zinc-400 rotate-90 origin-right">
                        Vol. 03 / 2026
                    </div>
                </motion.div>

            </div>

            {/* STRUCTURAL DECORATION */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-10 left-10 right-10 h-[1px] bg-zinc-100 origin-left"
            />
        </div>
    );
};

export default LandingPage3;