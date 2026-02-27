const Tabs = ({ activeTab, setActiveTab }) => (
    <div className="flex gap-6">
        {["Received", "Invite"].map((tab) => (
            <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative cursor-pointer"
            >
                <h4
                    className={`font-bold ${activeTab === tab ? "text-[#fd4304]" : "text-gray-700"
                        }`}
                >
                    {tab}
                </h4>
                {activeTab === tab && (
                    <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#fd4304]" />
                )}
            </div>
        ))}
    </div>
);

export default Tabs;
