"use strick";
var elms;
var time;
var blur;
var xCord;
var yCord;

window.onload = function(){
	
	var puzzle = document.getElementById('puzzlearea');
	
	elms = puzzle.getElementsByTagName('div');

	for (var i=0; i<elms.length; i++)
	{
		elms[i].className = 'puzzlepiece';
		elms[i].style.left = (i%4*100)+'px';
		elms[i].style.top = (parseInt(i/4)*100) + 'px';
		elms[i].style.backgroundPosition= '-' + elms[i].style.left + ' ' + '-' + elms[i].style.top;
		
		elms[i].onmouseover = function()
		{
			if (canMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		};
		
		elms[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};

		elms[i].onclick = function()
		{
			if (canMove(parseInt(this.innerHTML)))
			{
				moveable(this.innerHTML-1);
				if (finisher())
				{
					winner();
				}
				return;
			}
		};
	}

	xCord = '300px';
	yCord = '300px';

	var shuffle = document.getElementById("shufflebutton");
	shuffle.onclick = function()
	{
		var variable;
		for (var i=0; i<250; i++)
		{
			var random = parseInt(Math.random()* 100) %4;
			if (random === 0)
			{
				variable = up(xCord, yCord);
				if ( variable != -1)
				{
					moveable(variable);
				}
			}
			
			if (random === 1)
			{
				variable = down(xCord, yCord);
				if ( variable != -1) 
				{
					moveable(variable);
				}
			}

			if (random === 2)
			{
				variable = left(xCord, yCord);
				if ( variable != -1)
				{
					moveable(variable);
				}
			}

			if (random === 3)
			{
				variable = right(xCord, yCord);
				if (variable != -1)
				{
					moveable(variable);
				}
			}
		}
	};
};

function canMove(index)
{
	if (left(xCord, yCord) === (index-1))
	{
		return true;
	}

	if (down(xCord, yCord) === (index-1))
	{
		return true;
	}

	if (up(xCord, yCord) === (index-1))
	{
		return true;
	}

	if (right(xCord, yCord) === (index-1))
	{
		return true;
	}
}

function Blur()
{
	blur --;
	if (blur === 0)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FFFFFF";
		alert("Congratulations, your the winner!!!!!");
		return;
	}
	
	else if (blur % 2)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#00FF00";	
	}
	else
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FF0000";
	}
	time = setTimeout(Blur, 100);
}


function winner()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "#FF0000";
	blur = 10;
	time = setTimeout(Blur, 100);
}

function finisher()
{
	var bool = true;
	for (var i = 0; i < elms.length; i++) {
		var y = parseInt(elms[i].style.top);
		var x = parseInt(elms[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			bool = false;
			break;
		}
	}
	return bool;
}


function left(x, y)
{
	var X = parseInt(x);
	var Y = parseInt(y);

	if (X > 0)
	{
		for (var i = 0; i < elms.length; i++) 
		{
			if (parseInt(elms[i].style.left) + 100 === X && parseInt(elms[i].style.top) === Y)
			{
				return i;
			} 
		}
	}
	
	else 
	{
		return -1;
	}
}

function right(x, y) {
	var X = parseInt(x);
	var Y = parseInt(y);
	if (X < 300)
	{
		for (var i =0; i<elms.length; i++){
			if (parseInt(elms[i].style.left) - 100 === X && parseInt(elms[i].style.top) === Y) 
			{
				return i;
			}
		}
	}
	
	else
	{
		return -1;
	} 
}

function up(x, y) {
	var X = parseInt(x);
	var Y = parseInt(y);
	if (Y > 0)
	{
		for (var i=0; i<elms.length; i++)
		{
			if (parseInt(elms[i].style.top) + 100 === Y && parseInt(elms[i].style.left) === X) 
			{
				return i;
			}
		} 
	}
	
	else 
	{
		return -1;
	}
}

function down(x, y)
{
	var X = parseInt(x);
	var Y = parseInt(y);
	if (Y < 300)
	{
		for (var i=0; i<elms.length; i++)
		{
			if (parseInt(elms[i].style.top) - 100 === Y && parseInt(elms[i].style.left) === X) 
			{
				return i;
			}
		}
	}
	
	else
	{
		return -1;
	} 
}

function moveable(index) {
	var swap = elms[index].style.top;
	elms[index].style.top = yCord;
	yCord = swap;

	swap = elms[index].style.left;
	elms[index].style.left = xCord;
	xCord = swap;
}