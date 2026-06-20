const socket = io();

const chess = new Chess();

const boardElement = document.querySelector(".chessboard");

const draggedPiece = null;
const sourceSquare = null;
const playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    // boardElement.innerHTML=''
    // console.log(board);

    board.forEach((row, rowidx) => {
        // console.log(row);
        row.forEach((square, squareidx) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (row + square) % 2 === 0 ? "blackBlock" : "whiteBlock",
            );
            squareElement.dataset.row = rowidx;
            squareElement.dataset.col = squareidx;

            if (square) {
                const pieceElement = document.createElement("div");

                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white"
                     : "black",
                );

                pieceElement.innerText=''
                pieceElement.draggable=playerRole===square.color

                pieceElement.addEventListener("dragstart",()=>{

                })

            }
        });
    });
};
renderBoard();

const handleMove = () => {};

const getUniquePiece = () => {};
