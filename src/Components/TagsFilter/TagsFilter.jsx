import { Chip, TextField } from "@mui/material";
import Icons from "../Icons/icons";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TagsFilter.scss";

const TagsFilter = ({ type, selectedTags, setSelectedTags }) => {
  // const [tags, setTags] = useState(selectedTags);

  // useEffect(() => {
  //   if (getFilterValue) getFilterValue(tags);
  // }, [tags]);
  // console.log(selectedTags,tags)
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const tag = event.target.value.trim();
      if (tag.length > 0 && !selectedTags.includes(tag)) {
        if (type === "multi_select_text") {
          setSelectedTags([...selectedTags, tag]);
          // if (getFilterValue) getFilterValue([...selectedTags, tag]);
        } else {
          setSelectedTags(tag);
          // if (getFilterValue) getFilterValue(tag);
        }
        event.target.value = "";
      }
    }
  };

  const handleDelete = (e, tagToDelete) => {
    e.preventDefault();
    if (type === "multi_select_text") {
      const newTags = selectedTags.filter((tag) => tag !== tagToDelete);
      setSelectedTags(newTags);
      // if (getFilterValue) getFilterValue(newTags);
    } else {
      setSelectedTags("");
      // if (getFilterValue) getFilterValue("");
    }
  };

  return (
    <div className="tag-filter-container">
      <TextField
        className="my-textfield"
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
        hiddenLabel
        placeholder="Enter keyword"
        size="small"
        InputProps={{ className: "tag-filter-input" }}
        onClick={(e) => e.stopPropagation()}
        sx={{
          borderColor: "var(--insightIq-primary-color)",
        }}
      />
      <div className="chip-container">
        {type === "multi_select_text"
          ? selectedTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ backgroundColor: "#F5F5F7", margin: "0px 4px 4px 0px" }}
                onDelete={(e) => {
                  handleDelete(e, tag);
                }}
                deleteIcon={
                  <Icons.icon_close
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                  />
                }
              />
            ))
          : setSelectedTags && (
              <Chip
                label={setSelectedTags}
                sx={{ backgroundColor: "#F5F5F7", margin: "0px 4px 4px 0px" }}
                onDelete={(e) => {
                  handleDelete(e, setSelectedTags);
                }}
                deleteIcon={
                  <Icons.icon_close
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                  />
                }
              />
            )}
      </div>
    </div>
  );
};

export default TagsFilter;
