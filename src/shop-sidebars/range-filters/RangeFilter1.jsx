// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * RangeFilter1: Manages numerical or date range inputs (e.g., Price, Dates)
 */
const RangeFilter1 = ({ filter, wr }) => {
    // Identify filter type to handle input formatting and state updates
    const isPrice = filter?.type === "price";
    const isDate = filter?.type === "date";

    // Pull current min/max values and cadence from the core shop state
    const value = wr.shop.state.selectedRangeFilters[filter.id]?.value ?? ["", ""];
    const cadence = wr.shop.state.sortOption?.cadence;

    /**
     * Handles local input changes and syncs with the global shop state
     */
    const handleChange = (index, val) => {
        const updated = [...value];
        // Cast to Number for price/numeric filters, keep string for dates
        updated[index] = isDate ? val : (val === "" ? "" : Number(val));

        // Global update via core utility
        wr.shop.setRangeFilter(filter.id, updated, isPrice, cadence);
    };

    return (
        <div className="flex flex-col gap-4 py-2">
            {/* Input pair for Min and Max values */}
            <div className="flex items-center gap-2">
                {[0, 1].map((i) => (
                    <div key={i} className="flex-1">
                        <input
                            type={isDate ? "datetime-local" : "number"}
                            value={value[i]}
                            onChange={(e) => handleChange(i, e.target.value)}
                            placeholder={i === 0 ? "MIN" : "MAX"}
                            className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2 text-[10px] font-bold uppercase outline-none focus:border-black transition-colors"
                        />
                        <span className="text-[8px] font-black text-zinc-400 mt-1 uppercase tracking-tighter">
                            {i === 0 ? "MINIMUM" : "MAXIMUM"}
                        </span>
                    </div>
                ))}
            </div>

            {/* Reset button: visible only when at least one bound is set */}
            {(value[0] !== "" || value[1] !== "") && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.resetRangeFilter(filter.id); }}
                    className="text-left text-[9px] font-black uppercase tracking-widest text-red-500 underline"
                >
                    RESET RANGE
                </button>
            )}
        </div>
    );
};

export default RangeFilter1;