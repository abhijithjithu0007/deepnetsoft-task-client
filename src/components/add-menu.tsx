import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createMenu, fetchMenus } from "../redux/features/menuSlice";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";

export function Addmenu() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.menu);

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Menu name is required"),
    description: Yup.string().trim().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(createMenu(values)).unwrap();

        if (result.error) {
          alert(result.error);
        } else {
          dispatch(fetchMenus());
          alert(result.message || "Menu created successfully!");
          formik.resetForm();
          document
            .querySelector<HTMLButtonElement>(".dialog-close-button")
            ?.click();
        }
      } catch (error) {
        alert("Failed to create menu. Please try again.");
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white">
          Add Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">
            Add Your New Menu Here
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  className={`col-span-3 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Input
                  id="description"
                  name="description"
                  className={`col-span-3 ${
                    formik.touched.description && formik.errors.description
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              disabled={loading || !formik.isValid}
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
        <button type="button" className="hidden dialog-close-button" />
      </DialogContent>
    </Dialog>
  );
}
