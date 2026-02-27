import { useEffect, useState } from "react";

/**
 * CelebrationMessage
 * Shows a confetti burst + animated modal card after invite is sent.
 * Dynamically imports canvas-confetti so it degrades gracefully if missing.
 *
 * Props:
 *   title     — bold orange line  (default: "Invitations sent successfully")
 *   message   — optional sub-text
 *   duration  — ms before auto-close (default: 4000)
 *   onClose   — callback after close
 */
export default function CelebrationMessage({
    title = "Invitations sent successfully",
    message,
    duration = 4000,
    onClose,
}) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Fire confetti — dynamic import so app doesn't break if pkg missing
        import("canvas-confetti")
            .then(({ default: confetti }) => {
                confetti({
                    particleCount: 400,
                    spread: 250,
                    startVelocity: 35,
                    gravity: 0.8,
                    ticks: 400,
                    origin: { x: 0.5, y: 0.5 },
                    zIndex: 99999,
                });
            })
            .catch(() => {/* silently skip if package unavailable */ });

        const timer = setTimeout(() => {
            setShow(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = (e) => {
        e?.stopPropagation();
        setShow(false);
        onClose?.();
    };

    if (!show) return null;

    return (
        <>
            {/* ── Overlay ── */}
            <div
                onClick={handleClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 99999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.04)",
                    padding: "16px",
                }}
            >
                {/* ── Card ── */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "#ffffff",
                        padding: "clamp(20px,4vw,35px) clamp(24px,5vw,50px)",
                        borderRadius: "clamp(12px,2vw,16px)",
                        boxShadow: "0px 6px 30px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        position: "relative",
                        maxWidth: "90vw",
                        animation: "tv-celebrate-pop 0.35s ease-out",
                        overflow: "visible",
                    }}
                >
                    {/* Sticker — bunting/flags */}
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/9817/9817342.png"
                        alt="celebrate"
                        style={{
                            width: "clamp(70px,15vw,120px)",
                            position: "absolute",
                            top: "clamp(-12px,-2vw,-16px)",
                            left: "clamp(-8px,-1.5vw,-10px)",
                            transform: "rotate(-13deg)",
                        }}
                    />

                    {/* Cat emoji / main icon */}
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/10338/10338049.png"
                        alt="celebrate"
                        style={{
                            width: "clamp(50px,10vw,80px)",
                            marginBottom: "clamp(10px,2vw,15px)",
                        }}
                    />

                    {/* Title */}
                    <div
                        style={{
                            fontSize: "clamp(18px,4vw,24px)",
                            fontWeight: 700,
                            color: "#FF6B00",
                            marginBottom: "8px",
                            lineHeight: 1.3,
                        }}
                    >
                        🎉 Wow! <br />
                        {title}
                    </div>

                    {/* Optional sub-message */}
                    {message && (
                        <div
                            style={{
                                fontSize: "clamp(14px,3vw,18px)",
                                fontWeight: 500,
                                color: "#333",
                                maxWidth: "min(300px,80vw)",
                                margin: "0 auto",
                                lineHeight: 1.4,
                            }}
                        >
                            {message}
                        </div>
                    )}
                </div>
            </div>

            {/* Keyframe injected once */}
            <style>{`
                @keyframes tv-celebrate-pop {
                    0%   { transform: scale(0.6); opacity: 0.4; }
                    100% { transform: scale(1);   opacity: 1;   }
                }
            `}</style>
        </>
    );
}
