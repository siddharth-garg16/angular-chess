import { Component, OnDestroy, OnInit  } from '@angular/core';
import { ChessBoard } from '../../chess-engine/chess-board';
import { Color, Coords, FENChar, pieceImagePath, SafeSquares } from '../../chess-engine/models';
import { CommonModule } from '@angular/common';
import { Piece } from '../../chess-engine/pieces/piece';
import { SelectedSquare } from './models';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChessBoard } from 'src/app/chess-logic/chess-board';
import { CheckState, Color, Coords, FENChar, GameHistory, LastMove, MoveList, MoveType, SafeSquares, pieceImagePaths } from 'src/app/chess-logic/models';
import { SelectedSquare } from './models';
import { ChessBoardService } from './chess-board.service';
import { Subscription, filter, fromEvent, tap } from 'rxjs';
import { FENConverter } from 'src/app/chess-logic/FENConverter';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss'
})
export class ChessBoardComponent {
  public pieceImagePath = pieceImagePath;

  private chessBoard = new ChessBoard();

  private selectedSquare: SelectedSquare = { piece: null };

  private pieceSafeSquares: Coords[] = [];

  public chessBoardView: (FENChar|null)[][] = this.chessBoard.chessBoardView;

  public get safeSquares(): SafeSquares {
    return this.chessBoard.safeSquares
  }

  public get playerColor(): Color {
    return this.chessBoard.playerColor
  }

  public isSquareBlack(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  public isSquareSelected(x: number, y: number): boolean {
    if(!this.selectedSquare.piece) return false
    return this.selectedSquare.x === x && this.selectedSquare.y === y
  }

  public isSquareSafeForSelectedPiece(x: number, y: number): boolean{
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y)
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar|null = this.chessBoardView[x][y];
    if(!piece) return
    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + ',' + y) || [];
  }

}
