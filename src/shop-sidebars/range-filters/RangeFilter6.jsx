// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * RangeFilter6: Brutalist grid inputs with monospace typography and high-contrast borders
 */
const RangeFilter6 = ({ filter, wr }) => {
    const isPrice = filter?.type === "price";
    const isDate = filter?.type === "date";
    const value = wr.shop.state.selectedRangeFilters[filter.id]?.value ?? ["", ""];

    // Update global shop state with new range values
    const handleChange = (index, val) => {
        const updated = [...value];
        updated[index] = isDate ? val : (val === "" ? "" : Number(val));
        wr.shop.setRangeFilter(filter.id, updated, isPrice);
    };

    return (
        /* Monospaced container with archival gray background and left-alignment */
        <div className="flex flex-col gap-3 py-4 px-4 font-mono bg-[#f3f3f3]/50 border-x border-[#d1d1d1] text-left">

            {/* Grid container with a 1px gap to simulate internal borders */}
            <div className="grid grid-cols-2 gap-px bg-[#d1d1d1] border border-[#d1d1d1]">
                {[0, 1].map((i) => (
                    <div key={i} className="bg-[#fdfbf7] p-2 flex flex-col gap-1">
                        {/* Technical parameter labels */}
                        <span className="text-[8px] font-bold text-gray-400 uppercase">
                            {i === 0 ? "PARAM_MIN" : "PARAM_MAX"}
                        </span>
                        <input
                            type={isDate ? "datetime-local" : "number"}
                            value={value[i]}
                            onChange={(e) => handleChange(i, e.target.value)}
                            placeholder="00.00"
                            className="w-full bg-transparent text-[11px] font-black text-blue-900 outline-none placeholder-gray-300"
                        />
                    </div>
                ))}
            </div>

            {/* Warning-style reset button aligned to the left */}
            {(value[0] !== "" || value[1] !== "") && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.resetRangeFilter(filter.id); }}
                    className="text-[9px] font-black text-red-500 uppercase flex items-center gap-1 text-left"
                >
                    <span className="shrink-0 w-2 h-2 bg-red-500" /> NULLIFY_RANGE
                </button>
            )}
        </div>
    );
};

export default RangeFilter6;