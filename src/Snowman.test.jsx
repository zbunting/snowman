import { test, describe, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

const TEST_WORD = "apple";

test("no button area and shows loss message on loss", function () {
  const { container, debug } = render(<Snowman
    words={[TEST_WORD]}
    maxWrong={1}
  />);

  fireEvent.click(container.querySelector("button[value='x']"));

  expect(
    container.querySelector("button[value='a']")
  ).not.toBeInTheDocument();

  expect(
    container).toContainHTML(`You lose! The word was ${TEST_WORD}.`);
});

test("matches snapshot", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

// TODO: Add additional testing for win and lose states
// increase maxWrong to confirm that it works as user clicks