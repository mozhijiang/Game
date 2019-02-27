var View = function(){

		var container = $('#container')[0];
		var player = null;
		var o = {
			init : function(game){
				this.game = game;
			},
			initTile : function(){
				this.insertTitle();
			},
			initPlayer : function(){
				this.insertPlayer();
			},
			initBrideg : function(){
				var brideg = document.createElement("div");
				brideg.id = "brideg";
				container.appendChild(brideg);
			},
			initGameoverView : function(){
				var gameOver = document.createElement("div");
				var h5 = document.createElement("h5");
				var span = document.createElement("span");
				var btn = document.createElement("button");
				gameOver.id = "gameover";
				btn.id = "btn";
				span.id = "overscore";
				h5.innerHTML = "游戏结束,分数:";
				btn.innerHTML = "确 定";
				container.appendChild(gameOver);
				gameOver.appendChild(h5);
				gameOver.appendChild(btn);
				h5.appendChild(span);
			},
			setBlockStyle : function(block){
				var e = block.el;
				e.style.left = block.l + "%";
				e.style.width = block.w + "%";
				e.className = config.block.className;
				return e;
			},
			insertTitle : function(){
				var t = config.title;
				var title = document.createElement("div");
				var score = document.createElement("span");
				title.id = t.id;
				score.id = t.score.id;
				container.appendChild(title);
				title.appendChild(score);
			},
			insertPlayer : function(){
				player = document.createElement("div");
				player.id = config.player.id;
				player.className = config.player.class.stand;
				container.appendChild(player);
			},
			insertBlock : function(block){
				$("#blockContainer")[0].appendChild(this.setBlockStyle(block));
			},
			upScore : function(){
				var score = $("#score")[0];
				score.innerHTML = this.game.score;
			},
			setBridegStyle : function(){
				var s = $("#brideg")[0].style;
				s.width = config.brideg.width + "%";
				s.left = config.brideg.left + "%";
				s.transition = `transform ${config.brideg.time}s ease-in`;
			},
			bridegGoup : function(){
				if(config.brideg.width<50 && config.brideg.isAddHeight){
					config.brideg.width += 0.5;
				}else{
					config.brideg.isAddHeight = false;
					config.brideg.width -= 0.5;
					if(config.brideg.width < 0){
						config.brideg.isAddHeight = true;
					}
				}
				this.setBridegStyle();
				if(this.game.isKeyDown){
					window.requestAnimationFrame(this.bridegGoup.bind(this));
				}
			},
			toggleBrideDisp : function(status){
				$("#brideg")[0].style.display = status ? "block" : "none";
			},
			bridegRotate : function(callback){
				var _this = this;
				var b = this.game.blocks[1];
				var l = config.brideg.left;
				var w = config.brideg.width;
				$("#brideg")[0].style.transform = "rotate(0deg)";
			},
			playerMove : function(){
				player.className = config.player.class.move;
				player.style.left = config.brideg.left + config.brideg.width - 5  + '%';
			},
			playerReset : function(){
				player.style.left = this.game.blocks[0].l + this.game.blocks[0].w -5 + "%";
				player.className = config.player.class.stand;
			},
			bridegReset	: function(){
				this.game.configBirdegReset();
				$("#brideg")[0].style.transform = "rotate(-90deg)";
			},
			next : function(){
				this.addBlock();
				this.playerReset();
				this.bridegReset();
				this.toggleBrideDisp(false);
			},
			addBlock : function(){
				var _this = this;
				var b = config.block;
				var bs = this.game.blocks;
				var l = random(b.minSpace,b.maxSpace) + bs[bs.length -1].l + bs[bs.length -1].w;
				var w = random(b.minWidth,b.maxWidth);
				var el = document.createElement("div");
				var s = bs[1].l;
				var obj = this.game.createBlockObject(l,w);
				bs.push(obj);
				$("#blockContainer")[0].appendChild(this.setBlockStyle(bs[bs.length-1]));
				for(var i = 0;i<bs.length;i++){
						bs[i].l -=s;
					if(i < bs.length - 1){
						bs[i].el.style.left = bs[i].l + "%";
					}else{
						setTimeout(function(){
						bs[bs.length - 1].el.style.left = bs[bs.length - 1].l + "%";
						},100);
					}
				}
				$("#blockContainer")[0].removeChild(bs[0].el);
				bs.splice(0,1);
			},
			removeElement : function(arr){
				for(var i = 0;i<arr.length;i++){
					container.removeChild(arr[i])
				}
			},
		}

		return o;

};