import React, { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Modal Component - TraceVenue Design System
 *
 * Features:
 * - Centered with backdrop
 * - Animations
 * - Mobile full-screen responsive
 * - Header, Body, Footer sections
 */

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  title,
  description = "",
  showCloseButton = true,
  closeOnBackdrop = true,
  className = "",
  ...props
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-[calc(100%-2rem)]",
  };

  const handleBackdropClick = (e) => {
    console.log(e.target , "and this is a ", e.currentTarget);
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-1050 flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop */}
      <div 
      className="absolute inset-0 bg-black/50 animate-fade-in"
      onClick={handleBackdropClick}
       />

      {/* Modal */}
      <div
        className={`
                    relative w-full ${sizes[size]}
                    bg-white rounded-[20px]
                    shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                    max-h-[90vh] overflow-hidden flex flex-col
                    animate-slide-up
                    
                    /* Mobile Full Screen */
                    max-md:max-w-full max-md:h-full max-md:max-h-full 
                    max-md:rounded-none max-md:m-0
                    ${className}
                `
          .replace(/\s+/g, " ")
          .trim()}
        {...props}
      >
        {/* Header */}
        {props.showHeader == true && (title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eeeeee] max-md:sticky max-md:top-0 max-md:bg-white max-md:z-10">
           <div>
            {title && (
              <h3 className="text-xl font-bold text-[#060606] m-0 max-md:text-lg">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[#85878C] text-[14px] font-semibold pb-0">
                {description}
              </p>
            )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="
                                    w-8 h-8 flex items-center justify-center
                                    rounded-full bg-[#f0f0f4] text-[#5c5f62]
                                    hover:bg-[#ff4000] hover:text-white
                                    transition-all duration-300 ml-auto
                                "
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Modal Header
Modal.Header = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-[#eeeeee] ${className}`}>
    {typeof children === "string" ? (
      <h3 className="text-xl font-bold text-[#060606] m-0">{children}</h3>
    ) : (
      children
    )}
  </div>
);

// Modal Body
Modal.Body = ({ children, className = "" }) => (
  <div className={`px-6 py-5 max-md:px-4 max-md:py-4 ${className}`}>
    {children}
  </div>
);

// Modal Footer
Modal.Footer = ({ children, className = "" }) => (
  <div
    className={`
        px-6 py-4 border-t border-[#eeeeee] flex justify-end gap-3
        max-md:sticky max-md:bottom-0 max-md:bg-white max-md:px-4
        max-md:flex-col max-md:gap-2
        ${className}
    `
      .replace(/\s+/g, " ")
      .trim()}
  >
    {children}
  </div>
);

export default Modal;
