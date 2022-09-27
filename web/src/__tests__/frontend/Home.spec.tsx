import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@components/Header";

describe("Home", () => {
  it("should render all components", () => {
    const { queryByAltText } = render(<Header />);
    expect(queryByAltText("NLW eSports logo")).toBeTruthy();
  });
});
