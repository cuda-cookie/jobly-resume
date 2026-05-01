import React from "react";
import Image from "@/lib/image";

interface LogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
  size = 100,
  className = "",
  onClick,
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 p-1 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Image
        src="/logo.jpeg"
        alt="Magic Resume Logo"
        width={size}
        height={size}
        className="rounded-[9px] w-full h-full object-cover"
        priority={size >= 64}
      />
    </div>
  );
};

export default Logo;
