$(document).ready(function() {
   $('form').submit(function(e) {
      e.preventDefault();
      // Get the form data
      var gridSize = $('[name="gridsize"]').val();// This sets the size of the grid
      var drawOn = +$('[name="draw"]').val();// 0 - Draw on hover : 1 - Draw on click
      var styleType = +$('[name="style"]').val();// 0 - Normal : 1 - Inverted : 2 - Random
      // Get and empty the container, and clear it of width/height changes
      var container = $('#grid_container');
      container.empty();
      container.attr('style','');
      // Get the container dimension
      var containerSize = parseInt(container.css('width').replace('px'), 10);      
      // Calc cell size. gridSize+1 is the border space
      var cellSize = Math.floor((containerSize - gridSize+1) / gridSize);
      // If the cell size is smaller than 2px it wont work. Update the form with max res and resubmit
      if (cellSize < 2) {
         $('[name="gridsize"]').val(Math.floor((containerSize-4) / 3));
         $('form').find('button').click();
         return false;
      } else {
         // Adjust container and row width, as may be too big
         containerSize = ((cellSize+1) * gridSize) + 1;
      }
      
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
      // Size everything accordingly
      $('#grid_container').css({'width': containerSize + 'px', 'height': containerSize + 'px'});
      $('.row_div').css({'width': containerSize + 'px', 'height': (cellSize+1) + 'px'});
      $('.cell_div').css({'height': cellSize + 'px', 'width': cellSize + 'px'});
      
      // MAKE THE GRID RESPONSIVE TO THE MOUSE
      // This will set the inverted background to black
      var activeColor = [styleType ? '#f0f0f0' : '#131313', styleType ? '#cccccc' : '#000000'];
      if (styleType === 1) {
         $('.cell_div').css({'background-color': '#131313', 'border-color': '#000000'});
      }
      // This function will change the background of the a cell div
      var draw = function() {
         // If normal or inverted, just use the activeColor
         if (styleType in [0,1]) {
            $(this).css({'background-color': activeColor[0], 'border-color': activeColor[1]});
         // If random, then generate a random hex color and apply it.
         } else if (styleType === 2) {
            var colorChar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f'];
            var randColor = [];
            
            for (i=0; i<6; i++) {
               randColor.push(colorChar[Math.floor(Math.random() * colorChar.length)]);               
            }
            
            $(this).css('background-color', '#' + randColor.join(""));
         } else { //Gradient
            // List of hex colors increasing in brightness by 10% from white to black
            var gradColors = ['#ffffff', '#e6e6e6','#cccccc',  '#b3b3b3', '#999999', 
                              '#808080', '#666666', '#4d4d4d', '#333333', '#1a1a1a', '#000'];
            // The divs background color will be returned in rgb
            var crntBg = $(this).css('background-color').replace('rgb(','').replace(')','').split(',');
            // Convert rgb to hex (what a faff)
            var crntBg = '#' + parseInt(crntBg[0],10).toString(16) + 
                               parseInt(crntBg[1],10).toString(16) +
                               parseInt(crntBg[2],10).toString(16);
            // Get the current colors index, and apply the next if it isn't black
            var crntIdx = gradColors.indexOf(crntBg);
            if (crntIdx < 10) {            
               $(this).css('background-color', gradColors[crntIdx+1]);
            }
         }
      };
      
      if (drawOn) {//Click
         $('.cell_div').click(draw);
      } else {//Hover
         $('.cell_div').mouseenter(draw);
      }
   });
   // Create the grid on page load
   $('form').find('button').click();
});
