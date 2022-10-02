import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={onClickHandler(index)}
    >
      {text}
    </li>
  );
};
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
const SingleListItem = memo(WrappedSingleListItem);
const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);
  console.log(selectedIndex);
  const handleClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <ul style={{ textAlign: "left" }}>
      {/* we can handle error here. if, when mount the component then data is
      undefine or null then app gives us null, when it gives us null or something we can show an spinner */}
      {Array.isArray(items)
        ? items?.map((item, index) => (
            <SingleListItem
              key={index}
              onClickHandler={() => handleClick(index)}
              text={item.text}
              index={index}
              isSelected={Boolean(selectedIndex)}
            />
          ))
        : null}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};
WrappedListComponent.defaultProps = {
  items: [
    { Index: 1, Text: "jhone" },
    { Index: 2, Text: "smith" },
  ],
};
const List = memo(WrappedListComponent);
export default List;

