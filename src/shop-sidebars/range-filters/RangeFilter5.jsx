// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * RangeFilter5: Industrial split-input design with high-contrast focus states
 */
const RangeFilter5 = ({ filter, wr }) => {
    const isPrice = filter?.type === "price";
    const isDate = filter?.type === "date";
    const value = wr.shop.state.selectedRangeFilters[filter.id]?.value ?? ["", ""];

    // Update global shop state with formatted values
    const handleChange = (index, val) => {
        const updated = [...value];
        updated[index] = isDate ? val : (val === "" ? "" : Number(val));
        wr.shop.setRangeFilter(filter.id, updated, isPrice);
    };

    return (
        <div className="flex flex-col gap-1 py-2 px-4 text-left">
            {/* Split container with internal divider for Min/Max */}
            <div className="flex flex-row h-12 border border-[#1a365d]/20">
                {[0, 1].map((i) => (
                    <input
                        key={i}
                        type={isDate ? "datetime-local" : "number"}
                        value={value[i]}
                        onChange={(e) => handleChange(i, e.target.value)}
                        placeholder={i === 0 ? "MIN" : "MAX"}
                        /* High-contrast focus state flips colors to solid blue */
                        className={`w-1/2 h-full bg-transparent px-3 text-[11px] font-black uppercase outline-none focus:bg-[#1a365d] focus:text-white transition-all ${i === 0 ? 'border-r border-[#1a365d]/20' : ''
                            }`}
                    />
                ))}
            </div>

            {/* Left-aligned industrial reset link */}
            {(value[0] !== "" || value[1] !== "") && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.resetRangeFilter(filter.id); }}
                    className="mt-2 text-[9px] font-bold uppercase tracking-widest text-[#c2410c] text-left underline underline-offset-4"
                >
                    RESET
                </button>
            )}
        </div>
    );
};

export default RangeFilter5;