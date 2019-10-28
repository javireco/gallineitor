Quintus.ZorroScript = function(Q) {

	Q.component("commonZorro", {
		added: function() {
			var entity = this.entity;
			//si tocan al zorro por izquierda o derecha hace daño a la gallina a no ser que sea frozen o fast
			entity.on("bump.left,bump.right",function(collision) {
				if(collision.obj.isA("Player")&&!this.p.hasCollide) {
					if (collision.obj.p.status=="fast"||collision.obj.p.status=="frozen"){
						this.destroy();
						collision.obj.p.vy = -100;
						if (!Q.state.get("mute") ){
							Q.audio.play("fox.mp3");
						}
					}else if(!collision.obj.p.damage){

						if (Q.state.get("score")>0){
							collision.obj.children[0].show();
							collision.obj.children[0].play("blink");
						}
						collision.obj.losePoints();
						collision.obj.damage();
						collision.obj.saltito();
						//console.log(this);
						this.saltito();
						//actualiza marcador
						Q.stageScene("hud", 3, collision.obj.p);
					}
				}
			});

			//si tocan al zorro por abajo hace daño a la gallina a no ser que sea frozen o fast
			entity.on("bump.bottom",function(collision) {
				if(collision.obj.isA("Player")&&!this.p.hasCollide) {

					if (collision.obj.p.status=="fast"||collision.obj.p.status=="frozen") {
						this.destroy();
						collision.obj.p.vy = -100;
						if (!Q.state.get("mute") ){
							Q.audio.play("fox.mp3");
						}
					}else if(!collision.obj.p.damage){

						if (Q.state.get("score")>0){
							collision.obj.children[0].show();
							collision.obj.children[0].play("blink");
						}
						collision.obj.losePoints();

						collision.obj.damage();

						//collision.obj.saltito();
						//console.log(this);
						this.saltito();
						//animaEgg.play("blink");
						//actualiza marcador
						Q.stageScene("hud", 3, collision.obj.p);
					}
				}
			});

			//al saltar la gallina encima, mata al zorro
			entity.on("bump.top",function(collision) {
				if(collision.obj.isA("Player")){
					this.destroy();
					collision.obj.p.vy = -100;
					if (!Q.state.get("mute") ){
						Q.audio.play("fox.mp3");
					}
				}
			});
		}
	});

	Q.Sprite.extend("Zorro", {
		init: function(p) {
			this._super(p, {gravity:1,
				sprite:"zorro",
				sheet:"zorro",
				type:Q.SPRITE_DEFAULT,
				collisionMask:Q.SPRITE_DEFAULT,
				hasCollide:false,
				vx: 60,
				totalTime:0,
				isJumping: false,
				defaultDirection: "right",
			});
			this.add("commonZorro,2d,aiBounce,animation");
			this.on("bump.bottom", function(){
				this.p.isJumping = false;
			});
		},
		step: function(dt) {
			//el zorro va andando y salta de vez en cuando o cuando va a caer de una plataforma
			var dirX = this.p.vx/Math.abs(this.p.vx);
			var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
			var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
			var nextTile = false;

			if(nextElement instanceof Q.TileLayer ) {
				nextTile = true;

			}

			if(nextElement instanceof Q.Egg || nextElement instanceof Q.EggGolden || nextElement instanceof Q.AnimaEgg ||
				nextElement instanceof Q.Pizza || nextElement instanceof Q.Hamburger || nextElement instanceof Q.Reloj ||
				nextElement instanceof Q.Muelle || nextElement instanceof Q.ChangeDirection || nextElement instanceof Q.Maiz ||
				nextElement instanceof Q.Trigo || nextElement instanceof Q.Helado || nextElement instanceof Q.Polo ||
				nextElement instanceof Q.Player || nextElement instanceof Q.Home ){
					//console.log(nextElement);
					nextTile = true;
				}

				if(ground instanceof Q.Egg ||ground instanceof Q.EggGolden || ground instanceof Q.AnimaEgg ||
					ground instanceof Q.Pizza ||ground instanceof Q.Hamburger || ground instanceof Q.Reloj ||
					ground instanceof Q.Muelle ||ground instanceof Q.ChangeDirection || ground instanceof Q.Maiz ||
					ground instanceof Q.Trigo ||ground instanceof Q.Helado || ground instanceof Q.Polo ||
					ground instanceof Q.Player ||ground instanceof Q.Home ){
						//console.log(nextElement);
						ground = false;
					}

					//si va a caer de una plataforma, salta
					if(!nextTile && ground) {
						this.salta();
					}
					this.p.totalTime+=dt;

					if (Math.round(this.p.totalTime)==5){
						this.p.totalTime=0;
						this.salta();
					}

					if(this.p.isJumping) {
						if(this.p.vy < 0) {
							this.play("jump_normal");
						} else if(this.p.vy >= 0) {
							this.play("fall_normal");
						}
					}else{
						if(this.p.vy > 0) {
							this.play("fall_normal");
						}else
						if(this.p.vx >= 0) {
							this.play("run_right_normal");
						} else if(this.p.vx < 0) {
							this.play("run_left_normal");
						}
					}
				},
				salta: function() {
					if ( !Q.stage(0).paused ){
						if (!Q.state.get("mute")){
							Q.audio.play("salto.mp3");
						}
						this.p.isJumping = true;
						this.p.vy=-470;
					}
				},
				saltito: function() {
					if ( !Q.stage(0).paused ){
						this.p.vy=-280;
					}
				},
			});



		};
