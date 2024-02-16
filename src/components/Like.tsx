import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status) return <FaHeart onClick={toggle} color="#ff6b81" size="600" />;
  return <FaRegHeart onClick={toggle} size="600" />;
};

export default Like;
