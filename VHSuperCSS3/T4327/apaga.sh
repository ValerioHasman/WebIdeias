#!/bin/bash

font_names=("Kacst" "Samyak" "Peddana" "Lohit" "Mitra" "/Standard" "utkal" "Mallanna" "LKLUG" "NTR" "padmmaa" "Timmana" "NATS" "Mandali" "Ramaraja" "Ramabhadra" "Potti" "Rekha" "TenaliRamakrishna" "Syamala" "Noto" "Ani" "Sree" "Sarai" "Gurajada" "Gidugu" "Dhurjati" "Likhan" "Suravaram")

for font_name in "${font_names[@]}"; do
    font_paths=($(fc-list | grep "$font_name" | grep -v "/NotoSans-" | grep -v "/NotoSerif-" | grep -v "/NotoColorEmoji" | grep -v "/NotoMono-" | awk -F: '{print $1}'))
    for path in "${font_paths[@]}"; do
        if [ -f "$path" ]; then
            echo "Removendo $path"
            sudo rm "$path"
        else
            echo "Arquivo não encontrado: $path"
        fi
    done
done

sudo fc-cache -f -v

