import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createMenuApi, getAllMenusApi, addMenuItemApi } from "../../api/api";

interface MenuItems {
  id: string;
  name: string;
  description: string;
  price: number;
}
interface Menu {
  id: string;
  name: string;
  description: string;
  items: MenuItems[];
}

interface MenuState {
  menus: Menu[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
  message: null,
};

// Create a menu
export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (menuData: { name: string; description: string }) => {
    return await createMenuApi(menuData);
  }
);

// Fetch all menus
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  return await getAllMenusApi();
});

// Add Item to Menu
export const addMenuItem = createAsyncThunk(
  "menu/addMenuItem",
  async ({
    menuId,
    name,
    description,
    price,
  }: {
    menuId: string;
    name: string;
    description: string;
    price: number;
  }) => {
    return await addMenuItemApi(menuId, { name, description, price });
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus.push(action.payload);
        state.message = action.payload.message;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload.data;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMenuItem.fulfilled, (state) => {
        state.loading = false;
        state.message = "Menu item added successfully";
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add menu item";
      });
  },
});

export default menuSlice.reducer;
