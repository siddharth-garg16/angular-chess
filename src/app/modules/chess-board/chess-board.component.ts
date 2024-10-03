import { Component } from '@angular/core';
import { ChessBoard } from '../../chess-engine/chess-board';
import { Color, FENChar, pieceImagePath } from '../../chess-engine/models';
import { CommonModule } from '@angular/common';

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
  public chessBoardView: (FENChar|null)[][] = this.chessBoard.chessBoardView;
  public get playerColor(): Color {
    return this.chessBoard.playerColor
  }
  public isSquareBlack(x: number, y: number): boolean {
    return ChessBoard.isSquareBlack(x, y);
  }
}
