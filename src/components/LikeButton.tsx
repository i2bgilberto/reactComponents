import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useState } from "react";

interface Props {
  onClick: () => void;
}

export const LikeButton = ({ onClick }: Props) => {
  const [like, setLike] = useState(false);
  function toggleLike() {
    setLike(!like);
    onClick();
  }

  return (
    (like && <FcLike size="20" onClick={toggleLike} />) || (
      <AiOutlineHeart size="20" onClick={toggleLike} />
    )
  );
};

export default LikeButton;
