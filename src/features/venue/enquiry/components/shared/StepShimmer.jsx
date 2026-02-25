import React from "react";

/**
 * Renders a shimmer skeleton matching the current step's layout.
 * stepKey drives which skeleton variant is shown.
 */
const StepShimmer = ({ stepKey }) => {
    if (stepKey === "GatheringBudget") {
        return (
            <div className="animate-pulse mt-6 px-4 sm:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Gathering Size card */}
                    <div className="rounded-2xl border border-gray-200 p-5 space-y-5">
                        <div className="h-6 bg-gray-200 rounded-full w-2/5" />
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                                <div className="h-10 bg-gray-200 rounded-xl w-full" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                                <div className="h-10 bg-gray-200 rounded-xl w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Budget card */}
                    <div className="rounded-2xl border border-gray-200 p-5 space-y-5">
                        <div className="flex justify-between items-center">
                            <div className="h-6 bg-gray-200 rounded-full w-1/4" />
                            <div className="flex gap-2">
                                <div className="h-7 bg-gray-200 rounded-full w-20" />
                                <div className="h-7 bg-gray-200 rounded-full w-20" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                                <div className="h-10 bg-gray-200 rounded-xl w-full" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                                <div className="h-10 bg-gray-200 rounded-xl w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <ShimmerSweep />
            </div>
        );
    }

    // Default: EventType skeleton (search bar + cards + pills)
    return (
        <div className="animate-pulse space-y-6 px-4 sm:px-0 mt-6">
            {/* Title */}
            <div className="h-7 bg-gray-200 rounded-full w-1/3" />
            {/* Search bar */}
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
            {/* Section label */}
            <div className="h-5 bg-gray-200 rounded-full w-1/4 mt-8" />
            {/* Card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl bg-gray-200 h-28 w-full" />
                ))}
            </div>
            {/* Section label */}
            <div className="h-5 bg-gray-200 rounded-full w-1/5 mt-4" />
            {/* Pill tags */}
            <div className="flex flex-wrap gap-3 mt-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-9 bg-gray-200 rounded-full"
                        style={{ width: `${80 + (i % 4) * 20}px` }}
                    />
                ))}
            </div>
            <ShimmerSweep />
        </div>
    );
};

const ShimmerSweep = () => (
    <>
        <style>{`
      @keyframes shimmer-sweep {
        0%   { background-position: -400px 0; }
        100% { background-position: 400px 0; }
      }
      .shimmer-sweep {
        background: linear-gradient(
          90deg,
          transparent 25%,
          rgba(255,255,255,0.55) 50%,
          transparent 75%
        );
        background-size: 800px 100%;
        animation: shimmer-sweep 1.4s infinite linear;
      }
    `}</style>
        <div className="fixed inset-0 pointer-events-none shimmer-sweep z-0" />
    </>
);

export default StepShimmer;
