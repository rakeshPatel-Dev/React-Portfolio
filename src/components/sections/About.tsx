import { Highlighter } from "../ui/highlighter";

const About = () => {
  return (
    <div className="relative">
      {/* Section Title */}
      <h1 className="heading-bold text-2xl mb-4">
        About me
      </h1>

      {/* Content */}
      <div className="space-y-5 leading-relaxed text-black/70 dark:text-gray-300 font-body text-lg">

        {/* Course + Active Student Indicator */}
        <p className="flex items-start gap-2">

          <span className="relative">
            I’m currently studying{" "}
            <Highlighter action="underline" color="#87CEFA">
              <strong>Bachelor of Information Technology Management (BITM)</strong>
              <span className="absolute flex h-2 w-2 -top-2 -right-1 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
            </Highlighter>{" "}
            from the{" "}
            <Highlighter action="underline" color="#FF9800">
              <strong>Tribhuvan University (TU)</strong>
            </Highlighter>
            , learning through hands-on projects and real problem-solving.
          </span>
        </p>

        {/* Tech Stack */}
        <p>
          I work with{" "}
          <Highlighter action="underline" color="#FF9800">
            <strong>HTML</strong>
          </Highlighter>
          ,{" "}
          <Highlighter action="underline" color="#FF9800">
            <strong>CSS</strong>
          </Highlighter>
          ,{" "}
          <Highlighter action="underline" color="#FF9800">
            <strong>Tailwind</strong>
          </Highlighter>
          ,{" "}
          <Highlighter action="underline" color="#FF9800">
            <strong>JavaScript</strong>
          </Highlighter>
          , and{" "}
          <Highlighter action="underline" color="#FF9800">
            <strong>React</strong>
          </Highlighter>
          . Most of my projects are built to learn, improve, and explore what’s possible with these tools.
        </p>

        {/* Personal Style */}
        <p>
          I enjoy{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>breaking down problems</strong>
          </Highlighter>
          ,{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>trying new approaches</strong>
          </Highlighter>
          , and improving each project so it becomes{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>cleaner</strong>
          </Highlighter>
          ,{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>faster</strong>
          </Highlighter>
          , and{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>more usable</strong>
          </Highlighter>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
