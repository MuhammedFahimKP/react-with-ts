import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  // hook
  //   const arr = useState(-1);
  //   arr[1] // variable
  //   arr[0] // updater function

  const [selectedIndex, setSelectedIndex] = useState(0);

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
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
