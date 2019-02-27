var Game = function(){
		var o =  {
			score : 0,
			isKeyDown : false,
			canPress : true,
			blocks : [],
			isPlayerMoveOver : false,
			init : function(view){
				this.view = view;
				this.view.init(this);
				this.start();
			},
			start : function(){
				this.initBlock();
				this.initView();
				this.initEvent();
			},
			initView : function(){
				this.view.initTile();
				this.view.initPlayer();
				this.view.initBrideg();
				this.view.upScore();
				this.view.setBridegStyle();
				this.view.initGameoverView();
			},
			initEvent : function(){
				var _this = this;
				transitionHook.bind($("#brideg")[0],function(){
					_this.view.playerMove();
					_this.isPlayerMoveOver = true;
					transitionHook.bind(player,function(){
						if(_this.isPlayerMoveOver){
							_this.isPlayerMoveOver = false;
							var l = config.brideg.left+config.brideg.width;
							var n = _this.blocks[1].l;
							var x = _this.blocks[1].l+_this.blocks[1].w;
							if(l > n && l < x){
								_this.view.next();
								_this.canPress = true;
								_this.score++;
								_this.view.upScore();
							}else{
								$("#overscore")[0].innerHTML = _this.score;
								$("#gameover")[0].style.display = "block";
								_this.view.removeElement([$("#player")[0],$("#brideg")[0]]);
							}
						}	
					});
				});
				document.onkeydown = function(e){
					if(e.keyCode === 32 && !_this.isKeyDown){
						if (!_this.canPress) return;
						_this.isKeyDown = true;
						_this.canPress = false;
						_this.view.bridegGoup();
						_this.view.toggleBrideDisp(true);
					}
				}
				document.onkeyup = function(e){
					if(e.keyCode === 32){
						_this.isKeyDown = false;
						_this.view.bridegRotate();
					}
				}
				$("#btn")[0].onclick = function(){
					_this.gameOver();
					$("#gameover")[0].style.display = "none";
				}
			},
			initBlock : function(){
					var blockContainer = document.createElement("div");
					blockContainer.id = "blockContainer";
					container.appendChild(blockContainer);
					this.blocks = [];
					this.blocks.push(this.createBlockObject(0,config.block.firstWidth));

					for(var i = 0;i<this.blocks.length;i++){
					
						this.view.insertBlock(this.blocks[i]);
					
						if(i == this.blocks.length -1){

							var lf = this.getPos(this.blocks[i].el);
							var block = this.getBlockMsg();
							var randomWidth = random(block.minW,block.maxW);
							var randomSpace = random(block.minS,block.maxS);
							
							if(100 - (lf.l + lf.w) > randomSpace){
								this.blocks.push(this.createBlockObject(
									lf.l + lf.w + randomSpace,randomWidth));
							}
						}
					}
				},
				getBlockMsg : function(){
					return {
						minW : config.block.minWidth,
						maxW : config.block.maxWidth,
						minS : config.block.minSpace,
						maxS : config.block.maxSpace
					}
				},
				createBlockObject : function(l,w){
					return {
						l : l,
						w : w,
						el : document.createElement("div")
					};
				},
				getPos : function(el){
					return {
						l : parseInt(el.style.left),
						w : parseInt(el.style.width)
					}
				},
				configBirdegReset : function(){
				config.brideg.width = 0;
				config.brideg.left = this.blocks[0].w;
				},
				gameOver : function(){
					config.brideg.left = 29.75;
					config.brideg.width = 0;
					config.brideg.isAddHeight = true;
					this.canPress = true;
					this.score = 0;
					this.view.removeElement([$("#title")[0],$("#blockContainer")[0]]);
					this.start();
				}
		}

		return o;

};