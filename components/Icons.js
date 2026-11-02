// Simple stroke icons (24px grid). They inherit color from the parent.

function Icon({ children, size = 20, strokeWidth = 2 }) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    )
}

export const UndoIcon = () => (
    <Icon>
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </Icon>
)

export const ResetIcon = () => (
    <Icon>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
    </Icon>
)

export const BackIcon = () => (
    <Icon>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
    </Icon>
)

export const MoonIcon = () => (
    <Icon>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
)

export const SunIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </Icon>
)

export const HelpIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
    </Icon>
)

export const CloseIcon = () => (
    <Icon size={22} strokeWidth={2.5}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </Icon>
)

export const CoffeeIcon = () => (
    <Icon size={18}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <path d="M6 2v2" />
        <path d="M10 2v2" />
        <path d="M14 2v2" />
    </Icon>
)
