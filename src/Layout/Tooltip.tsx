import React, { useState, useRef, ReactNode, useEffect } from 'react';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type TooltipVariant = 'light' | 'dark' | 'info' | 'warning' | 'error';

export interface TooltipProps {
  /**
   * Content to be displayed in the tooltip
   */
  content: ReactNode;
  /**
   * Position of the tooltip relative to the target element
   */
  position?: TooltipPosition;
  /**
   * Delay before showing the tooltip (in milliseconds)
   */
  delay?: number;
  /**
   * Visual style variant of the tooltip
   */
  variant?: TooltipVariant;
  /**
   * Additional CSS classes to apply to the tooltip
   */
  className?: string;
  /**
   * Element that triggers the tooltip
   */
  children: ReactNode;
  /**
   * Whether to show an arrow pointing to the target element
   */
  showArrow?: boolean;
  /**
   * Maximum width of the tooltip in pixels
   */
  maxWidth?: number;
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 300,
  variant = 'dark',
  className = '',
  children,
  showArrow = true,
  maxWidth = 250,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const hideTooltip = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  // Handle clicks outside the tooltip to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && 
          targetRef.current && 
          !tooltipRef.current.contains(event.target as Node) && 
          !targetRef.current.contains(event.target as Node)) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-current border-x-transparent border-b-transparent',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-current border-y-transparent border-l-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-current border-x-transparent border-t-transparent',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-current border-y-transparent border-r-transparent',
  };

  const variantClasses = {
    light: 'bg-white text-gray-800 border border-gray-200 shadow-md',
    dark: 'bg-gray-800 text-white shadow-lg',
    info: 'bg-blue-600 text-white shadow-lg',
    warning: 'bg-amber-500 text-white shadow-lg',
    error: 'bg-red-600 text-white shadow-lg',
  };

  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={showTooltip} 
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={targetRef}
    >
      {children}
      
      {isVisible && (
        <div 
          role="tooltip"
          ref={tooltipRef}
          className={`
            absolute z-50 
            ${positionClasses[position]} 
            ${className}
          `}
          style={{ maxWidth: `${maxWidth}px` }}
        >
          <div className={`
            rounded px-3 py-2 text-sm font-medium
            transition-opacity duration-200 ease-in-out
            ${variantClasses[variant]}
          `}>
            {content}
            {showArrow && (
              <div className={`
                absolute w-0 h-0 border-4
                ${arrowClasses[position]}
              `}
              style={{ color: variant === 'light' ? '#e5e7eb' : undefined }}
              ></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;