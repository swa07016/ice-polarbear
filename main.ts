/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

const polarBear = ScriptApp.loadSpritesheet('polar-bear.png', 240, 270);
const polarBearTwo = ScriptApp.loadSpritesheet('polar-bear-2.png', 240, 270);

const DOWN_SPEED = 10; // 다운스피드 상수
let down_speed = 1; //

// 플레이어가 해당 맵에 들어왔을 때 처리
ScriptApp.onJoinPlayer.Add(function (p) {
    p.spawnAt(32, 20, 2);
    p.sprite = polarBear;
    p.moveSpeed = 20;
    p.tag = {
        alive: true,
        ready: false
    }
    p.title = 'READY!';
    p.sendUpdated();

    setTimeout(function () {
        p.tag.ready = true;
        p.title = 'SAVE ME!!';
        p.sendUpdated();
    }, 4000)
});

// x키를 눌렀을 때 처리
ScriptApp.addOnKeyDown(88, function (p) {
    if(!p.tag.ready) return ;
    p.spawnAt(p.tileX, p.tileY-1, 2);
})

ScriptApp.onUpdate.Add(function(dt){
    ScriptApp.showCenterLabel("Press 'x' to save the polar bear!");
    down_speed++;
    let players = ScriptApp.players;
    players.forEach(player => {
        if(player.tileY >= ScriptMap.height) {
            player.tag.alive = false;
            player.title = `I'll be back..`;
            player.sendUpdated();
        }
    })

    if(down_speed >= DOWN_SPEED) {
        down_speed = 1;

        players.forEach(player => {
            if(!player.tag.ready) return;
            if(!player.tag.alive) return;
            if(player.sprite == polarBear) player.sprite = polarBearTwo;
            else player.sprite = polarBear;
            player.sendUpdated();
            player.spawnAt(player.tileX, player.tileY+1, 2);
        });
    }
});
