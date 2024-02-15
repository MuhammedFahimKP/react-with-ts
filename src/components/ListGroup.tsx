import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelected: (item: string) => void;
}

function ListGroup({ items, heading, onSelected }: Props) {
  // hook
  //   const arr = useState(-1);
  //   arr[1] // variable
  //   arr[0] // updater function

  const [selectedIndex, setSelectedIndex] = useState(3);

  //   event handler

  return (
    <>
      <h1>{heading}</h1>

      {items.length === 0 && <p>No Items Found </p>}

      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-items"
            }
            key={item}
            onClick={() => onSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
