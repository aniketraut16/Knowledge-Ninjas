import React, { useRef, useEffect, useState } from "react";
import "./Cubes.css";
import OneCube from "./OneCube";
import { useTma } from "../../context/tmaProvider";
import axios from "axios";

function CubesSection() {
  const cubeRefs = useRef([]);
  const observerRef = useRef();
  const [knowledgeCubes, setKnowledgeCubes] = useState([]);
  const [page, setPage] = useState(1); // To keep track of the page

  const apiUrl = import.meta.env.VITE_API_KEY;
  const { setIsLoading } = useTma();

  const fetchCubes = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}knowledge/fetch/10?page=${page}`
      );
      setKnowledgeCubes((prevCubes) => [...prevCubes, ...response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCubes(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (cubeRefs.current.length > 0) {
      observer.observe(cubeRefs.current[cubeRefs.current.length - 1]);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [knowledgeCubes]);

  if (knowledgeCubes.length === 0) {
    return <p>Loading...</p>;
  }

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
