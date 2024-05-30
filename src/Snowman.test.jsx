import { test, describe, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman.jsx";

const TEST_WORD = "apple";

describe("test Snowman compenent", function () {
  test("matches snapshot", function () {
    const { container } = render(<Snowman words={[TEST_WORD]} />);
    expect(container).toMatchSnapshot();
  });

  test("no button area and shows win message on win", function () {
    const { container, debug } = render(<Snowman
      words={[TEST_WORD]}
      maxWrong={2}
    />);

    fireEvent.click(container.querySelector("button[value='a']"));

    fireEvent.click(container.querySelector("button[value='p']"));
    fireEvent.click(container.querySelector("button[value='l']"));
    fireEvent.click(container.querySelector("button[value='e']"));

    expect(
      container.querySelector("button[value='a']")
    ).not.toBeInTheDocument();

    expect(
      container).toContainHTML(`You win!`);
  });

  test("image stays the same after correct guess", function () {
    const { container, debug } = render(<Snowman
      words={[TEST_WORD]}
      maxWrong={2}
    />);

    fireEvent.click(container.querySelector("button[value='a']"));

    expect(
      container.querySelector("img[alt='0']")
    ).toBeInTheDocument();
  });

  test("no button area and shows loss message on loss", function () {
    const { container, debug } = render(<Snowman
      words={[TEST_WORD]}
      maxWrong={2}
    />);

    fireEvent.click(container.querySelector("button[value='x']"));

    fireEvent.click(container.querySelector("button[value='q']"));

    expect(
      container.querySelector("button[value='a']")
    ).not.toBeInTheDocument();

    expect(
      container).toContainHTML(`You lose! The word was ${TEST_WORD}.`);
  });

  test("image changes after incorrect guess", function () {
    const { container, debug } = render(<Snowman
      words={[TEST_WORD]}
      maxWrong={2}
    />);

    expect(
      container.querySelector("img[alt='0']")
    ).toBeInTheDocument();

    fireEvent.click(container.querySelector("button[value='x']"));

    expect(
      container.querySelector("img[alt='1']")
    ).toBeInTheDocument();
  });
});