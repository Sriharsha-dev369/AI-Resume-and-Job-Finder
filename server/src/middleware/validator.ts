const { z } = require("zod");

const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required").max(150),
  email: z.string().email("Invalid Email").max(150),
  phone: z.string().max(30).optional(),
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .max(255)
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Invalid GitHub URL")
    .max(255)
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Invalid website URL")
    .max(255)
    .optional()
    .or(z.literal("")),
  address: z.string().max(500).optional(),
});

const validate = (schema : any) => {
  return (req: any, res:any, next:any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error?.errors) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.errors.map((err:any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      // Pass non-Zod errors to the error handler
      return next(error);
    }
  };
};

const validatePersonalInfo = validate(personalInfoSchema);

module.exports = { validate, validatePersonalInfo };