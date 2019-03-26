Quintus.ExtrasScript = function(Q) {

	Q.component("extra", {
	  added: function() {
	    var entity = this.entity;
			//si lo tocan al huevo por cualquier lado
	    entity.on("hit",function(collision) {
				if(collision.obj.isA("Player")&&!this.p.hasCollide) {
	        //da un pequeño bote
	        //collision.obj.p.vy = -100;
					//suma puntos a player

					//desaparece el huevo
					this.p.hasCollide=true;
					this.destroy();

					//console.log(this.p);
				  if ( this.p.status!="normal" ){
						collision.obj.setStatus(this.p.status,this.p.timeForStatus);
					}

					Q.state.set("time", Q.state.get("time")+this.p.extraTime);

					//actualiza marcador
					Q.stageScene("hud", 3, collision.obj.p);
	        //play sound
					if (!Q.state.get("mute")){
						if ( this.p.status == "fast" || this.p.status == "fat"  ){
	        		Q.audio.play('eat.mp3');
						}else if ( this.p.status == "frozen" ){
	        		Q.audio.play('frozen.mp3');
						}
						if (this.p.Class=="Reloj"){
							Q.audio.play('clock.mp3');
						}
					}
	      }
	    });
	  }
	});

	Q.component("extraFix", {
	  added: function() {
	    var entity = this.entity;
			//si lo tocan al huevo por cualquier lado
	    entity.on("hit",function(collision) {
				if(collision.obj.isA("Player")&&!this.p.hasCollide) {
					//console.log(this.p);
					if ( this.p.status == "muelle" ){
						//console.log("marco es el mejor");
						collision.obj.superSalto();
					}else if ( this.p.status == "changeDirection" ){
						//console.log("marco es el mejor");
						collision.obj.changeDirection();
						collision.obj.saltito();
					}
	        //play sound
					if (!Q.state.get("mute")){
						if ( this.p.status == "muelle" ){
	        		Q.audio.play('supersalto.mp3');
						}else if ( this.p.status == "changeDirection" ){
							Q.audio.play('changeDirection.mp3');
						}
					}
				}
	    });
	  }
	});

  Q.Sprite.extend("Pizza", {
    init: function(p) {
      this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"pizza",
										  sensor: true,
									    type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
										  hasCollide:false,
										  status:"fat",
										  extraTime:0,
										  timeForStatus:5,
										  points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
										});
      this.add("2d,extra");
    },
  });

	Q.Sprite.extend("Hamburger", {
    init: function(p) {
      this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"hamburger",
										  sensor: true,
									    type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
										  hasCollide:false,
										  status:"fat",
										  extraTime:0,
										  timeForStatus:10,
										  points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
										});
      this.add("2d,extra");
    },
  });

	Q.Sprite.extend("Reloj", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"reloj",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"normal",
										  extraTime:20,
											points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
											});
			this.add("2d,extra");
		},
	});

	Q.Sprite.extend("Muelle", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"muelle",
											sheet:"muelle",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"muelle",
										  extraTime:0,
											points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],});
			this.add("extraFix");
		},
	});

	Q.Sprite.extend("ChangeDirection", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"changeDirection",
											sheet:"changeDirection",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"changeDirection",
										  extraTime:0,
										  points:[[-2, -1],[2, -1],[2, 1],[-2, 1]],
										});
			this.add("animation,extraFix");
			this.play("changeDirection");
		},
	});

	Q.Sprite.extend("Maiz", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"maiz",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"fast",
											extraTime:0,
										  timeForStatus:10,
											points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
										});
			this.add("2d,extra");
		},
	});

	Q.Sprite.extend("Trigo", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"trigo",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"fast",
											extraTime:0,
										  timeForStatus:5,
											points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
											});
			this.add("2d,extra");
		},
	});

	Q.Sprite.extend("Helado", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"helado",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"frozen",
											extraTime:0,
										  timeForStatus:5,
										  points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
										});
			this.add("2d,extra");
		},
	});

	Q.Sprite.extend("Polo", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"extras",
											sheet:"polo",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_FRIENDLY,
											hasCollide:false,
											status:"frozen",
											extraTime:0,
										  timeForStatus:10,
										  points:[[-5, -5],[5, -5],[5, 5],[-5, 5]],
										});
			this.add("2d,extra");
		},
	});
};
