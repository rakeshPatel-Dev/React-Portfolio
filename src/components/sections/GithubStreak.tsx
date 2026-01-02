const GitHubStreak = () => {
  return (
    <a
      href="https://github.com/rakeshPatel-dev"
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        block
        w-full
        max-w-md
        mx-auto
        rounded-xl
        border
        border-neutral-200
        dark:border-neutral-800
        bg-white
        dark:bg-neutral-900
        p-4
        shadow-sm
        hover:shadow-lg
        transition-all
      "
    >
      <img
        src="https://nirzak-streak-stats.vercel.app/?user=rakeshPatel-dev&theme=dark&hide_border=true"
        alt="GitHub contribution streak stats"
        className="
          w-full
          h-auto
          rounded-lg
          opacity-90
          group-hover:opacity-100
          transition-opacity
        "
        loading="lazy"
      />
    </a>
  )
}

export default GitHubStreak
