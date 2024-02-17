<?php

    $types = [
        'reality',
        'vless',
        'ss',
        'hy2',
        'trojan',
        'tuic',
    ];
    $getList = file_get_contents('https://raw.githubusercontent.com/yebekhe/TVC/main/api/allConfigs.json?v1.'.time());
    $allConfigs = json_decode($getList, true);

    $i = 1;
    $list = [];
    foreach($types as $type) {
        $list[$type] = [];
        foreach ( $allConfigs as $config) {
            if ( $i > 50 ) {
                $i = 1;
                break;
            }
            if ($config['type'] === $type) {
                $list[$type][] = $config['config'];
                $i++;
            }
        }
    }

    $z = 1;
    $mix = '';
    foreach ( $allConfigs as $k => $config) {
        if ( $z > 50 ) {
            break;
        }
        if ( empty($config['config']) ) {
            continue;
        }
        $mix .= $config['config'].( $k !== end($allConfigs) ? "\n" : "");
        $z++;
    }
    file_put_contents("sub/mix", $mix);

    $html = '';
    foreach($types as $type) {
        foreach ( $list[$type] as $key => $l) {
            if ( empty($l) ) {
                continue;
            }
            $html .= $l.( $key !== end($list[$type]) ? "\n" : "");
        }
        file_put_contents("sub/".$type, $html);
        $html = '';
    }