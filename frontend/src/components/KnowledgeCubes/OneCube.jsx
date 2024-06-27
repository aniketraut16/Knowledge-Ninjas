import { MoveLeft, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

export default function OneCube({ KnowledgeCube, onScrollToNext }) {
  return (
    <div className="OneCube">
      <div>
        <h2>{KnowledgeCube.title}</h2>
        <p>{KnowledgeCube.description}</p>
        <h3>Category: {KnowledgeCube.category}</h3>
      </div>
      <span>
        <button
          style={{
            backgroundColor: "#5ADD6F",
          }}
        >
          <ThumbsUp />
        </button>
        <button
          style={{
            backgroundColor: "#FF5656",
          }}
        >
          <ThumbsDown />
        </button>
        <button
          style={{
            backgroundColor: "#5A9EDD",
          }}
          onClick={onScrollToNext}
        >
          <MoveLeft />
        </button>
      </span>
    </div>
  );
}
