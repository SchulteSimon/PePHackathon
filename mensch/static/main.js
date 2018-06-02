const fields = [
  {x: 0, y: 4, allowed: false},
  {x: 1, y: 4, allowed: false},
  {x: 2, y: 4, allowed: false},
  {x: 3, y: 4, allowed: false},
  {x: 4, y: 4, allowed: false},
  {x: 4, y: 3, allowed: false},
  {x: 4, y: 2, allowed: false},
  {x: 4, y: 1, allowed: false},
  {x: 4, y: 0, allowed: false},
  {x: 5, y: 0, allowed: false},
  {x: 6, y: 0, allowed: false},
  {x: 6, y: 1, allowed: false},
  {x: 6, y: 2, allowed: false},
  {x: 6, y: 3, allowed: false},
  {x: 6, y: 4, allowed: false},
  {x: 7, y: 4, allowed: false},
  {x: 8, y: 4, allowed: false},
  {x: 9, y: 4, allowed: false},
  {x: 10, y: 4, allowed: false},
  {x: 10, y: 5, allowed: false},
  {x: 10, y: 6, allowed: false},
  {x: 9, y: 6, allowed: false},
  {x: 8, y: 6, allowed: false},
  {x: 7, y: 6, allowed: false},
  {x: 6, y: 6, allowed: false},
  {x: 6, y: 7, allowed: false},
  {x: 6, y: 8, allowed: false},
  {x: 6, y: 9, allowed: false},
  {x: 6, y: 10, allowed: false},
  {x: 5, y: 10, allowed: false},
  {x: 4, y: 10, allowed: false},
  {x: 4, y: 9, allowed: false},
  {x: 4, y: 8, allowed: false},
  {x: 4, y: 7, allowed: false},
  {x: 4, y: 6, allowed: false},
  {x: 3, y: 6, allowed: false},
  {x: 2, y: 6, allowed: false},
  {x: 1, y: 6, allowed: false},
  {x: 0, y: 6, allowed: false},
  {x: 0, y: 5, allowed: false},
]

fields.forEach((field) => {
  field.x = field.x / 11 * 100;
  field.y = field.y / 11 * 100;
})


let app = new Vue({
  el: '#app',
  delimiters: ['((', '))'],
  data: {
    fields: fields,
    numPlayer: 4,
    currentPlayer: 1,
    currentThrow: null,
  },
  methods: {
    throwDice: function() {
      this.currentThrow = 1 + Math.floor(Math.random() * 6);
    },
    handleClick: function(fieldID) {
      this.fields[fieldID].allowed = !this.fields[fieldID].allowed;
    }
  }
})
