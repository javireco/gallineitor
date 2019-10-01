Quintus.EggScript = function(Q) {

	Q.component("commonEgg", {
	  added: function() {
	    var entity = this.entity;
			//si lo tocan al huevo por cualquier lado
	    entity.on("hit",function(collision) {
				if(collision.obj.isA("Player")&&!this.p.hasCollide) {
	        //da un pequeño bote
	        //collision.obj.p.vy = -100;
					//suma puntos a player

					//desaparece el huevo
					//this.destroy();
					//this.isdestroyed=false;
					//console.log(this);
					//this.p.sprite.hide()

					this.p.hasCollide=true;
					//console.log(this.p);
					entity.p.type=Q.SPRITE_NONE;
					entity.stage.delGrid(entity);
					entity.stage.addGrid(entity);
					this.hide();


					if ( this.p.Class=="EggGolden" ){
						collision.obj.addGolden();
						//play sound
						if (!Q.state.get("mute")){
							Q.audio.play('egggolden.mp3');
						}
					}else{
						collision.obj.addPoints();
						//play sound
						if (!Q.state.get("mute")){
							Q.audio.play('egg.mp3',{ debounce: 50 });
						}
					}
					//actualiza marcador
					Q.stageScene("hud", 3, collision.obj.p);

	      }
	    });
	  }
	});

  Q.Sprite.extend("Egg", {
    init: function(p) {
      this._super(p, {gravity:0,
											sprite:"egg",
											sheet:"egg",
										  sensor: true,
									    type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_DEFAULT,
										  hasCollide:false,});
      this.add("animation,commonEgg");
			this.play("blink");
    },
    step: function(dt) {

    }
  });

	Q.Sprite.extend("EggGolden", {
		init: function(p) {
			this._super(p, {gravity:0,
											sprite:"egggolden",
											sheet:"egggolden",
											sensor: true,
											type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_DEFAULT,
											hasCollide:false,});
			this.add("animation,commonEgg");
			this.play("shine");
		},
		step: function(dt) {

		}
	});

	Q.Sprite.extend("AnimaEgg", {
    init: function(p) {
      this._super(p, {gravity:0,
											sprite:"loseEggs",
											sheet:"loseEggs",
										  sensor: true,
									    type:Q.SPRITE_FRIENDLY,
											collisionMask:Q.SPRITE_DEFAULT,
										  hasCollide:false,});
      this.add("animation");
			this.hide();
    },
    step: function(dt) {

    }
  });
};
