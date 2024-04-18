interface Props {
  onChangeFilter: (categories: string) => void;
}

const ExpenseFilter = ({ onChangeFilter }: Props) => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="category" className="form-label">
          Filter by Category
        </label>
        <select
          id="category"
          className="form-select"
          onChange={(e) => onChangeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
        </select>
      </div>
    </>
  );
};

export default ExpenseFilter;
