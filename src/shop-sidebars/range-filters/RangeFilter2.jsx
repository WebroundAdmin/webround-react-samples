// Dont'forget to import React in your code, otherwise you will receive error #31
import React from "react";

/**
 * RangeFilter2: High-contrast brutalist inputs for numerical or date ranges
 */
const RangeFilter2 = ({ filter, wr }) => {
    const isPrice = filter?.type === "price";
    const isDate = filter?.type === "date";
    const value = wr.shop.state.selectedRangeFilters[filter.id]?.value ?? ["", ""];
    const cadence = wr.shop.state.sortOption?.cadence;

    // Sync input changes with the global store via core shop utility
    const handleChange = (index, val) => {
        const updated = [...value];
        updated[index] = isDate ? val : (val === "" ? "" : Number(val));
        wr.shop.setRangeFilter(filter.id, updated, isPrice, cadence);
    };

    return (
        <div className="flex flex-col gap-4 py-2 text-left">
            {/* Grid for Min/Max inputs with brutalist offset shadows */}
            <div className="flex items-center gap-1">
                {[0, 1].map((i) => (
                    <div key={i} className="flex-1 relative">
                        <input
                            type={isDate ? "datetime-local" : "number"}
                            value={value[i]}
                            onChange={(e) => handleChange(i, e.target.value)}
                            placeholder={i === 0 ? "MIN" : "MAX"}
                            className="w-full bg-white border-2 border-black p-2 text-xs font-black uppercase italic outline-none focus:bg-yellow-400 placeholder-black/20 transition-all shadow-[2px_2px_0px_black] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5"
                        />
                    </div>
                ))}
            </div>

            {/* Clear button aligned to the left within section context */}
            {(value[0] !== "" || value[1] !== "") && (
                <button
                    onMouseDown={(e) => { e.preventDefault(); wr.shop.resetRangeFilter(filter.id); }}
                    className="text-left text-[9px] font-black uppercase italic underline decoration-2 hover:text-yellow-500"
                >
                    CLEAR RANGE
                </button>
            )}
        </div>
    );
};

export default RangeFilter2;