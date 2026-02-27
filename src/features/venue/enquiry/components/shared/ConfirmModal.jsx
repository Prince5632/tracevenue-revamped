/**
 * ConfirmModal — generic confirmation dialog
 *
 * Props:
 *   title       — heading text       (default: "Are you sure?")
 *   message     — body paragraph
 *   confirmText — confirm button label (default: "Confirm")
 *   cancelText  — cancel button label  (default: "Close")
 *   onConfirm   — callback on confirm
 *   onCancel    — callback on cancel / close
 */
const ConfirmModal = ({
    title = "Are you sure?",
    message,
    confirmText = "Confirm",
    cancelText = "Close",
    onConfirm,
    onCancel,
}) => {
    return (
        <div
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/30 p-4"
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] w-full max-w-[420px] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-3">
                    <h2 className="text-[22px] font-bold text-[#060606]">{title}</h2>
                    <button
                        onClick={onCancel}
                        className="text-[#85878C] text-xl font-bold hover:text-[#060606] transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                {message && (
                    <div className="px-6 pb-4 border-b border-[#f0f0f0]">
                        <p className="text-[16px] text-[#444] leading-relaxed">{message}</p>
                    </div>
                )}

                {/* Footer */}
                <div className="flex gap-3 px-6 py-4 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-full border border-[#FF4000] text-[#FF4000] font-semibold text-[15px] hover:bg-[#fff5f0] transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-full border border-[#FF4000] text-[#FF4000] font-semibold text-[15px] hover:bg-[#fff5f0] transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
