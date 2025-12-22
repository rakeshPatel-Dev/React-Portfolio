import { Highlighter } from "../ui/highlighter";

const About = () => {
  return (
    <div className="relative">
      {/* Section Title */}
      <h1 className="heading-bold text-xl sm:text-2xl mb-3 sm:mb-4">
        About me
      </h1>

      {/* Content */}
      <div className="space-y-3 sm:space-y-5 leading-snug text-black/70 dark:text-gray-300 font-body text-base sm:text-md">

        <p>
          I’m currently pursuing a{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>BITM</strong>
          </Highlighter>{" "}
          at{" "}
          <Highlighter action="underline" color="#FF9800">
            <strong>Tribhuvan University</strong>
          </Highlighter>
          , focusing on learning through hands-on projects rather than just theory.
        </p>

        <p>
          I enjoy breaking down problems, experimenting with solutions,
          and refining my work to make it more{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>efficient</strong>
          </Highlighter>{" "}
          and{" "}
          <Highlighter action="underline" color="#87CEFA">
            <strong>user-friendly</strong>
          </Highlighter>
          .
        </p>

        <p>
          My goal is to grow into a developer who understands not just
          how to write code, but why it works.
        </p>

      </div>
    </div>
  );
};

export default About;
