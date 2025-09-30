// to be used with https://github.com/Source2ZE/cs_script_boilerplate
//
// requires the maps/prefabs/eventlisteners.vmap prefab
// (if not worky paste the ents into main map since hammer likes to alter the targetnames inside prefabs)
//
// see scripts/ts/game_events_test.ts for examples

import { Instance as css } from "cs_script/point_script";

interface GameEventDefs {
    server_spawn: {
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
    };
    server_pre_shutdown: {
        reason: string;
    };
    server_shutdown: {
        reason: string;
    };
    server_message: {
        text: string;
    };
    server_cvar: {
        cvarname: string;
        cvarvalue: string;
    };
    player_activate: {
        userid: number;
    };
    player_connect_full: {
        userid: number;
    };
    player_full_update: {
        userid: number;
        count: number;
    };
    player_connect: {
        name: string;
        userid: number;
        networkid: string;
        xuid: string;
        address: string;
        bot: boolean;
    };
    player_disconnect: {
        userid: number;
        reason: number;
        name: string;
        networkid: string;
        xuid: string;
        PlayerID: number;
    };
    player_info: {
        name: string;
        userid: number;
        steamid: string;
        bot: boolean;
    };
    player_spawn: {
        userid: number;
        userid_pawn: number;
    };
    player_team: {
        userid: number;
        team: number;
        oldteam: number;
        disconnect: boolean;
        silent: boolean;
        isbot: boolean;
        userid_pawn: number;
    };
    local_player_team: {};
    local_player_controller_team: {};
    player_changename: {
        userid: number;
        oldname: string;
        newname: string;
    };
    player_hurt: {
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
    };
    player_chat: {
        teamonly: boolean;
        userid: number;
        text: string;
    };
    local_player_pawn_changed: {};
    player_stats_updated: {
        forceupload: boolean;
    };
    player_death: {
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
    };
    player_footstep: {
        userid: number;
        userid_pawn: number;
    };
    player_hintmessage: {
        hintmessage: string;
    };
    player_spawned: {
        userid: number;
        inrestart: boolean;
        userid_pawn: number;
    };
    player_jump: {
        userid: number;
    };
    player_blind: {
        userid: number;
        attacker: number;
        entityid: number;
        blind_duration: number;
    };
    player_falldamage: {
        userid: number;
        damage: number;
        userid_pawn: number;
    };
    player_score: {
        userid: number;
        kills: number;
        deaths: number;
        score: number;
    };
    player_shoot: {
        userid: number;
        weapon: number;
        mode: number;
        userid_pawn: number;
    };
    player_radio: {
        splitscreenplayer: number;
        userid: number;
        slot: number;
        userid_pawn: number;
    };
    player_avenged_teammate: {
        avenger_id: number;
        avenged_player_id: number;
    };
    player_reset_vote: {
        userid: number;
        vote: boolean;
    };
    player_given_c4: {
        userid: number;
    };
    player_ping: {
        splitscreenplayer: number;
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        urgent: boolean;
        userid_pawn: number;
    };
    player_ping_stop: {
        entityid: number;
    };
    player_sound: {
        userid: number;
        radius: number;
        duration: number;
        step: boolean;
        userid_pawn: number;
    };
    teamplay_broadcast_audio: {
        team: number;
        sound: string;
    };
    team_info: {
        teamid: number;
        teamname: string;
    };
    team_score: {
        teamid: number;
        score: number;
    };
    teamplay_round_start: {
        full_reset: boolean;
    };
    team_intro_start: {};
    team_intro_end: {};
    round_start: {
        timelimit: number;
        fraglimit: number;
        objective: string;
    };
    round_end: {
        winner: number;
        reason: number;
        message: string;
        legacy: number;
        player_count: number;
        nomusic: number;
    };
    round_start_pre_entity: {};
    round_start_post_nav: {};
    round_freeze_end: {};
    round_prestart: {};
    round_poststart: {};
    round_announce_match_point: {};
    round_announce_final: {};
    round_announce_last_round_half: {};
    round_announce_match_start: {};
    round_announce_warmup: {};
    round_end_upload_stats: {};
    round_officially_ended: {};
    round_time_warning: {};
    round_mvp: {
        userid: number;
        reason: number;
        value: number;
        musickitmvps: number;
        nomusic: number;
        musickitid: number;
    };
    game_init: {};
    game_start: {
        roundslimit: number;
        timelimit: number;
        fraglimit: number;
        objective: string;
    };
    game_end: {
        winner: number;
    };
    game_message: {
        target: number;
        text: string;
    };
    game_newmap: {
        mapname: string;
    };
    game_phase_changed: {
        new_phase: number;
    };
    hltv_cameraman: {
        userid: number;
    };
    hltv_chase: {
        target1: number;
        target2: number;
        distance: number;
        theta: number;
        phi: number;
        inertia: number;
        ineye: number;
    };
    hltv_rank_camera: {
        index: number;
        rank: number;
        target: number;
    };
    hltv_rank_entity: {
        userid: number;
        rank: number;
        target: number;
    };
    hltv_fixed: {
        posx: number;
        posy: number;
        posz: number;
        theta: number;
        phi: number;
        offset: number;
        fov: number;
        target: number;
    };
    hltv_message: {
        text: string;
    };
    hltv_status: {
        clients: number;
        slots: number;
        proxies: number;
        master: string;
    };
    hltv_title: {
        text: string;
    };
    hltv_chat: {
        text: string;
        steamID: string;
    };
    hltv_versioninfo: {
        version: number;
    };
    hltv_replay: {
        delay: number;
        reason: number;
    };
    hltv_changed_mode: {
        oldmode: number;
        newmode: number;
        obs_target: number;
    };
    hltv_replay_status: {
        reason: number;
    };
    demo_start: {};
    demo_stop: {};
    demo_skip: {
        playback_tick: number;
        skipto_tick: number;
    };
    map_shutdown: {};
    map_transition: {};
    hostname_changed: {
        hostname: string;
    };
    difficulty_changed: {
        newDifficulty: number;
        oldDifficulty: number;
        strDifficulty: string;
    };
    weapon_fire: {
        userid: number;
        weapon: string;
        silenced: boolean;
        userid_pawn: number;
    };
    weapon_fire_on_empty: {
        userid: number;
        weapon: string;
        userid_pawn: number;
    };
    weapon_outofammo: {
        userid: number;
        userid_pawn: number;
    };
    weapon_reload: {
        userid: number;
        userid_pawn: number;
    };
    weapon_zoom: {
        userid: number;
        userid_pawn: number;
    };
    weapon_zoom_rifle: {
        userid: number;
        userid_pawn: number;
    };
    grenade_thrown: {
        userid: number;
        weapon: string;
        userid_pawn: number;
    };
    grenade_bounce: {
        userid: number;
        userid_pawn: number;
    };
    hegrenade_detonate: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    flashbang_detonate: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    smokegrenade_detonate: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    smokegrenade_expired: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    molotov_detonate: {
        userid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    decoy_detonate: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    decoy_started: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    decoy_firing: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    tagrenade_detonate: {
        userid: number;
        entityid: number;
        x: number;
        y: number;
        z: number;
    };
    inferno_startburn: {
        entityid: number;
        x: number;
        y: number;
        z: number;
    };
    inferno_expire: {
        entityid: number;
        x: number;
        y: number;
        z: number;
    };
    inferno_extinguish: {
        entityid: number;
        x: number;
        y: number;
        z: number;
    };
    bomb_beginplant: {
        userid: number;
        site: number;
        userid_pawn: number;
    };
    bomb_abortplant: {
        userid: number;
        site: number;
        userid_pawn: number;
    };
    bomb_planted: {
        userid: number;
        site: number;
        userid_pawn: number;
    };
    bomb_begindefuse: {
        userid: number;
        haskit: boolean;
        userid_pawn: number;
    };
    bomb_abortdefuse: {
        userid: number;
        userid_pawn: number;
    };
    bomb_defused: {
        userid: number;
        site: number;
        userid_pawn: number;
    };
    bomb_exploded: {
        userid: number;
        site: number;
        userid_pawn: number;
    };
    bomb_dropped: {
        userid: number;
        entindex: number;
        userid_pawn: number;
    };
    bomb_pickup: {
        userid: number;
        userid_pawn: number;
    };
    bomb_beep: {
        entindex: number;
    };
    defuser_dropped: {
        entityid: number;
    };
    defuser_pickup: {
        entityid: number;
        userid: number;
        userid_pawn: number;
    };
    hostage_follows: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    };
    hostage_hurt: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    };
    hostage_killed: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    };
    hostage_rescued: {
        userid: number;
        hostage: number;
        site: number;
        userid_pawn: number;
    };
    hostage_stops_following: {
        userid: number;
        hostage: number;
        userid_pawn: number;
    };
    hostage_rescued_all: {};
    hostage_call_for_help: {
        hostage: number;
    };
    vip_escaped: {
        userid: number;
    };
    vip_killed: {
        userid: number;
        attacker: number;
    };
    item_purchase: {
        userid: number;
        team: number;
        loadout: number;
        weapon: string;
    };
    item_pickup: {
        userid: number;
        item: string;
        silent: boolean;
        defindex: number;
    };
    item_pickup_slerp: {
        userid: number;
        index: number;
        behavior: number;
    };
    item_pickup_failed: {
        userid: number;
        item: string;
        reason: number;
        limit: number;
    };
    item_remove: {
        userid: number;
        item: string;
        defindex: number;
    };
    item_equip: {
        userid: number;
        item: string;
        defindex: number;
        canzoom: boolean;
        hassilencer: boolean;
        issilenced: boolean;
        hastracers: boolean;
        weptype: number;
        ispainted: boolean;
    };
    item_schema_initialized: {};
    ammo_pickup: {
        userid: number;
        item: string;
        index: number;
    };
    ammo_refill: {
        userid: number;
        success: boolean;
    };
    enter_buyzone: {
        userid: number;
        canbuy: boolean;
    };
    exit_buyzone: {
        userid: number;
        canbuy: boolean;
    };
    enter_bombzone: {
        userid: number;
        hasbomb: boolean;
        isplanted: boolean;
    };
    exit_bombzone: {
        userid: number;
        hasbomb: boolean;
        isplanted: boolean;
    };
    enter_rescue_zone: {
        userid: number;
    };
    exit_rescue_zone: {
        userid: number;
    };
    buytime_ended: {};
    silencer_off: {
        userid: number;
    };
    silencer_on: {
        userid: number;
    };
    silencer_detach: {
        userid: number;
        userid_pawn: number;
    };
    buymenu_open: {
        userid: number;
    };
    buymenu_close: {
        userid: number;
    };
    inspect_weapon: {
        userid: number;
        userid_pawn: number;
    };
    other_death: {
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
    };
    bullet_impact: {
        userid: number;
        x: number;
        y: number;
        z: number;
        userid_pawn: number;
    };
    bullet_flight_resolution: {
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
    };
    door_close: {
        userid: number;
        checkpoint: boolean;
        userid_pawn: number;
    };
    door_moving: {
        userid: number;
        entindex: number;
        userid_pawn: number;
    };
    door_break: {
        entindex: number;
        dmgstate: number;
    };
    door_closed: {
        userid_pawn: number;
        entindex: number;
    };
    door_open: {
        userid_pawn: number;
        entindex: number;
    };
    break_breakable: {
        entindex: number;
        userid: number;
        material: number;
        userid_pawn: number;
    };
    break_prop: {
        entindex: number;
        userid: number;
        userid_pawn: number;
    };
    broken_breakable: {
        entindex: number;
        userid: number;
        material: number;
        userid_pawn: number;
    };
    entity_killed: {
        entindex_killed: number;
        entindex_attacker: number;
        entindex_inflictor: number;
        damagebits: number;
    };
    entity_visible: {
        userid: number;
        subject: number;
        classname: string;
        entityname: string;
    };
    vote_started: {
        issue: string;
        param1: string;
        team: number;
        initiator: number;
    };
    vote_failed: {
        team: number;
    };
    vote_passed: {
        details: string;
        param1: string;
        team: number;
    };
    vote_changed: {
        vote_option1: number;
        vote_option2: number;
        vote_option3: number;
        vote_option4: number;
        vote_option5: number;
        potentialVotes: number;
    };
    vote_cast_yes: {
        team: number;
        entityid: number;
    };
    vote_cast_no: {
        team: number;
        entityid: number;
    };
    vote_cast: {
        vote_option: number;
        team: number;
        userid: number;
    };
    vote_ended: {};
    vote_options: {
        count: number;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        option5: string;
    };
    start_vote: {
        userid: number;
        type: number;
        vote_parameter: number;
    };
    enable_restart_voting: {
        enable: boolean;
    };
    achievement_event: {
        achievement_name: string;
        cur_val: number;
        max_val: number;
    };
    achievement_earned: {
        player: number;
        achievement: number;
    };
    achievement_earned_local: {
        achievement: number;
        splitscreenplayer: number;
    };
    achievement_write_failed: {};
    achievement_info_loaded: {};
    bonus_updated: {
        numadvanced: number;
        numbronze: number;
        numsilver: number;
        numgold: number;
    };
    spec_target_updated: {
        userid: number;
        target: number;
        userid_pawn: number;
    };
    spec_mode_updated: {
        userid: number;
    };
    gameinstructor_draw: {};
    gameinstructor_nodraw: {};
    instructor_start_lesson: {
        userid: number;
        hint_name: string;
        hint_target: number;
        vr_movement_type: number;
        vr_single_controller: boolean;
        vr_controller_type: number;
    };
    instructor_close_lesson: {
        userid: number;
        hint_name: string;
    };
    instructor_server_hint_create: {
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
    };
    instructor_server_hint_stop: {
        hint_name: string;
    };
    clientside_lesson_closed: {
        lesson_name: string;
    };
    set_instructor_group_enabled: {
        group: string;
        enabled: number;
    };
    physgun_pickup: {
        target: number;
    };
    flare_ignite_npc: {
        entindex: number;
    };
    helicopter_grenade_punt_miss: {};
    finale_start: {
        rushes: number;
    };
    user_data_downloaded: {};
    read_game_titledata: {
        controllerId: number;
    };
    write_game_titledata: {
        controllerId: number;
    };
    reset_game_titledata: {
        controllerId: number;
    };
    write_profile_data: {};
    ragdoll_dissolved: {
        entindex: number;
    };
    inventory_updated: {};
    cart_updated: {};
    store_pricesheet_updated: {};
    drop_rate_modified: {};
    event_ticket_modified: {};
    gc_connected: {};
    dynamic_shadow_light_changed: {};
    gameui_hidden: {};
    items_gifted: {
        player: number;
        itemdef: number;
        numgifts: number;
        giftidx: number;
        accountid: number;
    };
    warmup_end: {};
    announce_phase_end: {};
    cs_intermission: {};
    cs_game_disconnected: {};
    cs_round_final_beep: {};
    cs_round_start_beep: {};
    cs_win_panel_round: {
        show_timer_defend: boolean;
        show_timer_attack: boolean;
        timer_time: number;
        final_event: number;
        funfact_token: string;
        funfact_player: number;
        funfact_data1: number;
        funfact_data2: number;
        funfact_data3: number;
    };
    cs_win_panel_match: {};
    cs_match_end_restart: {};
    cs_pre_restart: {};
    cs_prev_next_spectator: {
        next: boolean;
    };
    show_deathpanel: {
        victim: number;
        killer: number;
        killer_controller: number;
        hits_taken: number;
        damage_taken: number;
        hits_given: number;
        damage_given: number;
        victim_pawn: number;
    };
    hide_deathpanel: {};
    ugc_map_info_received: {
        published_file_id: string;
    };
    ugc_map_unsubscribed: {
        published_file_id: string;
    };
    ugc_map_download_error: {
        published_file_id: string;
        error_code: number;
    };
    ugc_file_download_finished: {
        hcontent: string;
    };
    ugc_file_download_start: {
        hcontent: string;
        published_file_id: string;
    };
    begin_new_match: {};
    match_end_conditions: {
        frags: number;
        max_rounds: number;
        win_rounds: number;
        time: number;
    };
    endmatch_mapvote_selecting_map: {
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
    };
    endmatch_cmm_start_reveal_items: {};
    nextlevel_changed: {
        nextlevel: string;
        mapgroup: string;
        skirmishmode: string;
    };
    dm_bonus_weapon_start: {
        time: number;
        Pos: number;
    };
    gg_killed_enemy: {
        victimid: number;
        attackerid: number;
        dominated: number;
        revenge: number;
        bonus: boolean;
    };
    switch_team: {
        numPlayers: number;
        numSpectators: number;
        avg_rank: number;
        numTSlotsFree: number;
        numCTSlotsFree: number;
    };
    trial_time_expired: {
        userid: number;
    };
    update_matchmaking_stats: {};
    client_disconnect: {};
    client_loadout_changed: {};
    add_player_sonar_icon: {
        userid: number;
        pos_x: number;
        pos_y: number;
        pos_z: number;
    };
    add_bullet_hit_marker: {
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
    };
    sfuievent: {
        action: string;
        data: string;
        slot: number;
    };
    weaponhud_selection: {
        userid: number;
        mode: number;
        entindex: number;
        userid_pawn: number;
    };
    tr_player_flashbanged: {
        userid: number;
    };
    tr_mark_complete: {
        complete: number;
    };
    tr_mark_best_time: {
        time: number;
    };
    tr_exit_hint_trigger: {};
    tr_show_finish_msgbox: {};
    tr_show_exit_msgbox: {};
    bot_takeover: {
        userid: number;
        botid: number;
        userid_pawn: number;
    };
    jointeam_failed: {
        userid: number;
        reason: number;
    };
    teamchange_pending: {
        userid: number;
        toteam: number;
    };
    material_default_complete: {};
    seasoncoin_levelup: {
        userid: number;
        category: number;
        rank: number;
    };
    tournament_reward: {
        defindex: number;
        totalrewards: number;
        accountid: number;
    };
    start_halftime: {};
    player_decal: {
        userid: number;
        userid_pawn: number;
    };
    survival_announce_phase: {
        phase: number;
    };
    parachute_pickup: {
        userid: number;
    };
    parachute_deploy: {
        userid: number;
    };
    dronegun_attack: {
        userid: number;
    };
    drone_dispatched: {
        userid: number;
        priority: number;
        drone_dispatched: number;
    };
    loot_crate_visible: {
        userid: number;
        subject: number;
        type: string;
    };
    loot_crate_opened: {
        userid: number;
        type: string;
    };
    open_crate_instr: {
        userid: number;
        subject: number;
        type: string;
    };
    smoke_beacon_paradrop: {
        userid: number;
        paradrop: number;
    };
    survival_paradrop_spawn: {
        entityid: number;
    };
    survival_paradrop_break: {
        entityid: number;
    };
    drone_cargo_detached: {
        userid: number;
        cargo: number;
        delivered: boolean;
    };
    drone_above_roof: {
        userid: number;
        cargo: number;
    };
    choppers_incoming_warning: {
        global: boolean;
    };
    firstbombs_incoming_warning: {
        global: boolean;
    };
    dz_item_interaction: {
        userid: number;
        subject: number;
        type: string;
    };
    survival_teammate_respawn: {
        userid: number;
    };
    survival_no_respawns_warning: {
        userid: number;
    };
    survival_no_respawns_final: {
        userid: number;
    };
    show_survival_respawn_status: {
        loc_token: string;
        duration: number;
        userid: number;
        userid_pawn: number;
    };
    guardian_wave_restart: {};
    nav_blocked: {
        area: number;
        blocked: boolean;
    };
    nav_generate: {};
    repost_xbox_achievements: {
        splitscreenplayer: number;
    };
    mb_input_lock_success: {};
    mb_input_lock_cancel: {};
}

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

    private static On<K extends keyof GameEventDefs>(eventName: K, callback: (data: GameEventDefs[K]) => void): void {
        if (!this.handlers.has(eventName as string)) {
            this.handlers.set(eventName as string, []);
        }
        this.handlers.get(eventName as string)!.push(callback as (data: any) => void);
    }

    static OnServerSpawn(callback: (data: GameEventDefs["server_spawn"]) => void): void {
        this.On("server_spawn", callback);
    }

    static OnServerPreShutdown(callback: (data: GameEventDefs["server_pre_shutdown"]) => void): void {
        this.On("server_pre_shutdown", callback);
    }

    static OnServerShutdown(callback: (data: GameEventDefs["server_shutdown"]) => void): void {
        this.On("server_shutdown", callback);
    }

    static OnServerMessage(callback: (data: GameEventDefs["server_message"]) => void): void {
        this.On("server_message", callback);
    }

    static OnServerCvar(callback: (data: GameEventDefs["server_cvar"]) => void): void {
        this.On("server_cvar", callback);
    }

    static OnPlayerActivate(callback: (data: GameEventDefs["player_activate"]) => void): void {
        this.On("player_activate", callback);
    }

    static OnPlayerConnectFull(callback: (data: GameEventDefs["player_connect_full"]) => void): void {
        this.On("player_connect_full", callback);
    }

    static OnPlayerFullUpdate(callback: (data: GameEventDefs["player_full_update"]) => void): void {
        this.On("player_full_update", callback);
    }

    static OnPlayerConnect(callback: (data: GameEventDefs["player_connect"]) => void): void {
        this.On("player_connect", callback);
    }

    static OnPlayerDisconnect(callback: (data: GameEventDefs["player_disconnect"]) => void): void {
        this.On("player_disconnect", callback);
    }

    static OnPlayerInfo(callback: (data: GameEventDefs["player_info"]) => void): void {
        this.On("player_info", callback);
    }

    static OnPlayerSpawn(callback: (data: GameEventDefs["player_spawn"]) => void): void {
        this.On("player_spawn", callback);
    }

    static OnPlayerTeam(callback: (data: GameEventDefs["player_team"]) => void): void {
        this.On("player_team", callback);
    }

    static OnLocalPlayerTeam(callback: (data: GameEventDefs["local_player_team"]) => void): void {
        this.On("local_player_team", callback);
    }

    static OnLocalPlayerControllerTeam(callback: (data: GameEventDefs["local_player_controller_team"]) => void): void {
        this.On("local_player_controller_team", callback);
    }

    static OnPlayerChangename(callback: (data: GameEventDefs["player_changename"]) => void): void {
        this.On("player_changename", callback);
    }

    static OnPlayerHurt(callback: (data: GameEventDefs["player_hurt"]) => void): void {
        this.On("player_hurt", callback);
    }

    static OnPlayerChat(callback: (data: GameEventDefs["player_chat"]) => void): void {
        this.On("player_chat", callback);
    }

    static OnLocalPlayerPawnChanged(callback: (data: GameEventDefs["local_player_pawn_changed"]) => void): void {
        this.On("local_player_pawn_changed", callback);
    }

    static OnPlayerStatsUpdated(callback: (data: GameEventDefs["player_stats_updated"]) => void): void {
        this.On("player_stats_updated", callback);
    }

    static OnPlayerDeath(callback: (data: GameEventDefs["player_death"]) => void): void {
        this.On("player_death", callback);
    }

    static OnPlayerFootstep(callback: (data: GameEventDefs["player_footstep"]) => void): void {
        this.On("player_footstep", callback);
    }

    static OnPlayerHintmessage(callback: (data: GameEventDefs["player_hintmessage"]) => void): void {
        this.On("player_hintmessage", callback);
    }

    static OnPlayerSpawned(callback: (data: GameEventDefs["player_spawned"]) => void): void {
        this.On("player_spawned", callback);
    }

    static OnPlayerJump(callback: (data: GameEventDefs["player_jump"]) => void): void {
        this.On("player_jump", callback);
    }

    static OnPlayerBlind(callback: (data: GameEventDefs["player_blind"]) => void): void {
        this.On("player_blind", callback);
    }

    static OnPlayerFalldamage(callback: (data: GameEventDefs["player_falldamage"]) => void): void {
        this.On("player_falldamage", callback);
    }

    static OnPlayerScore(callback: (data: GameEventDefs["player_score"]) => void): void {
        this.On("player_score", callback);
    }

    static OnPlayerShoot(callback: (data: GameEventDefs["player_shoot"]) => void): void {
        this.On("player_shoot", callback);
    }

    static OnPlayerRadio(callback: (data: GameEventDefs["player_radio"]) => void): void {
        this.On("player_radio", callback);
    }

    static OnPlayerAvengedTeammate(callback: (data: GameEventDefs["player_avenged_teammate"]) => void): void {
        this.On("player_avenged_teammate", callback);
    }

    static OnPlayerResetVote(callback: (data: GameEventDefs["player_reset_vote"]) => void): void {
        this.On("player_reset_vote", callback);
    }

    static OnPlayerGivenC4(callback: (data: GameEventDefs["player_given_c4"]) => void): void {
        this.On("player_given_c4", callback);
    }

    static OnPlayerPing(callback: (data: GameEventDefs["player_ping"]) => void): void {
        this.On("player_ping", callback);
    }

    static OnPlayerPingStop(callback: (data: GameEventDefs["player_ping_stop"]) => void): void {
        this.On("player_ping_stop", callback);
    }

    static OnPlayerSound(callback: (data: GameEventDefs["player_sound"]) => void): void {
        this.On("player_sound", callback);
    }

    static OnTeamplayBroadcastAudio(callback: (data: GameEventDefs["teamplay_broadcast_audio"]) => void): void {
        this.On("teamplay_broadcast_audio", callback);
    }

    static OnTeamInfo(callback: (data: GameEventDefs["team_info"]) => void): void {
        this.On("team_info", callback);
    }

    static OnTeamScore(callback: (data: GameEventDefs["team_score"]) => void): void {
        this.On("team_score", callback);
    }

    static OnTeamplayRoundStart(callback: (data: GameEventDefs["teamplay_round_start"]) => void): void {
        this.On("teamplay_round_start", callback);
    }

    static OnTeamIntroStart(callback: (data: GameEventDefs["team_intro_start"]) => void): void {
        this.On("team_intro_start", callback);
    }

    static OnTeamIntroEnd(callback: (data: GameEventDefs["team_intro_end"]) => void): void {
        this.On("team_intro_end", callback);
    }

    static OnRoundStart(callback: (data: GameEventDefs["round_start"]) => void): void {
        this.On("round_start", callback);
    }

    static OnRoundEnd(callback: (data: GameEventDefs["round_end"]) => void): void {
        this.On("round_end", callback);
    }

    static OnRoundStartPreEntity(callback: (data: GameEventDefs["round_start_pre_entity"]) => void): void {
        this.On("round_start_pre_entity", callback);
    }

    static OnRoundStartPostNav(callback: (data: GameEventDefs["round_start_post_nav"]) => void): void {
        this.On("round_start_post_nav", callback);
    }

    static OnRoundFreezeEnd(callback: (data: GameEventDefs["round_freeze_end"]) => void): void {
        this.On("round_freeze_end", callback);
    }

    static OnRoundPrestart(callback: (data: GameEventDefs["round_prestart"]) => void): void {
        this.On("round_prestart", callback);
    }

    static OnRoundPoststart(callback: (data: GameEventDefs["round_poststart"]) => void): void {
        this.On("round_poststart", callback);
    }

    static OnRoundAnnounceMatchPoint(callback: (data: GameEventDefs["round_announce_match_point"]) => void): void {
        this.On("round_announce_match_point", callback);
    }

    static OnRoundAnnounceFinal(callback: (data: GameEventDefs["round_announce_final"]) => void): void {
        this.On("round_announce_final", callback);
    }

    static OnRoundAnnounceLastRoundHalf(callback: (data: GameEventDefs["round_announce_last_round_half"]) => void): void {
        this.On("round_announce_last_round_half", callback);
    }

    static OnRoundAnnounceMatchStart(callback: (data: GameEventDefs["round_announce_match_start"]) => void): void {
        this.On("round_announce_match_start", callback);
    }

    static OnRoundAnnounceWarmup(callback: (data: GameEventDefs["round_announce_warmup"]) => void): void {
        this.On("round_announce_warmup", callback);
    }

    static OnRoundEndUploadStats(callback: (data: GameEventDefs["round_end_upload_stats"]) => void): void {
        this.On("round_end_upload_stats", callback);
    }

    static OnRoundOfficiallyEnded(callback: (data: GameEventDefs["round_officially_ended"]) => void): void {
        this.On("round_officially_ended", callback);
    }

    static OnRoundTimeWarning(callback: (data: GameEventDefs["round_time_warning"]) => void): void {
        this.On("round_time_warning", callback);
    }

    static OnRoundMvp(callback: (data: GameEventDefs["round_mvp"]) => void): void {
        this.On("round_mvp", callback);
    }

    static OnGameInit(callback: (data: GameEventDefs["game_init"]) => void): void {
        this.On("game_init", callback);
    }

    static OnGameStart(callback: (data: GameEventDefs["game_start"]) => void): void {
        this.On("game_start", callback);
    }

    static OnGameEnd(callback: (data: GameEventDefs["game_end"]) => void): void {
        this.On("game_end", callback);
    }

    static OnGameMessage(callback: (data: GameEventDefs["game_message"]) => void): void {
        this.On("game_message", callback);
    }

    static OnGameNewmap(callback: (data: GameEventDefs["game_newmap"]) => void): void {
        this.On("game_newmap", callback);
    }

    static OnGamePhaseChanged(callback: (data: GameEventDefs["game_phase_changed"]) => void): void {
        this.On("game_phase_changed", callback);
    }

    static OnHltvCameraman(callback: (data: GameEventDefs["hltv_cameraman"]) => void): void {
        this.On("hltv_cameraman", callback);
    }

    static OnHltvChase(callback: (data: GameEventDefs["hltv_chase"]) => void): void {
        this.On("hltv_chase", callback);
    }

    static OnHltvRankCamera(callback: (data: GameEventDefs["hltv_rank_camera"]) => void): void {
        this.On("hltv_rank_camera", callback);
    }

    static OnHltvRankEntity(callback: (data: GameEventDefs["hltv_rank_entity"]) => void): void {
        this.On("hltv_rank_entity", callback);
    }

    static OnHltvFixed(callback: (data: GameEventDefs["hltv_fixed"]) => void): void {
        this.On("hltv_fixed", callback);
    }

    static OnHltvMessage(callback: (data: GameEventDefs["hltv_message"]) => void): void {
        this.On("hltv_message", callback);
    }

    static OnHltvStatus(callback: (data: GameEventDefs["hltv_status"]) => void): void {
        this.On("hltv_status", callback);
    }

    static OnHltvTitle(callback: (data: GameEventDefs["hltv_title"]) => void): void {
        this.On("hltv_title", callback);
    }

    static OnHltvChat(callback: (data: GameEventDefs["hltv_chat"]) => void): void {
        this.On("hltv_chat", callback);
    }

    static OnHltvVersioninfo(callback: (data: GameEventDefs["hltv_versioninfo"]) => void): void {
        this.On("hltv_versioninfo", callback);
    }

    static OnHltvReplay(callback: (data: GameEventDefs["hltv_replay"]) => void): void {
        this.On("hltv_replay", callback);
    }

    static OnHltvChangedMode(callback: (data: GameEventDefs["hltv_changed_mode"]) => void): void {
        this.On("hltv_changed_mode", callback);
    }

    static OnHltvReplayStatus(callback: (data: GameEventDefs["hltv_replay_status"]) => void): void {
        this.On("hltv_replay_status", callback);
    }

    static OnDemoStart(callback: (data: GameEventDefs["demo_start"]) => void): void {
        this.On("demo_start", callback);
    }

    static OnDemoStop(callback: (data: GameEventDefs["demo_stop"]) => void): void {
        this.On("demo_stop", callback);
    }

    static OnDemoSkip(callback: (data: GameEventDefs["demo_skip"]) => void): void {
        this.On("demo_skip", callback);
    }

    static OnMapShutdown(callback: (data: GameEventDefs["map_shutdown"]) => void): void {
        this.On("map_shutdown", callback);
    }

    static OnMapTransition(callback: (data: GameEventDefs["map_transition"]) => void): void {
        this.On("map_transition", callback);
    }

    static OnHostnameChanged(callback: (data: GameEventDefs["hostname_changed"]) => void): void {
        this.On("hostname_changed", callback);
    }

    static OnDifficultyChanged(callback: (data: GameEventDefs["difficulty_changed"]) => void): void {
        this.On("difficulty_changed", callback);
    }

    static OnWeaponFire(callback: (data: GameEventDefs["weapon_fire"]) => void): void {
        this.On("weapon_fire", callback);
    }

    static OnWeaponFireOnEmpty(callback: (data: GameEventDefs["weapon_fire_on_empty"]) => void): void {
        this.On("weapon_fire_on_empty", callback);
    }

    static OnWeaponOutofammo(callback: (data: GameEventDefs["weapon_outofammo"]) => void): void {
        this.On("weapon_outofammo", callback);
    }

    static OnWeaponReload(callback: (data: GameEventDefs["weapon_reload"]) => void): void {
        this.On("weapon_reload", callback);
    }

    static OnWeaponZoom(callback: (data: GameEventDefs["weapon_zoom"]) => void): void {
        this.On("weapon_zoom", callback);
    }

    static OnWeaponZoomRifle(callback: (data: GameEventDefs["weapon_zoom_rifle"]) => void): void {
        this.On("weapon_zoom_rifle", callback);
    }

    static OnGrenadeThrown(callback: (data: GameEventDefs["grenade_thrown"]) => void): void {
        this.On("grenade_thrown", callback);
    }

    static OnGrenadeBounce(callback: (data: GameEventDefs["grenade_bounce"]) => void): void {
        this.On("grenade_bounce", callback);
    }

    static OnHegrenadeDetonate(callback: (data: GameEventDefs["hegrenade_detonate"]) => void): void {
        this.On("hegrenade_detonate", callback);
    }

    static OnFlashbangDetonate(callback: (data: GameEventDefs["flashbang_detonate"]) => void): void {
        this.On("flashbang_detonate", callback);
    }

    static OnSmokegrenadeDetonate(callback: (data: GameEventDefs["smokegrenade_detonate"]) => void): void {
        this.On("smokegrenade_detonate", callback);
    }

    static OnSmokegrenadeExpired(callback: (data: GameEventDefs["smokegrenade_expired"]) => void): void {
        this.On("smokegrenade_expired", callback);
    }

    static OnMolotovDetonate(callback: (data: GameEventDefs["molotov_detonate"]) => void): void {
        this.On("molotov_detonate", callback);
    }

    static OnDecoyDetonate(callback: (data: GameEventDefs["decoy_detonate"]) => void): void {
        this.On("decoy_detonate", callback);
    }

    static OnDecoyStarted(callback: (data: GameEventDefs["decoy_started"]) => void): void {
        this.On("decoy_started", callback);
    }

    static OnDecoyFiring(callback: (data: GameEventDefs["decoy_firing"]) => void): void {
        this.On("decoy_firing", callback);
    }

    static OnTagrenadeDetonate(callback: (data: GameEventDefs["tagrenade_detonate"]) => void): void {
        this.On("tagrenade_detonate", callback);
    }

    static OnInfernoStartburn(callback: (data: GameEventDefs["inferno_startburn"]) => void): void {
        this.On("inferno_startburn", callback);
    }

    static OnInfernoExpire(callback: (data: GameEventDefs["inferno_expire"]) => void): void {
        this.On("inferno_expire", callback);
    }

    static OnInfernoExtinguish(callback: (data: GameEventDefs["inferno_extinguish"]) => void): void {
        this.On("inferno_extinguish", callback);
    }

    static OnBombBeginplant(callback: (data: GameEventDefs["bomb_beginplant"]) => void): void {
        this.On("bomb_beginplant", callback);
    }

    static OnBombAbortplant(callback: (data: GameEventDefs["bomb_abortplant"]) => void): void {
        this.On("bomb_abortplant", callback);
    }

    static OnBombPlanted(callback: (data: GameEventDefs["bomb_planted"]) => void): void {
        this.On("bomb_planted", callback);
    }

    static OnBombBegindefuse(callback: (data: GameEventDefs["bomb_begindefuse"]) => void): void {
        this.On("bomb_begindefuse", callback);
    }

    static OnBombAbortdefuse(callback: (data: GameEventDefs["bomb_abortdefuse"]) => void): void {
        this.On("bomb_abortdefuse", callback);
    }

    static OnBombDefused(callback: (data: GameEventDefs["bomb_defused"]) => void): void {
        this.On("bomb_defused", callback);
    }

    static OnBombExploded(callback: (data: GameEventDefs["bomb_exploded"]) => void): void {
        this.On("bomb_exploded", callback);
    }

    static OnBombDropped(callback: (data: GameEventDefs["bomb_dropped"]) => void): void {
        this.On("bomb_dropped", callback);
    }

    static OnBombPickup(callback: (data: GameEventDefs["bomb_pickup"]) => void): void {
        this.On("bomb_pickup", callback);
    }

    static OnBombBeep(callback: (data: GameEventDefs["bomb_beep"]) => void): void {
        this.On("bomb_beep", callback);
    }

    static OnDefuserDropped(callback: (data: GameEventDefs["defuser_dropped"]) => void): void {
        this.On("defuser_dropped", callback);
    }

    static OnDefuserPickup(callback: (data: GameEventDefs["defuser_pickup"]) => void): void {
        this.On("defuser_pickup", callback);
    }

    static OnHostageFollows(callback: (data: GameEventDefs["hostage_follows"]) => void): void {
        this.On("hostage_follows", callback);
    }

    static OnHostageHurt(callback: (data: GameEventDefs["hostage_hurt"]) => void): void {
        this.On("hostage_hurt", callback);
    }

    static OnHostageKilled(callback: (data: GameEventDefs["hostage_killed"]) => void): void {
        this.On("hostage_killed", callback);
    }

    static OnHostageRescued(callback: (data: GameEventDefs["hostage_rescued"]) => void): void {
        this.On("hostage_rescued", callback);
    }

    static OnHostageStopsFollowing(callback: (data: GameEventDefs["hostage_stops_following"]) => void): void {
        this.On("hostage_stops_following", callback);
    }

    static OnHostageRescuedAll(callback: (data: GameEventDefs["hostage_rescued_all"]) => void): void {
        this.On("hostage_rescued_all", callback);
    }

    static OnHostageCallForHelp(callback: (data: GameEventDefs["hostage_call_for_help"]) => void): void {
        this.On("hostage_call_for_help", callback);
    }

    static OnVipEscaped(callback: (data: GameEventDefs["vip_escaped"]) => void): void {
        this.On("vip_escaped", callback);
    }

    static OnVipKilled(callback: (data: GameEventDefs["vip_killed"]) => void): void {
        this.On("vip_killed", callback);
    }

    static OnItemPurchase(callback: (data: GameEventDefs["item_purchase"]) => void): void {
        this.On("item_purchase", callback);
    }

    static OnItemPickup(callback: (data: GameEventDefs["item_pickup"]) => void): void {
        this.On("item_pickup", callback);
    }

    static OnItemPickupSlerp(callback: (data: GameEventDefs["item_pickup_slerp"]) => void): void {
        this.On("item_pickup_slerp", callback);
    }

    static OnItemPickupFailed(callback: (data: GameEventDefs["item_pickup_failed"]) => void): void {
        this.On("item_pickup_failed", callback);
    }

    static OnItemRemove(callback: (data: GameEventDefs["item_remove"]) => void): void {
        this.On("item_remove", callback);
    }

    static OnItemEquip(callback: (data: GameEventDefs["item_equip"]) => void): void {
        this.On("item_equip", callback);
    }

    static OnItemSchemaInitialized(callback: (data: GameEventDefs["item_schema_initialized"]) => void): void {
        this.On("item_schema_initialized", callback);
    }

    static OnAmmoPickup(callback: (data: GameEventDefs["ammo_pickup"]) => void): void {
        this.On("ammo_pickup", callback);
    }

    static OnAmmoRefill(callback: (data: GameEventDefs["ammo_refill"]) => void): void {
        this.On("ammo_refill", callback);
    }

    static OnEnterBuyzone(callback: (data: GameEventDefs["enter_buyzone"]) => void): void {
        this.On("enter_buyzone", callback);
    }

    static OnExitBuyzone(callback: (data: GameEventDefs["exit_buyzone"]) => void): void {
        this.On("exit_buyzone", callback);
    }

    static OnEnterBombzone(callback: (data: GameEventDefs["enter_bombzone"]) => void): void {
        this.On("enter_bombzone", callback);
    }

    static OnExitBombzone(callback: (data: GameEventDefs["exit_bombzone"]) => void): void {
        this.On("exit_bombzone", callback);
    }

    static OnEnterRescueZone(callback: (data: GameEventDefs["enter_rescue_zone"]) => void): void {
        this.On("enter_rescue_zone", callback);
    }

    static OnExitRescueZone(callback: (data: GameEventDefs["exit_rescue_zone"]) => void): void {
        this.On("exit_rescue_zone", callback);
    }

    static OnBuytimeEnded(callback: (data: GameEventDefs["buytime_ended"]) => void): void {
        this.On("buytime_ended", callback);
    }

    static OnSilencerOff(callback: (data: GameEventDefs["silencer_off"]) => void): void {
        this.On("silencer_off", callback);
    }

    static OnSilencerOn(callback: (data: GameEventDefs["silencer_on"]) => void): void {
        this.On("silencer_on", callback);
    }

    static OnSilencerDetach(callback: (data: GameEventDefs["silencer_detach"]) => void): void {
        this.On("silencer_detach", callback);
    }

    static OnBuymenuOpen(callback: (data: GameEventDefs["buymenu_open"]) => void): void {
        this.On("buymenu_open", callback);
    }

    static OnBuymenuClose(callback: (data: GameEventDefs["buymenu_close"]) => void): void {
        this.On("buymenu_close", callback);
    }

    static OnInspectWeapon(callback: (data: GameEventDefs["inspect_weapon"]) => void): void {
        this.On("inspect_weapon", callback);
    }

    static OnOtherDeath(callback: (data: GameEventDefs["other_death"]) => void): void {
        this.On("other_death", callback);
    }

    static OnBulletImpact(callback: (data: GameEventDefs["bullet_impact"]) => void): void {
        this.On("bullet_impact", callback);
    }

    static OnBulletFlightResolution(callback: (data: GameEventDefs["bullet_flight_resolution"]) => void): void {
        this.On("bullet_flight_resolution", callback);
    }

    static OnDoorClose(callback: (data: GameEventDefs["door_close"]) => void): void {
        this.On("door_close", callback);
    }

    static OnDoorMoving(callback: (data: GameEventDefs["door_moving"]) => void): void {
        this.On("door_moving", callback);
    }

    static OnDoorBreak(callback: (data: GameEventDefs["door_break"]) => void): void {
        this.On("door_break", callback);
    }

    static OnDoorClosed(callback: (data: GameEventDefs["door_closed"]) => void): void {
        this.On("door_closed", callback);
    }

    static OnDoorOpen(callback: (data: GameEventDefs["door_open"]) => void): void {
        this.On("door_open", callback);
    }

    static OnBreakBreakable(callback: (data: GameEventDefs["break_breakable"]) => void): void {
        this.On("break_breakable", callback);
    }

    static OnBreakProp(callback: (data: GameEventDefs["break_prop"]) => void): void {
        this.On("break_prop", callback);
    }

    static OnBrokenBreakable(callback: (data: GameEventDefs["broken_breakable"]) => void): void {
        this.On("broken_breakable", callback);
    }

    static OnEntityKilled(callback: (data: GameEventDefs["entity_killed"]) => void): void {
        this.On("entity_killed", callback);
    }

    static OnEntityVisible(callback: (data: GameEventDefs["entity_visible"]) => void): void {
        this.On("entity_visible", callback);
    }

    static OnVoteStarted(callback: (data: GameEventDefs["vote_started"]) => void): void {
        this.On("vote_started", callback);
    }

    static OnVoteFailed(callback: (data: GameEventDefs["vote_failed"]) => void): void {
        this.On("vote_failed", callback);
    }

    static OnVotePassed(callback: (data: GameEventDefs["vote_passed"]) => void): void {
        this.On("vote_passed", callback);
    }

    static OnVoteChanged(callback: (data: GameEventDefs["vote_changed"]) => void): void {
        this.On("vote_changed", callback);
    }

    static OnVoteCastYes(callback: (data: GameEventDefs["vote_cast_yes"]) => void): void {
        this.On("vote_cast_yes", callback);
    }

    static OnVoteCastNo(callback: (data: GameEventDefs["vote_cast_no"]) => void): void {
        this.On("vote_cast_no", callback);
    }

    static OnVoteCast(callback: (data: GameEventDefs["vote_cast"]) => void): void {
        this.On("vote_cast", callback);
    }

    static OnVoteEnded(callback: (data: GameEventDefs["vote_ended"]) => void): void {
        this.On("vote_ended", callback);
    }

    static OnVoteOptions(callback: (data: GameEventDefs["vote_options"]) => void): void {
        this.On("vote_options", callback);
    }

    static OnStartVote(callback: (data: GameEventDefs["start_vote"]) => void): void {
        this.On("start_vote", callback);
    }

    static OnEnableRestartVoting(callback: (data: GameEventDefs["enable_restart_voting"]) => void): void {
        this.On("enable_restart_voting", callback);
    }

    static OnAchievementEvent(callback: (data: GameEventDefs["achievement_event"]) => void): void {
        this.On("achievement_event", callback);
    }

    static OnAchievementEarned(callback: (data: GameEventDefs["achievement_earned"]) => void): void {
        this.On("achievement_earned", callback);
    }

    static OnAchievementEarnedLocal(callback: (data: GameEventDefs["achievement_earned_local"]) => void): void {
        this.On("achievement_earned_local", callback);
    }

    static OnAchievementWriteFailed(callback: (data: GameEventDefs["achievement_write_failed"]) => void): void {
        this.On("achievement_write_failed", callback);
    }

    static OnAchievementInfoLoaded(callback: (data: GameEventDefs["achievement_info_loaded"]) => void): void {
        this.On("achievement_info_loaded", callback);
    }

    static OnBonusUpdated(callback: (data: GameEventDefs["bonus_updated"]) => void): void {
        this.On("bonus_updated", callback);
    }

    static OnSpecTargetUpdated(callback: (data: GameEventDefs["spec_target_updated"]) => void): void {
        this.On("spec_target_updated", callback);
    }

    static OnSpecModeUpdated(callback: (data: GameEventDefs["spec_mode_updated"]) => void): void {
        this.On("spec_mode_updated", callback);
    }

    static OnGameinstructorDraw(callback: (data: GameEventDefs["gameinstructor_draw"]) => void): void {
        this.On("gameinstructor_draw", callback);
    }

    static OnGameinstructorNodraw(callback: (data: GameEventDefs["gameinstructor_nodraw"]) => void): void {
        this.On("gameinstructor_nodraw", callback);
    }

    static OnInstructorStartLesson(callback: (data: GameEventDefs["instructor_start_lesson"]) => void): void {
        this.On("instructor_start_lesson", callback);
    }

    static OnInstructorCloseLesson(callback: (data: GameEventDefs["instructor_close_lesson"]) => void): void {
        this.On("instructor_close_lesson", callback);
    }

    static OnInstructorServerHintCreate(callback: (data: GameEventDefs["instructor_server_hint_create"]) => void): void {
        this.On("instructor_server_hint_create", callback);
    }

    static OnInstructorServerHintStop(callback: (data: GameEventDefs["instructor_server_hint_stop"]) => void): void {
        this.On("instructor_server_hint_stop", callback);
    }

    static OnClientsideLessonClosed(callback: (data: GameEventDefs["clientside_lesson_closed"]) => void): void {
        this.On("clientside_lesson_closed", callback);
    }

    static OnSetInstructorGroupEnabled(callback: (data: GameEventDefs["set_instructor_group_enabled"]) => void): void {
        this.On("set_instructor_group_enabled", callback);
    }

    static OnPhysgunPickup(callback: (data: GameEventDefs["physgun_pickup"]) => void): void {
        this.On("physgun_pickup", callback);
    }

    static OnFlareIgniteNpc(callback: (data: GameEventDefs["flare_ignite_npc"]) => void): void {
        this.On("flare_ignite_npc", callback);
    }

    static OnHelicopterGrenadePuntMiss(callback: (data: GameEventDefs["helicopter_grenade_punt_miss"]) => void): void {
        this.On("helicopter_grenade_punt_miss", callback);
    }

    static OnFinaleStart(callback: (data: GameEventDefs["finale_start"]) => void): void {
        this.On("finale_start", callback);
    }

    static OnUserDataDownloaded(callback: (data: GameEventDefs["user_data_downloaded"]) => void): void {
        this.On("user_data_downloaded", callback);
    }

    static OnReadGameTitledata(callback: (data: GameEventDefs["read_game_titledata"]) => void): void {
        this.On("read_game_titledata", callback);
    }

    static OnWriteGameTitledata(callback: (data: GameEventDefs["write_game_titledata"]) => void): void {
        this.On("write_game_titledata", callback);
    }

    static OnResetGameTitledata(callback: (data: GameEventDefs["reset_game_titledata"]) => void): void {
        this.On("reset_game_titledata", callback);
    }

    static OnWriteProfileData(callback: (data: GameEventDefs["write_profile_data"]) => void): void {
        this.On("write_profile_data", callback);
    }

    static OnRagdollDissolved(callback: (data: GameEventDefs["ragdoll_dissolved"]) => void): void {
        this.On("ragdoll_dissolved", callback);
    }

    static OnInventoryUpdated(callback: (data: GameEventDefs["inventory_updated"]) => void): void {
        this.On("inventory_updated", callback);
    }

    static OnCartUpdated(callback: (data: GameEventDefs["cart_updated"]) => void): void {
        this.On("cart_updated", callback);
    }

    static OnStorePricesheetUpdated(callback: (data: GameEventDefs["store_pricesheet_updated"]) => void): void {
        this.On("store_pricesheet_updated", callback);
    }

    static OnDropRateModified(callback: (data: GameEventDefs["drop_rate_modified"]) => void): void {
        this.On("drop_rate_modified", callback);
    }

    static OnEventTicketModified(callback: (data: GameEventDefs["event_ticket_modified"]) => void): void {
        this.On("event_ticket_modified", callback);
    }

    static OnGcConnected(callback: (data: GameEventDefs["gc_connected"]) => void): void {
        this.On("gc_connected", callback);
    }

    static OnDynamicShadowLightChanged(callback: (data: GameEventDefs["dynamic_shadow_light_changed"]) => void): void {
        this.On("dynamic_shadow_light_changed", callback);
    }

    static OnGameuiHidden(callback: (data: GameEventDefs["gameui_hidden"]) => void): void {
        this.On("gameui_hidden", callback);
    }

    static OnItemsGifted(callback: (data: GameEventDefs["items_gifted"]) => void): void {
        this.On("items_gifted", callback);
    }

    static OnWarmupEnd(callback: (data: GameEventDefs["warmup_end"]) => void): void {
        this.On("warmup_end", callback);
    }

    static OnAnnouncePhaseEnd(callback: (data: GameEventDefs["announce_phase_end"]) => void): void {
        this.On("announce_phase_end", callback);
    }

    static OnCsIntermission(callback: (data: GameEventDefs["cs_intermission"]) => void): void {
        this.On("cs_intermission", callback);
    }

    static OnCsGameDisconnected(callback: (data: GameEventDefs["cs_game_disconnected"]) => void): void {
        this.On("cs_game_disconnected", callback);
    }

    static OnCsRoundFinalBeep(callback: (data: GameEventDefs["cs_round_final_beep"]) => void): void {
        this.On("cs_round_final_beep", callback);
    }

    static OnCsRoundStartBeep(callback: (data: GameEventDefs["cs_round_start_beep"]) => void): void {
        this.On("cs_round_start_beep", callback);
    }

    static OnCsWinPanelRound(callback: (data: GameEventDefs["cs_win_panel_round"]) => void): void {
        this.On("cs_win_panel_round", callback);
    }

    static OnCsWinPanelMatch(callback: (data: GameEventDefs["cs_win_panel_match"]) => void): void {
        this.On("cs_win_panel_match", callback);
    }

    static OnCsMatchEndRestart(callback: (data: GameEventDefs["cs_match_end_restart"]) => void): void {
        this.On("cs_match_end_restart", callback);
    }

    static OnCsPreRestart(callback: (data: GameEventDefs["cs_pre_restart"]) => void): void {
        this.On("cs_pre_restart", callback);
    }

    static OnCsPrevNextSpectator(callback: (data: GameEventDefs["cs_prev_next_spectator"]) => void): void {
        this.On("cs_prev_next_spectator", callback);
    }

    static OnShowDeathpanel(callback: (data: GameEventDefs["show_deathpanel"]) => void): void {
        this.On("show_deathpanel", callback);
    }

    static OnHideDeathpanel(callback: (data: GameEventDefs["hide_deathpanel"]) => void): void {
        this.On("hide_deathpanel", callback);
    }

    static OnUgcMapInfoReceived(callback: (data: GameEventDefs["ugc_map_info_received"]) => void): void {
        this.On("ugc_map_info_received", callback);
    }

    static OnUgcMapUnsubscribed(callback: (data: GameEventDefs["ugc_map_unsubscribed"]) => void): void {
        this.On("ugc_map_unsubscribed", callback);
    }

    static OnUgcMapDownloadError(callback: (data: GameEventDefs["ugc_map_download_error"]) => void): void {
        this.On("ugc_map_download_error", callback);
    }

    static OnUgcFileDownloadFinished(callback: (data: GameEventDefs["ugc_file_download_finished"]) => void): void {
        this.On("ugc_file_download_finished", callback);
    }

    static OnUgcFileDownloadStart(callback: (data: GameEventDefs["ugc_file_download_start"]) => void): void {
        this.On("ugc_file_download_start", callback);
    }

    static OnBeginNewMatch(callback: (data: GameEventDefs["begin_new_match"]) => void): void {
        this.On("begin_new_match", callback);
    }

    static OnMatchEndConditions(callback: (data: GameEventDefs["match_end_conditions"]) => void): void {
        this.On("match_end_conditions", callback);
    }

    static OnEndmatchMapvoteSelectingMap(callback: (data: GameEventDefs["endmatch_mapvote_selecting_map"]) => void): void {
        this.On("endmatch_mapvote_selecting_map", callback);
    }

    static OnEndmatchCmmStartRevealItems(callback: (data: GameEventDefs["endmatch_cmm_start_reveal_items"]) => void): void {
        this.On("endmatch_cmm_start_reveal_items", callback);
    }

    static OnNextlevelChanged(callback: (data: GameEventDefs["nextlevel_changed"]) => void): void {
        this.On("nextlevel_changed", callback);
    }

    static OnDmBonusWeaponStart(callback: (data: GameEventDefs["dm_bonus_weapon_start"]) => void): void {
        this.On("dm_bonus_weapon_start", callback);
    }

    static OnGgKilledEnemy(callback: (data: GameEventDefs["gg_killed_enemy"]) => void): void {
        this.On("gg_killed_enemy", callback);
    }

    static OnSwitchTeam(callback: (data: GameEventDefs["switch_team"]) => void): void {
        this.On("switch_team", callback);
    }

    static OnTrialTimeExpired(callback: (data: GameEventDefs["trial_time_expired"]) => void): void {
        this.On("trial_time_expired", callback);
    }

    static OnUpdateMatchmakingStats(callback: (data: GameEventDefs["update_matchmaking_stats"]) => void): void {
        this.On("update_matchmaking_stats", callback);
    }

    static OnClientDisconnect(callback: (data: GameEventDefs["client_disconnect"]) => void): void {
        this.On("client_disconnect", callback);
    }

    static OnClientLoadoutChanged(callback: (data: GameEventDefs["client_loadout_changed"]) => void): void {
        this.On("client_loadout_changed", callback);
    }

    static OnAddPlayerSonarIcon(callback: (data: GameEventDefs["add_player_sonar_icon"]) => void): void {
        this.On("add_player_sonar_icon", callback);
    }

    static OnAddBulletHitMarker(callback: (data: GameEventDefs["add_bullet_hit_marker"]) => void): void {
        this.On("add_bullet_hit_marker", callback);
    }

    static OnSfuievent(callback: (data: GameEventDefs["sfuievent"]) => void): void {
        this.On("sfuievent", callback);
    }

    static OnWeaponhudSelection(callback: (data: GameEventDefs["weaponhud_selection"]) => void): void {
        this.On("weaponhud_selection", callback);
    }

    static OnTrPlayerFlashbanged(callback: (data: GameEventDefs["tr_player_flashbanged"]) => void): void {
        this.On("tr_player_flashbanged", callback);
    }

    static OnTrMarkComplete(callback: (data: GameEventDefs["tr_mark_complete"]) => void): void {
        this.On("tr_mark_complete", callback);
    }

    static OnTrMarkBestTime(callback: (data: GameEventDefs["tr_mark_best_time"]) => void): void {
        this.On("tr_mark_best_time", callback);
    }

    static OnTrExitHintTrigger(callback: (data: GameEventDefs["tr_exit_hint_trigger"]) => void): void {
        this.On("tr_exit_hint_trigger", callback);
    }

    static OnTrShowFinishMsgbox(callback: (data: GameEventDefs["tr_show_finish_msgbox"]) => void): void {
        this.On("tr_show_finish_msgbox", callback);
    }

    static OnTrShowExitMsgbox(callback: (data: GameEventDefs["tr_show_exit_msgbox"]) => void): void {
        this.On("tr_show_exit_msgbox", callback);
    }

    static OnBotTakeover(callback: (data: GameEventDefs["bot_takeover"]) => void): void {
        this.On("bot_takeover", callback);
    }

    static OnJointeamFailed(callback: (data: GameEventDefs["jointeam_failed"]) => void): void {
        this.On("jointeam_failed", callback);
    }

    static OnTeamchangePending(callback: (data: GameEventDefs["teamchange_pending"]) => void): void {
        this.On("teamchange_pending", callback);
    }

    static OnMaterialDefaultComplete(callback: (data: GameEventDefs["material_default_complete"]) => void): void {
        this.On("material_default_complete", callback);
    }

    static OnSeasoncoinLevelup(callback: (data: GameEventDefs["seasoncoin_levelup"]) => void): void {
        this.On("seasoncoin_levelup", callback);
    }

    static OnTournamentReward(callback: (data: GameEventDefs["tournament_reward"]) => void): void {
        this.On("tournament_reward", callback);
    }

    static OnStartHalftime(callback: (data: GameEventDefs["start_halftime"]) => void): void {
        this.On("start_halftime", callback);
    }

    static OnPlayerDecal(callback: (data: GameEventDefs["player_decal"]) => void): void {
        this.On("player_decal", callback);
    }

    static OnSurvivalTeammateRespawn(callback: (data: GameEventDefs["survival_teammate_respawn"]) => void): void {
        this.On("survival_teammate_respawn", callback);
    }

    static OnSurvivalNoRespawnsWarning(callback: (data: GameEventDefs["survival_no_respawns_warning"]) => void): void {
        this.On("survival_no_respawns_warning", callback);
    }

    static OnSurvivalNoRespawnsFinal(callback: (data: GameEventDefs["survival_no_respawns_final"]) => void): void {
        this.On("survival_no_respawns_final", callback);
    }

    static OnShowSurvivalRespawnStatus(callback: (data: GameEventDefs["show_survival_respawn_status"]) => void): void {
        this.On("show_survival_respawn_status", callback);
    }

    static OnGuardianWaveRestart(callback: (data: GameEventDefs["guardian_wave_restart"]) => void): void {
        this.On("guardian_wave_restart", callback);
    }

    static OnNavBlocked(callback: (data: GameEventDefs["nav_blocked"]) => void): void {
        this.On("nav_blocked", callback);
    }

    static OnNavGenerate(callback: (data: GameEventDefs["nav_generate"]) => void): void {
        this.On("nav_generate", callback);
    }

    static OnRepostXboxAchievements(callback: (data: GameEventDefs["repost_xbox_achievements"]) => void): void {
        this.On("repost_xbox_achievements", callback);
    }

    static OnMbInputLockSuccess(callback: (data: GameEventDefs["mb_input_lock_success"]) => void): void {
        this.On("mb_input_lock_success", callback);
    }

    static OnMbInputLockCancel(callback: (data: GameEventDefs["mb_input_lock_cancel"]) => void): void {
        this.On("mb_input_lock_cancel", callback);
    }

    static OnDronegunAttack(callback: (data: GameEventDefs["dronegun_attack"]) => void): void {
        this.On("dronegun_attack", callback);
    }

    static OnDroneDispatched(callback: (data: GameEventDefs["drone_dispatched"]) => void): void {
        this.On("drone_dispatched", callback);
    }

    static OnDroneCargoDetached(callback: (data: GameEventDefs["drone_cargo_detached"]) => void): void {
        this.On("drone_cargo_detached", callback);
    }

    static OnDroneAboveRoof(callback: (data: GameEventDefs["drone_above_roof"]) => void): void {
        this.On("drone_above_roof", callback);
    }

    static OnLootCrateVisible(callback: (data: GameEventDefs["loot_crate_visible"]) => void): void {
        this.On("loot_crate_visible", callback);
    }

    static OnLootCrateOpened(callback: (data: GameEventDefs["loot_crate_opened"]) => void): void {
        this.On("loot_crate_opened", callback);
    }

    static OnOpenCrateInstructions(callback: (data: GameEventDefs["open_crate_instr"]) => void): void {
        this.On("open_crate_instr", callback);
    }

    static OnSmokeBeaconParadrop(callback: (data: GameEventDefs["smoke_beacon_paradrop"]) => void): void {
        this.On("smoke_beacon_paradrop", callback);
    }

    static OnSurvivalParadropSpawned(callback: (data: GameEventDefs["survival_paradrop_spawn"]) => void): void {
        this.On("survival_paradrop_spawn", callback);
    }

    static OnSurvivalParadropBreak(callback: (data: GameEventDefs["survival_paradrop_break"]) => void): void {
        this.On("survival_paradrop_break", callback);
    }

    static OnChoppersIncomingWarning(callback: (data: GameEventDefs["choppers_incoming_warning"]) => void): void {
        this.On("choppers_incoming_warning", callback);
    }

    static OnFirstbombsIncomingWarning(callback: (data: GameEventDefs["firstbombs_incoming_warning"]) => void): void {
        this.On("firstbombs_incoming_warning", callback);
    }

    static OnDzItemInteraction(callback: (data: GameEventDefs["dz_item_interaction"]) => void): void {
        this.On("dz_item_interaction", callback);
    }

    static OnParachutePickup(callback: (data: GameEventDefs["parachute_pickup"]) => void): void {
        this.On("parachute_pickup", callback);
    }

    static OnParachuteDeploy(callback: (data: GameEventDefs["parachute_deploy"]) => void): void {
        this.On("parachute_deploy", callback);
    }

    static OnSurvivalAnnouncePhase(callback: (data: GameEventDefs["survival_announce_phase"]) => void): void {
        this.On("survival_announce_phase", callback);
    }
}
