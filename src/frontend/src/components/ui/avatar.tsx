interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white-200">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-black-700 font-semibold">
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
