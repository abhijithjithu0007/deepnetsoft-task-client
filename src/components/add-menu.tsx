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
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PlusCircle } from "lucide-react";

export function Addmenu() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.menu);

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
        <Button className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 px-4 py-2">
          <PlusCircle size={18} />
          <span className="hidden md:block">Add Menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-white rounded-xl shadow-xl border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-white text-xl font-bold">
              Add Your New Menu
            </DialogTitle>
          </DialogHeader>
        </div>
        <form onSubmit={formik.handleSubmit} className="px-6">
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right font-medium text-gray-700"
              >
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter menu name"
                  className={`col-span-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
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
              <Label
                htmlFor="description"
                className="text-right font-medium text-gray-700"
              >
                Description
              </Label>
              <div className="col-span-3">
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter menu description"
                  className={`col-span-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    formik.touched.description && formik.errors.description
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
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
          <DialogFooter className="pb-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-5 py-2 rounded-md shadow transition-all duration-300 ${
                loading || !formik.isValid
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-md"
              }`}
              disabled={loading || !formik.isValid}
            >
              {loading ? "Adding..." : "Add Menu"}
            </Button>
          </DialogFooter>
        </form>
        <button type="button" className="hidden dialog-close-button" />
      </DialogContent>
    </Dialog>
  );
}
