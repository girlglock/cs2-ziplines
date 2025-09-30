// to be used with https://github.com/Source2ZE/cs_script_boilerplate
//
// requires the maps/prefabs/eventlisteners.vmap prefab
// (if not worky paste the ents into main map since hammer likes to alter the targetnames inside prefabs)
//
// see scripts/ts/game_events_test.ts for examples

import { Instance as css } from "cs_script/point_script";

export class EventListeners {
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


    /**
     * @comment send once a server starts
     */
    static OnServerSpawn(callback: (data: {
        /** @comment public host name */
        hostname: string;
        /** @comment hostame, IP or DNS name */
        address: string;
        /** @comment server port */
        port: number;
        /** @comment game dir */
        game: string;
        /** @comment map name */
        mapname: string;
        /** @comment addon name */
        addonname: string;
        /** @comment max players */
        maxplayers: number;
        /** @comment WIN32, LINUX */
        os: string;
        /** @comment true if dedicated server */
        dedicated: boolean;
        /** @comment true if password protected */
        password: boolean;
    }) => void): void {
        this.On("server_spawn", callback);
    }

    /**
     * @comment server is about to be shut down
     */
    static OnServerPreShutdown(callback: (data: {
        /** @comment reason why server is about to be shut down */
        reason: string
    }) => void): void {
        this.On("server_pre_shutdown", callback);
    }

    /**
     * @comment server shut down
     */
    static OnServerShutdown(callback: (data: {
        /** @comment reason why server was shut down */
        reason: string
    }) => void): void {
        this.On("server_shutdown", callback);
    }

    /**
     * @comment a generic server message
     */
    static OnServerMessage(callback: (data: {
        /** @comment the message text */
        text: string
    }) => void): void {
        this.On("server_message", callback);
    }

    /**
     * @comment a server console var has changed
     */
    static OnServerCvar(callback: (data: {
        /** @comment cvar name, eg "mp_roundtime" */
        cvarname: string;
        /** @comment new cvar value */
        cvarvalue: string
    }) => void): void {
        this.On("server_cvar", callback);
    }


    static OnPlayerActivate(callback: (data: {
        /** @comment user ID on server */
        userid: number
    }) => void): void {
        this.On("player_activate", callback);
    }

    /**
     * @comment player has sent final message in the connection sequence
     */
    static OnPlayerConnectFull(callback: (data: {
        /** @comment user ID on server (unique on server) */
        userid: number
    }) => void): void {
        this.On("player_connect_full", callback);
    }

    static OnPlayerFullUpdate(callback: (data: {
        /** @comment user ID on server */
        userid: number;
        /** @comment Number of this full update */
        count: number
    }) => void): void {
        this.On("player_full_update", callback);
    }

    /**
     * @comment a new client connected
     */
    static OnPlayerConnect(callback: (data: {
        /** @comment player name */
        name: string;
        /** @comment user ID on server (unique on server) */
        userid: number;
        /** @comment player network (i.e steam) id */
        networkid: string;
        /** @comment steam id */
        xuid: string;
        /** @comment ip:port */
        address: string;
        bot: boolean;
    }) => void): void {
        this.On("player_connect", callback);
    }

    /**
     * @comment a client was disconnected
     */
    static OnPlayerDisconnect(callback: (data: {
        /** @comment user ID on server */
        userid: number;
        /** @comment see networkdisconnect enum protobuf */
        reason: number;
        /** @comment player name */
        name: string;
        /** @comment player network (i.e steam) id */
        networkid: string;
        /** @comment steam id */
        xuid: string;
        PlayerID: number;
    }) => void): void {
        this.On("player_disconnect", callback);
    }

    /**
     * @comment a player changed his name
     */
    static OnPlayerInfo(callback: (data: {
        /** @comment player name */
        name: string;
        /** @comment user ID on server (unique on server) */
        userid: number;
        /** @comment player network (i.e steam) id */
        steamid: string;
        /** @comment true if player is a AI bot */
        bot: boolean;
    }) => void): void {
        this.On("player_info", callback);
    }

    /**
     * @comment player spawned in game
     */
    static OnPlayerSpawn(callback: (data: {
        userid: number;
        userid_pawn: number
    }) => void): void {
        this.On("player_spawn", callback);
    }

    /**
     * @comment player change his team. You can receive this on the client before the local player has updated the team field locally
     */
    static OnPlayerTeam(callback: (data: {
        /** @comment player */
        userid: number;
        /** @comment team id */
        team: number;
        /** @comment old team id */
        oldteam: number;
        /** @comment team change because player disconnects */
        disconnect: boolean;
        silent: boolean;
        /** @comment true if player is a bot */
        isbot: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("player_team", callback);
    }

    /**
     * @comment sent only on the client for the local player - happens only after a local players pawn team variable has been updated
     */
    static OnLocalPlayerTeam(callback: (data: {}) => void): void {
        this.On("local_player_team", callback);
    }

    /**
     * @comment sent only on the client for the local player - happens only after the local players controller team variable has been updated
     */
    static OnLocalPlayerControllerTeam(callback: (data: {}) => void): void {
        this.On("local_player_controller_team", callback);
    }

    static OnPlayerChangename(callback: (data: {
        /** @comment user ID on server */
        userid: number;
        /** @comment players old (current) name */
        oldname: string;
        /** @comment players new name */
        newname: string;
    }) => void): void {
        this.On("player_changename", callback);
    }

    static OnPlayerHurt(callback: (data: {
        /** @comment player index who was hurt */
        userid: number;
        /** @comment player index who attacked */
        attacker: number;
        /** @comment remaining health points */
        health: number;
        /** @comment remaining armor points */
        armor: number;
        /** @comment weapon name attacker used, if not the world */
        weapon: string;
        /** @comment damage done to health */
        dmg_health: number;
        /** @comment damage done to armor */
        dmg_armor: number;
        /** @comment hitgroup that was damaged */
        hitgroup: number;
        userid_pawn: number;
        attacker_pawn: number;
    }) => void): void {
        this.On("player_hurt", callback);
    }

    /**
     * @comment a public player chat
     */
    static OnPlayerChat(callback: (data: {
        /** @comment true if team only chat */
        teamonly: boolean;
        /** @comment chatting player */
        userid: number;
        /** @comment chat text */
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

    /**
     * @comment a game event, name may be 32 characters long
     */
    static OnPlayerDeath(callback: (data: {
        /** @comment user who died */
        userid: number;
        /** @comment player who killed */
        attacker: number;
        /** @comment player who assisted in the kill */
        assister: number;
        /** @comment assister helped with a flash */
        assistedflash: boolean;
        /** @comment weapon name killer used */
        weapon: string;
        /** @comment inventory item id of weapon killer used */
        weapon_itemid: string;
        /** @comment faux item id of weapon killer used */
        weapon_fauxitemid: string;
        weapon_originalowner_xuid: string;
        /** @comment singals a headshot */
        headshot: boolean;
        /** @comment did killer dominate victim with this kill */
        dominated: number;
        /** @comment did killer get revenge on victim with this kill */
        revenge: number;
        /** @comment is the kill resulting in squad wipe */
        wipe: number;
        /** @comment number of objects shot penetrated before killing target */
        penetrated: number;
        /** @comment if replay data is unavailable, this will be present and set to false */
        noreplay: boolean;
        /** @comment kill happened without a scope, used for death notice icon */
        noscope: boolean;
        /** @comment hitscan weapon went through smoke grenade */
        thrusmoke: boolean;
        /** @comment attacker was blind from flashbang */
        attackerblind: boolean;
        /** @comment distance to victim in meters */
        distance: number;
        userid_pawn: number;
        attacker_pawn: number;
        assister_pawn: number;
        /** @comment damage done to health */
        dmg_health: number;
        /** @comment damage done to armor */
        dmg_armor: number;
        /** @comment hitgroup that was damaged */
        hitgroup: number;
        /** @comment attacker was in midair */
        attackerinair: boolean;
    }) => void): void {
        this.On("player_death", callback);
    }

    static OnPlayerFootstep(callback: (data: {
        userid: number;
        userid_pawn: number
    }) => void): void {
        this.On("player_footstep", callback);
    }

    static OnPlayerHintmessage(callback: (data: {
        /** @comment localizable string of a hint */
        hintmessage: string
    }) => void): void {
        this.On("player_hintmessage", callback);
    }

    static OnPlayerSpawned(callback: (data: {
        userid: number;
        /** @comment true if restart is pending */
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
        /** @comment user ID who threw the flash */
        attacker: number;
        /** @comment the flashbang going off */
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

    /**
     * @comment players scores changed
     */
    static OnPlayerScore(callback: (data: {
        /** @comment user ID on server */
        userid: number;
        /** @comment # of kills */
        kills: number;
        /** @comment # of deaths */
        deaths: number;
        /** @comment total game score */
        score: number;
    }) => void): void {
        this.On("player_score", callback);
    }

    /**
     * @comment player shoot his weapon
     */
    static OnPlayerShoot(callback: (data: {
        /** @comment user ID on server */
        userid: number;
        /** @comment weapon ID */
        weapon: number;
        /** @comment weapon mode */
        mode: number;
        userid_pawn: number;
    }) => void): void {
        this.On("player_shoot", callback);
    }

    static OnPlayerRadio(callback: (data: {
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

    static OnPlayerGivenC4(callback: (data: {
        /** @comment user ID who received the c4 */
        userid: number
    }) => void): void {
        this.On("player_given_c4", callback);
    }

    static OnPlayerPing(callback: (data: {
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


    /**
     * @comment emits a sound to everyone on a team
     */
    static OnTeamplayBroadcastAudio(callback: (data: {
        /** @comment unique team id */
        team: number;
        /** @comment name of the sound to emit */
        sound: string
    }) => void): void {
        this.On("teamplay_broadcast_audio", callback);
    }

    /**
     * @comment info about team
     */
    static OnTeamInfo(callback: (data: {
        /** @comment unique team id */
        teamid: number;
        /** @comment team name eg "Team Blue" */
        teamname: string
    }) => void): void {
        this.On("team_info", callback);
    }

    /**
     * @comment team score changed
     */
    static OnTeamScore(callback: (data: {
        /** @comment team id */
        teamid: number;
        /** @comment total team score */
        score: number
    }) => void): void {
        this.On("team_score", callback);
    }

    /**
     * @comment round restart
     */
    static OnTeamplayRoundStart(callback: (data: {
        /** @comment is this a full reset of the map */
        full_reset: boolean
    }) => void): void {
        this.On("teamplay_round_start", callback);
    }

    static OnTeamIntroStart(callback: (data: {}) => void): void {
        this.On("team_intro_start", callback);
    }

    static OnTeamIntroEnd(callback: (data: {}) => void): void {
        this.On("team_intro_end", callback);
    }


    static OnRoundStart(callback: (data: {
        /** @comment round time limit in seconds */
        timelimit: number;
        /** @comment frag limit in seconds */
        fraglimit: number;
        /** @comment round objective */
        objective: string;
    }) => void): void {
        this.On("round_start", callback);
    }

    static OnRoundEnd(callback: (data: {
        /** @comment winner team/user i */
        winner: number;
        /** @comment reson why team won */
        reason: number;
        /** @comment end round message */
        message: string;
        /** @comment server-generated legacy value */
        legacy: number;
        /** @comment total number of players alive at the end of round, used for statistics gathering, computed on the server in the event client is in replay when receiving this message */
        player_count: number;
        /** @comment if set, don't play round end music, because action is still on-going */
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

    /**
     * @comment sent before all other round restart actions
     */
    static OnRoundPrestart(callback: (data: {}) => void): void {
        this.On("round_prestart", callback);
    }

    /**
     * @comment sent after all other round restart actions
     */
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


    /**
     * @comment sent when a new game is started
     */
    static OnGameInit(callback: (data: {}) => void): void {
        this.On("game_init", callback);
    }

    /**
     * @comment a new game starts
     */
    static OnGameStart(callback: (data: {
        /** @comment max round */
        roundslimit: number;
        /** @comment time limit */
        timelimit: number;
        /** @comment frag limit */
        fraglimit: number;
        /** @comment round objective */
        objective: string;
    }) => void): void {
        this.On("game_start", callback);
    }

    /**
     * @comment a game ended
     */
    static OnGameEnd(callback: (data: {
        /** @comment winner team/user id */
        winner: number
    }) => void): void {
        this.On("game_end", callback);
    }

    /**
     * @comment a message send by game logic to everyone
     */
    static OnGameMessage(callback: (data: {
        /** @comment 0 = console, 1 = HUD */
        target: number;
        /** @comment the message text */
        text: string
    }) => void): void {
        this.On("game_message", callback);
    }

    /**
     * @comment send when new map is completely loaded
     */
    static OnGameNewmap(callback: (data: {
        /** @comment map name */
        mapname: string
    }) => void): void {
        this.On("game_newmap", callback);
    }

    static OnGamePhaseChanged(callback: (data: { new_phase: number }) => void): void {
        this.On("game_phase_changed", callback);
    }


    /**
     * @comment a spectator/player is a cameraman
     */
    static OnHltvCameraman(callback: (data: {
        /** @comment camera man entity index */
        userid: number
    }) => void): void {
        this.On("hltv_cameraman", callback);
    }

    /**
     * @comment shot of a single entity
     */
    static OnHltvChase(callback: (data: {
        /** @comment primary traget index */
        target1: number;
        /** @comment secondary traget index or 0 */
        target2: number;
        /** @comment camera distance */
        distance: number;
        /** @comment view angle horizontal */
        theta: number;
        /** @comment view angle vertical */
        phi: number;
        /** @comment camera inertia */
        inertia: number;
        /** @comment diretcor suggests to show ineye */
        ineye: number;
    }) => void): void {
        this.On("hltv_chase", callback);
    }

    /**
     * @comment a camera ranking
     */
    static OnHltvRankCamera(callback: (data: {
        /** @comment fixed camera index */
        index: number;
        /** @comment ranking, how interesting is this camera view */
        rank: number;
        /** @comment best/closest target entity */
        target: number;
    }) => void): void {
        this.On("hltv_rank_camera", callback);
    }

    /**
     * @comment an entity ranking
     */
    static OnHltvRankEntity(callback: (data: {
        /** @comment player slot */
        userid: number;
        /** @comment ranking, how interesting is this entity to view */
        rank: number;
        /** @comment best/closest target entity */
        target: number;
    }) => void): void {
        this.On("hltv_rank_entity", callback);
    }

    /**
     * @comment show from fixed view
     */
    static OnHltvFixed(callback: (data: {
        /** @comment camera position in world */
        posx: number;
        posy: number;
        posz: number;
        /** @comment camera angles */
        theta: number;
        phi: number;
        offset: number;
        fov: number;
        /** @comment follow this player */
        target: number;
    }) => void): void {
        this.On("hltv_fixed", callback);
    }

    /**
     * @comment a HLTV message send by moderators
     */
    static OnHltvMessage(callback: (data: { text: string }) => void): void {
        this.On("hltv_message", callback);
    }

    /**
     * @comment general HLTV status
     */
    static OnHltvStatus(callback: (data: {
        /** @comment number of HLTV spectators */
        clients: number;
        /** @comment number of HLTV slots */
        slots: number;
        /** @comment number of HLTV proxies */
        proxies: number;
        /** @comment disptach master IP:port */
        master: string;
    }) => void): void {
        this.On("hltv_status", callback);
    }

    static OnHltvTitle(callback: (data: { text: string }) => void): void {
        this.On("hltv_title", callback);
    }

    /**
     * @comment a HLTV chat msg sent by spectators
     */
    static OnHltvChat(callback: (data: {
        text: string;
        /** @comment steam id */
        steamID: string
    }) => void): void {
        this.On("hltv_chat", callback);
    }

    static OnHltvVersioninfo(callback: (data: { version: number }) => void): void {
        this.On("hltv_versioninfo", callback);
    }

    static OnHltvReplay(callback: (data: {
        /** @comment number of seconds in killer replay delay */
        delay: number;
        /** @comment reason for replay	(ReplayEventType_t) */
        reason: number;
    }) => void): void {
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


    static OnDemoStart(callback: (data: {}) => void): void {
        this.On("demo_start", callback);
    }

    static OnDemoStop(callback: (data: {}) => void): void {
        this.On("demo_stop", callback);
    }

    static OnDemoSkip(callback: (data: {
        /** @comment current playback tick */
        playback_tick: number;
        /** @comment tick we're going to */
        skipto_tick: number;
    }) => void): void {
        this.On("demo_skip", callback);
    }


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
        /** @comment new difficulty as string */
        strDifficulty: string;
    }) => void): void {
        this.On("difficulty_changed", callback);
    }


    static OnWeaponFire(callback: (data: {
        userid: number;
        /** @comment weapon name used */
        weapon: string;
        /** @comment is weapon silenced */
        silenced: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_fire", callback);
    }

    static OnWeaponFireOnEmpty(callback: (data: {
        userid: number;
        /** @comment weapon name used */
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

    /**
     * @comment exists for the game instructor to let it know when the player zoomed in with a regular rifle. Different from the above weapon_zoom because we don't use this event to notify bots
     */
    static OnWeaponZoomRifle(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weapon_zoom_rifle", callback);
    }


    static OnGrenadeThrown(callback: (data: {
        userid: number;
        /** @comment weapon name used */
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


    static OnBombBeginplant(callback: (data: {
        /** @comment player who is planting the bomb */
        userid: number;
        /** @comment bombsite index */
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_beginplant", callback);
    }

    static OnBombAbortplant(callback: (data: {
        /** @comment player who is planting the bomb */
        userid: number;
        /** @comment bombsite index */
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_abortplant", callback);
    }

    static OnBombPlanted(callback: (data: {
        /** @comment player who planted the bomb */
        userid: number;
        /** @comment bombsite index */
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_planted", callback);
    }

    static OnBombBegindefuse(callback: (data: {
        /** @comment player who is defusing */
        userid: number;
        haskit: boolean;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_begindefuse", callback);
    }

    static OnBombAbortdefuse(callback: (data: {
        /** @comment player who was defusing */
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_abortdefuse", callback);
    }

    static OnBombDefused(callback: (data: {
        /** @comment player who defused the bomb */
        userid: number;
        /** @comment bombsite index */
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_defused", callback);
    }

    static OnBombExploded(callback: (data: {
        /** @comment player who planted the bomb */
        userid: number;
        /** @comment bombsite index */
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_exploded", callback);
    }

    static OnBombDropped(callback: (data: {
        /** @comment player who dropped the bomb */
        userid: number;
        entindex: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_dropped", callback);
    }

    static OnBombPickup(callback: (data: {
        /** @comment player pawn who picked up the bomb */
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bomb_pickup", callback);
    }

    static OnBombBeep(callback: (data: {
        /** @comment c4 entity */
        entindex: number
    }) => void): void {
        this.On("bomb_beep", callback);
    }


    static OnDefuserDropped(callback: (data: {
        /** @comment defuser's entity ID */
        entityid: number
    }) => void): void {
        this.On("defuser_dropped", callback);
    }

    static OnDefuserPickup(callback: (data: {
        /** @comment defuser's entity ID */
        entityid: number;
        /** @comment player who picked up the defuser */
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("defuser_pickup", callback);
    }


    static OnHostageFollows(callback: (data: {
        /** @comment player who touched the hostage */
        userid: number;
        /** @comment hostage entity index */
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_follows", callback);
    }

    static OnHostageHurt(callback: (data: {
        /** @comment player who hurt the hostage */
        userid: number;
        /** @comment hostage entity index */
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_hurt", callback);
    }

    static OnHostageKilled(callback: (data: {
        /** @comment player who killed the hostage */
        userid: number;
        /** @comment hostage entity index */
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_killed", callback);
    }

    static OnHostageRescued(callback: (data: {
        /** @comment player who rescued the hostage */
        userid: number;
        /** @comment hostage entity index */
        hostage: number;
        /** @comment rescue site index */
        site: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_rescued", callback);
    }

    static OnHostageStopsFollowing(callback: (data: {
        /** @comment player who rescued the hostage */
        userid: number;
        /** @comment hostage entity index */
        hostage: number;
        userid_pawn: number;
    }) => void): void {
        this.On("hostage_stops_following", callback);
    }

    static OnHostageRescuedAll(callback: (data: {}) => void): void {
        this.On("hostage_rescued_all", callback);
    }

    static OnHostageCallForHelp(callback: (data: {
        /** @comment hostage entity index */
        hostage: number
    }) => void): void {
        this.On("hostage_call_for_help", callback);
    }


    static OnVipEscaped(callback: (data: {
        /** @comment player who was the VIP */
        userid: number
    }) => void): void {
        this.On("vip_escaped", callback);
    }

    static OnVipKilled(callback: (data: {
        /** @comment player who was the VIP */
        userid: number;
        /** @comment user ID who killed the VIP */
        attacker: number;
    }) => void): void {
        this.On("vip_killed", callback);
    }


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
        /** @comment either a weapon such as 'tmp' or 'hegrenade', or an item such as 'nvgs' */
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
        /** @comment either a weapon such as 'tmp' or 'hegrenade', or an item such as 'nvgs' */
        item: string;
        defindex: number;
    }) => void): void {
        this.On("item_remove", callback);
    }

    static OnItemEquip(callback: (data: {
        userid: number;
        /** @comment either a weapon such as 'tmp' or 'hegrenade', or an item such as 'nvgs' */
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


    static OnAmmoPickup(callback: (data: {
        userid: number;
        /** @comment either a weapon such as 'tmp' or 'hegrenade', or an item such as 'nvgs' */
        item: string;
        /** @comment the weapon entindex */
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


    static OnBuymenuOpen(callback: (data: { userid: number }) => void): void {
        this.On("buymenu_open", callback);
    }

    static OnBuymenuClose(callback: (data: { userid: number }) => void): void {
        this.On("buymenu_close", callback);
    }


    static OnInspectWeapon(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("inspect_weapon", callback);
    }


    static OnOtherDeath(callback: (data: {
        /** @comment other entity ID who died */
        otherid: number;
        /** @comment other entity type */
        othertype: string;
        /** @comment user ID who killed */
        attacker: number;
        /** @comment weapon name killer used */
        weapon: string;
        /** @comment inventory item id of weapon killer used */
        weapon_itemid: string;
        /** @comment faux item id of weapon killer used */
        weapon_fauxitemid: string;
        weapon_originalowner_xuid: string;
        /** @comment singals a headshot */
        headshot: boolean;
        /** @comment number of objects shot penetrated before killing target */
        penetrated: number;
        /** @comment kill happened without a scope, used for death notice icon */
        noscope: boolean;
        /** @comment hitscan weapon went through smoke grenade */
        thrusmoke: boolean;
        /** @comment attacker was blind from flashbang */
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


    static OnDoorClose(callback: (data: {
        /** @comment Who closed the door */
        userid: number;
        /** @comment Is the door a checkpoint door */
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


    static OnBreakBreakable(callback: (data: {
        entindex: number;
        userid: number;
        /** @comment BREAK_GLASS, BREAK_WOOD, etc */
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
        /** @comment BREAK_GLASS, BREAK_WOOD, etc */
        material: number;
        userid_pawn: number;
    }) => void): void {
        this.On("broken_breakable", callback);
    }


    static OnEntityKilled(callback: (data: {
        entindex_killed: number;
        entindex_attacker: number;
        entindex_inflictor: number;
        damagebits: number;
    }) => void): void {
        this.On("entity_killed", callback);
    }

    static OnEntityVisible(callback: (data: {
        /** @comment The player who sees the entity */
        userid: number;
        /** @comment Entindex of the entity they see */
        subject: number;
        /** @comment Classname of the entity they see */
        classname: string;
        /** @comment name of the entity they see */
        entityname: string;
    }) => void): void {
        this.On("entity_visible", callback);
    }


    static OnVoteStarted(callback: (data: {
        issue: string;
        param1: string;
        team: number;
        /** @comment entity id of the player who initiated the vote */
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
        /** @comment entity id of the voter */
        entityid: number;
    }) => void): void {
        this.On("vote_cast_yes", callback);
    }

    static OnVoteCastNo(callback: (data: {
        team: number;
        /** @comment entity id of the voter */
        entityid: number;
    }) => void): void {
        this.On("vote_cast_no", callback);
    }

    static OnVoteCast(callback: (data: {
        /** @comment which option the player voted on */
        vote_option: number;
        team: number;
        /** @comment player who voted */
        userid: number;
    }) => void): void {
        this.On("vote_cast", callback);
    }

    static OnVoteEnded(callback: (data: {}) => void): void {
        this.On("vote_ended", callback);
    }

    static OnVoteOptions(callback: (data: {
        /** @comment Number of options - up to MAX_VOTE_OPTIONS */
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


    static OnAchievementEvent(callback: (data: {
        /** @comment non-localized name of achievement */
        achievement_name: string;
        /** @comment # of steps toward achievement */
        cur_val: number;
        /** @comment total # of steps in achievement */
        max_val: number;
    }) => void): void {
        this.On("achievement_event", callback);
    }

    static OnAchievementEarned(callback: (data: {
        /** @comment entindex of the player */
        player: number;
        /** @comment achievement ID */
        achievement: number;
    }) => void): void {
        this.On("achievement_earned", callback);
    }

    static OnAchievementEarnedLocal(callback: (data: {
        /** @comment achievement ID */
        achievement: number;
        /** @comment splitscreen ID */
        splitscreenplayer: number;
    }) => void): void {
        this.On("achievement_earned_local", callback);
    }

    /**
     * @comment Used for a notification message when an achievement fails to write
     */
    static OnAchievementWriteFailed(callback: (data: {}) => void): void {
        this.On("achievement_write_failed", callback);
    }

    static OnAchievementInfoLoaded(callback: (data: {}) => void): void {
        this.On("achievement_info_loaded", callback);
    }


    static OnBonusUpdated(callback: (data: {
        numadvanced: number;
        numbronze: number;
        numsilver: number;
        numgold: number;
    }) => void): void {
        this.On("bonus_updated", callback);
    }


    static OnSpecTargetUpdated(callback: (data: {
        /** @comment spectating player */
        userid: number;
        /** @comment ehandle of the target */
        target: number;
        userid_pawn: number;
    }) => void): void {
        this.On("spec_target_updated", callback);
    }

    static OnSpecModeUpdated(callback: (data: {
        /** @comment entindex of the player */
        userid: number
    }) => void): void {
        this.On("spec_mode_updated", callback);
    }


    static OnGameinstructorDraw(callback: (data: {}) => void): void {
        this.On("gameinstructor_draw", callback);
    }

    static OnGameinstructorNodraw(callback: (data: {}) => void): void {
        this.On("gameinstructor_nodraw", callback);
    }

    static OnInstructorStartLesson(callback: (data: {
        /** @comment The player who this lesson is intended for */
        userid: number;
        /** @comment Name of the lesson to start. Must match instructor_lesson.txt */
        hint_name: string;
        /** @comment entity id that the hint should display at. Leave empty if controller target */
        hint_target: number;
        vr_movement_type: number;
        vr_single_controller: boolean;
        vr_controller_type: number;
    }) => void): void {
        this.On("instructor_start_lesson", callback);
    }

    static OnInstructorCloseLesson(callback: (data: {
        /** @comment The player who this lesson is intended for */
        userid: number;
        /** @comment Name of the lesson to start. Must match instructor_lesson.txt */
        hint_name: string;
    }) => void): void {
        this.On("instructor_close_lesson", callback);
    }

    /**
     * @comment create a hint using data supplied entirely by the server/map. Intended for hints to smooth playtests before content is ready to make the hint unneccessary. NOT INTENDED AS A SHIPPABLE CRUTCH
     */
    static OnInstructorServerHintCreate(callback: (data: {
        /** @comment user ID of the player that triggered the hint */
        userid: number;
        /** @comment what to name the hint. For referencing it again later (e.g. a kill command for the hint instead of a timeout) */
        hint_name: string;
        /** @comment type name so that messages of the same type will replace each other */
        hint_replace_key: string;
        /** @comment entity id that the hint should display at */
        hint_target: number;
        /** @comment userid id of the activator */
        hint_activator_userid: number;
        /** @comment how long in seconds until the hint automatically times out, 0 = never */
        hint_timeout: number;
        /** @comment the hint icon to use when the hint is onscreen. e.g. "icon_alert_red" */
        hint_icon_onscreen: string;
        /** @comment the hint icon to use when the hint is offscreen. e.g. "icon_alert" */
        hint_icon_offscreen: string;
        /** @comment the hint caption. e.g. "#ThisIsDangerous" */
        hint_caption: string;
        /** @comment the hint caption that only the activator sees e.g. "#YouPushedItGood" */
        hint_activator_caption: string;
        /** @comment the hint color in "r,g,b" format where each component is 0-255 */
        hint_color: string;
        /** @comment how far on the z axis to offset the hint from entity origin */
        hint_icon_offset: number;
        /** @comment range before the hint is culled */
        hint_range: number;
        /** @comment hint flags */
        hint_flags: number;
        /** @comment bindings to use when use_binding is the onscreen icon */
        hint_binding: string;
        /** @comment gamepad bindings to use when use_binding is the onscreen icon */
        hint_gamepad_binding: string;
        /** @comment if false, the hint will dissappear if the target entity is invisible */
        hint_allow_nodraw_target: boolean;
        /** @comment if true, the hint will not show when outside the player view */
        hint_nooffscreen: boolean;
        /** @comment if true, the hint caption will show even if the hint is occluded */
        hint_forcecaption: boolean;
        /** @comment if true, only the local player will see the hint */
        hint_local_player_only: boolean;
    }) => void): void {
        this.On("instructor_server_hint_create", callback);
    }

    /**
     * @comment destroys a server/map created hint
     */
    static OnInstructorServerHintStop(callback: (data: {
        /** @comment The hint to stop. Will stop ALL hints with this name */
        hint_name: string
    }) => void): void {
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


    static OnPhysgunPickup(callback: (data: {
        /** @comment entity picked up */
        target: number
    }) => void): void {
        this.On("physgun_pickup", callback);
    }

    static OnFlareIgniteNpc(callback: (data: {
        /** @comment entity ignited */
        entindex: number
    }) => void): void {
        this.On("flare_ignite_npc", callback);
    }

    static OnHelicopterGrenadePuntMiss(callback: (data: {}) => void): void {
        this.On("helicopter_grenade_punt_miss", callback);
    }


    static OnFinaleStart(callback: (data: { rushes: number }) => void): void {
        this.On("finale_start", callback);
    }


    /**
     * @comment fired when achievements/stats are downloaded from Steam or XBox Live
     */
    static OnUserDataDownloaded(callback: (data: {}) => void): void {
        this.On("user_data_downloaded", callback);
    }

    /**
     * @comment read user titledata from profile
     */
    static OnReadGameTitledata(callback: (data: {
        /** @comment Controller id of user */
        controllerId: number
    }) => void): void {
        this.On("read_game_titledata", callback);
    }

    /**
     * @comment write user titledata in profile
     */
    static OnWriteGameTitledata(callback: (data: {
        /** @comment Controller id of user */
        controllerId: number
    }) => void): void {
        this.On("write_game_titledata", callback);
    }

    /**
     * @comment reset user titledata; do not automatically write profile
     */
    static OnResetGameTitledata(callback: (data: {
        /** @comment Controller id of user */
        controllerId: number
    }) => void): void {
        this.On("reset_game_titledata", callback);
    }

    static OnWriteProfileData(callback: (data: {}) => void): void {
        this.On("write_profile_data", callback);
    }


    static OnRagdollDissolved(callback: (data: { entindex: number }) => void): void {
        this.On("ragdoll_dissolved", callback);
    }


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


    static OnGcConnected(callback: (data: {}) => void): void {
        this.On("gc_connected", callback);
    }


    static OnDynamicShadowLightChanged(callback: (data: {}) => void): void {
        this.On("dynamic_shadow_light_changed", callback);
    }


    static OnGameuiHidden(callback: (data: {}) => void): void {
        this.On("gameui_hidden", callback);
    }


    static OnItemsGifted(callback: (data: {
        /** @comment entity used by player */
        player: number;
        itemdef: number;
        numgifts: number;
        giftidx: number;
        accountid: number;
    }) => void): void {
        this.On("items_gifted", callback);
    }


    static OnWarmupEnd(callback: (data: {}) => void): void {
        this.On("warmup_end", callback);
    }


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
        /** @comment define in cs_gamerules.h */
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


    static OnShowDeathpanel(callback: (data: {
        /** @comment endindex of the one who was killed */
        victim: number;
        /** @comment entindex of the killer entity */
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

    static OnUgcFileDownloadFinished(callback: (data: {
        /** @comment id of this specific content (may be image or map) */
        hcontent: string
    }) => void): void {
        this.On("ugc_file_download_finished", callback);
    }

    static OnUgcFileDownloadStart(callback: (data: {
        /** @comment id of this specific content (may be image or map) */
        hcontent: string;
        /** @comment id of the associated content package */
        published_file_id: string;
    }) => void): void {
        this.On("ugc_file_download_start", callback);
    }


    /**
     * @comment Fired when a match ends or is restarted
     */
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
        /** @comment Number of "ties" */
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

    /**
     * @comment a game event, name may be 32 characters long
     */
    static OnNextlevelChanged(callback: (data: {
        nextlevel: string;
        mapgroup: string;
        skirmishmode: string;
    }) => void): void {
        this.On("nextlevel_changed", callback);
    }


    static OnDmBonusWeaponStart(callback: (data: {
        /** @comment The length of time that this bonus lasts */
        time: number;
        /** @comment Loadout position of the bonus weapon */
        Pos: number;
    }) => void): void {
        this.On("dm_bonus_weapon_start", callback);
    }


    static OnGgKilledEnemy(callback: (data: {
        /** @comment user ID who died */
        victimid: number;
        /** @comment user ID who killed */
        attackerid: number;
        /** @comment did killer dominate victim with this kill */
        dominated: number;
        /** @comment did killer get revenge on victim with this kill */
        revenge: number;
        /** @comment did killer kill with a bonus weapon? */
        bonus: boolean;
    }) => void): void {
        this.On("gg_killed_enemy", callback);
    }


    static OnSwitchTeam(callback: (data: {
        /** @comment number of active players on both T and CT */
        numPlayers: number;
        /** @comment number of spectators */
        numSpectators: number;
        /** @comment average rank of human players */
        avg_rank: number;
        numTSlotsFree: number;
        numCTSlotsFree: number;
    }) => void): void {
        this.On("switch_team", callback);
    }


    /**
     * @comment fired when a player runs out of time in trial mode
     */
    static OnTrialTimeExpired(callback: (data: {
        /** @comment player whose time has expired */
        userid: number
    }) => void): void {
        this.On("trial_time_expired", callback);
    }


    /**
     * @comment Fired when it's time to update matchmaking data at the end of a round.
     */
    static OnUpdateMatchmakingStats(callback: (data: {}) => void): void {
        this.On("update_matchmaking_stats", callback);
    }


    static OnClientDisconnect(callback: (data: {}) => void): void {
        this.On("client_disconnect", callback);
    }

    static OnClientLoadoutChanged(callback: (data: {}) => void): void {
        this.On("client_loadout_changed", callback);
    }


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


    static OnSfuievent(callback: (data: {
        action: string;
        data: string;
        slot: number;
    }) => void): void {
        this.On("sfuievent", callback);
    }


    static OnWeaponhudSelection(callback: (data: {
        /** @comment Player who this event applies to */
        userid: number;
        /** @comment EWeaponHudSelectionMode (switch / pickup / drop) */
        mode: number;
        /** @comment Weapon entity index */
        entindex: number;
        userid_pawn: number;
    }) => void): void {
        this.On("weaponhud_selection", callback);
    }


    static OnTrPlayerFlashbanged(callback: (data: {
        /** @comment user ID of the player banged */
        userid: number
    }) => void): void {
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


    static OnBotTakeover(callback: (data: {
        userid: number;
        botid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("bot_takeover", callback);
    }


    static OnJointeamFailed(callback: (data: {
        userid: number;
        /** @comment 0 = team_full */
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


    static OnMaterialDefaultComplete(callback: (data: {}) => void): void {
        this.On("material_default_complete", callback);
    }


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


    static OnPlayerDecal(callback: (data: {
        userid: number;
        userid_pawn: number;
    }) => void): void {
        this.On("player_decal", callback);
    }


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


    static OnGuardianWaveRestart(callback: (data: {}) => void): void {
        this.On("guardian_wave_restart", callback);
    }


    static OnNavBlocked(callback: (data: {
        area: number;
        blocked: boolean;
    }) => void): void {
        this.On("nav_blocked", callback);
    }

    static OnNavGenerate(callback: (data: {}) => void): void {
        this.On("nav_generate", callback);
    }


    static OnRepostXboxAchievements(callback: (data: {
        /** @comment splitscreen ID */
        splitscreenplayer: number
    }) => void): void {
        this.On("repost_xbox_achievements", callback);
    }

    static OnMbInputLockSuccess(callback: (data: {}) => void): void {
        this.On("mb_input_lock_success", callback);
    }

    static OnMbInputLockCancel(callback: (data: {}) => void): void {
        this.On("mb_input_lock_cancel", callback);
    }


    static OnDronegunAttack(callback: (data: { userid: number }) => void): void {
        this.On("dronegun_attack", callback);
    }

    static OnDroneDispatched(callback: (data: {
        userid: number;
        priority: number;
        drone_dispatched: number;
    }) => void): void {
        this.On("drone_dispatched", callback);
    }

    static OnDroneCargoDetached(callback: (data: {
        userid: number;
        cargo: number;
        delivered: boolean;
    }) => void): void {
        this.On("drone_cargo_detached", callback);
    }

    static OnDroneAboveRoof(callback: (data: {
        userid: number;
        cargo: number;
    }) => void): void {
        this.On("drone_above_roof", callback);
    }


    static OnLootCrateVisible(callback: (data: {
        /** @comment player entindex */
        userid: number;
        /** @comment crate entindex */
        subject: number;
        /** @comment type of crate (metal, wood, or paradrop) */
        type: string;
    }) => void): void {
        this.On("loot_crate_visible", callback);
    }

    static OnLootCrateOpened(callback: (data: {
        /** @comment player entindex */
        userid: number;
        /** @comment type of crate (metal, wood, or paradrop) */
        type: string;
    }) => void): void {
        this.On("loot_crate_opened", callback);
    }

    static OnOpenCrateInstr(callback: (data: {
        /** @comment player entindex */
        userid: number;
        /** @comment crate entindex */
        subject: number;
        /** @comment type of crate (metal, wood, or paradrop) */
        type: string;
    }) => void): void {
        this.On("open_crate_instr", callback);
    }


    static OnSmokeBeaconParadrop(callback: (data: {
        userid: number;
        paradrop: number;
    }) => void): void {
        this.On("smoke_beacon_paradrop", callback);
    }

    static OnSurvivalParadropSpawn(callback: (data: { entityid: number }) => void): void {
        this.On("survival_paradrop_spawn", callback);
    }

    static OnSurvivalParadropBreak(callback: (data: { entityid: number }) => void): void {
        this.On("survival_paradrop_break", callback);
    }


    static OnChoppersIncomingWarning(callback: (data: { global: boolean }) => void): void {
        this.On("choppers_incoming_warning", callback);
    }

    static OnFirstbombsIncomingWarning(callback: (data: { global: boolean }) => void): void {
        this.On("firstbombs_incoming_warning", callback);
    }


    static OnDzItemInteraction(callback: (data: {
        /** @comment player entindex */
        userid: number;
        /** @comment crate entindex */
        subject: number;
        /** @comment type of crate (metal, wood, or paradrop) */
        type: string;
    }) => void): void {
        this.On("dz_item_interaction", callback);
    }


    static OnParachutePickup(callback: (data: { userid: number }) => void): void {
        this.On("parachute_pickup", callback);
    }

    static OnParachuteDeploy(callback: (data: { userid: number }) => void): void {
        this.On("parachute_deploy", callback);
    }


    static OnSurvivalAnnouncePhase(callback: (data: {
        /** @comment The phase # */
        phase: number
    }) => void): void {
        this.On("survival_announce_phase", callback);
    }
}
