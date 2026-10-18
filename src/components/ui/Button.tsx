import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
    to: string;
    children: ReactNode;
    className?: string;
};

const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-95";

function Primary({ to, children, className = "" }: ButtonProps) {
    return (
        <Link
            href={to}
            className={`${baseStyles} bg-gray-50 text-gray-900 shadow-gray-500 hover:bg-gray-50 ${className}`}
        >
            {children}
        </Link>
    );
}

function Secondary({ to, children, className = "" }: ButtonProps) {
    return (
        <Link
            href={to}
            className={`${baseStyles} border border-gray-50/10 bg-gray-900/60 text-gray-200 backdrop-blur-md hover:border-gray-50/20 hover:bg-gray-800/70 ${className}`}
        >
            {children}
        </Link>
    );
}

const Button = {
    Primary,
    Secondary,
};

export default Button;
