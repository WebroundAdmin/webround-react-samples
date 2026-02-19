// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * RangeFilter4: Cyberpunk/Dark-themed range inputs with monospace typography
 */
const RangeFilter4 = ({ filter, wr }) => {
    const isPrice = filter?.type === "price";
    const isDate = filter?.type === "date";
    const value = wr.shop.state.selectedRangeFilters[filter.id]?.value ?? ["", ""];

    // Update global filter state on input change
    const handleChange = (index, val) => {
        const updated = [...value];
        updated[index] = isDate ? val : (val === "" ? "" : Number(val));
        wr.shop.setRangeFilter(filter.id, updated, isPrice);
    };

    return (
        <div className="flex flex-col gap-4 py-2 text-left">
            {/* Split grid for Min/Max with dark-themed styling */}
            <div className="grid grid-cols-2 gap-2">
                {[0, 1].map((i) => (
                    <div key={i} className="flex flex-col gap-1">
                        {/* Monospaced labels using code-style naming conventions */}
                        <label className="text-[8px] font-mono text-gray-500 uppercase">
                            {i === 0 ? "Lower_Limit" : "Upper_Limit"}
                        </label>
                        <input
                            type={isDate ? "datetime-local" : "number"}
                            value={value[i]}
                            onChange={(e) => handleChange(i, e.target.value)}
                            placeholder={i === 0 ? "MIN" : "MAX"}
                            className="w-full bg-[#070b14] border border-white/10 rounded-md p-2 text-[10px] font-black italic text-purple-300 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder-gray-700"
                        />
                    </div>
                ))}
            </div>

            {/* Reset button with warning syntax, aligned to the left */}
            {(value[0] !== "" || value[1] !== "") && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.resetRangeFilter(filter.id); }}
                    className="text-left text-[9px] font-mono text-red-400/50 hover:text-red-400 uppercase tracking-tighter"
                >
                    [!] RESET_FILTER
                </button>
            )}
        </div>
    );
};

export default RangeFilter4;