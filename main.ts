/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

const polarBear = ScriptApp.loadSpritesheet('polar-bear.png', 240, 270);
const polarBearTwo = ScriptApp.loadSpritesheet('polar-bear-2.png', 240, 270);

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

ScriptApp.onStart.Add(function(){

});
