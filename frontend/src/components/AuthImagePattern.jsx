import { useEffect, useState } from "react";
import "./AuthImagePattern.css"; // We'll define CSS here

const patternTypes = ["dots", "lines", "grid", "cross", "swirl", "none"];

const randomSolidOrGradient = () => {
  const styles = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-orange-400",
    "bg-cyan-400",
    "bg-lime-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-rose-400",
    "bg-gradient-to-tr from-pink-400 to-yellow-300",
    "bg-gradient-to-br from-green-400 to-blue-300",
    "bg-gradient-to-r from-purple-400 to-pink-300",
    "bg-gradient-to-l from-cyan-400 to-teal-300",
  ];
  return styles[Math.floor(Math.random() * styles.length)];
};

const getRandomPattern = () => {
  return patternTypes[Math.floor(Math.random() * patternTypes.length)];
};

const generateRandomStyles = () => {
  return Array.from({ length: 9 }, () => randomSolidOrGradient());
};

const generateRandomPatterns = () => {
  return Array.from({ length: 9 }, () => getRandomPattern());
};

export default function AuthImagePattern({ title, subtitle }) {
  const [phase, setPhase] = useState("even");
  const [boxStyles, setBoxStyles] = useState(generateRandomStyles());
  const [boxPatterns, setBoxPatterns] = useState(generateRandomPatterns());

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "even" ? "odd" : "even"));
      setBoxStyles(generateRandomStyles());
      setBoxPatterns(generateRandomPatterns());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-2 mb-3 mt-8">
          {boxStyles.map((style, i) => {
            const isActive =
              (phase === "even" && i % 2 === 0) ||
              (phase === "odd" && i % 2 !== 0);
            const pattern = boxPatterns[i];

            return (
              <div
                key={i}
                className={`
                  relative aspect-square rounded-2xl overflow-hidden
                  
                  ${style} 
                  ${isActive ? "animate-pulse brightness-125" : "brightness-75"}
                  transition-all duration-500
                `}
              >
                {pattern !== "none" && (
                  <div className={`absolute inset-0 pattern-${pattern}`}></div>
                )}
              </div>
            );
          })}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
}
