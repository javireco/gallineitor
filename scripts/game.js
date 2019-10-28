window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: false})
  .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio,Anim")
  .include("PlayerScript, HomeScript,CloudScript,EggScript,ExtrasScript,ZorroScript")
  .setup({
    width:504, //16:9
    height:284,
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

//la mitad inferior de la pantalla del móvil
Q.input.keypad.size = Q.width;
Q.input.keypad.unit = Q.height - Q.height/2.4;
Q.input.fullHeight=true;
Q.input.drawButtons= function() {
};

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

//carga las animaciones de devil-fox
Q.animations('zorro', {
  jump_normal: { frames: [5], rate: 15/15},
  fall_normal: { frames: [7], rate: 15/15},
  run_right_normal: { frames: [1,2,3,4], rate: 3/15},
  run_left_normal: { frames: [1,2,3,4], rate: 3/15},
});

//carga las animaciones de los huevos dorados
Q.animations('egggolden', {
  shine: { frames: [1,1,1,1,1,1,1,2,3,4,5,6,7,8,9], rate: 2/15},
});

//carga las animaciones delos huevos al parpadear
Q.animations('egg', {
  blink: { frames: [0,0,1,1,0,0,1,1,0], rate: 4/15, loop: false},
  normal: { frames: [0], rate: 2/15}
});

//carga la animación de la pérdida de huevos
Q.animations('loseEggs', {
  blink: { frames: [0,1,2,3,4], rate: 2/15, loop: false},
  normal: { frames: [0], rate: 2/15}
});

//carga las animacion del cambio de direccion
Q.animations('changeDirection', {
  changeDirection: { frames: [0,0,1,1], rate: 4/15},
});

//carga la animacion de la casa cerrada y abierta
Q.animations('home', {
  close: { frames: [0], rate: 15/15},
  open: { frames: [1], rate: 15/15},
});

//incia variables
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
Q.state.set("timeLevel[0]",100);
Q.state.set("timeLevel[1]",100);
Q.state.set("timeLevel[2]",100);
Q.state.set("timeLevel[3]",80);
Q.state.set("timeLevel[4]",90);
Q.state.set("timeLevel[5]",100);
Q.state.set("timeLevel[6]",100);
Q.state.set("timeLevel[7]",100);
Q.state.set("timeLevel[8]",80);
Q.state.set("timeLevel[9]",80);
Q.state.set("timeLevel[10]",80);
Q.state.set("timeLevel[11]",80);
Q.state.set("timeLevel[12]",60);
Q.state.set("timeLevel[13]",80);
Q.state.set("timeLevel[14]",80);
Q.state.set("timeLevel[15]",70);
Q.state.set("timeLevel[16]",80);
Q.state.set("timeLevel[17]",80);
Q.state.set("timeLevel[18]",80);
Q.state.set("timeLevel[19]",80);
Q.state.set("levelEggs",[]);
Q.state.set("levelTime",[]);
Q.state.set("papagenofast",false);
for (i=0 ; i<20 ; i++){
  Q.state.set("levelEggs[" + i + "]",0);
  Q.state.set("levelTime[" + i + "]",0);
}
Q.enableSound();
Q.setImageSmoothing(false);

//Escena de cualquier nivel (se carga dinámicamente)
Q.scene("level",function(stage) {
  var player;
  var levelLayer;

  var centerPanel = stage.insert(new Q.UI.Container({align:"center", fill: "#999900",x:Q.width/2, y: 750,w:310,h:1500}));
  var background1 = centerPanel.insert(new Q.Repeater({asset:"background1-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:false,speedX:0,speedY:0, y:-375 , x:-75/*,w:310,h:1500*/}));
  var background2 = centerPanel.insert(new Q.Repeater({asset:"background2-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:true,speedX:0,speedY:0.1, y:-375 , x:-75/*,w:310,h:1500*/}));
  var background3 = centerPanel.insert(new Q.Repeater({asset:"background3-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:true,speedX:0,speedY:0.3, y:-375 , x:-75/*,w:310,h:1500*/}));
  var background4 = centerPanel.insert(new Q.Repeater({asset:"background4-" + Q.state.get("level") + ".png",type:0,repeatX:false,repeatY:false,speedX:0,speedY:0, y:-375 , x:-75/*,w:310,h:1500*/}));
  //carga el tile
  Q.stageTMX("level" + Q.state.get("level") + ".tmx",stage);
  var maderabackground = stage.insert(new Q.Repeater({ asset: "maderabackground.png", speedX: 0, speedY: 0, type: 0 }));
  //variable de la gallina
  player = Q("Player").first();
  //variable de los huevos
  var animaEgg = new Q.AnimaEgg();
  Q.stage().insert(animaEgg, player);
  //inicializar time
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
  //marcadores
  Q.stageScene("hud", 3, Q("Player").first().p);
  //botones
  Q.stageScene("buttons", 1, Q("Player").first().p);
  //control del audio
  if (!Q.state.get("mute") && !Q.state.get("muteMusic") ){
    Q.audio.stop();
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
    //aún no ha conseguido todos los huevos
    var labelColor = "white";
    if ( stage.options.Class=="Player" ){
      if (stage.options.lostEggs){
        labelColor = "white";
      }
    }
    var label = container.insert(new Q.UI.Text({x:40, y: 49,size:18,family:" Mansalva,courier",align:"left",outlineWidth:0,opacity:1,
    label: "" + (Q.state.get("maxScore") - Q.state.get("score")) , color: labelColor, outline: "white" }));
  }else{
    //ha conseguido todos los huevos, sale el tick y el go home parpadeando
    var tickegg = container.insert(new Q.Sprite({asset:"tickegg.png",x:48, y: 53}));
    if (Math.round(Q.state.get("time"))%2==0){
      var label = container.insert(new Q.UI.Text({x:13, y: 10,size:12,family:" Mansalva,courier",align:"left",
      label: "GO HOME " , color: "white",outlineWidth:0,opacity:1 }));
    }else{
      var label = container.insert(new Q.UI.Text({x:13, y: 10,size:12,family:" Mansalva,courier",align:"left",
      label: "GO HOME " , color: "white",outlineWidth:0,opacity:0.2 }));
    }
  }
  if ( (Q.state.get("maxScoreGolden") - Q.state.get("scoreGolden"))>0 ){
    //aún no ha conseguido todos los huevos dorados
    var label = container.insert(new Q.UI.Text({x:40, y: 77,size:18,family:" Mansalva,courier",align:"left",
    label: "" + (Q.state.get("maxScoreGolden") - Q.state.get("scoreGolden")) , color: "white",outlineWidth:0,opacity:1 }));
  }else{
    //ha conseguido todos los huevos dorados
    var tickegg = container.insert(new Q.Sprite({asset:"tickegg.png",x:48, y: 82}));

  }
  var label = container.insert(new Q.UI.Text({x:16, y: 150,size:11,family:" Mansalva,courier",align:"left",
  label: "LEVEL " + (Q.state.get("level") ) , color: "white",outlineWidth:0,opacity:1 }));

  //control del tiempo y la música rápida
  if ( stage.options.Class=="Player" ){
    colorTime = "white";
    if ( Math.round(Q.state.get("time")) <= 20 && Math.round(Q.state.get("time"))>0 ){
      colorTime = "red";
      if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
        if (!Q.state.get("papagenofast")){
          Q.audio.stop();
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
          Q.audio.stop();
          Q.state.set("papagenofast",false);
          Q.audio.play('papageno.mp3',{ loop:true });
        }
      }
    }
    var label = container.insert(new Q.UI.Text({x:40, y: 108,size:18,family:" Mansalva,courier",align:"left",outlineWidth:0,opacity:1,
    label: "" + Math.round(Q.state.get("time")) , color: colorTime, outline: colorTime }));
    if (stage.options.timeForStatus>0 && stage.options.status!="normal" && !stage.options.win && !Q.state.get("pause")){
      var labelTimeForStatus = container.insert(new Q.UI.Text({x:250, y: 50,size:130,family:"courier",align:"center",outlineWidth:0,opacity:0.4,
      label: "" + Math.round(stage.options.timeForStatus) , color: "white"}));
    }
  }
});

//escena de botones
Q.scene('buttons',function(stage) {
  var container2 = stage.insert(new Q.UI.Container({
    x: 400, y: 0
  }));
  var button1 = container2.insert(new Q.UI.Button({ asset:"restart.png" ,x: 80, y: 64}));

  button1.on("click",function() {
    if (!Q.state.get("pause")){
      Q.clearStages();
      Q.stageScene('level');
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
        Q.audio.stop();
        Q.state.set("papagenofast",false);
        Q.state.set("mute",false);
        Q.state.set("muteMusic",true);
        muteImage = "muteMusic.png";
      }else if(!Q.state.get("mute") && Q.state.get("muteMusic")){
        Q.audio.stop();
        Q.state.set("papagenofast",false);
        Q.state.set("mute",true);
        Q.state.set("muteMusic",true);
        muteImage = "mute.png";
      }else{
        Q.state.set("mute",false);
        Q.state.set("muteMusic",false);
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
      Q.clearStage(3);
      Q.audio.stop();
      Q.state.set("papagenofast",false);
      Q.stageScene("howtoplay",2, { });
    }
  });

  var label = container2.insert(new Q.UI.Text({x:31, y: 151,size:9,family:" Mansalva,courier",align:"left",
  label: "GALLINATOR" , color: "white",outlineWidth:0,opacity:1 }));
});

//Escena de juego perdido, good o super
Q.scene('endGame',function(stage) {
  Q.audio.stop();
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  if (stage.options.label=="good"){
    var image = container.insert(new Q.Sprite({asset:"nextlevelgood.png",x:0, y: 0}));
    if (!Q.state.get("mute") ){
      Q.audio.play("good.mp3");
    }
    if ( Q.state.get("levelEggs[" +  (Q.state.get("level") -1) + "]")<1 ){
      Q.state.set("levelEggs[" +  (Q.state.get("level") -1) + "]",1);
    }
    if ( Q.state.get("levelTime[" +  (Q.state.get("level") -1) + "]")<Math.round(Q.state.get("time")*10) ){
      Q.state.set("levelTime[" +  (Q.state.get("level") -1) + "]",Math.round(Q.state.get("time")*10));
    }
    labelsScore = container.insert(new Q.UI.Text({ x: 28, y: -70, family:" Mansalva,courier",align:"left",
    label: "" + Math.round(Q.state.get("time")*10) ,size:20 ,opacity:1,color:"white"}));
  }else if (stage.options.label=="super"){
    var image = container.insert(new Q.Sprite({asset:"nextlevelsuper.png",x:0, y: 0}));
    if (!Q.state.get("mute") ){
      Q.audio.play("super.mp3");
    }
    if ( Q.state.get("levelEggs[" +  (Q.state.get("level") -1) + "]")<2 ){
      Q.state.set("levelEggs[" +   (Q.state.get("level") -1) + "]",2);
    }
    if ( Q.state.get("levelTime[" +  (Q.state.get("level") -1) + "]")<Math.round(Q.state.get("time")*100) ){
      Q.state.set("levelTime[" +  (Q.state.get("level") -1) + "]",Math.round(Q.state.get("time")*100));
    }
    labelsScore = container.insert(new Q.UI.Text({ x: 28, y: -70, family:" Mansalva,courier",align:"left",
    label: "" + Math.round(Q.state.get("time")*100) ,size:20 ,opacity:1,color:"white"}));
  }else{
    var image = container.insert(new Q.Sprite({asset:"nextlevellose.png",x:0, y: 0}));
    if (!Q.state.get("mute") ){
      Q.audio.play("ohh.mp3");
    }
  }

  var button1 = container.insert(new Q.UI.Button({ asset:"restart.png" ,x: -90, y: -86}));

  button1.on("click",function() {
    if (!Q.state.get("pause")){
      Q.clearStages();
      Q.stageScene('level');
    }
  });

  if (stage.options.label!="lose" && Q.state.get("level")<Q.state.get("maxLevel") ){
    var button2 = container.insert(new Q.UI.Button({ asset:"next.png" ,x: 90, y: -86}));

    button2.on("click",function() {
      if (!Q.state.get("pause")){
        Q.clearStages();
        Q.state.set("level",Q.state.get("level")+1);
        Q.stageScene('level');
      }
    });
  }

  Q.stage(0).pause();
  Q.clearStage(1);
  container.fit(200);

});

//escena de pausa
Q.scene('pause',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
  }));
  var gallinafrozen  = container.insert(new Q.Sprite({asset:"gallinafrozen.png",x:0, y: 0,scale:6}));
  var buttonPause = container.insert(new Q.UI.Button({ asset:"pause.png" ,x: 192, y: -78}));
  buttonPause.on("click",function() {
    Q.stage(0).unpause();
    Q.stage(1).unpause();
    Q.stage(3).unpause();
    Q.state.set("pause",false);
    Q.clearStage(2);
    if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
      //Q.audio.stop('papageno.mp3');
      Q.audio.stop();
      Q.audio.play('papageno.mp3',{ loop: true });
    }
  });
});

//escena seleccion de niveles
Q.scene('levels',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
  }));
  var image = container.insert(new Q.Sprite({asset:"levels.png",x:0, y: 0}));
  var buttonClose = container.insert(new Q.UI.Button({ asset:"close.png" ,x: 230, y: -44}));
  buttonClose.on("click",function() {
    Q.stage(0).unpause();
    if ( Q.stage(1)==null ){
      Q.stageScene("portada");
    }else{
      Q.stage(1).unpause();
      Q.state.set("pause",false);
      Q.clearStage(2);
      if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
        Q.audio.stop();
        Q.audio.play('papageno.mp3',{ loop: true });
      }
    }
  });

  label = container.insert(new Q.UI.Text({ x: 0, y: -120, family:" Mansalva,courier",align:"center",
  label: "LEVELS" ,size:40 ,opacity:1,color:"white"}));
  var x=[-205,-160,-115,-70,-25,20,65,110,155,200,-205,-160,-115,-70,-25,20,65,110,155,200];
  var y=[-32,-32,-32,-32,-32,-32,-32,-32,-32,-32,50,50,50,50,50,50,50,50,50,50];
  var buttons=[];
  var labels=[];
  var labelsScore=[];
  var totalScore=0;
  for (i = 0 ; i<20 ; i++){
    xPos = x[i];
    yPos = y[i];
    num = "" + (i+1);
    score = Math.round( Q.state.get("levelTime[" + i + "]") );
    buttons[i] = container.insert(new Q.UI.Button({ x: xPos, y: yPos, fill: "#CCCCCC",family:" Mansalva,courier",align:"left",
    label: " ",size:28 ,opacity:0,name:i}));
    labels[i] = container.insert(new Q.UI.Text({ x: xPos, y: yPos-15, family:" Mansalva,courier",align:"center",
    label: num ,size:28 ,opacity:1,color:"white"}));
    if (   Q.state.get("levelEggs[" + i + "]")>=1 ){
      var egg1 = container.insert(new Q.Sprite({asset:"hudegg.png",x:xPos-4, y: yPos+22}));
    }
    if (   Q.state.get("levelEggs[" + i + "]")==2 ){
      var egg2 = container.insert(new Q.Sprite({asset:"hudegggolden.png",x:xPos+4, y: yPos+22}));
    }
    if (score>0){
      labelsScore[i] = container.insert(new Q.UI.Text({ x: xPos, y: yPos+36, family:" Mansalva,courier",align:"center",
      label: "" + score ,size:12 ,opacity:1,color:"white"}));
      totalScore += score;
    }
    buttons[i].on("click",function(){
      Q.clearStages();
      Q.state.set("pause",false);
      Q.state.set("level",this.p.name + 1);
      Q.stageScene('level');
    });
  }
  label = container.insert(new Q.UI.Text({ x: 0, y: 100, family:" Mansalva,courier",align:"center",
  label: "SCORE: " + totalScore ,size:32 ,opacity:1,color:"white"}));
});


//escena de como jugar
Q.scene('howtoplay',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
  }));

  if (Q.touchDevice){
    var image = container.insert(new Q.Sprite({asset:"howtoplaymobile.png",x:0, y: 0}));
  }else{
    var image = container.insert(new Q.Sprite({asset:"howtoplay.png",x:0, y: 0}));
  }
  var buttonClose = container.insert(new Q.UI.Button({ asset:"close.png" ,x: 228, y: -79}));

  var buttonCredits = container.insert(new Q.UI.Button({ x: 210, y: 120, fill: "#CCCCCC",family:" Mansalva,courier",align:"left",
  label: "           ",size:28 ,opacity:0,name:i}));

  var labelCredits = container.insert(new Q.UI.Text({ x: 210, y: 120, family:" Mansalva,courier",align:"center",
  label: "CREDITS" ,size:14 ,opacity:1,color:"orange"}));

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
        //Q.audio.stop('papageno.mp3');
        Q.audio.stop();
        Q.audio.play('papageno.mp3',{ loop: true });
      }
    }
  });

  buttonCredits.on("click",function() {

    Q.stageScene("credits",2, { });
  });
});

//escena de créditos
Q.scene('credits',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0.8)"
  }));

  if (Q.touchDevice){
    var image = container.insert(new Q.Sprite({asset:"creditsmobile.png",x:0, y: 0}));
  }else{
    var image = container.insert(new Q.Sprite({asset:"credits.png",x:0, y: 0}));
  }
  var buttonClose = container.insert(new Q.UI.Button({ asset:"close.png" ,x: 228, y: -79}));
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
        //Q.audio.stop('papageno.mp3');
        Q.audio.stop();
        Q.audio.play('papageno.mp3',{ loop: true });
      }
    }
  });
});


//escena inicial de portada
Q.scene('portada',function(stage) {

  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2,w:Q.width,h:Q.height, fill: "rgba(0,0,0,0)"
  }));
  var image = container.insert(new Q.Sprite({asset:"portada.png",x:0, y: 0}));
  var button1 = container.insert(new Q.UI.Button({ asset:"play.png" ,x: 192, y: 98,scale:1.5}));
  var button2 = container.insert(new Q.UI.Button({ asset:"choselevel.png" ,x: -192, y: 98,scale:1.5}));

  button1.on("click",function() {
    Q.clearStages();
    Q.state.set("level",1);
    Q.stageScene('level');
  });

  button2.on("click",function() {
    Q.clearStages();
    Q.state.set("level",1);
    Q.stageScene('levels');
  });

});

//carga imágenes, música y tiles
Q.load("gallinafrozen.png,muelle.png,muelle.json,portada.png,nextlevelgood.png,nextlevelsuper.png,nextlevellose.png,hudegg.png,tickegg.png,hudreloj.png,hudegggolden.png,egggolden.png,egggolden.json,egg.png,egg.json,extras.png,extras.json,pause.png,restart.png,mute.png,unmute.png,muteMusic.png,play.png,next.png,maderabackground.png,gallina.png,gallina.json,   home.png,home.json,levels.png,choselevel.png,close.png,changeDirection.png,changeDirection.json,loseEggs.png,loseEggs.json,zorro.png,zorro.json,plataformas.png,plataformas.json");
Q.load("frozen.mp3,eat.mp3,supersalto.mp3,egg.mp3,salto.mp3,egggolden.mp3,home.mp3,clock.mp3,changeDirection.mp3,loseEggs.mp3,fox.mp3,ohh.mp3,good.mp3,super.mp3");
Q.load("papageno.mp3,papagenofast.mp3");
Q.loadTMX("credits.png,creditsmobile.png,howtoplay.png,howtoplaymobile.png,howbutton.png,level1.tmx,level2.tmx,level3.tmx,level4.tmx,level5.tmx,level6.tmx,level7.tmx,level8.tmx,level9.tmx,level10.tmx,level11.tmx,level12.tmx,level13.tmx,level14.tmx,level15.tmx,level16.tmx,level17.tmx,level18.tmx,level19.tmx,level20.tmx,background1-1.png,background2-1.png,background3-1.png,background4-1.png,background1-2.png,background2-2.png,background3-2.png,background4-2.png,background1-3.png,background2-3.png,background3-3.png,background4-3.png,background1-4.png,background2-4.png,background3-4.png,background4-4.png,background1-5.png,background2-5.png,background3-5.png,background4-5.png,background1-6.png,background2-6.png,background3-6.png,background4-6.png,background1-7.png,background2-7.png,background3-7.png,background4-7.png,background1-8.png,background2-8.png,background3-8.png,background4-8.png,background1-9.png,background2-9.png,background3-9.png,background4-9.png,background1-10.png,background2-10.png,background3-10.png,background4-10.png,background1-11.png,background2-11.png,background3-11.png,background4-11.png,background1-12.png,background2-12.png,background3-12.png,background4-12.png,background1-13.png,background2-13.png,background3-13.png,background4-13.png,background1-14.png,background2-14.png,background3-14.png,background4-14.png,background1-15.png,background2-15.png,background3-15.png,background4-15.png,background1-16.png,background2-16.png,background3-16.png,background4-16.png,background1-17.png,background2-17.png,background3-17.png,background4-17.png,background1-18.png,background2-18.png,background3-18.png,background4-18.png,background1-19.png,background2-19.png,background3-19.png,background4-19.png,background1-20.png,background2-20.png,background3-20.png,background4-20.png", function() {
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

  //control del cambio de ventana para parar el audio
  document.addEventListener('visibilitychange', function(){
    if (document.hidden) {
      // Document is hidden
      // This re-initialize the audio element
      // to release the audio focus
      console.log('visibilitychange hidden');
      if (!Q.state.get("pause")){
        Q.audio.stop();
      }
    }
    else if ( Q.stage(1)!=null ){
      console.log('visibilitychange show');
      console.log(Q);
      // Document is focused
      if (!Q.state.get("pause")){
        if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
          //Q.audio.stop('papageno.mp3');
          Q.audio.stop();
          Q.audio.play('papageno.mp3',{ loop: true });
        }
      }

    }
  },false);

  //control de ventana no activa para parar el audio
  document.addEventListener('pause', function() {
    //console.log('pause');
    if (!Q.state.get("pause")){
      Q.audio.stop();
    }
  },false);

  //control de ventana activa para reactivar el audio
  document.addEventListener('resume', function() {
    //console.log('vuelve');
    // Tell your audio library to start playing again
    if (!Q.state.get("pause")){
      if (!Q.state.get("mute")&&!Q.state.get("muteMusic")){
        //Q.audio.stop('papageno.mp3');
        Q.audio.stop();
        Q.audio.play('papageno.mp3',{ loop: true });
      }
    }
  },false);


});


});
