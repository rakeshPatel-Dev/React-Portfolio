import { Button } from "../ui/button";


const GithubActivity = () => {
  const username = "rakeshPatel-Dev";

  return (
    <div className="bg-white dark:bg-[#0A0A0A] py-10 rounded-xl shadow-xl max-w-5xl mx-auto text-black dark:text-white">
      {/* Header */}
      <h2 className="text-2xl heading-bold mb-6">GitHub Activity</h2>

      {/* Contribution Graph */}
      <div className="overflow-x-auto p-2">
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub contribution graph"
          className="mx-auto w-full"
        />
      </div>

      {/* Profile Link */}
      <Button variant="link" className="flex items-center justify-end w-full">

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"

        >
          View Full GitHub Profile
        </a>
      </Button>
    </div>
  );
};

export default GithubActivity;
