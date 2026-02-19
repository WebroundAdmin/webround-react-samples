// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * RangeFilter3: Minimalist input fields with bottom-only borders and wide tracking
 */
const RangeFilter3 = ({ filter, wr }) => {
    const isPrice = filter?.type === "price";
    const isDate = filter?.type === "date";
    const value = wr.shop.state.selectedRangeFilters[filter.id]?.value ?? ["", ""];
    const cadence = wr.shop.state.sortOption?.cadence;

    // Sync input values with global store
    const handleChange = (index, val) => {
        const updated = [...value];
        updated[index] = isDate ? val : (val === "" ? "" : Number(val));
        wr.shop.setRangeFilter(filter.id, updated, isPrice, cadence);
    };

    return (
        <div className="flex flex-col gap-6 py-2 text-left">
            <div className="flex items-center gap-6">
                {[0, 1].map((i) => (
                    <div key={i} className="flex-1 flex flex-col gap-2">
                        {/* Elegant uppercase labels with spaced tracking */}
                        <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-300">
                            {i === 0 ? "FROM" : "TO"}
                        </span>
                        <input
                            type={isDate ? "datetime-local" : "number"}
                            value={value[i]}
                            onChange={(e) => handleChange(i, e.target.value)}
                            placeholder="—"
                            className="w-full bg-transparent border-b border-zinc-100 py-2 text-[11px] font-medium outline-none focus:border-zinc-800 transition-colors placeholder-zinc-200"
                        />
                    </div>
                ))}
            </div>

            {/* Subtle reset trigger */}
            {(value[0] !== "" || value[1] !== "") && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.resetRangeFilter(filter.id); }}
                    className="text-left text-[9px] uppercase tracking-[0.2em] text-zinc-300 hover:text-orange-600 transition-colors"
                >
                    RESET RANGE
                </button>
            )}
        </div>
    );
};

export default RangeFilter3;