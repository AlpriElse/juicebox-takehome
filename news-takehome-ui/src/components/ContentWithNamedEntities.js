import React from "react";
import NamedEntity from "./NamedEntity";

const ContentWithNamedEntities = ({ serializedContentAndNamedEntities }) => {
  return (
    <div>
      {serializedContentAndNamedEntities.map((item) => {
        if (item.type === "none") {
          return <span style={{ lineHeight: "2em" }}>{item.content}</span>;
        }

        return <NamedEntity type={item.type} content={item.content} />;
      })}
    </div>
  );
};
export default ContentWithNamedEntities;
