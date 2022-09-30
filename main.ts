/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

ScriptApp.showCenterLabel("Hello World");


// 플레이어가 스페이스에 입장 했을 때 이벤트
ScriptApp.onJoinPlayer.Add(function(player) {
    player.showCustomLabel(`${player.name} 학우님 입장! Let's Party!!🎉`);
});