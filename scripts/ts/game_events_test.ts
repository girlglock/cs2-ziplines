import { Instance as css } from "cs_script/point_script";
import { EventListeners } from '../eventlisteners/eventlisteners';
import { Blips } from "../blips/blips";
import { HitGroup } from "../enums/hitgroups";

const blips = new Blips();

css.OnActivate(() => {
    EventListeners.RegisterAll();
});

css.OnReload(() => {
    EventListeners.RegisterAll();
});

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

//print hurt data using blips
EventListeners.OnPlayerHurt((data) => {
    const attackerName = css.GetPlayerController(data.attacker)?.GetPlayerName();
    const victimName = css.GetPlayerController(data.userid)?.GetPlayerName();
    const limb = HitGroup[data.hitgroup];

    const msg = `{red}${attackerName}{white} 
              {red}[${data.weapon}]{white} 
              {blue}${victimName}{white} (${limb})
              | {yellow}DMG - HP:${data.dmg_health}  A:${data.dmg_armor}{white}
              | {green}LEFT - HP:${data.health}  A:${data.armor}`
        .trim()
        .replace(/\s+/g, ' ');

    blips.print(msg);
});

function think() {
    const gameTime = css.GetGameTime();
    blips.update(gameTime);
    css.SetNextThink(gameTime + 0.015625);
}

blips.print("{white}ⓘ {yellow}Welcome to Movement Hub V2!");
blips.print("{white}ⓘ {yellow}Welcome to Movement Hub V2!");
blips.print("{white}ⓘ {yellow}Welcome to Movement Hub V2!");

css.SetNextThink(css.GetGameTime() + 0.015625);
css.SetThink(() => think());
