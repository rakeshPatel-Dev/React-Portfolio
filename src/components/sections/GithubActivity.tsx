import React from "react";
import { Button } from "../ui/button";


const GithubActivity = () => {
  const username = "rakeshPatel-Dev";

  return (
    <div className="bg-white dark:bg-[#0A0A0A] mt-4 p-8 rounded-xl shadow-xl max-w-5xl mx-auto text-black dark:text-white">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">GitHub Activity</h2>

      {/* Contribution Graph */}
      <div className="overflow-x-auto">
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub contribution graph"
          className="mx-auto"
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
