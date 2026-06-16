const express = require("express");
const socket = require("socket.io");
const { Chess } = require("chess.js");
const http = require("http");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();

const players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //will able to use static files

app.get("/", (req, res) => {
    res.render("index", { title: "Chess" });
});

io.on("connection", (uniqueSocket) => {
    console.log("Connected");

    if (!players.white) {
        players.white = uniqueSocket.id;
        uniqueSocket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = uniqueSocket.id;
        uniqueSocket.emit("playerRole", "b");
    } else {
        uniqueSocket.emit("Spectators");
    }

    uniqueSocket.on("disconnect", () => {
        if (uniqueSocket.id === players.white) {
            delete players.white;
            console.log("disconnected white");
        } else if (uniqueSocket.id === players.black) {
            delete players.black;
            console.log("disconnected black");
        }
    });

    uniqueSocket.on("move", (move) => {
        try {
            if (chess.turn() === "w" && uniqueSocket.id !== white) return;
            if (chess.turn() === "b" && uniqueSocket.id !== black) return;

            const result = chess.move(move);

            if (result) {
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen);
            }

            else{
                console.log("Invalid move");
                uniqueSocket.emit('Invalid Move',move)
            }
        } catch (error) {
            return res.status(401).json({message:error.message})
        }
    });
});

server.listen(3000, () => {
    console.log("Listening to port 3000");
});
