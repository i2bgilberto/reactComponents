import { useState } from "react";
interface Props {
  cleaningServices: string[];
  heading: string;
  onSelecteItem: (item: string) => void;
}
function ListGroup({ cleaningServices, heading, onSelecteItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {cleaningServices.length === 0 && <p>There are no services!</p>}
      <ul className="list-group">
        {cleaningServices.map((service, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={service}
            onClick={() => {
              setSelectedIndex(index);
              onSelecteItem(service);
            }}
          >
            {service}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
