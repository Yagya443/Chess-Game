const socket = io();

const chess = new Chess();

const boardElement = document.querySelector("chessboard");

const draggedPiece = null;
const sourceSquare = null;
const playerRole = null;

