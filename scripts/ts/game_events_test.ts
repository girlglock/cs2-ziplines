import { Instance as css } from "cs_script/point_script";

EventListeners.RegisterAll();

//kick the host if they try to change a nono cvar
EventListeners.OnServerCvar((data) => {
    const bannedCvars = new Set([
        "sv_airaccelerate",
        "sv_jump_spam_penalty_time",
        "sv_staminajumpcost",
        "sv_staminalandcost",
        "sv_air_max_wishspeed",
        "sv_enablebunnyhopping",
        "sv_accelerate",
        "sv_autobunnyhopping"
    ]);

    if (bannedCvars.has(data.cvarname)) {
        css.ServerCommand(`kickid 0`);
    }
});

//print hurt data
EventListeners.OnPlayerHurt((data) => {
    css.Msg(`player ${css.GetPlayerController(data.userid)?.GetPlayerName()} was hit by ${css.GetPlayerController(data.attacker)?.GetPlayerName()} for -${data.dmg_health} HP and -${data.dmg_armor} amor`);
});
