interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function StarRating({ stars, maxStars = 3, size = 'md', animate = false }: StarRatingProps) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <span
          key={i}
          className={`${sizes[size]} ${animate && i < stars ? 'animate-star-pop' : ''}`}
          style={animate ? { animationDelay: `${i * 0.15}s` } : {}}
        >
          {i < stars ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}
