Quintus.HomeScript = function(Q) {

	Q.component("llegadaCasa", {
	  added: function() {
	    var entity = this.entity;
			//si lo tocan al huevo por cualquier lado
	    entity.on("hit",function(collision) {
				//console.log("llega a casa");
				if (!Q.state.get("mute")){
					Q.audio.play('home.mp3');
				}
	      if(collision.obj.isA("Player") && Q.state.get("score")==Q.state.get("maxScore")){
					tipoHuevo ="white";
					if ( Q.state.get("scoreGolden") == Q.state.get("maxScoreGolden") ){
							tipoHuevo="gold";
					}
					if (tipoHuevo=="white"){
						Q.stageScene("endGame",2, { label: "good", button:"Next level" });
					}else{
						Q.stageScene("endGame",2, { label: "super", button:"Next level" });
					}
					this.off('hit');
					collision.obj.p.win=true;
					Q.stageScene("hud", 3, collision.obj.p);
					collision.obj.p.vx=0;
					collision.obj.p.gravity=0;
					collision.obj.p.vy=0;
					collision.obj.play("jump");

					//this.destroy();

	      }
	    });
	  }
	});

  Q.Sprite.extend("Home", {
    init: function(p) {
      this._super(p, {gravity:0,
											sprite:"home",
											sheet:"home",
										  sensor: true,
											type:Q.SPRITE_NONE,
											collisionMask:Q.SPRITE_DEFAULT,
											points:[[-12, -1],[12, -1],[12, 16.5],[-12, 16.5]],
									  	});
      this.add("llegadaCasa,animation");
			this.play("close");
    },
    step: function(dt) {
		}
  });

};
