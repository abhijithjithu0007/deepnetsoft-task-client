import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addMenuItem, fetchMenus } from "../redux/features/menuSlice";
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
import { PlusCircle, Coffee, DollarSign } from "lucide-react";

export function AddMenuItems({ menuId }: { menuId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.menu);

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    description: Yup.string().trim().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .min(0.01, "Price must be greater than 0"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(
          addMenuItem({
            menuId,
            name: values.name,
            description: values.description,
            price: parseFloat(values.price),
          })
        ).unwrap();

        if (result.error) {
          alert(result.error);
        } else {
          dispatch(fetchMenus());
          alert(result.message || "Menu item created successfully!");
          formik.resetForm();
          document
            .querySelector<HTMLButtonElement>(".dialog-close-button")
            ?.click();
        }
      } catch (error) {
        alert("Failed to create menu item. Please try again.");
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 px-6 py-2.5 border border-amber-400 border-opacity-30">
          <div className="relative">
            <Coffee size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="rounded-full h-2 w-2 bg-white"></span>
            </span>
          </div>
          <span className="font-semibold tracking-wide">Add Menu Item</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
          </div>
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-center text-white text-2xl font-bold flex items-center justify-center gap-2">
              <PlusCircle className="h-6 w-6" />
              <span>Add New Menu Item</span>
              <Coffee className="h-6 w-6" />
            </DialogTitle>
            <p className="text-white text-opacity-80 text-center mt-2">
              Add a delicious item to your menu collection
            </p>
          </DialogHeader>
        </div>
        <form onSubmit={formik.handleSubmit} className="px-8">
          <div className="grid gap-6 py-8">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right font-semibold text-gray-700"
              >
                Item Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter item name"
                  className={`col-span-3 rounded-lg border border-gray-200 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-30 transition-all ${
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
                className="text-right font-semibold text-gray-700"
              >
                Description
              </Label>
              <div className="col-span-3">
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter item description"
                  className={`col-span-3 rounded-lg border border-gray-200 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-30 transition-all ${
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="price"
                className="text-right font-semibold text-gray-700"
              >
                Price
              </Label>
              <div className="col-span-3 relative">
                <div className="absolute left-3 top-2.5 text-gray-500">
                  <DollarSign size={16} />
                </div>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`col-span-3 pl-8 rounded-lg border border-gray-200 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-30 transition-all ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.price}
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
              className={`bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-medium px-5 py-2 rounded-md shadow transition-all duration-300 ${
                loading || !formik.isValid || formik.isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-md"
              }`}
              disabled={loading || !formik.isValid || formik.isSubmitting}
            >
              {loading ? "Adding..." : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
        <button type="button" className="hidden dialog-close-button" />
      </DialogContent>
    </Dialog>
  );
}
