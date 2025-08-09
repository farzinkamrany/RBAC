import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../modules/products/components/ProductList";
import { useAppStore } from "../app/store";

beforeEach(() => {
  useAppStore.setState({ products: [{ id: 1, name: "محصول اول" }] });
});

test("renders product list and adds new product", () => {
  render(<ProductList />);
  expect(screen.getByText("لیست محصولات")).toBeInTheDocument();
  expect(screen.getByText("محصول اول")).toBeInTheDocument();

  const addButton = screen.getByText("افزودن محصول");
  fireEvent.click(addButton);

  expect(screen.getByText("محصول جدید")).toBeInTheDocument();
});
