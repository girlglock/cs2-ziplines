import { Instance as css } from "cs_script/point_script";
import { EventListeners } from '../eventlisteners/eventlisteners';
import { HitGroup } from "../enums/hitgroups";

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
    const attackerCtrl = css.GetPlayerController(data.attacker);
    const victimCtrl = css.GetPlayerController(data.userid);
    css.Msg(`${attackerCtrl?.GetPlayerName()} -> ${data.weapon} ->  ${victimCtrl?.GetPlayerName()} (${HitGroup[data.hitgroup]}) | DMG: HP ${data.dmg_health} A ${data.dmg_armor} | LEFT: HP ${data.health} A ${data.armor}`);
});
