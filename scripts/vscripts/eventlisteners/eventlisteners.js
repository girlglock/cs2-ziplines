import { Instance as CSS } from "cs_script/point_script";

// usage example:
//EventListeners.RegisterAll();

//EventListeners.OnPlayerHurt((data) => {
//    CSS.Msg(`player ${CSS.GetPlayerController(data.userid)?.GetPlayerName()} was hit by ${CSS.GetPlayerController(data.attacker)?.GetPlayerName()} for -${data.dmg_health} HP and -${data.dmg_armor} amor`);
//});

class EventListeners {
    static registered = false;
    static handlers = new Map();

    static RegisterAll() {
        if (this.registered) {
            CSS.Msg("event listeners already registered");
            return;
        }

        const eventListeners = CSS.FindEntitiesByClass("logic_eventlistener");

        eventListeners.forEach(listener => {
            const eventName = listener.GetEntityName();

            CSS.ConnectOutput(listener, "OnEventFired", (data) => {
                this.TriggerEvent(eventName, data);
            });
        });

        this.registered = true;
        CSS.Msg(`registered ${eventListeners.length} event listeners`);
    }

    static TriggerEvent(eventName, data) {
        const handlers = this.handlers.get(eventName);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    /**
     * @param {string} eventName
     * @param {(data: any) => void} callback
     */
    static On(eventName, callback) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName).push(callback);
    }

    /** @param {(data: { hostname: string; address: string; port: number; game: string; mapname: string; addonname: string; maxplayers: number; os: string; dedicated: boolean; password: boolean; }) => void} callback */
    static OnServerSpawn(callback) { this.On("server_spawn", callback); }

    /** @param {(data: { reason: string }) => void} callback */
    static OnServerPreShutdown(callback) { this.On("server_pre_shutdown", callback); }

    /** @param {(data: { reason: string }) => void} callback */
    static OnServerShutdown(callback) { this.On("server_shutdown", callback); }

    /** @param {(data: { text: string }) => void} callback */
    static OnServerMessage(callback) { this.On("server_message", callback); }

    /** @param {(data: { cvarname: string; cvarvalue: string }) => void} callback */
    static OnServerCvar(callback) { this.On("server_cvar", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnPlayerActivate(callback) { this.On("player_activate", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnPlayerConnectFull(callback) { this.On("player_connect_full", callback); }

    /** @param {(data: { userid: number; count: number }) => void} callback */
    static OnPlayerFullUpdate(callback) { this.On("player_full_update", callback); }

    /** @param {(data: { name: string; userid: number; networkid: string; xuid: string; address: string; bot: boolean; }) => void} callback */
    static OnPlayerConnect(callback) { this.On("player_connect", callback); }

    /** @param {(data: { userid: number; reason: number; name: string; networkid: string; xuid: string; PlayerID: number; }) => void} callback */
    static OnPlayerDisconnect(callback) { this.On("player_disconnect", callback); }

    /** @param {(data: { name: string; userid: number; steamid: string; bot: boolean; }) => void} callback */
    static OnPlayerInfo(callback) { this.On("player_info", callback); }

    /** @param {(data: { userid: number; userid_pawn: number }) => void} callback */
    static OnPlayerSpawn(callback) { this.On("player_spawn", callback); }

    /** @param {(data: { userid: number; team: number; oldteam: number; disconnect: boolean; silent: boolean; isbot: boolean; userid_pawn: number; }) => void} callback */
    static OnPlayerTeam(callback) { this.On("player_team", callback); }

    /** @param {(data: {}) => void} callback */
    static OnLocalPlayerTeam(callback) { this.On("local_player_team", callback); }

    /** @param {(data: {}) => void} callback */
    static OnLocalPlayerControllerTeam(callback) { this.On("local_player_controller_team", callback); }

    /** @param {(data: { userid: number; oldname: string; newname: string; }) => void} callback */
    static OnPlayerChangename(callback) { this.On("player_changename", callback); }

    /** @param {(data: { userid: number; attacker: number; health: number; armor: number; weapon: string; dmg_health: number; dmg_armor: number; hitgroup: number; userid_pawn: number; attacker_pawn: number; }) => void} callback */
    static OnPlayerHurt(callback) { this.On("player_hurt", callback); }

    /** @param {(data: { teamonly: boolean; userid: number; text: string; }) => void} callback */
    static OnPlayerChat(callback) { this.On("player_chat", callback); }

    /** @param {(data: {}) => void} callback */
    static OnLocalPlayerPawnChanged(callback) { this.On("local_player_pawn_changed", callback); }

    /** @param {(data: { forceupload: boolean }) => void} callback */
    static OnPlayerStatsUpdated(callback) { this.On("player_stats_updated", callback); }

    /** @param {(data: { userid: number; attacker: number; assister: number; assistedflash: boolean; weapon: string; weapon_itemid: string; weapon_fauxitemid: string; weapon_originalowner_xuid: string; headshot: boolean; dominated: number; revenge: number; wipe: number; penetrated: number; noreplay: boolean; noscope: boolean; thrusmoke: boolean; attackerblind: boolean; distance: number; userid_pawn: number; attacker_pawn: number; assister_pawn: number; dmg_health: number; dmg_armor: number; hitgroup: number; attackerinair: boolean; }) => void} callback */
    static OnPlayerDeath(callback) { this.On("player_death", callback); }

    /** @param {(data: { userid: number; userid_pawn: number }) => void} callback */
    static OnPlayerFootstep(callback) { this.On("player_footstep", callback); }

    /** @param {(data: { hintmessage: string }) => void} callback */
    static OnPlayerHintmessage(callback) { this.On("player_hintmessage", callback); }

    /** @param {(data: { userid: number; inrestart: boolean; userid_pawn: number; }) => void} callback */
    static OnPlayerSpawned(callback) { this.On("player_spawned", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnPlayerJump(callback) { this.On("player_jump", callback); }

    /** @param {(data: { userid: number; attacker: number; entityid: number; blind_duration: number; }) => void} callback */
    static OnPlayerBlind(callback) { this.On("player_blind", callback); }

    /** @param {(data: { userid: number; damage: number; userid_pawn: number; }) => void} callback */
    static OnPlayerFalldamage(callback) { this.On("player_falldamage", callback); }

    /** @param {(data: { userid: number; kills: number; deaths: number; score: number; }) => void} callback */
    static OnPlayerScore(callback) { this.On("player_score", callback); }

    /** @param {(data: { userid: number; weapon: number; mode: number; userid_pawn: number; }) => void} callback */
    static OnPlayerShoot(callback) { this.On("player_shoot", callback); }

    /** @param {(data: { splitscreenplayer: number; userid: number; slot: number; userid_pawn: number; }) => void} callback */
    static OnPlayerRadio(callback) { this.On("player_radio", callback); }

    /** @param {(data: { avenger_id: number; avenged_player_id: number; }) => void} callback */
    static OnPlayerAvengedTeammate(callback) { this.On("player_avenged_teammate", callback); }

    /** @param {(data: { userid: number; vote: boolean }) => void} callback */
    static OnPlayerResetVote(callback) { this.On("player_reset_vote", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnPlayerGivenC4(callback) { this.On("player_given_c4", callback); }

    /** @param {(data: { splitscreenplayer: number; userid: number; entityid: number; x: number; y: number; z: number; urgent: boolean; userid_pawn: number; }) => void} callback */
    static OnPlayerPing(callback) { this.On("player_ping", callback); }

    /** @param {(data: { entityid: number }) => void} callback */
    static OnPlayerPingStop(callback) { this.On("player_ping_stop", callback); }

    /** @param {(data: { userid: number; radius: number; duration: number; step: boolean; userid_pawn: number; }) => void} callback */
    static OnPlayerSound(callback) { this.On("player_sound", callback); }

    /** @param {(data: { team: number; sound: string }) => void} callback */
    static OnTeamplayBroadcastAudio(callback) { this.On("teamplay_broadcast_audio", callback); }

    /** @param {(data: { teamid: number; teamname: string }) => void} callback */
    static OnTeamInfo(callback) { this.On("team_info", callback); }

    /** @param {(data: { teamid: number; score: number }) => void} callback */
    static OnTeamScore(callback) { this.On("team_score", callback); }

    /** @param {(data: { full_reset: boolean }) => void} callback */
    static OnTeamplayRoundStart(callback) { this.On("teamplay_round_start", callback); }

    /** @param {(data: {}) => void} callback */
    static OnTeamIntroStart(callback) { this.On("team_intro_start", callback); }

    /** @param {(data: {}) => void} callback */
    static OnTeamIntroEnd(callback) { this.On("team_intro_end", callback); }

    /** @param {(data: { timelimit: number; fraglimit: number; objective: string; }) => void} callback */
    static OnRoundStart(callback) { this.On("round_start", callback); }

    /** @param {(data: { winner: number; reason: number; message: string; legacy: number; player_count: number; nomusic: number; }) => void} callback */
    static OnRoundEnd(callback) { this.On("round_end", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundStartPreEntity(callback) { this.On("round_start_pre_entity", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundStartPostNav(callback) { this.On("round_start_post_nav", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundFreezeEnd(callback) { this.On("round_freeze_end", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundPrestart(callback) { this.On("round_prestart", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundPoststart(callback) { this.On("round_poststart", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundAnnounceMatchPoint(callback) { this.On("round_announce_match_point", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundAnnounceFinal(callback) { this.On("round_announce_final", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundAnnounceLastRoundHalf(callback) { this.On("round_announce_last_round_half", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundAnnounceMatchStart(callback) { this.On("round_announce_match_start", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundAnnounceWarmup(callback) { this.On("round_announce_warmup", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundEndUploadStats(callback) { this.On("round_end_upload_stats", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundOfficiallyEnded(callback) { this.On("round_officially_ended", callback); }

    /** @param {(data: {}) => void} callback */
    static OnRoundTimeWarning(callback) { this.On("round_time_warning", callback); }

    /** @param {(data: { userid: number; reason: number; value: number; musickitmvps: number; nomusic: number; musickitid: number; }) => void} callback */
    static OnRoundMvp(callback) { this.On("round_mvp", callback); }

    /** @param {(data: {}) => void} callback */
    static OnGameInit(callback) { this.On("game_init", callback); }

    /** @param {(data: { roundslimit: number; timelimit: number; fraglimit: number; objective: string; }) => void} callback */
    static OnGameStart(callback) { this.On("game_start", callback); }

    /** @param {(data: { winner: number }) => void} callback */
    static OnGameEnd(callback) { this.On("game_end", callback); }

    /** @param {(data: { target: number; text: string }) => void} callback */
    static OnGameMessage(callback) { this.On("game_message", callback); }

    /** @param {(data: { mapname: string }) => void} callback */
    static OnGameNewmap(callback) { this.On("game_newmap", callback); }

    /** @param {(data: { new_phase: number }) => void} callback */
    static OnGamePhaseChanged(callback) { this.On("game_phase_changed", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnHltvCameraman(callback) { this.On("hltv_cameraman", callback); }

    /** @param {(data: { target1: number; target2: number; distance: number; theta: number; phi: number; inertia: number; ineye: number; }) => void} callback */
    static OnHltvChase(callback) { this.On("hltv_chase", callback); }

    /** @param {(data: { index: number; rank: number; target: number; }) => void} callback */
    static OnHltvRankCamera(callback) { this.On("hltv_rank_camera", callback); }

    /** @param {(data: { userid: number; rank: number; target: number; }) => void} callback */
    static OnHltvRankEntity(callback) { this.On("hltv_rank_entity", callback); }

    /** @param {(data: { posx: number; posy: number; posz: number; theta: number; phi: number; offset: number; fov: number; target: number; }) => void} callback */
    static OnHltvFixed(callback) { this.On("hltv_fixed", callback); }

    /** @param {(data: { text: string }) => void} callback */
    static OnHltvMessage(callback) { this.On("hltv_message", callback); }

    /** @param {(data: { clients: number; slots: number; proxies: number; master: string; }) => void} callback */
    static OnHltvStatus(callback) { this.On("hltv_status", callback); }

    /** @param {(data: { text: string }) => void} callback */
    static OnHltvTitle(callback) { this.On("hltv_title", callback); }

    /** @param {(data: { text: string; steamID: string }) => void} callback */
    static OnHltvChat(callback) { this.On("hltv_chat", callback); }

    /** @param {(data: { version: number }) => void} callback */
    static OnHltvVersioninfo(callback) { this.On("hltv_versioninfo", callback); }

    /** @param {(data: { delay: number; reason: number }) => void} callback */
    static OnHltvReplay(callback) { this.On("hltv_replay", callback); }

    /** @param {(data: { oldmode: number; newmode: number; obs_target: number; }) => void} callback */
    static OnHltvChangedMode(callback) { this.On("hltv_changed_mode", callback); }

    /** @param {(data: { reason: number }) => void} callback */
    static OnHltvReplayStatus(callback) { this.On("hltv_replay_status", callback); }

    /** @param {(data: {}) => void} callback */
    static OnDemoStart(callback) { this.On("demo_start", callback); }

    /** @param {(data: {}) => void} callback */
    static OnDemoStop(callback) { this.On("demo_stop", callback); }

    /** @param {(data: { playback_tick: number; skipto_tick: number; }) => void} callback */
    static OnDemoSkip(callback) { this.On("demo_skip", callback); }

    /** @param {(data: {}) => void} callback */
    static OnMapShutdown(callback) { this.On("map_shutdown", callback); }

    /** @param {(data: {}) => void} callback */
    static OnMapTransition(callback) { this.On("map_transition", callback); }

    /** @param {(data: { hostname: string }) => void} callback */
    static OnHostnameChanged(callback) { this.On("hostname_changed", callback); }

    /** @param {(data: { newDifficulty: number; oldDifficulty: number; strDifficulty: string; }) => void} callback */
    static OnDifficultyChanged(callback) { this.On("difficulty_changed", callback); }

    /** @param {(data: { userid: number; weapon: string; silenced: boolean; userid_pawn: number; }) => void} callback */
    static OnWeaponFire(callback) { this.On("weapon_fire", callback); }

    /** @param {(data: { userid: number; weapon: string; userid_pawn: number; }) => void} callback */
    static OnWeaponFireOnEmpty(callback) { this.On("weapon_fire_on_empty", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnWeaponOutofammo(callback) { this.On("weapon_outofammo", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnWeaponReload(callback) { this.On("weapon_reload", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnWeaponZoom(callback) { this.On("weapon_zoom", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnWeaponZoomRifle(callback) { this.On("weapon_zoom_rifle", callback); }

    /** @param {(data: { userid: number; weapon: string; userid_pawn: number; }) => void} callback */
    static OnGrenadeThrown(callback) { this.On("grenade_thrown", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnGrenadeBounce(callback) { this.On("grenade_bounce", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnHegrenadeDetonate(callback) { this.On("hegrenade_detonate", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnFlashbangDetonate(callback) { this.On("flashbang_detonate", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnSmokegrenadeDetonate(callback) { this.On("smokegrenade_detonate", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnSmokegrenadeExpired(callback) { this.On("smokegrenade_expired", callback); }

    /** @param {(data: { userid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnMolotovDetonate(callback) { this.On("molotov_detonate", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnDecoyDetonate(callback) { this.On("decoy_detonate", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnDecoyStarted(callback) { this.On("decoy_started", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnDecoyFiring(callback) { this.On("decoy_firing", callback); }

    /** @param {(data: { userid: number; entityid: number; x: number; y: number; z: number; }) => void} callback */
    static OnTagrenadeDetonate(callback) { this.On("tagrenade_detonate", callback); }

    /** @param {(data: { entityid: number; x: number; y: number; z: number; }) => void} callback */
    static OnInfernoStartburn(callback) { this.On("inferno_startburn", callback); }

    /** @param {(data: { entityid: number; x: number; y: number; z: number; }) => void} callback */
    static OnInfernoExpire(callback) { this.On("inferno_expire", callback); }

    /** @param {(data: { entityid: number; x: number; y: number; z: number; }) => void} callback */
    static OnInfernoExtinguish(callback) { this.On("inferno_extinguish", callback); }

    /** @param {(data: { userid: number; site: number; userid_pawn: number; }) => void} callback */
    static OnBombBeginplant(callback) { this.On("bomb_beginplant", callback); }

    /** @param {(data: { userid: number; site: number; userid_pawn: number; }) => void} callback */
    static OnBombAbortplant(callback) { this.On("bomb_abortplant", callback); }

    /** @param {(data: { userid: number; site: number; userid_pawn: number; }) => void} callback */
    static OnBombPlanted(callback) { this.On("bomb_planted", callback); }

    /** @param {(data: { userid: number; haskit: boolean; userid_pawn: number; }) => void} callback */
    static OnBombBegindefuse(callback) { this.On("bomb_begindefuse", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnBombAbortdefuse(callback) { this.On("bomb_abortdefuse", callback); }

    /** @param {(data: { userid: number; site: number; userid_pawn: number; }) => void} callback */
    static OnBombDefused(callback) { this.On("bomb_defused", callback); }

    /** @param {(data: { userid: number; site: number; userid_pawn: number; }) => void} callback */
    static OnBombExploded(callback) { this.On("bomb_exploded", callback); }

    /** @param {(data: { userid: number; entindex: number; userid_pawn: number; }) => void} callback */
    static OnBombDropped(callback) { this.On("bomb_dropped", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnBombPickup(callback) { this.On("bomb_pickup", callback); }

    /** @param {(data: { entindex: number }) => void} callback */
    static OnBombBeep(callback) { this.On("bomb_beep", callback); }

    /** @param {(data: { entityid: number }) => void} callback */
    static OnDefuserDropped(callback) { this.On("defuser_dropped", callback); }

    /** @param {(data: { entityid: number; userid: number; userid_pawn: number; }) => void} callback */
    static OnDefuserPickup(callback) { this.On("defuser_pickup", callback); }

    /** @param {(data: { userid: number; hostage: number; userid_pawn: number; }) => void} callback */
    static OnHostageFollows(callback) { this.On("hostage_follows", callback); }

    /** @param {(data: { userid: number; hostage: number; userid_pawn: number; }) => void} callback */
    static OnHostageHurt(callback) { this.On("hostage_hurt", callback); }

    /** @param {(data: { userid: number; hostage: number; userid_pawn: number; }) => void} callback */
    static OnHostageKilled(callback) { this.On("hostage_killed", callback); }

    /** @param {(data: { userid: number; hostage: number; site: number; userid_pawn: number; }) => void} callback */
    static OnHostageRescued(callback) { this.On("hostage_rescued", callback); }

    /** @param {(data: { userid: number; hostage: number; userid_pawn: number; }) => void} callback */
    static OnHostageStopsFollowing(callback) { this.On("hostage_stops_following", callback); }

    /** @param {(data: {}) => void} callback */
    static OnHostageRescuedAll(callback) { this.On("hostage_rescued_all", callback); }

    /** @param {(data: { hostage: number }) => void} callback */
    static OnHostageCallForHelp(callback) { this.On("hostage_call_for_help", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnVipEscaped(callback) { this.On("vip_escaped", callback); }

    /** @param {(data: { userid: number; attacker: number; }) => void} callback */
    static OnVipKilled(callback) { this.On("vip_killed", callback); }

    /** @param {(data: { userid: number; team: number; loadout: number; weapon: string; }) => void} callback */
    static OnItemPurchase(callback) { this.On("item_purchase", callback); }

    /** @param {(data: { userid: number; item: string; silent: boolean; defindex: number; }) => void} callback */
    static OnItemPickup(callback) { this.On("item_pickup", callback); }

    /** @param {(data: { userid: number; index: number; behavior: number; }) => void} callback */
    static OnItemPickupSlerp(callback) { this.On("item_pickup_slerp", callback); }

    /** @param {(data: { userid: number; item: string; reason: number; limit: number; }) => void} callback */
    static OnItemPickupFailed(callback) { this.On("item_pickup_failed", callback); }

    /** @param {(data: { userid: number; item: string; defindex: number; }) => void} callback */
    static OnItemRemove(callback) { this.On("item_remove", callback); }

    /** @param {(data: { userid: number; item: string; defindex: number; canzoom: boolean; hassilencer: boolean; issilenced: boolean; hastracers: boolean; weptype: number; ispainted: boolean; }) => void} callback */
    static OnItemEquip(callback) { this.On("item_equip", callback); }

    /** @param {(data: {}) => void} callback */
    static OnItemSchemaInitialized(callback) { this.On("item_schema_initialized", callback); }

    /** @param {(data: { userid: number; item: string; index: number; }) => void} callback */
    static OnAmmoPickup(callback) { this.On("ammo_pickup", callback); }

    /** @param {(data: { userid: number; success: boolean; }) => void} callback */
    static OnAmmoRefill(callback) { this.On("ammo_refill", callback); }

    /** @param {(data: { userid: number; canbuy: boolean; }) => void} callback */
    static OnEnterBuyzone(callback) { this.On("enter_buyzone", callback); }

    /** @param {(data: { userid: number; canbuy: boolean; }) => void} callback */
    static OnExitBuyzone(callback) { this.On("exit_buyzone", callback); }

    /** @param {(data: { userid: number; hasbomb: boolean; isplanted: boolean; }) => void} callback */
    static OnEnterBombzone(callback) { this.On("enter_bombzone", callback); }

    /** @param {(data: { userid: number; hasbomb: boolean; isplanted: boolean; }) => void} callback */
    static OnExitBombzone(callback) { this.On("exit_bombzone", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnEnterRescueZone(callback) { this.On("enter_rescue_zone", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnExitRescueZone(callback) { this.On("exit_rescue_zone", callback); }

    /** @param {(data: {}) => void} callback */
    static OnBuytimeEnded(callback) { this.On("buytime_ended", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnSilencerOff(callback) { this.On("silencer_off", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnSilencerOn(callback) { this.On("silencer_on", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnSilencerDetach(callback) { this.On("silencer_detach", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnBuymenuOpen(callback) { this.On("buymenu_open", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnBuymenuClose(callback) { this.On("buymenu_close", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; }) => void} callback */
    static OnInspectWeapon(callback) { this.On("inspect_weapon", callback); }

    /** @param {(data: { otherid: number; othertype: string; attacker: number; weapon: string; weapon_itemid: string; weapon_fauxitemid: string; weapon_originalowner_xuid: string; headshot: boolean; penetrated: number; noscope: boolean; thrusmoke: boolean; attackerblind: boolean; }) => void} callback */
    static OnOtherDeath(callback) { this.On("other_death", callback); }

    /** @param {(data: { userid: number; x: number; y: number; z: number; userid_pawn: number; }) => void} callback */
    static OnBulletImpact(callback) { this.On("bullet_impact", callback); }

    /** @param {(data: { userid: number; userid_pawn: number; pos_x: number; pos_y: number; pos_z: number; ang_x: number; ang_y: number; ang_z: number; start_x: number; start_y: number; start_z: number; }) => void} callback */
    static OnBulletFlightResolution(callback) { this.On("bullet_flight_resolution", callback); }

    /** @param {(data: { userid: number; checkpoint: boolean; userid_pawn: number; }) => void} callback */
    static OnDoorClose(callback) { this.On("door_close", callback); }

    /** @param {(data: { userid: number; entindex: number; userid_pawn: number; }) => void} callback */
    static OnDoorMoving(callback) { this.On("door_moving", callback); }

    /** @param {(data: { entindex: number; dmgstate: number; }) => void} callback */
    static OnDoorBreak(callback) { this.On("door_break", callback); }

    /** @param {(data: { userid_pawn: number; entindex: number; }) => void} callback */
    static OnDoorClosed(callback) { this.On("door_closed", callback); }

    /** @param {(data: { userid_pawn: number; entindex: number; }) => void} callback */
    static OnDoorOpen(callback) { this.On("door_open", callback); }

    /** @param {(data: { entindex: number; userid: number; material: number; userid_pawn: number; }) => void} callback */
    static OnBreakBreakable(callback) { this.On("break_breakable", callback); }

    /** @param {(data: { entindex: number; userid: number; userid_pawn: number; }) => void} callback */
    static OnBreakProp(callback) { this.On("break_prop", callback); }

    /** @param {(data: { entindex: number; userid: number; material: number; userid_pawn: number; }) => void} callback */
    static OnBrokenBreakable(callback) { this.On("broken_breakable", callback); }

    /** @param {(data: { entindex_killed: number; entindex_attacker: number; entindex_inflictor: number; damagebits: number; }) => void} callback */
    static OnEntityKilled(callback) { this.On("entity_killed", callback); }

    /** @param {(data: { userid: number; subject: number; classname: string; entityname: string; }) => void} callback */
    static OnEntityVisible(callback) { this.On("entity_visible", callback); }

    /** @param {(data: { issue: string; param1: string; team: number; initiator: number; }) => void} callback */
    static OnVoteStarted(callback) { this.On("vote_started", callback); }

    /** @param {(data: { team: number }) => void} callback */
    static OnVoteFailed(callback) { this.On("vote_failed", callback); }

    /** @param {(data: { details: string; param1: string; team: number; }) => void} callback */
    static OnVotePassed(callback) { this.On("vote_passed", callback); }

    /** @param {(data: { vote_option1: number; vote_option2: number; vote_option3: number; vote_option4: number; vote_option5: number; potentialVotes: number; }) => void} callback */
    static OnVoteChanged(callback) { this.On("vote_changed", callback); }

    /** @param {(data: { team: number; entityid: number; }) => void} callback */
    static OnVoteCastYes(callback) { this.On("vote_cast_yes", callback); }

    /** @param {(data: { team: number; entityid: number; }) => void} callback */
    static OnVoteCastNo(callback) { this.On("vote_cast_no", callback); }

    /** @param {(data: { vote_option: number; team: number; userid: number; }) => void} callback */
    static OnVoteCast(callback) { this.On("vote_cast", callback); }

    /** @param {(data: {}) => void} callback */
    static OnVoteEnded(callback) { this.On("vote_ended", callback); }

    /** @param {(data: { count: number; option1: string; option2: string; option3: string; option4: string; option5: string; }) => void} callback */
    static OnVoteOptions(callback) { this.On("vote_options", callback); }

    /** @param {(data: { userid: number; type: number; vote_parameter: number; }) => void} callback */
    static OnStartVote(callback) { this.On("start_vote", callback); }

    /** @param {(data: { enable: boolean }) => void} callback */
    static OnEnableRestartVoting(callback) { this.On("enable_restart_voting", callback); }

    /** @param {(data: { achievement_name: string; cur_val: number; max_val: number; }) => void} callback */
    static OnAchievementEvent(callback) { this.On("achievement_event", callback); }

    /** @param {(data: { player: number; achievement: number; }) => void} callback */
    static OnAchievementEarned(callback) { this.On("achievement_earned", callback); }

    /** @param {(data: { achievement: number; splitscreenplayer: number; }) => void} callback */
    static OnAchievementEarnedLocal(callback) { this.On("achievement_earned_local", callback); }

    /** @param {(data: {}) => void} callback */
    static OnAchievementWriteFailed(callback) { this.On("achievement_write_failed", callback); }

    /** @param {(data: {}) => void} callback */
    static OnAchievementInfoLoaded(callback) { this.On("achievement_info_loaded", callback); }

    /** @param {(data: { numadvanced: number; numbronze: number; numsilver: number; numgold: number; }) => void} callback */
    static OnBonusUpdated(callback) { this.On("bonus_updated", callback); }

    /** @param {(data: { userid: number; target: number; userid_pawn: number; }) => void} callback */
    static OnSpecTargetUpdated(callback) { this.On("spec_target_updated", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnSpecModeUpdated(callback) { this.On("spec_mode_updated", callback); }

    /** @param {(data: {}) => void} callback */
    static OnGameinstructorDraw(callback) { this.On("gameinstructor_draw", callback); }

    /** @param {(data: {}) => void} callback */
    static OnGameinstructorNodraw(callback) { this.On("gameinstructor_nodraw", callback); }

    /** @param {(data: { userid: number; hint_name: string; hint_target: number; vr_movement_type: number; vr_single_controller: boolean; vr_controller_type: number; }) => void} callback */
    static OnInstructorStartLesson(callback) { this.On("instructor_start_lesson", callback); }

    /** @param {(data: { userid: number; hint_name: string; }) => void} callback */
    static OnInstructorCloseLesson(callback) { this.On("instructor_close_lesson", callback); }

    /** @param {(data: { userid: number; hint_name: string; hint_replace_key: string; hint_target: number; hint_activator_userid: number; hint_timeout: number; hint_icon_onscreen: string; hint_icon_offscreen: string; hint_caption: string; hint_activator_caption: string; hint_color: string; hint_icon_offset: number; hint_range: number; hint_flags: number; hint_binding: string; hint_gamepad_binding: string; hint_allow_nodraw_target: boolean; hint_nooffscreen: boolean; hint_forcecaption: boolean; hint_local_player_only: boolean; }) => void} callback */
    static OnInstructorServerHintCreate(callback) { this.On("instructor_server_hint_create", callback); }

    /** @param {(data: { hint_name: string }) => void} callback */
    static OnInstructorServerHintStop(callback) { this.On("instructor_server_hint_stop", callback); }

    /** @param {(data: { lesson_name: string }) => void} callback */
    static OnClientsideLessonClosed(callback) { this.On("clientside_lesson_closed", callback); }

    /** @param {(data: { group: string; enabled: number; }) => void} callback */
    static OnSetInstructorGroupEnabled(callback) { this.On("set_instructor_group_enabled", callback); }

    /** @param {(data: { target: number }) => void} callback */
    static OnPhysgunPickup(callback) { this.On("physgun_pickup", callback); }

    /** @param {(data: { entindex: number }) => void} callback */
    static OnFlareIgniteNpc(callback) { this.On("flare_ignite_npc", callback); }

    /** @param {(data: {}) => void} callback */
    static OnHelicopterGrenadePuntMiss(callback) { this.On("helicopter_grenade_punt_miss", callback); }

    /** @param {(data: { rushes: number }) => void} callback */
    static OnFinaleStart(callback) { this.On("finale_start", callback); }

    /** @param {(data: { controllerId: number }) => void} callback */
    static OnReadGameTitledata(callback) { this.On("read_game_titledata", callback); }

    /** @param {(data: { controllerId: number }) => void} callback */
    static OnWriteGameTitledata(callback) { this.On("write_game_titledata", callback); }

    /** @param {(data: { controllerId: number }) => void} callback */
    static OnResetGameTitledata(callback) { this.On("reset_game_titledata", callback); }

    /** @param {(data: {}) => void} callback */
    static OnWriteProfileData(callback) { this.On("write_profile_data", callback); }

    /** @param {(data: { entindex: number }) => void} callback */
    static OnRagdollDissolved(callback) { this.On("ragdoll_dissolved", callback); }

    /** @param {(data: {}) => void} callback */
    static OnInventoryUpdated(callback) { this.On("inventory_updated", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCartUpdated(callback) { this.On("cart_updated", callback); }

    /** @param {(data: {}) => void} callback */
    static OnStorePricesheetUpdated(callback) { this.On("store_pricesheet_updated", callback); }

    /** @param {(data: {}) => void} callback */
    static OnDropRateModified(callback) { this.On("drop_rate_modified", callback); }

    /** @param {(data: {}) => void} callback */
    static OnEventTicketModified(callback) { this.On("event_ticket_modified", callback); }

    /** @param {(data: {}) => void} callback */
    static OnGcConnected(callback) { this.On("gc_connected", callback); }

    /** @param {(data: {}) => void} callback */
    static OnDynamicShadowLightChanged(callback) { this.On("dynamic_shadow_light_changed", callback); }

    /** @param {(data: {}) => void} callback */
    static OnGameuiHidden(callback) { this.On("gameui_hidden", callback); }

    /** @param {(data: { player: number; itemdef: number; numgifts: number; giftidx: number; accountid: number; }) => void} callback */
    static OnItemsGifted(callback) { this.On("items_gifted", callback); }

    /** @param {(data: {}) => void} callback */
    static OnWarmupEnd(callback) { this.On("warmup_end", callback); }

    /** @param {(data: {}) => void} callback */
    static OnAnnouncePhaseEnd(callback) { this.On("announce_phase_end", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsIntermission(callback) { this.On("cs_intermission", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsGameDisconnected(callback) { this.On("cs_game_disconnected", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsRoundFinalBeep(callback) { this.On("cs_round_final_beep", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsRoundStartBeep(callback) { this.On("cs_round_start_beep", callback); }

    /** @param {(data: { show_timer_defend: boolean; show_timer_attack: boolean; timer_time: number; final_event: number; funfact_token: string; funfact_player: number; funfact_data1: number; funfact_data2: number; funfact_data3: number; }) => void} callback */
    static OnCsWinPanelRound(callback) { this.On("cs_win_panel_round", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsWinPanelMatch(callback) { this.On("cs_win_panel_match", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsMatchEndRestart(callback) { this.On("cs_match_end_restart", callback); }

    /** @param {(data: {}) => void} callback */
    static OnCsPreRestart(callback) { this.On("cs_pre_restart", callback); }

    /** @param {(data: { next: boolean }) => void} callback */
    static OnCsPrevNextSpectator(callback) { this.On("cs_prev_next_spectator", callback); }

    /** @param {(data: { victim: number; killer: number; killer_controller: number; hits_taken: number; damage_taken: number; hits_given: number; damage_given: number; victim_pawn: number; }) => void} callback */
    static OnShowDeathpanel(callback) { this.On("show_deathpanel", callback); }

    /** @param {(data: {}) => void} callback */
    static OnHideDeathpanel(callback) { this.On("hide_deathpanel", callback); }

    /** @param {(data: { published_file_id: string }) => void} callback */
    static OnUgcMapInfoReceived(callback) { this.On("ugc_map_info_received", callback); }

    /** @param {(data: { published_file_id: string }) => void} callback */
    static OnUgcMapUnsubscribed(callback) { this.On("ugc_map_unsubscribed", callback); }

    /** @param {(data: { published_file_id: string; error_code: number; }) => void} callback */
    static OnUgcMapDownloadError(callback) { this.On("ugc_map_download_error", callback); }

    /** @param {(data: { hcontent: string }) => void} callback */
    static OnUgcFileDownloadFinished(callback) { this.On("ugc_file_download_finished", callback); }

    /** @param {(data: { hcontent: string; published_file_id: string; }) => void} callback */
    static OnUgcFileDownloadStart(callback) { this.On("ugc_file_download_start", callback); }

    /** @param {(data: {}) => void} callback */
    static OnBeginNewMatch(callback) { this.On("begin_new_match", callback); }

    /** @param {(data: { frags: number; max_rounds: number; win_rounds: number; time: number; }) => void} callback */
    static OnMatchEndConditions(callback) { this.On("match_end_conditions", callback); }

    /** @param {(data: { count: number; slot1: number; slot2: number; slot3: number; slot4: number; slot5: number; slot6: number; slot7: number; slot8: number; slot9: number; slot10: number; }) => void} callback */
    static OnEndmatchMapvoteSelectingMap(callback) { this.On("endmatch_mapvote_selecting_map", callback); }

    /** @param {(data: {}) => void} callback */
    static OnEndmatchCmmStartRevealItems(callback) { this.On("endmatch_cmm_start_reveal_items", callback); }

    /** @param {(data: { nextlevel: string; mapgroup: string; skirmishmode: string; }) => void} callback */
    static OnNextlevelChanged(callback) { this.On("nextlevel_changed", callback); }

    /** @param {(data: { time: number; Pos: number; }) => void} callback */
    static OnDmBonusWeaponStart(callback) { this.On("dm_bonus_weapon_start", callback); }

    /** @param {(data: { victimid: number; attackerid: number; dominated: number; revenge: number; bonus: boolean; }) => void} callback */
    static OnGgKilledEnemy(callback) { this.On("gg_killed_enemy", callback); }

    /** @param {(data: { numPlayers: number; numSpectators: number; avg_rank: number; numTSlotsFree: number; numCTSlotsFree: number; }) => void} callback */
    static OnSwitchTeam(callback) { this.On("switch_team", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnTrialTimeExpired(callback) { this.On("trial_time_expired", callback); }

    /** @param {(data: {}) => void} callback */
    static OnUpdateMatchmakingStats(callback) { this.On("update_matchmaking_stats", callback); }

    /** @param {(data: {}) => void} callback */
    static OnClientDisconnect(callback) { this.On("client_disconnect", callback); }

    /** @param {(data: {}) => void} callback */
    static OnClientLoadoutChanged(callback) { this.On("client_loadout_changed", callback); }

    /** @param {(data: { userid: number; pos_x: number; pos_y: number; pos_z: number; }) => void} callback */
    static OnAddPlayerSonarIcon(callback) { this.On("add_player_sonar_icon", callback); }

    /** @param {(data: { userid: number; bone: number; pos_x: number; pos_y: number; pos_z: number; ang_x: number; ang_y: number; ang_z: number; start_x: number; start_y: number; start_z: number; hit: boolean; }) => void} callback */
    static OnAddBulletHitMarker(callback) { this.On("add_bullet_hit_marker", callback); }

    /** @param {(data: { action: string; data: string; slot: number; }) => void} callback */
    static OnSfuievent(callback) { this.On("sfuievent", callback); }

    /** @param {(data: { userid: number; mode: number; entindex: number; userid_pawn: number; }) => void} callback */
    static OnWeaponhudSelection(callback) { this.On("weaponhud_selection", callback); }

    /** @param {(data: { userid: number }) => void} callback */
    static OnTrPlayerFlashbanged(callback) { this.On("tr_player_flashbanged", callback); }

    /** @param {(data: { complete: number }) => void} callback */
    static OnTrMarkComplete(callback) { this.On("tr_mark_complete", callback); }

    /** @param {(data: { time: number }) => void} callback */
    static OnTrMarkBestTime(callback) { this.On("tr_mark_best_time", callback); }

    /** @param {(data: {}) => void} callback */
    static OnTrExitHintTrigger(callback) { this.On("tr_exit_hint_trigger", callback); }

    /** @param {(data: {}) => void} callback */
    static OnTrShowFinishMsgbox(callback) { this.On("tr_show_finish_msgbox", callback); }

    /** @param {(data: {}) => void} callback */
    static OnTrShowExitMsgbox(callback) { this.On("tr_show_exit_msgbox", callback); }

    /** @param {(data: { userid: number; botid: number; userid_pawn: number; }) => void} callback */
    static OnBotTakeover(callback) { this.On("bot_takeover", callback); }

    /** @param {(data: { userid: number; reason: number; }) => void} callback */
    static OnJointeamFailed(callback) { this.On("jointeam_failed", callback); }

    /** @param {(data: { userid: number; toteam: number; }) => void} callback */
    static OnTeamchangePending(callback) { this.On("teamchange_pending", callback); }

    /** @param {(data: {}) => void} callback */
    static OnMaterialDefaultComplete(callback) { this.On("material_default_complete", callback); }

    /** @param {(data: { userid: number; category: number; rank: number; }) => void} callback */
    static OnSeasoncoinLevelup(callback) { this.On("seasoncoin_levelup", callback); }

    /** @param {(data: { defindex: number; totalrewards: number; accountid: number; }) => void} callback */
    static OnTournamentReward(callback) { this.On("tournament_reward", callback); }

    /** @param {(data: {}) => void} callback */
    static OnStartHalftime(callback) { this.On("start_halftime", callback); }

    /** @param {(data: { userid: number; }) => void} callback */
    static OnPlayerDecal(callback) { this.On("player_decal", callback); }

    /** @param {(data: { userid: number; }) => void} callback */
    static OnSurvivalTeammateRespawn(callback) { this.On("survival_teammate_respawn", callback); }

    /** @param {(data: { userid: number; }) => void} callback */
    static OnSurvivalNoRespawnsWarning(callback) { this.On("survival_no_respawns_warning", callback); }

    /** @param {(data: { userid: number; }) => void} callback */
    static OnSurvivalNoRespawnsFinal(callback) { this.On("survival_no_respawns_final", callback); }

    /** @param {(data: { loc_token: string; duration: number; userid: number; userid_pawn: number; }) => void} callback */
    static OnShowSurvivalRespawnStatus(callback) { this.On("show_survival_respawn_status", callback); }

    /** @param {(data: {}) => void} callback */
    static OnGuardianWaveRestart(callback) { this.On("guardian_wave_restart", callback); }

    /** @param {(data: { area: number; blocked: boolean; }) => void} callback */
    static OnNavBlocked(callback) { this.On("nav_blocked", callback); }

    /** @param {(data: {}) => void} callback */
    static OnNavGenerate(callback) { this.On("nav_generate", callback); }

    /** @param {(data: { splitscreenplayer: number; }) => void} callback */
    static OnRepostXboxAchievements(callback) { this.On("repost_xbox_achievements", callback); }

    /** @param {(data: {}) => void} callback */
    static OnMbInputLockSuccess(callback) { this.On("mb_input_lock_success", callback); }

    /** @param {(data: {}) => void} callback */
    static OnMbInputLockCancel(callback) { this.On("mb_input_lock_cancel", callback); }
}

// usage example:
EventListeners.RegisterAll();

EventListeners.OnPlayerHurt((data) => {
    CSS.Msg(`player ${CSS.GetPlayerController(data.userid)?.GetPlayerName()} was hit by ${CSS.GetPlayerController(data.attacker)?.GetPlayerName()} for -${data.dmg_health} HP and -${data.dmg_armor} amor`);
});
