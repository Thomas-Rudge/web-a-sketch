$(document).ready(function() {
   $('form').submit(function(e) {
      e.preventDefault();
      // Get the form data
      var gridSize = $('[name="gridsize"]')[0].value;// This sets the size of the grid
      var drawOn = +$('[name="draw"]')[0].value;// 0 - Draw on hover : 1 - Draw on click
      var styleType = +$('[name="style"]')[0].value;// 0 - Normal : 1 - Inverted
      //
      var rowWidth = 11 * (gridSize-1) + 12;// This determines the width of the rows. Used for centering
      var container = $('#grid_container');
      container.empty()
      // BUILD THE GRID
      for (var x=0; x<gridSize; x++) {
         container.append('<div class=row_div></div>');
         // for looping columns
         for (var i=0; i<gridSize; i++) {
            switch (true) {
               case i === 0 && x === gridSize-1: // Bottom right cell
                  container.children().last().prepend($("<div class='cell_div right_cell bottom_cell'></div>"));
                  break;
               case i === 0: // Last cell in the row
                  container.children().last().prepend($("<div class='cell_div right_cell'></div>"));
                  break;
               case x === gridSize-1: // Last cell in the column
                  container.children().last().prepend($("<div class='cell_div bottom_cell'></div>"));
                  break;
               default:
                  container.children().last().prepend($('<div class=cell_div></div>'));
            }
         }
      }
      
      //Centre the rows
      $('.row_div').css('width', rowWidth + 'px');
      // Set draw style
      console.log(styleType);
      if (styleType) {// Inverted
         $('.cell_div').css({'background-color': '#131313', 'border-color': 'black'});
      }
      
      //MAKE THE GRID RESPONSIVE TO MOUSE
      var activeColor = styleType ? '#F0F0F0' : '#131313';
      
      if (drawOn) {//Click
         $('.cell_div').click(function(){
            $(this).css('background-color', activeColor);
         });
      } else {//Hover
         console.log('hover')
         $('.cell_div').mouseenter(function(e){
            console.log('marking');
            $(this).css('background-color', activeColor);
         });
      }
   });
   // Create the grid on page load
   $('form').find('button').click();
});
