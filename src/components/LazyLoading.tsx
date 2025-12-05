import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  title: string
}

const LazyImageWithSkeleton = ({ src, alt, className, title }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
      )}

      <img
        src={src}
        alt={alt}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-all duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  )
}

export default LazyImageWithSkeleton
