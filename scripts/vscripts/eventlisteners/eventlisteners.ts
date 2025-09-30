import { Instance as CSS } from "cs_script/point_script";

// usage example:
//EventListeners.RegisterAll();

//EventListeners.OnPlayerHurt((data) => {
//    CSS.Msg(`player ${CSS.GetPlayerController(data.userid)?.GetPlayerName()} was hit by ${CSS.GetPlayerController(data.attacker)?.GetPlayerName()} for -${data.dmg_health} HP and -${data.dmg_armor} amor`);
//});

class EventListeners {
    private static registered = false;
    private static handlers: Map<string, ((data: any) => void)[]> = new Map();

    static RegisterAll(): void {
        if (this.registered) {
            css.Msg("event listeners already registered");
            return;
        }

        const eventListeners = css.FindEntitiesByClass("logic_eventlistener");

        eventListeners.forEach(listener => {
            const eventName = listener.GetEntityName();

            css.ConnectOutput(listener, "OnEventFired", (data) => {
                let value = {};

                if (typeof data?.value === "string") {
                    value = JSON.parse(data.value);
                } else if (typeof data?.value === "object" && data.value !== null) {
                    value = data.value;
                }

                this.TriggerEvent(eventName, value);
            });
        });

        this.registered = true;
        css.Msg(`registered ${eventListeners.length} event listeners`);
    }

    private static TriggerEvent(eventName: string, data: any): void {
        const handlers = this.handlers.get(eventName);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    private static On(eventName: string, callback: (data: any) => void): void {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName)!.push(callback);
    }

    // Server Events
    static OnServerSpawn(callback: (data: {
        hostname: string;
        address: string;
        port: number;
        game: string;
        mapname: string;
        addonname: string;
        maxplayers: number;
        os: string;
        dedicated: boolean;
        password: boolean;
    }) => void): void {
        this.On("server_spawn", callback);
    }

    static OnServerPreShutdown(callback: (data: { reason: string }) => void): void {
        this.On("server_pre_shutdown", callback);
    }

    static OnServerShutdown(callback: (data: { reason: string }) => void): void {
        this.On("server_shutdown", callback);
    }

    static OnServerMessage(callback: (data: { text: string }) => void): void {
        this.On("server_message", callback);
    }

    static OnServerCvar(callback: (data: { cvarname: string; cvarvalue: string }) => void): void {
        this.On("server_cvar", callback);
    }

    // Player Events
    static OnPlayerActivate(callback: (data: { userid: number }) => void): void {
        this.On("player_activate", callback);
    }

    static OnPlayerConnectFull(callback: (data: { userid: number }) => void): void {
        this.On("player_connect_full", callback);
    }

    static OnPlayerFullUpdate(callback: (data: { userid: number; count: number }) => void): void {
        this.On("player_full_update", callback);
    }

    static OnPlayerConnect(callback: (data: {
        name: string;
        userid: number;
        networkid: string;
        xuid: string;
        address: string;
        bot: boolean;
    }) => void): void {
        this.On("player_connect", callback);
    }

    static OnPlayerDisconnect(callback: (data: {
        userid: number;
        reason: number;
        name: string;
        networkid: string;
        xuid: string;
        PlayerID: number;
    }) => void): void {
        this.On("player_disconnect", callback);
    }

    static OnPlayerInfo(callback: (data: {
        name: string;
        userid: number;
        steamid: string;
        bot: boolean;
    }) => void): void {
        this.On("player_info", callback);
    }

    static OnPlayerSpawn(callback: (data: { userid: number; userid_pawn: number }) => void): void {
        this.On("player_spawn", callback);
    }

    static OnPlayerTeam(callback: (data: {
        userid: number;
        team: number;
        oldteam: number;
        disconnect: boolean;
        silent: boolean;
        isbot: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("player_team", callback);
    }

    static OnLocalPlayerTeam(callback: (data: {}) => void): void {
        this.On("local_player_team", callback);
    }

    static OnLocalPlayerControllerTeam(callback: (data: {}) => void): void {
        this.On("local_player_controller_team", callback);
    }

    static OnPlayerChangename(callback: (data: {
        userid: number;
        oldname: string;
        newname: string;
    }) => void): void {
        this.On("player_changename", callback);
    }

    static OnPlayerHurt(callback: (data: {
        userid: number;
        attacker: number;
        health: number;
        armor: number;
        weapon: string;
        dmg_health: number;
        dmg_armor: number;
        hitgroup: number;
        userid_pawn: number;
        attacker_pawn: number;
    }) => void): void {
        this.On("player_hurt", callback);
    }

    static OnPlayerChat(callback: (data: {
        teamonly: boolean;
        userid: number;
        text: string;
    }) => void): void {
        this.On("player_chat", callback);
    }

    static OnLocalPlayerPawnChanged(callback: (data: {}) => void): void {
        this.On("local_player_pawn_changed", callback);
    }

    static OnPlayerStatsUpdated(callback: (data: { forceupload: boolean }) => void): void {
        this.On("player_stats_updated", callback);
    }

    static OnPlayerDeath(callback: (data: {
        userid: number;
        attacker: number;
        assister: number;
        assistedflash: boolean;
        weapon: string;
        weapon_itemid: string;
        weapon_fauxitemid: string;
        weapon_originalowner_xuid: string;
        headshot: boolean;
        dominated: number;
        revenge: number;
        wipe: number;
        penetrated: number;
        noreplay: boolean;
        noscope: boolean;
        thrusmoke: boolean;
        attackerblind: boolean;
        distance: number;
        userid_pawn: number;
        attacker_pawn: number;
        assister_pawn: number;
        dmg_health: number;
        dmg_armor: number;
        hitgroup: number;
        attackerinair: boolean;
    }) => void): void {
        this.On("player_death", callback);
    }

    static OnPlayerFootstep(callback: (data: { userid: number; userid_pawn: number }) => void): void {
        this.On("player_footstep", callback);
    }

    static OnPlayerHintmessage(callback: (data: { hintmessage: string }) => void): void {
        this.On("player_hintmessage", callback);
    }

    static OnPlayerSpawned(callback: (data: {
        userid: number;
        inrestart: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("player_spawned", callback);
    }

    static OnPlayerJump(callback: (data: { userid: number }) => void): void {
        this.On("player_jump", callback);
    }

    static OnPlayerBlind(callback: (data: {
        userid: number;
        attacker: number;
        entityid: number;
        blind_duration: number;
    }) => void): void {
        this.On("player_blind", callback);
    }

    static OnPlayerFalldamage(callback: (data: {
        userid: number;
        damage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("player_falldamage", callback);
    }

    static OnPlayerScore(callback: (data: {
        userid: number;
        kills: number;
        deaths: number;
        score: number;
    }) => void): void {
        this.On("player_score", callback);
    }

    static OnPlayerShoot(callback: (data: {
        userid: number;
        weapon: number;
        mode: number;
        userid_pawn: number;
    }) => void): void {
        this.On("player_shoot", callback);
    }

    static OnPlayerRadio(callback: (data: {
        splitscreenplayer: number;
        userid: number;
        slot: number;
        userid_pawn: number;
    }) => void): void {
        this.On("player_radio", callback);
    }

    static OnPlayerAvengedTeammate(callback: (data: {
        avenger_id: number;
        avenged_player_id: number;
    }) => void): void {
        this.On("player_avenged_teammate", callback);
    }

    static OnPlayerResetVote(callback: (data: { userid: number; vote: boolean }) => void): void {
        this.On("player_reset_vote", callback);
    }

    static OnPlayerGivenC4(callback: (data: { userid: number }) => void): void {
        this.On("player_given_c4", callback);
    }

    static OnPlayerPing(callback: (data: {
        splitscreenplayer: number;
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        urgent: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("player_ping", callback);
    }

    static OnPlayerPingStop(callback: (data: { entityid: number }) => void): void {
        this.On("player_ping_stop", callback);
    }

    static OnPlayerSound(callback: (data: {
        userid: number;
        radius: number;
        duration: number;
        step: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("player_sound", callback);
    }

    // Team Events
    static OnTeamplayBroadcastAudio(callback: (data: { team: number; sound: string }) => void): void {
        this.On("teamplay_broadcast_audio", callback);
    }

    static OnTeamInfo(callback: (data: { teamid: number; teamname: string }) => void): void {
        this.On("team_info", callback);
    }

    static OnTeamScore(callback: (data: { teamid: number; score: number }) => void): void {
        this.On("team_score", callback);
    }

    static OnTeamplayRoundStart(callback: (data: { full_reset: boolean }) => void): void {
        this.On("teamplay_round_start", callback);
    }

    static OnTeamIntroStart(callback: (data: {}) => void): void {
        this.On("team_intro_start", callback);
    }

    static OnTeamIntroEnd(callback: (data: {}) => void): void {
        this.On("team_intro_end", callback);
    }

    // Round Events
    static OnRoundStart(callback: (data: {
        timelimit: number;
        fraglimit: number;
        objective: string;
    }) => void): void {
        this.On("round_start", callback);
    }

    static OnRoundEnd(callback: (data: {
        winner: number;
        reason: number;
        message: string;
        legacy: number;
        player_count: number;
        nomusic: number;
    }) => void): void {
        this.On("round_end", callback);
    }

    static OnRoundStartPreEntity(callback: (data: {}) => void): void {
        this.On("round_start_pre_entity", callback);
    }

    static OnRoundStartPostNav(callback: (data: {}) => void): void {
        this.On("round_start_post_nav", callback);
    }

    static OnRoundFreezeEnd(callback: (data: {}) => void): void {
        this.On("round_freeze_end", callback);
    }

    static OnRoundPrestart(callback: (data: {}) => void): void {
        this.On("round_prestart", callback);
    }

    static OnRoundPoststart(callback: (data: {}) => void): void {
        this.On("round_poststart", callback);
    }

    static OnRoundAnnounceMatchPoint(callback: (data: {}) => void): void {
        this.On("round_announce_match_point", callback);
    }

    static OnRoundAnnounceFinal(callback: (data: {}) => void): void {
        this.On("round_announce_final", callback);
    }

    static OnRoundAnnounceLastRoundHalf(callback: (data: {}) => void): void {
        this.On("round_announce_last_round_half", callback);
    }

    static OnRoundAnnounceMatchStart(callback: (data: {}) => void): void {
        this.On("round_announce_match_start", callback);
    }

    static OnRoundAnnounceWarmup(callback: (data: {}) => void): void {
        this.On("round_announce_warmup", callback);
    }

    static OnRoundEndUploadStats(callback: (data: {}) => void): void {
        this.On("round_end_upload_stats", callback);
    }

    static OnRoundOfficiallyEnded(callback: (data: {}) => void): void {
        this.On("round_officially_ended", callback);
    }

    static OnRoundTimeWarning(callback: (data: {}) => void): void {
        this.On("round_time_warning", callback);
    }

    static OnRoundMvp(callback: (data: {
        userid: number;
        reason: number;
        value: number;
        musickitmvps: number;
        nomusic: number;
        musickitid: number;
    }) => void): void {
        this.On("round_mvp", callback);
    }

    // Game Events
    static OnGameInit(callback: (data: {}) => void): void {
        this.On("game_init", callback);
    }

    static OnGameStart(callback: (data: {
        roundslimit: number;
        timelimit: number;
        fraglimit: number;
        objective: string;
    }) => void): void {
        this.On("game_start", callback);
    }

    static OnGameEnd(callback: (data: { winner: number }) => void): void {
        this.On("game_end", callback);
    }

    static OnGameMessage(callback: (data: { target: number; text: string }) => void): void {
        this.On("game_message", callback);
    }

    static OnGameNewmap(callback: (data: { mapname: string }) => void): void {
        this.On("game_newmap", callback);
    }

    static OnGamePhaseChanged(callback: (data: { new_phase: number }) => void): void {
        this.On("game_phase_changed", callback);
    }

    // HLTV Events
    static OnHltvCameraman(callback: (data: { userid: number }) => void): void {
        this.On("hltv_cameraman", callback);
    }

    static OnHltvChase(callback: (data: {
        target1: number;
        target2: number;
        distance: number;
        theta: number;
        phi: number;
        inertia: number;
        ineye: number;
    }) => void): void {
        this.On("hltv_chase", callback);
    }

    static OnHltvRankCamera(callback: (data: {
        index: number;
        rank: number;
        target: number;
    }) => void): void {
        this.On("hltv_rank_camera", callback);
    }

    static OnHltvRankEntity(callback: (data: {
        userid: number;
        rank: number;
        target: number;
    }) => void): void {
        this.On("hltv_rank_entity", callback);
    }

    static OnHltvFixed(callback: (data: {
        posx: number;
        posy: number;
        posz: number;
        theta: number;
        phi: number;
        offset: number;
        fov: number;
        target: number;
    }) => void): void {
        this.On("hltv_fixed", callback);
    }

    static OnHltvMessage(callback: (data: { text: string }) => void): void {
        this.On("hltv_message", callback);
    }

    static OnHltvStatus(callback: (data: {
        clients: number;
        slots: number;
        proxies: number;
        master: string;
    }) => void): void {
        this.On("hltv_status", callback);
    }

    static OnHltvTitle(callback: (data: { text: string }) => void): void {
        this.On("hltv_title", callback);
    }

    static OnHltvChat(callback: (data: { text: string; steamID: string }) => void): void {
        this.On("hltv_chat", callback);
    }

    static OnHltvVersioninfo(callback: (data: { version: number }) => void): void {
        this.On("hltv_versioninfo", callback);
    }

    static OnHltvReplay(callback: (data: { delay: number; reason: number }) => void): void {
        this.On("hltv_replay", callback);
    }

    static OnHltvChangedMode(callback: (data: {
        oldmode: number;
        newmode: number;
        obs_target: number;
    }) => void): void {
        this.On("hltv_changed_mode", callback);
    }

    static OnHltvReplayStatus(callback: (data: { reason: number }) => void): void {
        this.On("hltv_replay_status", callback);
    }

    // Demo Events
    static OnDemoStart(callback: (data: {}) => void): void {
        this.On("demo_start", callback);
    }

    static OnDemoStop(callback: (data: {}) => void): void {
        this.On("demo_stop", callback);
    }

    static OnDemoSkip(callback: (data: {
        playback_tick: number;
        skipto_tick: number;
    }) => void): void {
        this.On("demo_skip", callback);
    }

    // Map Events
    static OnMapShutdown(callback: (data: {}) => void): void {
        this.On("map_shutdown", callback);
    }

    static OnMapTransition(callback: (data: {}) => void): void {
        this.On("map_transition", callback);
    }

    static OnHostnameChanged(callback: (data: { hostname: string }) => void): void {
        this.On("hostname_changed", callback);
    }

    static OnDifficultyChanged(callback: (data: {
        newDifficulty: number;
        oldDifficulty: number;
        strDifficulty: string;
    }) => void): void {
        this.On("difficulty_changed", callback);
    }

    // Weapon Events
    static OnWeaponFire(callback: (data: {
        userid: number;
        weapon: string;
        silenced: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_fire", callback);
    }

    static OnWeaponFireOnEmpty(callback: (data: {
        userid: number;
        weapon: string;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_fire_on_empty", callback);
    }

    static OnWeaponOutofammo(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_outofammo", callback);
    }

    static OnWeaponReload(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_reload", callback);
    }

    static OnWeaponZoom(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_zoom", callback);
    }

    static OnWeaponZoomRifle(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_zoom_rifle", callback);
    }

    // Grenade Events
    static OnGrenadeThrown(callback: (data: {
        userid: number;
        weapon: string;
        userid_pawn: number;
    }) => void): void {
        this.On("grenade_thrown", callback);
    }

    static OnGrenadeBounce(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("grenade_bounce", callback);
    }

    static OnHegrenadeDetonate(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hegrenade_detonate", callback);
    }

    static OnFlashbangDetonate(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("flashbang_detonate", callback);
    }

    static OnSmokegrenadeDetonate(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("smokegrenade_detonate", callback);
    }

    static OnSmokegrenadeExpired(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("smokegrenade_expired", callback);
    }

    static OnMolotovDetonate(callback: (data: {
        userid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("molotov_detonate", callback);
    }

    static OnDecoyDetonate(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("decoy_detonate", callback);
    }

    static OnDecoyStarted(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("decoy_started", callback);
    }

    static OnDecoyFiring(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("decoy_firing", callback);
    }

    static OnTagrenadeDetonate(callback: (data: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
    }) => void): void {
        this.On("tagrenade_detonate", callback);
    }

    // Inferno Events
    static OnInfernoStartburn(callback: (data: {
        entityid: number;
        x: number;
        y: number;
        z: number;
    }) => void): void {
        this.On("inferno_startburn", callback);
    }

    static OnInfernoExpire(callback: (data: {
        entityid: number;
        x: number;
        y: number;
        z: number;
    }) => void): void {
        this.On("inferno_expire", callback);
    }

    static OnInfernoExtinguish(callback: (data: {
        entityid: number;
        x: number;
        y: number;
        z: number;
    }) => void): void {
        this.On("inferno_extinguish", callback);
    }

    // Bomb Events
    static OnBombBeginplant(callback: (data: {
        userid: number;
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_beginplant", callback);
    }

    static OnBombAbortplant(callback: (data: {
        userid: number;
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_abortplant", callback);
    }

    static OnBombPlanted(callback: (data: {
        userid: number;
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_planted", callback);
    }

    static OnBombBegindefuse(callback: (data: {
        userid: number;
        haskit: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_begindefuse", callback);
    }

    static OnBombAbortdefuse(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_abortdefuse", callback);
    }

    static OnBombDefused(callback: (data: {
        userid: number;
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_defused", callback);
    }

    static OnBombExploded(callback: (data: {
        userid: number;
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_exploded", callback);
    }

    static OnBombDropped(callback: (data: {
        userid: number;
        entindex: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_dropped", callback);
    }

    static OnBombPickup(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_pickup", callback);
    }

    static OnBombBeep(callback: (data: { entindex: number }) => void): void {
        this.On("bomb_beep", callback);
    }

    // Defuser Events
    static OnDefuserDropped(callback: (data: { entityid: number }) => void): void {
        this.On("defuser_dropped", callback);
    }

    static OnDefuserPickup(callback: (data: {
        entityid: number;
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("defuser_pickup", callback);
    }

    // Hostage Events
    static OnHostageFollows(callback: (data: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_follows", callback);
    }

    static OnHostageHurt(callback: (data: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_hurt", callback);
    }

    static OnHostageKilled(callback: (data: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_killed", callback);
    }

    static OnHostageRescued(callback: (data: {
        userid: number;
        hostage: number;
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_rescued", callback);
    }

    static OnHostageStopsFollowing(callback: (data: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_stops_following", callback);
    }

    static OnHostageRescuedAll(callback: (data: {}) => void): void {
        this.On("hostage_rescued_all", callback);
    }

    static OnHostageCallForHelp(callback: (data: { hostage: number }) => void): void {
        this.On("hostage_call_for_help", callback);
    }

    // VIP Events
    static OnVipEscaped(callback: (data: { userid: number }) => void): void {
        this.On("vip_escaped", callback);
    }

    static OnVipKilled(callback: (data: {
        userid: number;
        attacker: number;
    }) => void): void {
        this.On("vip_killed", callback);
    }

    // Item Events
    static OnItemPurchase(callback: (data: {
        userid: number;
        team: number;
        loadout: number;
        weapon: string;
    }) => void): void {
        this.On("item_purchase", callback);
    }

    static OnItemPickup(callback: (data: {
        userid: number;
        item: string;
        silent: boolean;
        defindex: number;
    }) => void): void {
        this.On("item_pickup", callback);
    }

    static OnItemPickupSlerp(callback: (data: {
        userid: number;
        index: number;
        behavior: number;
    }) => void): void {
        this.On("item_pickup_slerp", callback);
    }

    static OnItemPickupFailed(callback: (data: {
        userid: number;
        item: string;
        reason: number;
        limit: number;
    }) => void): void {
        this.On("item_pickup_failed", callback);
    }

    static OnItemRemove(callback: (data: {
        userid: number;
        item: string;
        defindex: number;
    }) => void): void {
        this.On("item_remove", callback);
    }

    static OnItemEquip(callback: (data: {
        userid: number;
        item: string;
        defindex: number;
        canzoom: boolean;
        hassilencer: boolean;
        issilenced: boolean;
        hastracers: boolean;
        weptype: number;
        ispainted: boolean;
    }) => void): void {
        this.On("item_equip", callback);
    }

    static OnItemSchemaInitialized(callback: (data: {}) => void): void {
        this.On("item_schema_initialized", callback);
    }

    // Ammo Events
    static OnAmmoPickup(callback: (data: {
        userid: number;
        item: string;
        index: number;
    }) => void): void {
        this.On("ammo_pickup", callback);
    }

    static OnAmmoRefill(callback: (data: {
        userid: number;
        success: boolean;
    }) => void): void {
        this.On("ammo_refill", callback);
    }

    // Zone Events
    static OnEnterBuyzone(callback: (data: {
        userid: number;
        canbuy: boolean;
    }) => void): void {
        this.On("enter_buyzone", callback);
    }

    static OnExitBuyzone(callback: (data: {
        userid: number;
        canbuy: boolean;
    }) => void): void {
        this.On("exit_buyzone", callback);
    }

    static OnEnterBombzone(callback: (data: {
        userid: number;
        hasbomb: boolean;
        isplanted: boolean;
    }) => void): void {
        this.On("enter_bombzone", callback);
    }

    static OnExitBombzone(callback: (data: {
        userid: number;
        hasbomb: boolean;
        isplanted: boolean;
    }) => void): void {
        this.On("exit_bombzone", callback);
    }

    static OnEnterRescueZone(callback: (data: { userid: number }) => void): void {
        this.On("enter_rescue_zone", callback);
    }

    static OnExitRescueZone(callback: (data: { userid: number }) => void): void {
        this.On("exit_rescue_zone", callback);
    }

    static OnBuytimeEnded(callback: (data: {}) => void): void {
        this.On("buytime_ended", callback);
    }

    // Silencer Events
    static OnSilencerOff(callback: (data: { userid: number }) => void): void {
        this.On("silencer_off", callback);
    }

    static OnSilencerOn(callback: (data: { userid: number }) => void): void {
        this.On("silencer_on", callback);
    }

    static OnSilencerDetach(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("silencer_detach", callback);
    }

    // Buy Menu Events
    static OnBuymenuOpen(callback: (data: { userid: number }) => void): void {
        this.On("buymenu_open", callback);
    }

    static OnBuymenuClose(callback: (data: { userid: number }) => void): void {
        this.On("buymenu_close", callback);
    }

    // Inspect Events
    static OnInspectWeapon(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("inspect_weapon", callback);
    }

    // Other Combat Events
    static OnOtherDeath(callback: (data: {
        otherid: number;
        othertype: string;
        attacker: number;
        weapon: string;
        weapon_itemid: string;
        weapon_fauxitemid: string;
        weapon_originalowner_xuid: string;
        headshot: boolean;
        penetrated: number;
        noscope: boolean;
        thrusmoke: boolean;
        attackerblind: boolean;
    }) => void): void {
        this.On("other_death", callback);
    }

    static OnBulletImpact(callback: (data: {
        userid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bullet_impact", callback);
    }

    static OnBulletFlightResolution(callback: (data: {
        userid: number;
        userid_pawn: number;
        pos_x: number;
        pos_y: number;
        pos_z: number;
        ang_x: number;
        ang_y: number;
        ang_z: number;
        start_x: number;
        start_y: number;
        start_z: number;
    }) => void): void {
        this.On("bullet_flight_resolution", callback);
    }

    // Door Events
    static OnDoorClose(callback: (data: {
        userid: number;
        checkpoint: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("door_close", callback);
    }

    static OnDoorMoving(callback: (data: {
        userid: number;
        entindex: number;
        userid_pawn: number;
    }) => void): void {
        this.On("door_moving", callback);
    }

    static OnDoorBreak(callback: (data: {
        entindex: number;
        dmgstate: number;
    }) => void): void {
        this.On("door_break", callback);
    }

    static OnDoorClosed(callback: (data: {
        userid_pawn: number;
        entindex: number;
    }) => void): void {
        this.On("door_closed", callback);
    }

    static OnDoorOpen(callback: (data: {
        userid_pawn: number;
        entindex: number;
    }) => void): void {
        this.On("door_open", callback);
    }

    // Break Events
    static OnBreakBreakable(callback: (data: {
        entindex: number;
        userid: number;
        material: number;
        userid_pawn: number;
    }) => void): void {
        this.On("break_breakable", callback);
    }

    static OnBreakProp(callback: (data: {
        entindex: number;
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("break_prop", callback);
    }

    static OnBrokenBreakable(callback: (data: {
        entindex: number;
        userid: number;
        material: number;
        userid_pawn: number;
    }) => void): void {
        this.On("broken_breakable", callback);
    }

    // Entity Events
    static OnEntityKilled(callback: (data: {
        entindex_killed: number;
        entindex_attacker: number;
        entindex_inflictor: number;
        damagebits: number;
    }) => void): void {
        this.On("entity_killed", callback);
    }

    static OnEntityVisible(callback: (data: {
        userid: number;
        subject: number;
        classname: string;
        entityname: string;
    }) => void): void {
        this.On("entity_visible", callback);
    }

    // Vote Events
    static OnVoteStarted(callback: (data: {
        issue: string;
        param1: string;
        team: number;
        initiator: number;
    }) => void): void {
        this.On("vote_started", callback);
    }

    static OnVoteFailed(callback: (data: { team: number }) => void): void {
        this.On("vote_failed", callback);
    }

    static OnVotePassed(callback: (data: {
        details: string;
        param1: string;
        team: number;
    }) => void): void {
        this.On("vote_passed", callback);
    }

    static OnVoteChanged(callback: (data: {
        vote_option1: number;
        vote_option2: number;
        vote_option3: number;
        vote_option4: number;
        vote_option5: number;
        potentialVotes: number;
    }) => void): void {
        this.On("vote_changed", callback);
    }

    static OnVoteCastYes(callback: (data: {
        team: number;
        entityid: number;
    }) => void): void {
        this.On("vote_cast_yes", callback);
    }

    static OnVoteCastNo(callback: (data: {
        team: number;
        entityid: number;
    }) => void): void {
        this.On("vote_cast_no", callback);
    }

    static OnVoteCast(callback: (data: {
        vote_option: number;
        team: number;
        userid: number;
    }) => void): void {
        this.On("vote_cast", callback);
    }

    static OnVoteEnded(callback: (data: {}) => void): void {
        this.On("vote_ended", callback);
    }

    static OnVoteOptions(callback: (data: {
        count: number;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        option5: string;
    }) => void): void {
        this.On("vote_options", callback);
    }

    static OnStartVote(callback: (data: {
        userid: number;
        type: number;
        vote_parameter: number;
    }) => void): void {
        this.On("start_vote", callback);
    }

    static OnEnableRestartVoting(callback: (data: { enable: boolean }) => void): void {
        this.On("enable_restart_voting", callback);
    }

    // Achievement Events
    static OnAchievementEvent(callback: (data: {
        achievement_name: string;
        cur_val: number;
        max_val: number;
    }) => void): void {
        this.On("achievement_event", callback);
    }

    static OnAchievementEarned(callback: (data: {
        player: number;
        achievement: number;
    }) => void): void {
        this.On("achievement_earned", callback);
    }

    static OnAchievementEarnedLocal(callback: (data: {
        achievement: number;
        splitscreenplayer: number;
    }) => void): void {
        this.On("achievement_earned_local", callback);
    }

    static OnAchievementWriteFailed(callback: (data: {}) => void): void {
        this.On("achievement_write_failed", callback);
    }

    static OnAchievementInfoLoaded(callback: (data: {}) => void): void {
        this.On("achievement_info_loaded", callback);
    }

    // Bonus Events
    static OnBonusUpdated(callback: (data: {
        numadvanced: number;
        numbronze: number;
        numsilver: number;
        numgold: number;
    }) => void): void {
        this.On("bonus_updated", callback);
    }

    // Spectator Events
    static OnSpecTargetUpdated(callback: (data: {
        userid: number;
        target: number;
        userid_pawn: number;
    }) => void): void {
        this.On("spec_target_updated", callback);
    }

    static OnSpecModeUpdated(callback: (data: { userid: number }) => void): void {
        this.On("spec_mode_updated", callback);
    }

    // Game Instructor Events
    static OnGameinstructorDraw(callback: (data: {}) => void): void {
        this.On("gameinstructor_draw", callback);
    }

    static OnGameinstructorNodraw(callback: (data: {}) => void): void {
        this.On("gameinstructor_nodraw", callback);
    }

    static OnInstructorStartLesson(callback: (data: {
        userid: number;
        hint_name: string;
        hint_target: number;
        vr_movement_type: number;
        vr_single_controller: boolean;
        vr_controller_type: number;
    }) => void): void {
        this.On("instructor_start_lesson", callback);
    }

    static OnInstructorCloseLesson(callback: (data: {
        userid: number;
        hint_name: string;
    }) => void): void {
        this.On("instructor_close_lesson", callback);
    }

    static OnInstructorServerHintCreate(callback: (data: {
        userid: number;
        hint_name: string;
        hint_replace_key: string;
        hint_target: number;
        hint_activator_userid: number;
        hint_timeout: number;
        hint_icon_onscreen: string;
        hint_icon_offscreen: string;
        hint_caption: string;
        hint_activator_caption: string;
        hint_color: string;
        hint_icon_offset: number;
        hint_range: number;
        hint_flags: number;
        hint_binding: string;
        hint_gamepad_binding: string;
        hint_allow_nodraw_target: boolean;
        hint_nooffscreen: boolean;
        hint_forcecaption: boolean;
        hint_local_player_only: boolean;
    }) => void): void {
        this.On("instructor_server_hint_create", callback);
    }

    static OnInstructorServerHintStop(callback: (data: { hint_name: string }) => void): void {
        this.On("instructor_server_hint_stop", callback);
    }

    static OnClientsideLessonClosed(callback: (data: { lesson_name: string }) => void): void {
        this.On("clientside_lesson_closed", callback);
    }

    static OnSetInstructorGroupEnabled(callback: (data: {
        group: string;
        enabled: number;
    }) => void): void {
        this.On("set_instructor_group_enabled", callback);
    }

    // Misc Events
    static OnPhysgunPickup(callback: (data: { target: number }) => void): void {
        this.On("physgun_pickup", callback);
    }

    static OnFlareIgniteNpc(callback: (data: { entindex: number }) => void): void {
        this.On("flare_ignite_npc", callback);
    }

    static OnHelicopterGrenadePuntMiss(callback: (data: {}) => void): void {
        this.On("helicopter_grenade_punt_miss", callback);
    }

    // Finale Events
    static OnFinaleStart(callback: (data: { rushes: number }) => void): void {
        this.On("finale_start", callback);
    }

    // User Data Events
    static OnUserDataDownloaded(callback: (data: {}) => void): void {
        this.On("user_data_downloaded", callback);
    }

    static OnReadGameTitledata(callback: (data: { controllerId: number }) => void): void {
        this.On("read_game_titledata", callback);
    }

    static OnWriteGameTitledata(callback: (data: { controllerId: number }) => void): void {
        this.On("write_game_titledata", callback);
    }

    static OnResetGameTitledata(callback: (data: { controllerId: number }) => void): void {
        this.On("reset_game_titledata", callback);
    }

    static OnWriteProfileData(callback: (data: {}) => void): void {
        this.On("write_profile_data", callback);
    }

    // Ragdoll Events
    static OnRagdollDissolved(callback: (data: { entindex: number }) => void): void {
        this.On("ragdoll_dissolved", callback);
    }

    // Inventory Events
    static OnInventoryUpdated(callback: (data: {}) => void): void {
        this.On("inventory_updated", callback);
    }

    static OnCartUpdated(callback: (data: {}) => void): void {
        this.On("cart_updated", callback);
    }

    static OnStorePricesheetUpdated(callback: (data: {}) => void): void {
        this.On("store_pricesheet_updated", callback);
    }

    static OnDropRateModified(callback: (data: {}) => void): void {
        this.On("drop_rate_modified", callback);
    }

    static OnEventTicketModified(callback: (data: {}) => void): void {
        this.On("event_ticket_modified", callback);
    }

    // GC Events
    static OnGcConnected(callback: (data: {}) => void): void {
        this.On("gc_connected", callback);
    }

    // Shadow Events
    static OnDynamicShadowLightChanged(callback: (data: {}) => void): void {
        this.On("dynamic_shadow_light_changed", callback);
    }

    // UI Events
    static OnGameuiHidden(callback: (data: {}) => void): void {
        this.On("gameui_hidden", callback);
    }

    // Gift Events
    static OnItemsGifted(callback: (data: {
        player: number;
        itemdef: number;
        numgifts: number;
        giftidx: number;
        accountid: number;
    }) => void): void {
        this.On("items_gifted", callback);
    }

    // Warmup Events
    static OnWarmupEnd(callback: (data: {}) => void): void {
        this.On("warmup_end", callback);
    }

    // CS Specific Events
    static OnAnnouncePhaseEnd(callback: (data: {}) => void): void {
        this.On("announce_phase_end", callback);
    }

    static OnCsIntermission(callback: (data: {}) => void): void {
        this.On("cs_intermission", callback);
    }

    static OnCsGameDisconnected(callback: (data: {}) => void): void {
        this.On("cs_game_disconnected", callback);
    }

    static OnCsRoundFinalBeep(callback: (data: {}) => void): void {
        this.On("cs_round_final_beep", callback);
    }

    static OnCsRoundStartBeep(callback: (data: {}) => void): void {
        this.On("cs_round_start_beep", callback);
    }

    static OnCsWinPanelRound(callback: (data: {
        show_timer_defend: boolean;
        show_timer_attack: boolean;
        timer_time: number;
        final_event: number;
        funfact_token: string;
        funfact_player: number;
        funfact_data1: number;
        funfact_data2: number;
        funfact_data3: number;
    }) => void): void {
        this.On("cs_win_panel_round", callback);
    }

    static OnCsWinPanelMatch(callback: (data: {}) => void): void {
        this.On("cs_win_panel_match", callback);
    }

    static OnCsMatchEndRestart(callback: (data: {}) => void): void {
        this.On("cs_match_end_restart", callback);
    }

    static OnCsPreRestart(callback: (data: {}) => void): void {
        this.On("cs_pre_restart", callback);
    }

    static OnCsPrevNextSpectator(callback: (data: { next: boolean }) => void): void {
        this.On("cs_prev_next_spectator", callback);
    }

    // Death Panel Events
    static OnShowDeathpanel(callback: (data: {
        victim: number;
        killer: number;
        killer_controller: number;
        hits_taken: number;
        damage_taken: number;
        hits_given: number;
        damage_given: number;
        victim_pawn: number;
    }) => void): void {
        this.On("show_deathpanel", callback);
    }

    static OnHideDeathpanel(callback: (data: {}) => void): void {
        this.On("hide_deathpanel", callback);
    }

    // UGC Events
    static OnUgcMapInfoReceived(callback: (data: { published_file_id: string }) => void): void {
        this.On("ugc_map_info_received", callback);
    }

    static OnUgcMapUnsubscribed(callback: (data: { published_file_id: string }) => void): void {
        this.On("ugc_map_unsubscribed", callback);
    }

    static OnUgcMapDownloadError(callback: (data: {
        published_file_id: string;
        error_code: number;
    }) => void): void {
        this.On("ugc_map_download_error", callback);
    }

    static OnUgcFileDownloadFinished(callback: (data: { hcontent: string }) => void): void {
        this.On("ugc_file_download_finished", callback);
    }

    static OnUgcFileDownloadStart(callback: (data: {
        hcontent: string;
        published_file_id: string;
    }) => void): void {
        this.On("ugc_file_download_start", callback);
    }

    // Match Events
    static OnBeginNewMatch(callback: (data: {}) => void): void {
        this.On("begin_new_match", callback);
    }

    static OnMatchEndConditions(callback: (data: {
        frags: number;
        max_rounds: number;
        win_rounds: number;
        time: number;
    }) => void): void {
        this.On("match_end_conditions", callback);
    }

    static OnEndmatchMapvoteSelectingMap(callback: (data: {
        count: number;
        slot1: number;
        slot2: number;
        slot3: number;
        slot4: number;
        slot5: number;
        slot6: number;
        slot7: number;
        slot8: number;
        slot9: number;
        slot10: number;
    }) => void): void {
        this.On("endmatch_mapvote_selecting_map", callback);
    }

    static OnEndmatchCmmStartRevealItems(callback: (data: {}) => void): void {
        this.On("endmatch_cmm_start_reveal_items", callback);
    }

    static OnNextlevelChanged(callback: (data: {
        nextlevel: string;
        mapgroup: string;
        skirmishmode: string;
    }) => void): void {
        this.On("nextlevel_changed", callback);
    }

    // Deathmatch Events
    static OnDmBonusWeaponStart(callback: (data: {
        time: number;
        Pos: number;
    }) => void): void {
        this.On("dm_bonus_weapon_start", callback);
    }

    // Gun Game Events
    static OnGgKilledEnemy(callback: (data: {
        victimid: number;
        attackerid: number;
        dominated: number;
        revenge: number;
        bonus: boolean;
    }) => void): void {
        this.On("gg_killed_enemy", callback);
    }

    // Team Switch Events
    static OnSwitchTeam(callback: (data: {
        numPlayers: number;
        numSpectators: number;
        avg_rank: number;
        numTSlotsFree: number;
        numCTSlotsFree: number;
    }) => void): void {
        this.On("switch_team", callback);
    }

    // Trial Events
    static OnTrialTimeExpired(callback: (data: { userid: number }) => void): void {
        this.On("trial_time_expired", callback);
    }

    // Matchmaking Events
    static OnUpdateMatchmakingStats(callback: (data: {}) => void): void {
        this.On("update_matchmaking_stats", callback);
    }

    // Client Events
    static OnClientDisconnect(callback: (data: {}) => void): void {
        this.On("client_disconnect", callback);
    }

    static OnClientLoadoutChanged(callback: (data: {}) => void): void {
        this.On("client_loadout_changed", callback);
    }

    // Sonar Events
    static OnAddPlayerSonarIcon(callback: (data: {
        userid: number;
        pos_x: number;
        pos_y: number;
        pos_z: number;
    }) => void): void {
        this.On("add_player_sonar_icon", callback);
    }

    static OnAddBulletHitMarker(callback: (data: {
        userid: number;
        bone: number;
        pos_x: number;
        pos_y: number;
        pos_z: number;
        ang_x: number;
        ang_y: number;
        ang_z: number;
        start_x: number;
        start_y: number;
        start_z: number;
        hit: boolean;
    }) => void): void {
        this.On("add_bullet_hit_marker", callback);
    }

    // SFUI Events
    static OnSfuievent(callback: (data: {
        action: string;
        data: string;
        slot: number;
    }) => void): void {
        this.On("sfuievent", callback);
    }

    // Weapon HUD Events
    static OnWeaponhudSelection(callback: (data: {
        userid: number;
        mode: number;
        entindex: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weaponhud_selection", callback);
    }

    // Training Events
    static OnTrPlayerFlashbanged(callback: (data: { userid: number }) => void): void {
        this.On("tr_player_flashbanged", callback);
    }

    static OnTrMarkComplete(callback: (data: { complete: number }) => void): void {
        this.On("tr_mark_complete", callback);
    }

    static OnTrMarkBestTime(callback: (data: { time: number }) => void): void {
        this.On("tr_mark_best_time", callback);
    }

    static OnTrExitHintTrigger(callback: (data: {}) => void): void {
        this.On("tr_exit_hint_trigger", callback);
    }

    static OnTrShowFinishMsgbox(callback: (data: {}) => void): void {
        this.On("tr_show_finish_msgbox", callback);
    }

    static OnTrShowExitMsgbox(callback: (data: {}) => void): void {
        this.On("tr_show_exit_msgbox", callback);
    }

    // Bot Events
    static OnBotTakeover(callback: (data: {
        userid: number;
        botid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bot_takeover", callback);
    }

    // Team Join Events
    static OnJointeamFailed(callback: (data: {
        userid: number;
        reason: number;
    }) => void): void {
        this.On("jointeam_failed", callback);
    }

    static OnTeamchangePending(callback: (data: {
        userid: number;
        toteam: number;
    }) => void): void {
        this.On("teamchange_pending", callback);
    }

    // Material Events
    static OnMaterialDefaultComplete(callback: (data: {}) => void): void {
        this.On("material_default_complete", callback);
    }

    // Season Events
    static OnSeasoncoinLevelup(callback: (data: {
        userid: number;
        category: number;
        rank: number;
    }) => void): void {
        this.On("seasoncoin_levelup", callback);
    }

    static OnTournamentReward(callback: (data: {
        defindex: number;
        totalrewards: number;
        accountid: number;
    }) => void): void {
        this.On("tournament_reward", callback);
    }

    static OnStartHalftime(callback: (data: {}) => void): void {
        this.On("start_halftime", callback);
    }

    // Decal Events
    static OnPlayerDecal(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("player_decal", callback);
    }

    // Survival Events
    static OnSurvivalTeammateRespawn(callback: (data: { userid: number }) => void): void {
        this.On("survival_teammate_respawn", callback);
    }

    static OnSurvivalNoRespawnsWarning(callback: (data: { userid: number }) => void): void {
        this.On("survival_no_respawns_warning", callback);
    }

    static OnSurvivalNoRespawnsFinal(callback: (data: { userid: number }) => void): void {
        this.On("survival_no_respawns_final", callback);
    }

    static OnShowSurvivalRespawnStatus(callback: (data: {
        loc_token: string;
        duration: number;
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("show_survival_respawn_status", callback);
    }

    // Guardian Events
    static OnGuardianWaveRestart(callback: (data: {}) => void): void {
        this.On("guardian_wave_restart", callback);
    }

    // Navigation Events
    static OnNavBlocked(callback: (data: {
        area: number;
        blocked: boolean;
    }) => void): void {
        this.On("nav_blocked", callback);
    }

    static OnNavGenerate(callback: (data: {}) => void): void {
        this.On("nav_generate", callback);
    }

    // Xbox Events
    static OnRepostXboxAchievements(callback: (data: { splitscreenplayer: number }) => void): void {
        this.On("repost_xbox_achievements", callback);
    }

    static OnMbInputLockSuccess(callback: (data: {}) => void): void {
        this.On("mb_input_lock_success", callback);
    }

    static OnMbInputLockCancel(callback: (data: {}) => void): void {
        this.On("mb_input_lock_cancel", callback);
    }
}

// usage example:
EventListeners.RegisterAll();

EventListeners.OnPlayerHurt((data) => {
    CSS.Msg(`player ${CSS.GetPlayerController(data.userid)?.GetPlayerName()} was hit by ${CSS.GetPlayerController(data.attacker)?.GetPlayerName()} for -${data.dmg_health} HP and -${data.dmg_armor} amor`);
});
