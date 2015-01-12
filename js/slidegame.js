var N = 5;
var moves = 0;
var x;
var blankpos = N*N-1;//pos in grid of the blank
/*set up grid with N*N being the blank space  \
grid = [1, 2, 3, 4, 5,
				6, 7, 8, 9, 10,
				11, 12, 13, 14, 15,
				16, 17, 18, 19, 20,
				21, 22, 23, 24, 25]
25 is blank
*/
var grid = new Array(N*N);
for(x = 0; x < N*N; x++) {
	grid[x]=x+1;
}

//checks if the board is completed
function isSolved() {
	for(x = 0; x < N*N; x++)
	{
		if(grid[x] != x+1) {
			return false;
		}
	}
	return true;
}

/* returns
0 if not a neighbor
1 if move right
2 if move up
3 if move left
4 if move down
*/
function inBlankNeighbors(toCheck) {
	if(blankpos+N < N*N) {
		if(toCheck == grid[blankpos+N]) {
			grid[blankpos+N]=N*N;
			grid[blankpos]=toCheck;
			blankpos = blankpos+N;
			return 2;
	}}
	if(blankpos-N >= 0) {
		if(toCheck == grid[blankpos-N]) {
			grid[blankpos-N]=N*N;
			grid[blankpos]=toCheck;
			blankpos = blankpos-N;
			return 4;
	}}
	if( blankpos+1 < N*N && (blankpos+1)%N != 0) {
		if(toCheck == grid[blankpos+1]) {
			grid[blankpos+1]=N*N;
			grid[blankpos]=toCheck;
			blankpos = blankpos + 1;
			return 3;
	}}
	if( blankpos-1 >= 0 && (blankpos)%N != 0) {
		if(toCheck == grid[blankpos-1]) {
			grid[blankpos-1]=N*N;
			grid[blankpos]=toCheck;
			blankpos = blankpos - 1;
			return 1;
	}}
	return 0;
}

//gives possible neighbors
function listBlankNeighbors() {
	var possMoves = [];
	if(blankpos+N < N*N) {
		possMoves.push(N);
	}
	if(blankpos-N >= 0) {
		possMoves.push(-N);
	}
	if( blankpos+1 < N*N && (blankpos+1)%N != 0) {
		possMoves.push(1);
	}
	if( blankpos-1 >= 0 && (blankpos)%N != 0) {
		possMoves.push(-1);
	}
	return possMoves;
}

function makeRandomMove() {
	var possMoves = listBlankNeighbors();
	var randMove = possMoves[Math.floor(Math.random()*possMoves.length)];
	var divToMove = $("#" + "b" + (blankpos+randMove).toString());

	if(randMove == 1) {
		divToMove.animate({left:'+=86px'},250);
		grid[blankpos]=grid[blankpos+randMove];
		grid[blankpos+randMove]=N*N;
		blankpos = blankpos+randMove;
	}
	else if(randMove == -N) {
		divToMove.animate({top:'-=86px'},250);
  		grid[blankpos]=grid[blankpos+randMove];
		grid[blankpos+randMove]=N*N;
		blankpos = blankpos+randMove;
	}
	else if(randMove == -1) {
		divToMove.animate({left:'-=86px'},250);
  		grid[blankpos]=grid[blankpos+randMove];
		grid[blankpos+randMove]=N*N;
		blankpos = blankpos+randMove;
	}
	else if(randMove == N) {
		divToMove.animate({top:'+=86px'},250);
  		grid[blankpos]=grid[blankpos+randMove];
		grid[blankpos+randMove]=N*N;
		blankpos = blankpos+randMove;
	}
	return 0;
}

function randomizePuzzle() {
	for(var asdf = 0; asdf < 1; asdf++) {
		makeRandomMove();
	}
}

function updateScores() {
	var curscore = parseInt(document.getElementById("curscore").innerHTML.substr(19));
	document.getElementById("curscore").innerHTML = "<span>Moves:</span>" + moves;
	if(isSolved()) {
		var bestscore = parseInt(document.getElementById("bestscore").innerHTML.substr(18));
		if(bestscore > curscore)
			document.getElementById("bestscore").innerHTML = "<span>Best:</span>" + curscore;
	}
}

$(document).ready(function(){
	//alert("jquery works!");
	//randomizePuzzle();
	$(".block").click(function(){
		var curblock = $(this);
		switch( inBlankNeighbors(parseInt(curblock.text())) ) {
			case 0:
				moves-=1;
  				break;
  			case 1:
  				curblock.animate({left:'+=86px'});
  				break;
  			case 2:
  				curblock.animate({top:'-=86px'});
  				break;
  			case 3:
  				curblock.animate({left:'-=86px'});
  				break;
  			case 4:
  				curblock.animate({top:'+=86px'});
  				break;
  		}
    	moves+=1;
    	updateScores();
    	if(isSolved()) {
    		//alert("Looks like you won! I'll reset it now!");
    		randomizePuzzle();
    		updateScores();
    		moves = 0;
    	}
  });
});