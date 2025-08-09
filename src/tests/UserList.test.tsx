import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "../modules/users/components/UserList";
import { useAppStore } from "../app/store";

beforeEach(() => {
  useAppStore.setState({
    users: [
      { id: 1, name: "مدیر نمونه", email: "admin@example.com", role: "admin" },
    ],
  });
});

test("renders users and can add a new user", () => {
  render(<UserList />);
  expect(screen.getByText("کاربران")).toBeInTheDocument();
  expect(screen.getByText("مدیر نمونه")).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText("نام");
  const emailInput = screen.getByPlaceholderText("ایمیل");
  const addButton = screen.getByText("اضافه کن");

  fireEvent.change(nameInput, { target: { value: "کاربر جدید" } });
  fireEvent.change(emailInput, { target: { value: "new@example.com" } });
  fireEvent.click(addButton);

  expect(screen.getByText("کاربر جدید")).toBeInTheDocument();
  expect(screen.getByText("new@example.com")).toBeInTheDocument();
});
