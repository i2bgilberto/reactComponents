interface Props {
  category: string[];
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ category, onSelectCategory }: Props) => {
  return (
    <>
      <div className="mb-3">
        <select
          title="Categorias"
          name="category"
          id=""
          className="form-select"
          onChange={(event) => onSelectCategory(event.target.value)}
        >
          <option value="">All</option>
          {category.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ExpenseFilter;
