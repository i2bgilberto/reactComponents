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
      <h1>Expense Form</h1>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            name="description"
            id="description"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Price
          </label>
          <input
            {...register("price")}
            type="number"
            name="price"
            id="price"
            className="form-control"
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            name="category"
            id="category"
            className="form-control"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
