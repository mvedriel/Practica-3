/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/


describe("Clase GameBoard", function(){
 
	

	it("add", function() {

	var gBoard = new GameBoard();

	var obj1=1;
	var obj2=2;
	var obj3=3;

	gBoard.add(obj1);
	gBoard.add(obj2);
	gBoard.add(obj3);

	expect(gBoard.objects[0]).toEqual(1);
	expect(gBoard.objects[1]).toEqual(2);
	expect(gBoard.objects[2]).toEqual(3);

	});


	it("iterate", function(){

	var gBoard = new GameBoard();

	var o1 = {
	    step: function (){}
	};
	var o2 = {
	    step: function (){}
	};
	var o3 = {
	    step: function (){}
	};

	spyOn(o1, "step");
	spyOn(o2, "step");
	spyOn(o3, "step");


	gBoard.add(o1);	
	gBoard.add(o2);
	gBoard.add(o3);

	gBoard.iterate("step", 1.0);
	
	expect(o1.step).toHaveBeenCalledWith(1.0);
	expect(o2.step).toHaveBeenCalledWith(1.0);
	expect(o3.step).toHaveBeenCalledWith(1.0);

    });

	it("remove", function(){
	
	var gBoard = new GameBoard();

	var obj1=1;
	var obj2=2;
	var obj3=3;

	gBoard.add(obj1);
	gBoard.add(obj2);
	gBoard.add(obj3);

	gBoard.resetRemoved();

	gBoard.remove(obj1);
	gBoard.remove(obj2);
	gBoard.remove(obj3);

	expect(gBoard.removed[0]).toEqual(1);
	expect(gBoard.removed[1]).toEqual(2);
	expect(gBoard.removed[2]).toEqual(3);

	gBoard.finalizeRemoved();

	expect(gBoard.objects[0]).toEqual(undefined);

	});

	it("overlap", function(){

	var gBoard = new GameBoard();

	var obj1={x:0,y:0,w:5,h:10};

	expect(gBoard.overlap(obj1, {x:0, y:0, h:1, w:10})).toBe(true);
	expect(gBoard.overlap(obj1, {x:1, y:1, h:0, w:-1})).toBe(false);
  	  
	});

	it("step", function() {

	var gBoard = new GameBoard();

	spyOn(gBoard, "step");
	
	gBoard.step();
	
	expect(gBoard.step).toHaveBeenCalled();

	});
	
	it("draw", function(){

	var gBoard = new GameBoard();

	spyOn(gBoard, "draw");

	gBoard.draw();

	expect(gBoard.draw).toHaveBeenCalled();

	});

	it("detect", function() {

	var gBoard = new GameBoard();

	gBoard.objects = [{o1: "a"}, {o1: "b"}];

	var x = function() {
		return this.o1 == "a";	
	};
	var y = function() {
		return this.o1 == "b";	
	};

	expect(gBoard.detect(x)).toBe(gBoard.objects[0]);
	expect(gBoard.detect(y)).toBe(gBoard.objects[1]);

	});



});


