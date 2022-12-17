/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'custom-blue' : '#3fcacd',
      'custom-lightblue' : '#9ff6cd',
      'custom-lightyellow' : '#ffec22',
      'custom-yellow' : '#ffbe00',
      'custom-brown' : '#76461c',
      'custom-lightbrown' : '#c88f55',
      'white' : '#ffffff',
      'red' : '#dc2626',
    }, 
    extend: {
      backgroundImage: {
        'wood-board-01': "url('../assets/img/woodenBoard_01.png')",
        'wood-board-02': "url('../assets/img/woodenBoard_02.png')",
        'wood-board-03': "url('../assets/img/woodenBoard_03.png')",
        'wood-board-04': "url('../assets/img/woodenBoard_04.png')",
        'rope-01': "url('../assets/img/rope_01.png')",
        'rope-02': "url('../assets/img/rope_02.png')",
        'rope-03': "url('../assets/img/rope_03.png')",
        'helm': "url('../assets/img/helm.png')",
        'seal': "url('../assets/img/seal_cartoon.png')",
        'backButton': "url('../assets/img/backButton.png')",
        'shopping-icon': "url('../assets/img/shopping-cart.png')",
      }
    },
  },
  plugins: [],
}
