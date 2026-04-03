import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Board } from "./Board";
import { emptyBoard } from "../../types/game";

describe("Board", () => {
  it("renders 42 gridcells", () => {
    render(<Board board={emptyBoard()} />);
    expect(screen.getAllByRole("gridcell")).toHaveLength(42);
  });

  it("renders no column buttons when onColumnClick is omitted", () => {
    render(<Board board={emptyBoard()} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders 7 column buttons when onColumnClick is provided", () => {
    render(<Board board={emptyBoard()} onColumnClick={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });

  it("disables the column button when the top cell is occupied", () => {
    const board = emptyBoard();
    board[0][3] = 1; // col 3 is full (top row occupied)
    render(<Board board={board} onColumnClick={vi.fn()} />);
    const btns = screen.getAllByRole("button");
    expect(btns[3]).toBeDisabled();
  });

  it("calls onColumnClick with the correct column index", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    const handler = vi.fn();
    const user = userEvent.setup();
    render(<Board board={emptyBoard()} onColumnClick={handler} />);
    await user.click(screen.getAllByRole("button")[2]);
    expect(handler).toHaveBeenCalledWith(2);
  });
});
