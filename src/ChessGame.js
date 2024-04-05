import React, { useState } from 'react';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

function ChessGame({ username }) {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPiecePosition, setSelectedPiecePosition] = useState(null);

  const handlePieceClick = (row, col, piece) => {
    if (!piece) {
      return;
    }

    if (piece === selectedPiece) {
      setSelectedPiece(null);
      setSelectedPiecePosition(null);
    } else if (!selectedPiece && isPlayerPiece(piece, username)) {
      setSelectedPiece(piece);
      setSelectedPiecePosition([row, col]);
    } else if (selectedPiece) {
      if (isValidMove(selectedPiece, selectedPiecePosition, [row, col])) {
        const newBoard = [...board];
        newBoard[row][col] = selectedPiece;
        newBoard[selectedPiecePosition[0]][selectedPiecePosition[1]] = null;
        setBoard(newBoard);
      }
      setSelectedPiece(null);
      setSelectedPiecePosition(null);
    }
  };

  const isPlayerPiece = (piece, username) => {
    if (piece === piece.toUpperCase() && username === 'white') {
      return true;
    }
    if (piece === piece.toLowerCase() && username === 'black') {
      return true;
    }
    return false;
  };

  const isValidMove = (piece, [startRow, startCol], [endRow, endCol]) => {
    // Implementa las reglas de movimiento para cada tipo de pieza aquí
    switch (piece.toLowerCase()) {
      case 'p':
        // Movimiento del peón
        if (piece === 'p') { // Peón negro
          if (startRow - endRow === 1 && startCol === endCol && !board[endRow][endCol]) {
            return true; // Peón avanza una casilla
          }
        } else { // Peón blanco
          if (endRow - startRow === 1 && startCol === endCol && !board[endRow][endCol]) {
            return true; // Peón avanza una casilla
          }
        }
        return false;
      case 'r':
        // Movimiento de la torre
        if (startRow === endRow || startCol === endCol) {
          return true; // La torre se mueve en línea recta en horizontal o vertical
        }
        return false;
      case 'n':
        // Movimiento del caballo
        const deltaRow = Math.abs(endRow - startRow);
        const deltaCol = Math.abs(endCol - startCol);
        return (deltaRow === 2 && deltaCol === 1) || (deltaRow === 1 && deltaCol === 2);
      // Implementa otras piezas aquí
      default:
        return false;
    }
  };

  const renderSquare = (piece, row, col) => {
    const isSelected = selectedPiecePosition && row === selectedPiecePosition[0] && col === selectedPiecePosition[1];
    const backgroundColor = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
    return (
      <div
        key={row * 8 + col}
        className="square"
        style={{ backgroundColor }}
        onClick={() => handlePieceClick(row, col, piece)}
      >
        <span className={isSelected ? 'selected' : ''}>{piece}</span>
      </div>
    );
  };

  const renderRow = (row, rowIndex) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((piece, colIndex) => renderSquare(piece, rowIndex, colIndex))}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>
    );
  };

  return (
    <div>
      <h1>Bienvenido, {username}!</h1>
      <h2>Juego de ajedrez</h2>
      {renderBoard()}
    </div>
  );
}

export default ChessGame;
