Quintus.PlayerScript = function(Q) {
  Q.Sprite.extend("Player",{
    //inicializa player
    init: function(p) {
      this._super(p, {
        sprite: "gallina",
        sheet: "gallina",
        //normal -450. lento -300. rápido -600,frozen 0
        jumpSpeed: -470,
        speed: 0,
        isJumping: false,
        damage: false,
        timeDamage:3,
                //normal 80, lento 40, rápido 200,frozen 0
        vx: 80,
        gravity:1,
        defaultDirection: "right",
        direction: 1,
        timeForStatus:0,
        type:Q.SPRITE_DEFAULT,
        collisionMask:Q.SPRITE_ALL,
        win:false,
        paused:false,
        status:"normal",
        lostEggs:"false",
      });

      this.setStatus("normal",0);
      this.p.lostEggs = false;
      //salta al dar al fire
      if (!this.p.win){
        Q.input.on("up,fire",this,"salta");
      }
      //2s y movimiento lateral
      this.add("2d,aiBounce");
      this.add("animation");
      var that = this;
      //cuando toca un suelo no está saltando
      this.on("bump.bottom", function(){
        that.p.isJumping = false;
      });
    },
    //ejecución cada poco tiempo
    step: function(dt) {
      if (!this.p.win){
      //inicio de animaciones
      if (this.p.vx > 0){
        this.p.direction = 1;
      }
      if (this.p.vx < 0){
        this.p.direction = -1;
      }
      if(this.p.isJumping) {
        if(this.p.vy < 0) {
          if ( this.p.damage ){
            this.play("jump_" + this.p.status+ "_damage");
          }else{
            this.play("jump_" + this.p.status);
          }
        } else if(this.p.vy >= 0) {
          if ( this.p.damage ){
            this.play("fall_" + this.p.status+ "_damage");
          }else{
            this.play("fall_" + this.p.status);
          }
        }
      }else{
        if(this.p.vy > 0) {
          if ( this.p.damage ){
            this.play("fall_" + this.p.status+ "_damage");
          }else{
            this.play("fall_" + this.p.status);
          }
        }else
          if ( this.p.damage ){
            this.play("run_" + this.p.status + "_damage");
          }else{
            this.play("run_" + this.p.status);
          }
      }
      //control del tiempo que le queda

          Q.state.set("time",Q.state.get("time")-dt);
        //console.log(Math.round(this.p.time));
        if ( Q.state.get("previousTime") != Math.round(Q.state.get("time")) ){
          Q.state.set("previousTime",Math.round(Q.state.get("time")));
          //console.log("cambia el tiempo");
          if (this.p.status != "normal"){
            this.p.timeForStatus--;
            //console.log(this.p.timeForStatus);
            if (this.p.timeForStatus==0){
              this.setStatus("normal",0);
            }
          }

          if (this.p.damage){
            this.p.timeDamage--;
            //console.log(this.p.timeForStatus);
            if (this.p.timeDamage==0){
              this.p.damage=false;
            }
          }
          Q.stageScene("hud", 3, this.p);
        }



      }

      if ( Math.round(Q.state.get("time"))<=0 ){
        //console.log("mueto");
        //saca escena de muerto
        Q.stageScene("endGame",2, { label: "lose" , button:"play again"});
        //this.destroy();
      }

    },
    //añade huevos conseguidos
    addPoints: function() {
      Q.state.set("score",Q.state.get("score")+1);
      this.p.lostEggs = false;
      if (Q.state.get("score")==Q.state.get("maxScore")){
        var home = Q("Home").first();
        //console.log(home);
        home.p.type=Q.SPRITE_DEFAULT;
        home.stage.delGrid(home);
        home.stage.addGrid(home);
        home.play("open");
      }
      /*for ( i=0;i<Q.state.get("eggsInScene").length;i++){
        var egg = Q.state.get("eggsInScene").items[i];
        //if (egg.p.hasCollide){
          //console.log(egg);
          egg.play("normal");
        //}
      }*/
    },
    damage: function() {
                  //console.log(Q.state.get("eggsInScene"));
      this.p.damage = true;
      this.p.timeDamage = 4;
    },
    losePoints: function() {
                  //console.log(Q.state.get("eggsInScene"));
      Q.state.set("score",0);
      if (!Q.state.get("mute")){
        Q.audio.play("loseEggs.mp3");
      }
      this.p.lostEggs = true;
      var home = Q("Home").first();
        //console.log(home);
      home.p.type=Q.SPRITE_NONE;
      home.stage.delGrid(home);
      home.stage.addGrid(home);
      home.play("close");
      for ( i=0;i<Q.state.get("eggsInScene").length;i++){
        var egg = Q.state.get("eggsInScene").items[i];
        if (egg.p.hasCollide){
          //console.log(egg);
          egg.show();
          egg.play("blink");
          egg.p.type=Q.SPRITE_DEFAULT;
          egg.p.collisionMask=Q.SPRITE_DEFAULT;
          egg.stage.delGrid(egg);
          egg.stage.addGrid(egg);
          egg.p.hasCollide=false;
        }
      }
    },
    addGolden: function() {
      Q.state.set("scoreGolden",Q.state.get("scoreGolden")+1)
      if (Q.state.get("scoreGolden")==Q.state.get("maxScoreGolden")){
      }
    },
    //funcion de salto con pequeño vuelo
    salta: function() {

      //Q.state.get("eggsInScene").show();


      if ( !Q.stage(0).paused ){
        if(!this.p.isJumping && this.p.status != "frozen") {
          if (!Q.state.get("mute")){
            Q.audio.play("salto.mp3");
          }
          this.p.isJumping = true;

          this.p.vy=this.p.vy+this.p.jumpSpeed;
        }
      }
      //así era el revoloteo
        /*if(!this.p.isJumping) {
          //console.log("jump");
          Q.audio.play("jump.mp3");
          this.p.isJumping = true;
          iFlySpeed = 400;
          this.p.vy=this.p.vy-iFlySpeed;
          iFlySpeed = 200;
        }else if (iFlySpeed>190 && this.p.vy>0 ){

          iFlySpeed = iFlySpeed - 1;
          this.p.vy=this.p.vy-iFlySpeed;
        }*/
    },
    superSalto: function() {
      if ( !Q.stage(0).paused ){
        this.p.vy=-940;
        this.p.isJumping = true;
      }
    },
    saltito: function() {
      if ( !Q.stage(0).paused ){
        this.p.vy=-280;
        this.p.isJumping = true;
      }
    },
    changeDirection: function(){
      this.p.vx=this.p.vx*-1;
      this.p.direction = this.p.direction*-1;
      if ( this.p.direction==1){
        this.p.flip= false;
      }else{
        this.p.flip= "x";
      }



    },
    setStatus: function(pStatus,ptimeForStatus){
      this.p.status = pStatus;
      this.p.timeForStatus = ptimeForStatus;
      this.p.gravity=1;
      if (pStatus=="normal"){
        //normal -450. lento -300. rápido -600,frozen 0
        this.p.jumpSpeed= -470;
        //normal 80, lento 40, rápido 200,frozen 0
        this.p.vx= 60 * this.p.direction;
      }else if (pStatus=="fast"){
        //normal -450. lento -300. rápido -600,frozen 0
        this.p.jumpSpeed= -530;
        //normal 80, lento 40, rápido 200,frozen 0
        this.p.vx= 120* this.p.direction;
        this.p.damage=false;

      }else if (pStatus=="fat"){
        //normal -450. lento -300. rápido -600,frozen 0
        this.p.jumpSpeed= -400;
        //normal 80, lento 40, rápido 200,frozen 0
        this.p.vx= 30* this.p.direction;

      }else if (pStatus=="frozen"){
        //normal -450. lento -300. rápido -600,frozen 0
        this.p.jumpSpeed= 0;
        //normal 80, lento 40, rápido 200,frozen 0
        this.p.vx= 0.01* this.p.direction;
        this.p.damage=false;
        //this.p.gravity=0;
      }
    },
  });

};
