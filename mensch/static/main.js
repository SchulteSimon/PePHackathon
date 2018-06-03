"use strict;"

const fields = [
  {x: 0, y: 4, role: 's0'},
  {x: 1, y: 4, role: 'normal'},
  {x: 2, y: 4, role: 'normal'},
  {x: 3, y: 4, role: 'normal'},
  {x: 4, y: 4, role: 'normal'},
  {x: 4, y: 3, role: 'normal'},
  {x: 4, y: 2, role: 'normal'},
  {x: 4, y: 1, role: 'normal'},
  {x: 4, y: 0, role: 'normal'},
  {x: 5, y: 0, role: 'e1'},
  {x: 6, y: 0, role: 's1'},
  {x: 6, y: 1, role: 'normal'},
  {x: 6, y: 2, role: 'normal'},
  {x: 6, y: 3, role: 'normal'},
  {x: 6, y: 4, role: 'normal'},
  {x: 7, y: 4, role: 'normal'},
  {x: 8, y: 4, role: 'normal'},
  {x: 9, y: 4, role: 'normal'},
  {x: 10, y: 4, role: 'normal'},
  {x: 10, y: 5, role: 'e2'},
  {x: 10, y: 6, role: 's2'},
  {x: 9, y: 6, role: 'normal'},
  {x: 8, y: 6, role: 'normal'},
  {x: 7, y: 6, role: 'normal'},
  {x: 6, y: 6, role: 'normal'},
  {x: 6, y: 7, role: 'normal'},
  {x: 6, y: 8, role: 'normal'},
  {x: 6, y: 9, role: 'normal'},
  {x: 6, y: 10, role: 'normal'},
  {x: 5, y: 10, role: 'e3'},
  {x: 4, y: 10, role: 's3'},
  {x: 4, y: 9, role: 'normal'},
  {x: 4, y: 8, role: 'normal'},
  {x: 4, y: 7, role: 'normal'},
  {x: 4, y: 6, role: 'normal'},
  {x: 3, y: 6, role: 'normal'},
  {x: 2, y: 6, role: 'normal'},
  {x: 1, y: 6, role: 'normal'},
  {x: 0, y: 6, role: 'normal'},
  {x: 0, y: 5, role: 'e0'},
  {x: 5, y: 1, role: 'h0'},
  {x: 5, y: 2, role: 'h0'},
  {x: 5, y: 3, role: 'h0'},
  {x: 5, y: 4, role: 'h0'},
  {x: 9, y: 5, role: 'h1'},
  {x: 8, y: 5, role: 'h1'},
  {x: 7, y: 5, role: 'h1'},
  {x: 6, y: 5, role: 'h1'},
  {x: 5, y: 9, role: 'h2'},
  {x: 5, y: 8, role: 'h2'},
  {x: 5, y: 7, role: 'h2'},
  {x: 5, y: 6, role: 'h2'},
  {x: 1, y: 5, role: 'h3'},
  {x: 2, y: 5, role: 'h3'},
  {x: 3, y: 5, role: 'h3'},
  {x: 4, y: 5, role: 'h3'},
  {x: 9, y: 0, role: 'b0'},
  {x: 9, y: 1, role: 'b0'},
  {x: 10, y: 0, role: 'b0'},
  {x: 10, y: 1, role: 'b0'},
  {x: 9, y: 9, role: 'b1'},
  {x: 9, y: 10, role: 'b1'},
  {x: 10, y: 9, role: 'b1'},
  {x: 10, y: 10, role: 'b1'},
  {x: 0, y: 9, role: 'b2'},
  {x: 0, y: 10, role: 'b2'},
  {x: 1, y: 9, role: 'b2'},
  {x: 1, y: 10, role: 'b2'},
  {x: 0, y: 0, role: 'b3'},
  {x: 0, y: 1, role: 'b3'},
  {x: 1, y: 0, role: 'b3'},
  {x: 1, y: 1, role: 'b3'},
]

const startPositions = [
  [56, 57, 58, 59],
  [60, 61, 62, 63],
  [64, 65, 66, 67],
  [68, 69, 70, 71],
]

const entryPositions = [
  10, 20, 30, 0,
]

const housePositions = [
  [43, 42, 41, 40],
  [47, 46, 45, 44],
  [51, 50, 49, 48],
  [55, 54, 53, 52],
]

function init() {
  fields.forEach((field) => {
    field.x = field.x / 11 * 100;
    field.y = field.y / 11 * 100;
    field['allowed'] = false;
    field['piece'] = null;
  });
  startPositions.forEach((positions, player) => {
    console.log("Player " + player);
    positions.forEach((position) => {
      console.log(position);
      fields[position].piece = player;
    })
  })
}

init();

let app = new Vue({
  el: '#app',
  delimiters: ['((', '))'],
  data: {
    fields: fields,
    numPlayer: 4,
    currentPlayer: 0,
    currentThrow: null,
    pieces: startPositions,
  },
  methods: {
    hasWon: function(player) {
      for (position of this.pieces[player]) {
        if (this.fields[position].role !== ('h' + player) ) {
          return false;
        }
      }
      return true;
    },
    getNumPiecesInBase: function(player) {
      let numBase = 0;
      for (position of this.pieces[player]){
        if (this.fields[position].role === ('b' + player)) {
          numBase += 1;
        }
      }
      return numBase;
    },
    hasThreeThrows: function(player) {
      let numBase = this.getNumPiecesInBase(player);
      if (numBase == 4){
        return true;
      }
      for (position of this.pieces[player]) {
        let role = this.fields[position].role;
        if ( role !== ('b' + player) && role !== ('h' + player)) {
          return false;
        }
      }
      for (i = 0; i < 4 - numBase; i++ ) {
        if (this.fields[housePositions[player][i]].piece === null) {
          return false;
        }
      }
      return true;
    },
    calculateTarget: function(player, piece, eyes) {
      let position = this.pieces[player][piece];
      let target = (position + eyes) % 40;
      return target;
    },

    movePieceToField: function(player, piece, target) {
      console.log('getCanThrowAusgabe: ', this.getCanThrow(this.currentPlayer, this.currentThrow));
      if (this.getCanThrow(this.currentPlayer, this.currentThrow)[1] == true){
        let [canThrow, bool, targetThrow] = this.getCanThrow(this.currentPlayer, this.currentThrow);
        console.log('bool ', bool);
        for(i=0; i<canThrow.length; i++) {
          if(canThrow[i]==piece) {
            this.fields[this.pieces[targetThrow[i][0]][targetThrow[i][1]]].piece = null;
            this.fields[this.startPositions[targetThrow[i][0]][targetThrow[i][1]]].piece = targetThrow[i][0];
            this.pieces[targetThrow[i][0]][targetThrow[i][1]] = this.startPositions[targetThrow[i][0]][targetThrow[i][1]];
          }
        }
      }
      this.fields[this.pieces[player][piece]].piece = null;
      this.fields[target].piece = player;
      this.pieces[player][piece] = target;
    },
    movePiece: function(player, piece, eyes) {
      let currentPos = this.pieces[player][piece];
      let currentField = this.fields[currentPos];
      let target;
      if (currentField.role.startsWith('h')) {
        target = this.pieces[player][piece] + eyes;
      } else if (currentField.role.startsWith('b')) {
        if (eyes == 6) {
          target = entryPositions[player];
        }
        else {target = this.pieces[player][piece];}
      } else {
        target = (this.pieces[player][piece] + eyes) % 40;
        if (currentPos < entryPositions[player] && target >= entryPositions[player]) {
          let eyes = target - entryPositions[player] + 1;
          target = housePositions[player][4 - eyes];
          if (eyes > 4) {
            target = this.pieces[player][piece];
          }
          else {
            for (checkField = housePositions[player][3]; checkField < target; checkField++) {
              if (this.fields[checkField].piece == player) {
                target = this.pieces[player][piece];
              }
            }
          }
        }
      }
      this.movePieceToField(player, piece, target);
    },
    getCanThrow: function(player, eyes) {
      let canThrow = [];
      let targetThrow = [];
      let boolean;
      for (piece = 0; piece < this.pieces[player].length; piece++) {
        let position = this.pieces[player][piece];
        let target = (position + eyes) % 40;
        if (position < entryPositions[player] && target >= entryPositions[player]) {
          continue;
        }
        let otherPiece = this.fields[target].piece;
        console.log('anderer Spieler ', otherPiece);
        if ((otherPiece != null)  && (otherPiece != player)) {
          for (targetPiece = 0; targetPiece < this.pieces[otherPiece].length; targetPiece++) {
            if (this.pieces[otherPiece][targetPiece] == target) {
              this.fields[target].allowed = true;
              boolean = true;
              canThrow.push([piece]);
              targetThrow.push([otherPiece, targetPiece]);
            }
          }
        }
      }
      console.log('canThrow: ', canThrow, ' targetThrow: ', targetThrow);
      return [canThrow, boolean, targetThrow];
    },
    getAllowedMoves: function(player, eyes) {
      for (piece = 0; piece < this.pieces[player].length; piece++) {
        let position = this.pieces[player][piece];
        if (position == entryPositions[player]) {
          if (this.fields[position + eyes].piece != player) {
            this.fields[position + eyes].allowed = true;
            return [piece], 'emptyStart';
          }
        }
      }
      let canThrow = this.getCanThrow(player, eyes);
      if (canThrow[1] == true) return canThrow, 'throw';
      for (piece = 0; piece < this.pieces[player].length; piece++) {
        let position = this.pieces[player][piece];
        let role = this.fields[position].role;
        if (role.startsWith('b')) {
          if (eyes === 6) {
            if (this.fields[entryPositions[player]].piece != player) {
              this.fields[entryPositions[player]].allowed = true;
              return [piece], 'start';
            }
          }
        }
      }
      availablePieces = [];
      for (piece = 0; piece < this.pieces[player].length; piece++) {
        let position = this.pieces[player][piece];
        if (this.fields[position].role.startsWith('b')) {
          continue;
        }
        target = (this.pieces[player][piece] + eyes) % 40;
        if (this.fields[target].piece != this.currentPlayer) {
          availablePieces.push(piece);
          this.fields[target].allowed = true;
        }
      }
      return availablePieces, 'normal';
    },
    dice: function() {
      if (this.hasThreeThrows(this.currentPlayer) == true) {
        this.throwDice();
        if (this.currentThrow==6) {
          this.fields[entryPositions[this.currentPlayer]].allowed = true;
          }
        else {
          this.throwDice();
        }
        if (this.currentThrow==6) {
          this.fields[entryPositions[this.currentPlayer]].allowed = true;
          }
        else {
          this.throwDice();
        }
        if (this.currentThrow==6) {
          this.fields[entryPositions[this.currentPlayer]].allowed = true;
          }
        else {
          this.currentPlayer = (this.currentPlayer+1)%this.numPlayer;
        }
      }
      else {
        this.throwDice();
      }
      this.getAllowedMoves(this.currentPlayer, this.currentThrow);
    },
    throwDice: function() {
      this.currentThrow = 1 + Math.floor(Math.random() * 6);
    },
    handleClick: function(fieldID) {
      if (this.fields[fieldID].piece == this.currentPlayer) {
        for (piece = 0; piece < this.pieces[this.currentPlayer].length; piece++) {
          if (this.pieces[this.currentPlayer][piece] == fieldID) {
            this.movePiece(this.currentPlayer, piece, this.currentThrow)
            fields.forEach((field) => {
              field['allowed'] = false;
            });
            this.currentPlayer = (this.currentPlayer+1)%this.numPlayer;
          }
        }
      }
    }
    }
})
