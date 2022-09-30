/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

const polarBear = ScriptApp.loadSpritesheet('polar-bear.png', 240, 270);
const polarBearTwo = ScriptApp.loadSpritesheet('polar-bear-2.png', 240, 270);

const DOWN_SPEED = 10; // 다운스피드 상수
let down_speed = 1; //
let GAME_STATE = 'READY'; // READY, PLAYING, END
let LOOSER_NAME = '';


ScriptApp.onSay.Add(function (player, text) {
    if(text == 'PLAY') {
        GAME_STATE = 'PLAYING';
        let players = ScriptApp.players;
        players.forEach(function (p) {
            p.tag.ready = true;
            p.title = 'SAVE ME!!';
            p.sendUpdated();
        })
    }
});

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
});

// x키를 눌렀을 때 처리
ScriptApp.addOnKeyDown(88, function (p) {
    if(!p.tag.ready) return ;
    if(p.tag.alive) p.spawnAt(p.tileX, p.tileY-1, 2);
    else { // todo: 여기서 못움직이도록 키를 예외처리 해야하나?

    }
})

ScriptApp.onUpdate.Add(function(dt){
    switch (GAME_STATE) {
        case 'READY':
            ScriptApp.showCenterLabel("팀원이 다 모이면 채팅창에 PLAY를 입력해주세요!");
            break;

        case 'PLAYING':
            ScriptApp.showCenterLabel("X키를 눌러 북극곰을 살려주세요!");
            break;

        case 'END':
            ScriptApp.showCenterLabel(`꼴찌는 ${LOOSER_NAME}..`);
            return ;
            break;
    }


    down_speed++;
    let players = ScriptApp.players;
    players.forEach(player => {
        if(player.tileY >= ScriptMap.height) {
            player.tag.alive = false;
            player.title = `꾸엑..`;
            player.sendUpdated();
            LOOSER_NAME = player.name;
            GAME_STATE = 'END';
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
