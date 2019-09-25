window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
  .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio,Anim")
  .include("PlayerScript, HomeScript,CloudScript,EggScript,ExtrasScript,ZorroScript")
  .setup({
    //width:504, //16:9
    //height:284,
    width:1500, //16:9
    height:843,
    scaleToFit: true,
    //resampleHeight:true,
    //resampleWidth:true,
    //maximize:true,
  })
  .controls()
  .touch();

  //botones para móvil
  Q.input.keypad.controls =  [ ["fire","1"],
  [ ],
  [ ],[ ],
  //["fire","2"]
  []
  ];

  Q.input.keypad.size = Q.width;
  Q.input.keypad.unit = Q.height - Q.height/2;

  Q.input.fullHeight=true;
console.log(Q.input.keypad);
  Q.input.drawButtons= function() {
/*

          if ( control[1]=="1" ){
            ctx.beginPath();
            ctx.globalAlpha=key ? 1 : 1;
            ctx.fillStyle = keypad.color || "white";
            ctx.arc(42, 220, 29, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.globalAlpha=key ? 1 : 0.7;
            ctx.fillStyle = keypad.color || "red";
            ctx.arc(42, 220, 26, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
            //ctx.restore();
          }
          if ( control[1]=="2" ){
            ctx.beginPath();
            ctx.globalAlpha=key ? 1 : 1;
            ctx.fillStyle = keypad.color || "white";
            ctx.arc(462, 220, 29, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.globalAlpha=key ? 1 : 0.7;
            ctx.fillStyle = keypad.color || "red";
            ctx.arc(462, 220, 26, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
            //ctx.restore();
          }

          }
        }
      }
    ctx.restore();
  */};

  //carga las animaciones de la gallina
  Q.animations('gallina', {
    jump_normal: { frames: [5,6], rate: 1/15},
    fall_normal: { frames: [7], rate: 15/15},
    run_normal: { frames: [1,2,3,4], rate: 3/15},
    jump_fat: { frames: [18,19], rate: 1/15},
    fall_fat: { frames: [20], rate: 15/15},
    run_fat: { frames: [14,15,16,17], rate: 3/15},
    jump_fast: { frames: [9,10,11,12], rate: 2/15},
    fall_fast: { frames: [9,10,11,12], rate: 2/15},
    run_fast: { frames: [9,10,11,12], rate: 2/15},
    jump_frozen: { frames: [22,23], rate: 1/15},
    fall_frozen: { frames: [22,23], rate: 1/15},
    run_frozen: { frames: [22,23], rate: 1/15},
    //damage
    jump_normal_damage: { frames: [5,25,6,25], rate: 3/15},
    fall_normal_damage: { frames: [7,25], rate: 3/15},
    run_normal_damage: { frames: [25,1,25,2,25,3,25,4], rate: 3/15},
    jump_fat_damage: { frames: [18,25,19,25], rate: 3/15},
    fall_fat_damage: { frames: [20,25], rate: 3/15},
    run_fat_damage: { frames: [25,14,25,15,25,16,25,17], rate: 3/15},
  });

  Q.animations('zorro', {
    jump_normal: { frames: [5], rate: 15/15},
    fall_normal: { frames: [7], rate: 15/15},
    run_right_normal: { frames: [1,2,3,4], rate: 3/15},
    run_left_normal: { frames: [1,2,3,4], rate: 3/15},
  });

  //carga las animaciones de la gallina
  Q.animations('egggolden', {
    shine: { frames: [1,1,1,1,1,1,1,2,3,4,5,6,7,8,9], rate: 2/15},
  });

  //carga las animaciones de la gallina
  Q.animations('egg', {
    blink: { frames: [0,0,1,1,0,0,1,1,0], rate: 4/15, loop: false},
    normal: { frames: [0], rate: 2/15}
  });

  Q.animations('loseEggs', {
    blink: { frames: [0,1,2,3,4], rate: 2/15, loop: false},
    normal: { frames: [0], rate: 2/15}
  });

  //carga las animaciones de la gallina
  Q.animations('changeDirection', {
    changeDirection: { frames: [0,0,1,1], rate: 4/15},
  });

  //carga las animaciones de la gallina
  Q.animations('home', {
    close: { frames: [0], rate: 15/15},
    open: { frames: [1], rate: 15/15},
  });


  Q.state.set("pause",false);
  Q.state.set("mute",false);
  Q.state.set("muteMusic",false);
  Q.state.set("level",0);
  Q.state.set("maxLevel",20);
  Q.state.set("eggsInScene",1);
  Q.state.set("score",0);
  Q.state.set("maxScore",0);
  Q.state.set("scoreGolden",0);
  Q.state.set("maxScoreGolden",0);
  Q.state.set("time",100);
  Q.state.set("previousTime",-1);
  Q.state.set("timeLevel[0]",60);
  Q.state.set("timeLevel[1]",80);
  Q.state.set("timeLevel[2]",80);
  Q.state.set("timeLevel[3]",60);
  Q.state.set("timeLevel[4]",80);
  Q.state.set("timeLevel[5]",100);
  Q.state.set("timeLevel[6]",100);
  Q.state.set("timeLevel[7]",100);
  Q.state.set("timeLevel[8]",80);
  Q.state.set("timeLevel[9]",80);
  Q.state.set("timeLevel[10]",80);
  Q.state.set("timeLevel[11]",80);
  Q.state.set("timeLevel[12]",80);
  Q.state.set("timeLevel[13]",80);
  Q.state.set("timeLevel[14]",80);
  Q.state.set("timeLevel[15]",80);
  Q.state.set("timeLevel[16]",80);
  Q.state.set("timeLevel[17]",80);
  Q.state.set("timeLevel[18]",80);
  Q.state.set("timeLevel[19]",80);
  Q.state.set("levelEggs",[]);
  Q.state.set("papagenofast",false);
  for (i=0 ; i<20 ; i++){
    Q.state.set("levelEggs[" + i + "]",0);
  }
  Q.enableSound();
  Q.setImageSmoothing(false);

  //Escena de cualquier nivel nivel
  Q.scene("level",function(stage) {
    var player;
    var levelLayer;

    var centerPanel = stage.insert(new Q.UI.Container({align:"center", fill: "#999900",x:Q.width/2, y: 750,w:310,h:1500}));
    var background1 = centerPanel.insert(new Q.Repeater({asset:"background1-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:false,speedX:0,speedY:0, y:-375 , x:-75/*,w:310,h:1500*/}));
    var background2 = centerPanel.insert(new Q.Repeater({asset:"background2-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:true,speedX:0,speedY:0.1, y:-375 , x:-75/*,w:310,h:1500*/}));
    var background3 = centerPanel.insert(new Q.Repeater({asset:"background3-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:true,speedX:0,speedY:0.3, y:-375 , x:-75/*,w:310,h:1500*/}));
    var background4 = centerPanel.insert(new Q.Repeater({asset:"background4-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:false,speedX:0,speedY:0, y:-375 , x:-75/*,w:310,h:1500*/}));
    Q.stageTMX("level" + Q.state.get("level") + ".tmx",stage);
    var maderabackground = stage.insert(new Q.Repeater({ asset: "maderabackground.png", speedX: 0, speedY: 0, type: 0 }));
    //centerPanel.fit(270,280);
    player = Q("Player").first();
    var animaEgg = new Q.AnimaEgg();
    //Egg.play("normal");
    Q.stage().insert(animaEgg, player);
    //console.log("inicializar time");
    Q.state.set("time",Q.state.get("timeLevel[" + (Q.state.get("level")-1) + "]"));
    Q.state.set("previousTime",-1);
    //con esta variable podría hacer algo a todos los huevos a la vez, como un evento o una funcion
    Q.state.set("eggsInScene",Q("Egg"));
    Q.state.set("score",0);
    Q.state.set("maxScore",Q.state.get("eggsInScene").length);
    Q.state.set("eggsGoldenInScene",Q("EggGolden"));
    Q.state.set("scoreGolden",0);
    Q.state.set("maxScoreGolden",Q.state.get("eggsGoldenInScene").length);
    //cámara sigue a jugador en eje y
    stage.add("viewport").follow(player,{x: false, y: true});
    Q.stageScene("hud", 3, Q("Player").first().p);
    Q.stageScene("buttons", 1, Q("Player").first().p);
    if (!Q.state.get("mute") && !Q.state.get("muteMusic") ){
      Q.audio.stop('papageno.mp3');
      Q.audio.play('papageno.mp3',{ loop: true });
      Q.state.set("papagenofast",false);
    }
  });

  //marcadores de huevos y tiempo
  Q.scene('hud',function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: 0, y: 0
    }));
    var image = container.insert(new Q.Sprite({asset:"hudegg.png",x:22, y: 55,scale:1}));
    var image2 = container.insert(new Q.Sprite({asset:"hudegggolden.png",x:22, y: 83}));
    var image3 = container.insert(new Q.Sprite({asset:"hudreloj.png",x:22, y: 114}));
    if ( (Q.state.get("maxScore") - Q.state.get("score"))>0 ){
      var labelColor = "white";
      if ( stage.options.Class=="Player" ){
        if (stage.options.lostEggs){
          labelColor = "white";
        }
      }
      var label = container.insert(new Q.UI.Text({x:40, y: 52,size:17,family:"chalkduster,Mansalva,courier",align:"left",outlineWidth:0,opacity:1,
      label: "" + (Q.state.get("maxScore") - Q.state.get("score")) , color: labelColor, outline: "white" }));
    }else{
      var tickegg = container.insert(new Q.Sprite({asset:"tickegg.png",x:48, y: 53}));
    }
    if ( (Q.state.get("maxScoreGolden") - Q.state.get("scoreGolden"))>0 ){
      var label = container.insert(new Q.UI.Text({x:40, y: 77,size:17,family:"chalkduster,Mansalva,courier",align:"left",
      label: "" + (Q.state.get("maxScoreGolden") - Q.state.get("scoreGolden")) , color: "white",outlineWidth:0,opacity:1 }));
    }else{
      var tickegg = container.insert(new Q.Sprite({asset:"tickegg.png",x:48, y: 82}));
    }
    var label = container.insert(new Q.UI.Text({x:14, y: 150,size:11,family:"chalkduster,Mansalva,courier",align:"left",
    label: "LEVEL " + (Q.state.get("level") ) , color: "white",outlineWidth:0,opacity:1 }));
    //var label = container.insert(new Q.UI.Text({x:20, y: 146,size:17,family:"chalkduster,courier",align:"left",
    //label: "LEVEL " + (Q.state.get("level") ) , color: "white",outlineWidth:0,opacity:1 }));


    if ( stage.options.Class=="Player" ){
      colorTime = "white";
      //console.log(Math.round(Q.state.get("time")));
      if ( Math.round(Q.state.get("time")) <= 20 && Math.round(Q.state.get("time"))>0 ){
        colorTime = "red";
        //console.log("mute" + Q.state.get("mute"));
        //console.log("papagenofast" + Q.state.get("papagenofast"));
        if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){

            if (!Q.state.get("papagenofast")){
              Q.audio.stop('papageno.mp3');
              Q.audio.play('papagenofast.mp3',{ loop:true });
              Q.state.set("papagenofast",true);
            }
        }
        if ( Math.round(Q.state.get("time")) == 0 ){
          Q.audio.stop();
          Q.state.set("papagenofast",false);
        }
      }else{
        if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
          if ( Q.state.get("papagenofast") ){
            Q.audio.stop('papagenofast.mp3');
            Q.state.set("papagenofast",false);
            Q.audio.play('papageno.mp3',{ loop:true });
          }
        }
      }
      var label = container.insert(new Q.UI.Text({x:40, y: 108,size:17,family:"chalkduster,Mansalva,courier",align:"left",outlineWidth:0,opacity:1,
      label: "" + Math.round(Q.state.get("time")) , color: colorTime, outline: colorTime }));
      //console.log(stage.options.win);
      if (stage.options.timeForStatus>0 && stage.options.status!="normal" && !stage.options.win && !Q.state.get("pause")){
        var labelTimeForStatus = container.insert(new Q.UI.Text({x:250, y: 50,size:130,family:"courier",align:"center",outlineWidth:0,opacity:0.4,
        label: "" + Math.round(stage.options.timeForStatus) , color: "white"}));
      }
    }

  });


  Q.scene('buttons',function(stage) {
    var container2 = stage.insert(new Q.UI.Container({
      x: 400, y: 0
    }));
    var button1 = container2.insert(new Q.UI.Button({ asset:"restart.png" ,x: 80, y: 64}));

      button1.on("click",function() {
        if (!Q.state.get("pause")){
          Q.clearStages();
          Q.stageScene('level');
          //Q.stageScene('hud', 3, Q("Player").first().p);
            //    Q.stageScene("buttons", 1, Q("Player").first().p);
        }
      });


      var button2 = container2.insert(new Q.UI.Button({ asset:"pause.png" ,x: 44, y: 64}));

        button2.on("click",function() {
          if (!Q.state.get("pause")){
            Q.state.set("pause",true);
            Q.stage(0).pause();
            Q.stage(1).pause();
            Q.stage(3).pause();
            Q.stageScene("pause",2, { });
            Q.audio.stop();
            Q.state.set("papagenofast",false);
          }
        });

        var muteImage = "unmute.png";
        if (!Q.state.get("mute") && !Q.state.get("muteMusic")){
          muteImage = "unmute.png";
        }else if(!Q.state.get("mute") && Q.state.get("muteMusic")){
          muteImage = "muteMusic.png";
        }else{
          muteImage = "mute.png";
        }

        var button3 = container2.insert(new Q.UI.Button({ asset:muteImage ,x: 44, y: 110}));

          button3.on("click",function() {
            if (!Q.state.get("pause")){
              if (!Q.state.get("mute") && !Q.state.get("muteMusic")){
                //console.log("1");
                Q.audio.stop();
                Q.state.set("papagenofast",false);
                Q.audio.stop("papagenofast.mp3");
                Q.state.set("mute",false);
                Q.state.set("muteMusic",true);
                muteImage = "muteMusic.png";
              }else if(!Q.state.get("mute") && Q.state.get("muteMusic")){
                //console.log("2");
                Q.audio.stop();
                Q.state.set("papagenofast",false);
                Q.audio.stop("papagenofast.mp3");
                Q.state.set("mute",true);
                Q.state.set("muteMusic",true);
                muteImage = "mute.png";
              }else{
                //console.log("3");
                Q.state.set("mute",false);
                Q.state.set("muteMusic",false);
                Q.audio.stop("papagenofast.mp3");
                Q.state.set("papagenofast",false);
                Q.audio.stop();
                Q.audio.play('papageno.mp3',{ loop: true });
                muteImage = "unmute.png";
              }

              container2.insert(new Q.UI.Button({ asset:muteImage ,x: 44, y: 110}));
            }
          });


          var button2 = container2.insert(new Q.UI.Button({ asset:"choselevel.png" ,x: 80, y: 110}));

          button2.on("click",function() {
            if (!Q.state.get("pause")){
              Q.state.set("pause",true);
              Q.stage(0).pause();
              Q.stage(1).pause();
              //Q.stage(3).pause();
              Q.clearStage(3);
              Q.audio.stop();
              Q.state.set("papagenofast",false);
              Q.stageScene("levels",2, { });
            }
          });

          var buttonhow = container2.insert(new Q.UI.Button({ asset:"howbutton.png" ,x: 62, y: 87}));

          buttonhow.on("click",function() {
            if (!Q.state.get("pause")){
              Q.state.set("pause",true);
              Q.stage(0).pause();
              Q.stage(1).pause();
              //Q.stage(3).pause();
              Q.clearStage(3);
              Q.audio.stop();
              Q.state.set("papagenofast",false);
              Q.stageScene("howtoplay",2, { });
            }
          });

          var label = container2.insert(new Q.UI.Text({x:30, y: 150,size:9,family:"chalkduster,Mansalva,courier",align:"left",
          label: "GALLINATOR" , color: "white",outlineWidth:0,opacity:1 }));
    //console.log(container);
    //container.fit(400);
  });

  //Escena de juego perdido
  Q.scene('endGame',function(stage) {
    Q.audio.stop('papageno.mp3');
    Q.audio.stop('papagenofast.mp3');
    //Q.state.set("papagenofast",false);
    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));

      //console.log(Q.state.get("levelEggs[" +  (Q.state.get("level") -1) + "]"));
    if (stage.options.label=="good"){
      var image = container.insert(new Q.Sprite({asset:"nextlevelgood.png",x:0, y: 0}));

      if ( Q.state.get("levelEggs[" +  (Q.state.get("level") -1) + "]")<1 ){
        Q.state.set("levelEggs[" +  (Q.state.get("level") -1) + "]",1);
      }
    }else if (stage.options.label=="super"){
      var image = container.insert(new Q.Sprite({asset:"nextlevelsuper.png",x:0, y: 0}));
      if ( Q.state.get("levelEggs[" +  (Q.state.get("level") -1) + "]")<2 ){
        Q.state.set("levelEggs[" +   (Q.state.get("level") -1) + "]",2);
      }
    }else{
      var image = container.insert(new Q.Sprite({asset:"nextlevellose.png",x:0, y: 0}));
      Q.audio.play("ohh.mp3");
    }

    var button1 = container.insert(new Q.UI.Button({ asset:"restart.png" ,x: -90, y: -86}));

      button1.on("click",function() {
        if (!Q.state.get("pause")){
          Q.clearStages();
          Q.stageScene('level');
          //Q.stageScene('hud', 3, Q("Player").first().p);
            //    Q.stageScene("buttons", 1, Q("Player").first().p);
        }
      });

      if (stage.options.label!="lose" && Q.state.get("level")<Q.state.get("maxLevel") ){
        var button2 = container.insert(new Q.UI.Button({ asset:"next.png" ,x: 90, y: -86}));

        button2.on("click",function() {
          if (!Q.state.get("pause")){
            Q.clearStages();
            Q.state.set("level",Q.state.get("level")+1);
            Q.stageScene('level');
            //Q.stageScene('hud', 3, Q("Player").first().p);
              //    Q.stageScene("buttons", 1, Q("Player").first().p);
          }
        });
      }

      Q.stage(0).pause();
      Q.clearStage(1);
      container.fit(200);

    });

    Q.scene('pause',function(stage) {
      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
      }));
      var gallinafrozen  = container.insert(new Q.Sprite({asset:"gallinafrozen.png",x:0, y: 0,scale:6}));
      //console.log("hola");
      //var buttonPause = container.insert(new Q.UI.Button({ asset:"gallinafrozenpause.png",x: 2, y: 2, family:"courier",align:"center",scale:5}));
      var buttonPause = container.insert(new Q.UI.Button({ asset:"pause.png" ,x: 192, y: -78}));
      //var label = container.insert(new Q.UI.Text({x:0, y: buttonPause.p.h*1.5  ,family:"courier",align:"center",label: "paused" }));
        buttonPause.on("click",function() {
          Q.stage(0).unpause();
          Q.stage(1).unpause();
          Q.stage(3).unpause();
          Q.state.set("pause",false);
          Q.clearStage(2);
          if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
            Q.audio.stop('papageno.mp3');
            Q.audio.play('papageno.mp3',{ loop: true });
          }
        });

    //Q.stage(1).pause();
        //container.fit(20);

      });

      Q.scene('levels',function(stage) {
        var container = stage.insert(new Q.UI.Container({
          x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
        }));

        //para probar la posicion
        /*  Q.state.set("levelEggs[0]",1);
            Q.state.set("levelEggs[1]",2);
            Q.state.set("levelEggs[2]",1);
              Q.state.set("levelEggs[3]",2);
              Q.state.set("levelEggs[4]",1);
                Q.state.set("levelEggs[5]",2);
                Q.state.set("levelEggs[6]",1);
                  Q.state.set("levelEggs[7]",2);
                  Q.state.set("levelEggs[8]",1);
                    Q.state.set("levelEggs[9]",2);*/

        var image = container.insert(new Q.Sprite({asset:"levels.png",x:0, y: 0}));
        //console.log("hola");
        //var buttonPause = container.insert(new Q.UI.Button({ asset:"gallinafrozenpause.png",x: 2, y: 2, family:"courier",align:"center",scale:5}));
        var buttonClose = container.insert(new Q.UI.Button({ asset:"close.png" ,x: 230, y: -44}));
        //var label = container.insert(new Q.UI.Text({x:0, y: buttonPause.p.h*1.5  ,family:"courier",align:"center",label: "paused" }));
          buttonClose.on("click",function() {
            Q.stage(0).unpause();
            if ( Q.stage(1)==null ){
              Q.stageScene("portada");
            }else{
              Q.stage(1).unpause();
              //Q.stage(3).unpause();
              Q.state.set("pause",false);
              Q.clearStage(2);
              if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
                Q.audio.stop('papageno.mp3');
                Q.audio.play('papageno.mp3',{ loop: true });
              }
            }
          });



          label = container.insert(new Q.UI.Text({ x: 0, y: -120, family:"chalkduster,Mansalva,courier",align:"center",
          label: "LEVELS" ,size:40 ,opacity:1,color:"white"}));
          var x=[-205,-160,-115,-70,-25,20,65,110,155,200,-205,-160,-115,-70,-25,20,65,110,155,200];
          var y=[-28,-28,-28,-28,-28,-28,-28,-28,-28,-28,54,54,54,54,54,54,54,54,54,54];
          var buttons=[];
          var labels=[];
          for (i = 0 ; i<20 ; i++){
            xPos = x[i];
            yPos = y[i];
            num = "" + (i+1);
            buttons[i] = container.insert(new Q.UI.Button({ x: xPos, y: yPos, fill: "#CCCCCC",family:"chalkduster,Mansalva,courier",align:"left",
            label: " ",size:28 ,opacity:0,name:i}));
            labels[i] = container.insert(new Q.UI.Text({ x: xPos, y: yPos-15, family:"chalkduster,Mansalva,courier",align:"center",
            label: num ,size:28 ,opacity:1,color:"white"}));
            if (   Q.state.get("levelEggs[" + i + "]")>=1 ){
              var egg1 = container.insert(new Q.Sprite({asset:"hudegg.png",x:xPos-4, y: yPos+22}));
            }
            if (   Q.state.get("levelEggs[" + i + "]")==2 ){
              var egg2 = container.insert(new Q.Sprite({asset:"hudegggolden.png",x:xPos+4, y: yPos+22}));
            }
            buttons[i].on("click",function(){
              //console.log(this);
              Q.clearStages();
              Q.state.set("pause",false);
              Q.state.set("level",this.p.name + 1);
              Q.stageScene('level');
            });


          }
        });




        Q.scene('howtoplay',function(stage) {
          var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
          }));


          var image = container.insert(new Q.Sprite({asset:"howtoplay.png",x:0, y: 0}));
          //console.log("hola");
          //var buttonPause = container.insert(new Q.UI.Button({ asset:"gallinafrozenpause.png",x: 2, y: 2, family:"courier",align:"center",scale:5}));
          var buttonClose = container.insert(new Q.UI.Button({ asset:"close.png" ,x: 228, y: -79}));
          //var label = container.insert(new Q.UI.Text({x:0, y: buttonPause.p.h*1.5  ,family:"courier",align:"center",label: "paused" }));
            buttonClose.on("click",function() {
              Q.stage(0).unpause();
              if ( Q.stage(1)==null ){
                Q.stageScene("portada");
              }else{
                Q.stage(1).unpause();
                //Q.stage(3).unpause();
                Q.state.set("pause",false);
                Q.clearStage(2);
                if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
                  Q.audio.stop('papageno.mp3');
                  Q.audio.play('papageno.mp3',{ loop: true });
                }
              }
            });
          });






      Q.scene('portada',function(stage) {

        var container = stage.insert(new Q.UI.Container({
          x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0)"
        }));
        //var gallinafrozen = container.insert(new Q.Sprite({asset:"gallinafrozen.gif",scale:6,x:0, y: 0}));
        var image = container.insert(new Q.Sprite({asset:"portada.png",x:0, y: 0}));
        var button1 = container.insert(new Q.UI.Button({ asset:"play.png" ,x: 192, y: 98,scale:1.5}));
        var button2 = container.insert(new Q.UI.Button({ asset:"choselevel.png" ,x: -192, y: 98,scale:1.5}));

          button1.on("click",function() {
            
            if (confirm("Fullscreen mode?")) {
              var docelem = document.getElementById("quintus");
              //var docelem = document.documentElement;
              //var docelem = Q;
              if (docelem.requestFullscreen) {
                  docelem.requestFullscreen();
              }
              else if (docelem.mozRequestFullScreen) {
                  docelem.mozRequestFullScreen();
              }
              else if (docelem.webkitRequestFullScreen) {
                  docelem.webkitRequestFullScreen();
              }
              else if (docelem.msRequestFullscreen) {
                  docelem.msRequestFullscreen();
              }
              
              Q.setup().controls().touch();
              //Q.el.height = document.documentElement.clientHeight; 
              //Q.el.width =document.documentElement.clientWidth;
              //Q.setup({scaleToFit:true,
                       
              // });
              //screen.orientation.lock("portrait-primary");
            }
            
            //console.log(Q);
            
              Q.clearStages();
              Q.state.set("level",1);
              Q.stageScene('level');

              //Q.stageScene('hud', 3, Q("Player").first().p);
                //    Q.stageScene("buttons", 1, Q("Player").first().p);
          });

          button2.on("click",function() {
            //console.log("hola");
            //console.log(Q.state.get("mute"));
            Q.clearStages();
            Q.state.set("level",1);
            Q.stageScene('levels');
          });

      //Q.stage(1).pause();
          //container.fit(20);

        });

    //load assets
    Q.load("gallinafrozen.png,muelle.png,muelle.json,portada.png,nextlevelgood.png,nextlevelsuper.png,nextlevellose.png,hudegg.png,tickegg.png,hudreloj.png,hudegggolden.png,egggolden.png,egggolden.json,egg.png,egg.json,extras.png,extras.json,pause.png,restart.png,mute.png,unmute.png,muteMusic.png,play.png,next.png,maderabackground.png,gallina.png,gallina.json,   home.png,home.json,levels.png,choselevel.png,close.png,changeDirection.png,changeDirection.json,loseEggs.png,loseEggs.json,zorro.png,zorro.json,plataformas.png,plataformas.json");
    Q.load("frozen.mp3,eat.mp3,supersalto.mp3,egg.mp3,salto.mp3,egggolden.mp3,home.mp3,clock.mp3,changeDirection.mp3,loseEggs.mp3,fox.mp3,ohh.mp3");
    Q.load("papageno.mp3,papagenofast.mp3");
    Q.loadTMX("howtoplay.png,howbutton.png,level1.tmx,level2.tmx,level3.tmx,level4.tmx,level5.tmx,level6.tmx,level7.tmx,level8.tmx,level9.tmx,level10.tmx,level11.tmx,level12.tmx,level13.tmx,level14.tmx,level15.tmx,level16.tmx,level17.tmx,level18.tmx,level19.tmx,level20.tmx,background1-1.png,background2-1.png,background3-1.png,background4-1.png,background1-2.png,background2-2.png,background3-2.png,background4-2.png,background1-3.png,background2-3.png,background3-3.png,background4-3.png,background1-4.png,background2-4.png,background3-4.png,background4-4.png,background1-5.png,background2-5.png,background3-5.png,background4-5.png,background1-6.png,background2-6.png,background3-6.png,background4-6.png,background1-7.png,background2-7.png,background3-7.png,background4-7.png,background1-8.png,background2-8.png,background3-8.png,background4-8.png,background1-9.png,background2-9.png,background3-9.png,background4-9.png,background1-10.png,background2-10.png,background3-10.png,background4-10.png,background1-11.png,background2-11.png,background3-11.png,background4-11.png,background1-12.png,background2-12.png,background3-12.png,background4-12.png,background1-13.png,background2-13.png,background3-13.png,background4-13.png,background1-14.png,background2-14.png,background3-14.png,background4-14.png,background1-15.png,background2-15.png,background3-15.png,background4-15.png,background1-16.png,background2-16.png,background3-16.png,background4-16.png,background1-17.png,background2-17.png,background3-17.png,background4-17.png,background1-18.png,background2-18.png,background3-18.png,background4-18.png,background1-19.png,background2-19.png,background3-19.png,background4-19.png,background1-20.png,background2-20.png,background3-20.png,background4-20.png", function() {
      Q.compileSheets("plataformas.png","plataformas.json");
      Q.compileSheets("gallina.png","gallina.json");
      Q.compileSheets("zorro.png","zorro.json");
      Q.compileSheets("egg.png","egg.json");
      Q.compileSheets("loseEggs.png","loseEggs.json");
      Q.compileSheets("home.png","home.json");
      Q.compileSheets("extras.png","extras.json");
      Q.compileSheets("egggolden.png","egggolden.json");
      Q.compileSheets("muelle.png","muelle.json");
      Q.compileSheets("changeDirection.png","changeDirection.json");
      Q.stageScene("portada");
      //Q.stageScene("level");
    });
  });

//console.log( document);
//var elem = document.getElementById("quintus");
//console.log( elem);
  
 /* document.ontouchstart = function (argument) {
    //var conf = confirm("Fullscreen mode?");
    //var docelem = document.documentElement;

    if (confirm("Fullscreen mode?")) {
        var docelem = document.documentElement;
        if (docelem.requestFullscreen) {
            docelem.requestFullscreen();
        }
        else if (docelem.mozRequestFullScreen) {
            docelem.mozRequestFullScreen();
        }
        else if (docelem.webkitRequestFullScreen) {
            docelem.webkitRequestFullScreen();
        }
        else if (docelem.msRequestFullscreen) {
            docelem.msRequestFullscreen();
        }
    }
}
  
 // document.documentElement.requestFullScreen();
  screen.orientation.lock("portrait-primary");


  //con esto puedo tocar en cualquier lado de la pantalla
  /*window.addEventListener("touchstart", function () {

  var player = Q("Player").first();
  console.log("toca" + player);
  player.salta();
});*/
