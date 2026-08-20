import { render, screen } from "@testing-library/react";
import CarCard from "@/components/CarCard";

const mockCar = {
  id: "1",
  make: "Tesla",
  model: "Model 3",
  year: 2024,
  pricePerDay: 85,
  imageUrl: null,
  description: "Electric sedan",
};

describe("CarCard", () => {
  it("renders car make, model, and price", () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText(/Tesla/)).toBeInTheDocument();
    expect(screen.getByText(/Model 3/)).toBeInTheDocument();
    expect(screen.getByText(/85/)).toBeInTheDocument();
  });

  it("has an accessible booking button", () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByLabelText(/Book Tesla Model 3/i)).toBeInTheDocument();
  });
});
