import {Component, OnInit} from '@angular/core';

export interface ILogMove {
  player: string;
  date: Date;
  move: string;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  public fieldArr = [
    {value: '', position: 'row 1, col 1'},
    {value: '', position: 'row 1, col 2'},
    {value: '', position: 'row 1, col 3'},
    {value: '', position: 'row 2, col 1'},
    {value: '', position: 'row 2, col 2'},
    {value: '', position: 'row 2, col 3'},
    {value: '', position: 'row 3, col 1'},
    {value: '', position: 'row 3, col 2'},
    {value: '', position: 'row 3, col 3'}
  ];

  private isBotMadeMove: boolean;

  public gameOverMessage: string;

  public showModal = false;

  private logs = [];
  public modalLogs: object[];

  private count = 0;

  private winArr = ['012', '345', '678', '036', '147', '258', '048', '246'];

  public userSign = 'X';
  public botSign = 'O';

  public firstTurn: 'bot' | 'user' = 'user';

  constructor() {
  }

  ngOnInit(): void {

  }

  public move(ind: number, cell): void {

    if (!cell.value) {

    this.logMove(cell.position, 'me');

    this.count++;

    cell.value = this.userSign;


    for (let i = 0; i < 8; i++) {
      const first = this.winArr[i].substr(0, 1);
      const second = this.winArr[i].substr(1, 1);
      const third = this.winArr[i].substr(2, 1);


      if (this.fieldArr[first].value === this.userSign
        &&
        this.fieldArr[second].value === this.userSign
        &&
        this.fieldArr[third].value === this.userSign) {
        this.gameOverMessage = 'You win!';
        this.showModal = true;
      }
    }

    if (!this.gameOverMessage) {
      this.botMove();
    }

    if (this.count > 9) {
      this.gameOverMessage = 'Draw';
      this.showModal = true;
    }

    }
  }

  private botMove(): void {
    this.count++;

    const sideMoves = [1, 3, 5, 7];

    const diagonalMoves = [4, 0, 2, 6, 8];

    this.isBotMadeMove = false;

    this.isBotCanWin();

    if (!this.isBotMadeMove) {
      this.isUserCanWin();
    }

    if (!this.fieldArr[4].value && !this.isBotMadeMove) {
      this.fieldArr[4].value = this.botSign;
      this.logMove(this.fieldArr[4].position, 'bot');
      this.isBotMadeMove = true;
    }

    if (!this.isBotMadeMove) {
      if (this.count < 9) {

        if (this.fieldArr[0].value === this.userSign && this.fieldArr[8].value === this.userSign ||
          this.fieldArr[2].value === this.userSign && this.fieldArr[6].value === this.userSign) {
          if (!this.isBotMadeMove) {
            this.randomMove(sideMoves);
          }
        }

        if (!this.isBotMadeMove) {
          this.fieldArr.forEach((cell, ind) => {
            diagonalMoves.forEach((move) => {
              if (ind === move && !cell.value && !this.isBotMadeMove) {
                this.randomMove(diagonalMoves);
              }
            });
          });
        }

        if (!this.isBotMadeMove) {
          this.randomMove(sideMoves);
        }
      } else {
        this.fieldArr.forEach((cell) => {
          if (!cell.value) {
            cell.value = this.botSign;
            this.gameOverMessage = 'Draw!';
            this.showModal = true;
          }
        });
      }

    }

  }

  private randomMove(arr: number[]): void {
    const randomNumber = arr[Math.floor(Math.random() * arr.length)];

    if (!this.fieldArr[randomNumber].value) {
      this.fieldArr[randomNumber].value = this.botSign;
      this.logMove(this.fieldArr[randomNumber].position, 'bot');

      this.isBotMadeMove = true;
    } else {
      this.randomMove(arr);
    }

  }

  private isUserCanWin(): void {
    for (let i = 0; i < 8; i++) {
      if (!this.isBotMadeMove) {
        const first = this.winArr[i].substr(0, 1);
        const second = this.winArr[i].substr(1, 1);
        const third = this.winArr[i].substr(2, 1);

        if (this.fieldArr[first].value === this.userSign
          &&
          this.fieldArr[second].value === this.userSign
          &&
          !this.fieldArr[third].value) {
          this.fieldArr[third].value = this.botSign;
          this.logMove(this.fieldArr[third].position, 'bot');
          this.isBotMadeMove = true;
        }


        if (this.fieldArr[first].value === this.userSign
          &&
          !this.fieldArr[second].value
          &&
          this.fieldArr[third].value === this.userSign) {
          this.fieldArr[second].value = this.botSign;
          this.logMove(this.fieldArr[second].position, 'bot');
          this.isBotMadeMove = true;
        }

        if (!this.fieldArr[first].value
          &&
          this.fieldArr[second].value === this.userSign
          &&
          this.fieldArr[third].value === this.userSign) {
          this.fieldArr[first].value = this.botSign;
          this.logMove(this.fieldArr[first].position, 'bot');
          this.isBotMadeMove = true;
        }
      }
    }
  }

  private isBotCanWin(): void {
    for (let i = 0; i < 8; i++) {
      const first = this.winArr[i].substr(0, 1);
      const second = this.winArr[i].substr(1, 1);
      const third = this.winArr[i].substr(2, 1);

      if (!this.isBotMadeMove) {
        if (this.fieldArr[first].value === this.botSign
          &&
          this.fieldArr[second].value === this.botSign
          &&
          !this.fieldArr[third].value) {
          this.fieldArr[third].value = this.botSign;
          this.logMove(this.fieldArr[third].position, 'bot');
          this.isBotMadeMove = true;
          this.gameOverMessage = 'You lose!';
          this.showModal = true;
        }

        if (this.fieldArr[first].value === this.botSign
          &&
          !this.fieldArr[second].value
          &&
          this.fieldArr[third].value === this.botSign) {
          this.fieldArr[second].value = this.botSign;
          this.logMove(this.fieldArr[second].position, 'bot');
          this.isBotMadeMove = true;
          this.gameOverMessage = 'You lose!';
          this.showModal = true;
        }

        if (!this.fieldArr[first].value
          &&
          this.fieldArr[second].value === this.botSign
          &&
          this.fieldArr[third].value === this.botSign) {
          this.fieldArr[first].value = this.botSign;
          this.logMove(this.fieldArr[first].position, 'bot');
          this.isBotMadeMove = true;
          this.gameOverMessage = 'You lose!';
          this.showModal = true;
        }
      }
    }
  }

  public closeModalWindow(ev: boolean): void {
    this.showModal = !ev;
    this.modalLogs = [];
  }

  private logMove(move: string, player: string): void {
    const log: ILogMove = {
      date: new Date(),
      player,
      move
    };
    this.logs.push(log);
  }

  public showLogs(): void {
    this.modalLogs = this.logs;
    this.showModal = true;
  }

  public setFirstTurn(player: 'bot' | 'user'): void {
    this.firstTurn = player;
    this.clearField();
  }

  public setSign(sign: string): void {
    if (sign === 'X') {
      this.botSign = 'O';
      this.userSign = 'X';
    }
    if (sign === 'O') {
      this.botSign = 'X';
      this.userSign = 'O';
    }

    this.clearField();
  }


  public clearField(): void {
    this.logs = [];
    this.count = 0;
    this.gameOverMessage = '';
    this.fieldArr.forEach((cell) => {
      cell.value = '';
    });

    if (this.firstTurn === 'bot') {
      this.botMove();
    }
  }
}
