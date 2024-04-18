import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const categories = ["groceries", "entertainment", "utilities"];

const schema = z.object({
  description: z.string().min(3, { message: "Description is required" }),
  price: z.coerce.number().positive().max(100_000),
  category: z.enum(["groceries", "entertainment", "utilities"], {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: "Please select a valid category.",
          };
        case "invalid_enum_value":
          return { message: "Please select a valid category" };
        default:
          return { message: "Invalid type of category" };
      }
    },
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <h2>Add New Expense</h2>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            {...register("price")}
            id="price"
            type="number"
            className="form-control"
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            {...register("category")}
            id="category"
            title="Category"
            className="form-select"
          >
            <option value="empty">Select one please....</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-4">
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            Add Expense
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
