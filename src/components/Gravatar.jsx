import { useMemo } from "react";
import CryptoJS from "crypto-js";

export default function Gravatar({ email, size = 40, className = "" }) {
  const gravatarUrl = useMemo(() => {
    if (!email) return null;
    
    // Create MD5 hash of email (lowercase and trimmed)
    const hash = CryptoJS.MD5(email.toLowerCase().trim()).toString();
    
    // Generate Gravatar URL
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
  }, [email, size]);

  if (!gravatarUrl) {
    return (
      <div 
        className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-600 ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-sm font-medium">
          {email ? email[0].toUpperCase() : "?"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={gravatarUrl}
      alt="Profile"
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}