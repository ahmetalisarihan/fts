import * as React from "react"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variantClasses = {
    default: "border-transparent bg-blue-100 text-blue-800",
    secondary: "border-transparent bg-gray-100 text-gray-800",
    destructive: "border-transparent bg-red-100 text-red-800",
    outline: "text-gray-700 border-gray-300",
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={combinedClasses} {...props} />
  )
}

export { Badge }
