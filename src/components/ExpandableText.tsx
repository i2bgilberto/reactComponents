import { MdOutlineReadMore } from "react-icons/md";

interface Props {
  text: string;
  limit: number;
  onClick: () => void;
}

const ExpandableText = ({ text, limit, onClick }: Props) => {
  return (
    <>
      {text.length > limit ? text.substring(0, limit) + "..." : text}
      <MdOutlineReadMore size={32} onClick={onClick} />
      {text.length > limit ? (
        <b>Read more</b>
      ) : (
        <em>
          <b>Read less</b>
        </em>
      )}
    </>
  );
};

export default ExpandableText;
