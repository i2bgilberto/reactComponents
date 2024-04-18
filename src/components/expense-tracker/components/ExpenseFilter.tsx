const categories = ["groceries", "entertainment", "utilities"];
interface Props {
  onChangeFilter: (categories: string) => void;
}

const ExpenseFilter = ({ onChangeFilter }: Props) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="categorieFilter" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categorieFilter"
          className="form-select"
          onChange={(e) => onChangeFilter(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ExpenseFilter;
