import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const typeBusinessOptions = ["residential", "commercial"] as const;
const frequencyOptions = [
  "onetime",
  "dayli",
  "weekly",
  "biweekly",
  "monthly",
] as const;
const activityBundleOptions = [
  "deep",
  "regular",
  "moveout",
  "movein",
  "postconstruction",
  "office",
  "kitchenhood",
] as const;
const schema = z.object({
  typeBusiness: z.enum(typeBusinessOptions, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: "The services type has to be Residential or Commercial",
          };
        case "invalid_enum_value":
          return { message: "Please select a valid type of service." };
        default:
          return { message: "Invalid type of service" };
      }
    },
  }),
  frequency: z.enum(frequencyOptions, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message:
              "The frequency has to be One Time, Daily, Weekly, Biweekly or Monthly",
          };
        case "invalid_enum_value":
          return { message: "Please select a valid frequency." };
        default:
          return { message: "Invalid frequency" };
      }
    },
  }),
  activityBundle: z.enum(activityBundleOptions, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message:
              "Please choose an activity bundle from the available options.",
          };
        case "invalid_enum_value":
          return { message: "Please select a valid activity bundle." };
        default:
          return { message: "Invalid activity bundle" };
      }
    },
  }),
  fullname: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  email: z.string().email({ message: "Please enter a valid email" }),
});

type FormData = z.infer<typeof schema>;

const FormQuote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <>
      <h1>Form Quote</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label mb-0" htmlFor="typeBusiness">
            Type of business:
          </label>
          <select
            className="form-select"
            id="typeBusiness"
            {...register("typeBusiness")}
          >
            <option defaultValue={""}>Choose...</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          {errors.typeBusiness && (
            <p className="text-danger">{errors.typeBusiness.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label mb-0" htmlFor="frequency">
            Frequency:
          </label>
          <select
            className="form-select"
            id="frequency"
            {...register("frequency")}
          >
            <option defaultValue={""}>Choose...</option>
            <option value="onetime">One Time</option>
            <option value="dayli">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {errors.frequency && (
            <p className="text-danger">{errors.frequency.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="activityBundle" className="form-label">
            Activity Bundle:
          </label>
          <select
            {...register("activityBundle")}
            name="activityBundle"
            className="form-select"
            id="activityBundle"
          >
            <option defaultValue={""}>Choose...</option>
            <option value="deep">Deep Clean</option>
            <option value="regular">Regular Clean</option>
            <option value="moveout">Move Out</option>
            <option value="movein">Move In</option>
            <option value="postconstruction">Post Construction</option>
            <option value="office">Office Cleaning</option>
            <option value="kitchenhood">Kitchen Hood</option>
          </select>
          {errors.activityBundle && (
            <p className="text-danger">{errors.activityBundle.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name:
          </label>
          <input
            {...register("fullname")}
            id="fullname"
            type="text"
            className="form-control"
          />
          {errors.fullname && (
            <p className="text-danger">{errors.fullname.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="text"
            className="form-control"
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            {...register("address")}
            id="address"
            type="text"
            className="form-control"
          />
          {errors.address && (
            <p className="text-danger">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            {...register("city")}
            id="city"
            type="text"
            className="form-control"
          />
          {errors.city && <p className="text-danger">{errors.city.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">
            Zip Code:
          </label>
          <input
            id="zip"
            type="text"
            {...register("zip")}
            className="form-control"
          />
          {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            name="email"
            className="form-control"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Request Quote!
        </button>
      </form>
    </>
  );
};

export default FormQuote;
