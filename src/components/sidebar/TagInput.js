import React from "react";

import { FiX } from "react-icons/fi";

import { Button, Heading } from "@chakra-ui/react";

const TagsInput = (props) => {
  const removeTags = (indexToRemove) => {
    props.setTags([
      ...props.tags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      props.setTags([...props.tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="tags-input">
      <Heading style={{ paddingBottom: "5%" }}>Tags</Heading>
      <ul id="tags">
        {props.tags.map((tag, index) => (
          <li key={index} className="tag" style={{ paddingBottom: "5%" }}>
            <Button rightIcon={<FiX />} onClick={() => removeTags(index)}>
              #{tag}
            </Button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};

export default TagsInput;
