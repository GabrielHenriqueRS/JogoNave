
pontos = 0;
vidas = 3;
			gameOver = false;
			win = false;
			xP = 250;
			yP = 250;
			xI = 1002;
			yI = Math.random()*500;
			moverX = false;
			moverY = false;
			frente = true;
			cima = true;
			linha = 1;
			coluna = 1;
			quadro = 0;
			tipoI = Math.round(Math.random()*4);
			velocidade = 2;
			explodirInimigo = false;
			naveExibir = true;
			balas = new Array();
        	var canvas = document.getElementById("meuCanvas");
            var context = canvas.getContext('2d');
            anterior = new Date().getTime();
            somTiro = new Audio('Sons/tiro.mp3');
            somFundo = new Audio('Sons/fundo.mp3');
            //somFundo.play();
            somFundo.loop = true;
			
			// Background
			var fundo = new Image();
			fundo.src = 'telafundo.png';

			requestAnimationFrame(Desenhar);

			function Desenhar(){
			    agora = new Date().getTime();
            	decorrido = agora - anterior;
				console.log( 'Tempo decorrido: ' + decorrido );
				
				context.clearRect( 0, 0, canvas.width, canvas.height );
				Fundo();
				Persona();
				Explodir(explodirInimigo);
				Inimigo();
				GameOver();
				Win();
				desenhaVidas();
				desenhaPontos();

	            for( var c=0; c<balas.length;c++ ) {
	                balas[c].mover();
					console.log( 'Balas mover' );
				}

	            anterior = agora;

	            if(gameOver==true){
	                cancelAnimationFrame(Desenhar);
	            } else {
	                requestAnimationFrame(Desenhar);
	            }

	            if(win==true){
	                cancelAnimationFrame(Desenhar);
	            } else {
	                requestAnimationFrame(Desenhar);
	            }	
			}

			function desenhaPontos(){
				context.fillStyle = "White";
				context.font = "16pt Monospace";
				context.fillText("Pontuação: ", 5, 20);
				context.fillText(pontos, 130, 20);
			}

			function desenhaVidas(){
				context.fillStyle = "Red";
				context.font = "16pt Monospace";
				context.fillText("Vidas: ", 5, 50);
				context.fillText(vidas, 80, 50);
			}

			function GameOver(){
	            if(gameOver==true){
	                var fundo = new Image();
	                fundo.src = 'Telas/derrota.jpg';
	                fundo.onload = function(){
	                    context.drawImage(fundo, 0, 0, 1280, 900);
	                }
	                somFundo.pause();
	                somFundo.currentTime = 0;
	                somFim = new Audio('Sons/musicaD.mp3');
	                somFim.play();
	                explodirInimigo = false;
	                desenhaVidas() = false;
	                desenhaPontos() = false;
	           	}
        	}

        	function Win(){
	            if(win==true){
	                var fundo = new Image();
	                fundo.src = 'Telas/vitoria.jpg';
	                fundo.onload = function(){
	                    context.drawImage(fundo, 0, 0, 1280, 900);
	                }
	                somFundo.pause();
	                somFundo.currentTime = 0;
	                somFim = new Audio('Sons/musicaV.mp3');
	                somFim.play();
	                explodirInimigo = false;
	                desenhaVidas() = false;
	                desenhaPontos() = false;
	           	}
        	}

			function Fundo(){
				context.drawImage(fundo,0,0,1002,702);				
				console.log( 'Fundo()' );
			}

			function Persona(){
				if (naveExibir == true) {
					var persona = new Image();
					persona.src = 'Nave3.png';
					altura = 58;
					largura = 186;
	                eex = 1 * coluna;//58
	               	eey = 1 * linha;//122

					if( moverX || moverY ){	
						linha = 1;
						quadro++;
					}
					
					context.drawImage(
						persona, eex, eey,
	                	largura, altura, xP, yP,
		               	largura * 1, altura * 1
	                );
					/*if(quadro>9){
						if(frente==true)
							coluna++;
						else
							coluna--;
						quadro=0;
					}				
					if(coluna==9&&frente==true){
						coluna=0;
					}
					if(coluna==0&&frente==false){
						coluna=8;
					}
					if(quadro>9){
						if(cima==true)
							coluna++;
						else
							coluna--;
						quadro=0;
					}				
					if(coluna==9&&cima==true){
						coluna=0;
					}
					if(coluna==0&&cima==false){
						coluna=8;
					}*/
				}
			}

			function Inimigo(){
				var inimigo = new Image();
				if(tipoI==0)
                	inimigo.src = 'naveInimiga.png';
				else if(tipoI==1)
					inimigo.src = 'naveInimiga.png';
				else if(tipoI==2)
					inimigo.src = 'naveInimiga.png';
				else if(tipoI==3)
					inimigo.src = 'naveInimiga.png';
				else if(tipoI==4)
					inimigo.src = 'naveInimiga.png';			
				
                inimigo.onload = function(){
                  context.drawImage(inimigo,xI,yI,160,160);
                }
				xI-=velocidade;
				velocidade -= 0.000005;
				if(xI>1004){
					xI=1002;
					yI=Math.random()*500;
					tipoI = Math.round(Math.random()*4);
				}
				if(xI>1002 && xI < 0){
	                if(yI > yP-93 && yI < yP+93){
	                    explodirInimigo = true;
	                    naveExibir = false;
	                    xBoom = 0;
	                    yBoom = yP+200;
	                    vidas--;
	                    if(vidas<1){
	                        gameOver = true;
	                    }
	                }
            	}
			}

			function Explodir(vai_explodir){
				if(vai_explodir==true){
					var explode = new Image();
					explode.src = 'explosao.png';
					eex = 200 * coluna;
					eey = 200 * linha;
					altura = 200;
					largura = 200;
					explode.onload = function(){
						context.drawImage(
							explode, eex, eey,
	                    	largura, altura, xBoom, yBoom,
		                    largura * 0.5, altura * 0.5
						);
					}
					quadro++;
					if(quadro > 6){
						coluna++;
						quadro = 0;
					}
					if(coluna ==4){
						linha++
						coluna = 0;
					}
					if(linha == 1 && coluna == 2){
						coluna = 0;
						linha = 0;
						explodirInimigo = false;	
					}
				}
			}

			function Tiro(){
				this.xT = xP+186;
				this.yT = yP;
				this.mover = function(){
					context.fillStyle = '#e50000';
					context.fillRect(this.xT, this.yT, 20, 6);
                	this.xT+=3*decorrido/10;
               		if(this.xT<3){
                    	this.xT = 700;
                    	balas.splice(0,1);
               		}
					if(this.yT>yI-93 && this.yT<yI+93){
                    	if(this.xT>xI && this.xT<xI+93){
							explodirInimigo = true;
							xBoom = xI;
							yBoom = yI;
							this.yT=700;
							balas.splice(0,1);
							xI=1002;
							yI=Math.random()*500;
							tipoI = Math.round(Math.random()*4);
							pontos++;
							if(pontos>=10){
		                        win = true;
		                    }					
						}
					}
				}
			}

			document.addEventListener('keydown',function(evento){
            
			//seta Rigth
            if (evento.keyCode == 39)
                if(xP<650){
                    xP+=8;
					moverX=true;
					frente=true;
				}
            
			//seta Left
            if (evento.keyCode == 37)
                if(xP>0){
					xP-=8;
					moverX=true;
					frente=false;
				}
			
			//seta Down
            if (evento.keyCode == 40)
                if(yP<610){
                    yP+=8;
					moverY=true;
					cima=true;
				}
				
            //seta Up
            if (evento.keyCode == 38)
                if(yP>0){
					yP-=8;
					moverY=true;
					cima=false;
				}
			//barra 
			if(evento.keyCode == 32){
                balas[balas.length] = new Tiro();
                console.log(somTiro.currentTime);
                somTiro.play();
			}
			});

			document.addEventListener('keyup',function(evento){
            //seta Rigth
            if (evento.keyCode == 39){
					moverX=false;
					coluna=0;
					linha=1;
			}
            //seta Left
            if (evento.keyCode == 37){
					moverX=false;
					frente=false;
					coluna=0;
					linha=1;
			}
			//seta Up
            if (evento.keyCode == 40){
					moverY=false;
					coluna=0;
					linha=1;
				}
            //seta Down
            if (evento.keyCode == 38){
					moverY=false;
					cima=false;
					coluna=0;
					linha=1;
					
			}
		});		