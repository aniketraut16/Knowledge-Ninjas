import React, { useRef } from "react";
import "./Cubes.css";
import OneCube from "./OneCube";

function CubesSection() {
  const cubeRefs = useRef([]);

  const scrollToNext = (index) => {
    if (cubeRefs.current[index + 1]) {
      cubeRefs.current[index + 1].scrollIntoView({ behavior: "smooth" });
    }
  };

  const knowledgeCubes = [
    {
      title: "Sun",
      description: "The Sun is the star at the center of the Solar System.",
      category: "Astronomy",
    },
    {
      title: "Mount Everest",
      description: "Mount Everest is the highest mountain in the world.",
      category: "Geography",
    },
    {
      title: "Photosynthesis",
      description:
        "Photosynthesis is the process used by plants to convert light energy into chemical energy.",
      category: "Biology",
    },
    {
      title: "Python",
      description:
        "Python is a high-level programming language known for its readability and versatility.",
      category: "Technology",
    },
    {
      title: "E=mc^2",
      description:
        "E=mc^2 is Einstein's equation that states that energy and mass are interchangeable.",
      category: "Physics",
    },
    {
      title: "World War II",
      description:
        "World War II was a global conflict that lasted from 1939 to 1945.",
      category: "History",
    },
    {
      title: "Pi (π)",
      description:
        "Pi is an irrational number representing the ratio of the circumference of a circle to its diameter.",
      category: "Mathematics",
    },
    {
      title: "Great Wall of China",
      description:
        "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, and other materials.",
      category: "Architecture",
    },
    {
      title: "H2O",
      description: "H2O is the chemical formula for water.",
      category: "Chemistry",
    },
    {
      title: "Black Hole",
      description:
        "A black hole is a region of space where the gravitational pull is so strong that nothing, not even light, can escape from it.",
      category: "Astronomy",
    },
    {
      title: "Human Genome",
      description:
        "The human genome is the complete set of nucleic acid sequences for humans, encoded as DNA.",
      category: "Genetics",
    },
    {
      title: "Internet",
      description:
        "The Internet is a global network of computers that communicate through standardized protocols.",
      category: "Technology",
    },
    {
      title: "Photosynthesis",
      description:
        "Photosynthesis is the process used by plants to convert light energy into chemical energy.",
      category: "Biology",
    },
    {
      title: "Theory of Evolution",
      description:
        "The theory of evolution by natural selection was proposed by Charles Darwin.",
      category: "Biology",
    },
    {
      title: "Quantum Mechanics",
      description:
        "Quantum mechanics is a fundamental theory in physics describing the physical properties of nature at the scale of atoms and subatomic particles.",
      category: "Physics",
    },
  ];

  return (
    <div className="CubesSection">
      {knowledgeCubes.map((cube, index) => (
        <div key={index} ref={(el) => (cubeRefs.current[index] = el)}>
          <OneCube
            KnowledgeCube={cube}
            onScrollToNext={() => scrollToNext(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default CubesSection;
