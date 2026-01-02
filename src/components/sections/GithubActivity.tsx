import GitHubStreak from "./GithubStreak";


const GithubActivity = () => {
  const username = "rakeshPatel-Dev";

  return (
    <div className="bg-white px-2 dark:bg-[#0A0A0A] py-10 rounded-xl shadow-xl max-w-5xl mx-auto text-black dark:text-white">
      {/* Header */}
      <h2 className="text-2xl heading-bold mb-6">GitHub Activity</h2>

      {/* Contribution Graph */}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"

      >
        <div className="overflow-x-auto mb-8 p-2">
          <img
            src={`https://ghchart.rshah.org/008000/${username}`}
            alt="GitHub contribution graph"
            className="mx-auto w-full"
          />
        </div>
      </a>

      <GitHubStreak />
    </div>
  );
};

export default GithubActivity;
