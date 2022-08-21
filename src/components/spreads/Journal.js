import React from "react";
import JournalEntry from "./JournalEntry";

function Journal(props) {
  return (
    <JournalEntry
      entry={props.entry}
      setEntry={props.setEntry}
      date={props.date}
      pageType={props.pageType}
      handleChange={props.handleChange}
      // titles={promptTitles}
      // placeholders={promptPlaceholders}
      name={props.userName}
      email={props.email}
      entryform={props.entryform}
    />
  );
}

export default Journal;
