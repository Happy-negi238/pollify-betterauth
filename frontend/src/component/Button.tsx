import type { ButtonHTMLAttributes } from 'react';

export interface DarkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'solid' | 'outline' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const DarkButton: React.FC<DarkButtonProps> = ({
    children,
    variant = 'glow',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}) => {
    // Size-based padding and typography styling
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs rounded-md font-medium',
        md: 'px-5 py-2.5 text-sm rounded-lg font-semibold',
        lg: 'px-6 py-3.5 text-base rounded-xl font-semibold',
    };

    // Dark variant stylings
    const variantStyles = {
        glow: `
      bg-gradient-to-b from-zinc-800 to-zinc-950
      hover:from-zinc-700 hover:to-zinc-900
      text-zinc-100 border border-zinc-700/60
      shadow-[0_4px_20px_rgba(0,0,0,0.5)]
      hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
      hover:border-zinc-500
    `,
        solid: `
      bg-zinc-900 hover:bg-zinc-800
      text-zinc-100 border border-zinc-800
      shadow-md hover:border-zinc-700
    `,
        outline: `
      bg-transparent hover:bg-zinc-900/50
      text-zinc-300 hover:text-white
      border border-zinc-700/80 hover:border-zinc-500
    `,
    };

    return (
        <button
            disabled={disabled || isLoading}
            className={`
        group relative inline-flex items-center justify-center space-x-2
        transition-all duration-200 ease-out active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
            {...props}
        >
            {/* Loading Spinner */}
            {isLoading ? (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                leftIcon && <span className="inline-flex transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>
            )}

            <span>{children}</span>

            {!isLoading && rightIcon && (
                <span className="inline-flex transition-transform group-hover:translate-x-0.5">{rightIcon}</span>
            )}
        </button>
    );
};

export default DarkButton;
