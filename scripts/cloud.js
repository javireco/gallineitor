Quintus.CloudScript = function(Q) {

  Q.component("oneWayPlatform", {
    added: function(){
      this.entity.on("step",this,function(){
        //Cuando el jugador está sobre la plataforma, no puede atravesarla
        if(this.checkPlayerPos()){
          if(this.entity.p.type!=Q.SPRITE_DEFAULT){
            this.entity.p.type=Q.SPRITE_DEFAULT;
            this.entity.stage.delGrid(this.entity);
            this.entity.stage.addGrid(this.entity);
          }
        }
        //Cuando el jugador esta bajo la plataforma se vuelve atravesable
        else {
          if(this.entity.p.type!=Q.SPRITE_NONE){
            this.entity.p.type=Q.SPRITE_NONE;
            this.entity.stage.delGrid(this.entity);
            this.entity.stage.addGrid(this.entity);
          }

        }
      });
    },
    checkPlayerPos:function(){
      var player = Q("Player").first();
      var playerPos = player.p.y+player.p.h;
      var objPos = this.entity.p.y+8; //sumo 8 por los points de collision
      //Devuelve true si el jugador está más alto
      return playerPos<=objPos;
    }
  });

  Q.Sprite.extend("Cloud",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"cloud",
        opacity: 0.8,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        //points:[[-20, -7],[20, -7],[20, 14],[-20, 14]], //15 es para que caiga en el borde de la nube, no mas lejos y -9 es para que se apoye dentro de la nube, no encima
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Tronco",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"tronco",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Chupachups",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"chupachups",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Bastoncillo",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"bastoncillo",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  //////

  Q.Sprite.extend("ChocoBlanco",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"chocoBlanco",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("ChocoNegro",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"chocoNegro",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Egipto1",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"egipto1",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Egipto2",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"egipto2",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Espada",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"espada",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Flauta",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"flauta",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Hueso",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"hueso",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("HuesoDino",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"huesoDino",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Jabon",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"jabon",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Ladrillo",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"ladrillo",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Lanza",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"lanza",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Lapiz",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"lapiz",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Manilla",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"manilla",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Nave",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"nave",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Pincel",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"pincel",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Pompero",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"pompero",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Roca",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"roca",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Surf",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"surf",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Tornillo",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"tornillo",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Trineo",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"trineo",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Trompeta",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"trompeta",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Via",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"via",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Viga",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"viga",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });

  Q.Sprite.extend("Zanahoria",{
    init: function(p) {
      this._super(p, {
        sprite:"plataformas",
        sheet:"zanahoria",
        opacity: 1,
        type:Q.SPRITE_NONE,
        collisionMask:Q.SPRITE_DEFAULT,
        points:[[-28, -5],[-24, -6],[24, -6],[28, -5],[28, 14],[-28, 14]],
      });
      this.add("oneWayPlatform");
    }
  });
};
