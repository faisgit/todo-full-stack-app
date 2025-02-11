import React from 'react'

function Button({
    children,
    className,
    type = "submit",
    ...props
}) {
    return (
        <div 
            data-theme="emerald"
        >
            <button 
                className={`bg-blue-500 text-white font-bold  hover:bg-blue-600 duration-700 py-3 rounded-xl btn-md w-full ${className}`} 
                type={type}
                {...props} 
            >{children}</button>
        </div>
    )
}

export default Button