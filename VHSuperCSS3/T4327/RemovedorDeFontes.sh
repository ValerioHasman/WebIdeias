#!/bin/bash

apagarFontes(){
font_names=("Suranna" "Suruma" "Vemana2000" "Gargi" "Gubbi" "Kalapi" "Kalimati" "LakkiReddy" "Mukti" "Navilu" "Pagul" "Ponnala" "Pothana2000" "RaghuMalayalamSans" "RaviPrakash" "Kacst" "Samyak" "Peddana" "Lohit" "Mitra" "/Standard" "utkal" "Mallanna" "LKLUG" "NTR" "padmmaa" "Timmana" "NATS" "Mandali" "Ramaraja" "Ramabhadra" "Potti" "Rekha" "Saab" "TenaliRamakrishna" "Syamala" "Noto" "Ani" "Sree" "Sarai" "Gurajada" "Gidugu" "Dhurjati" "Likhan" "Suravaram" "aakar" "Droid Sans Fallback")

    for font_name in "${font_names[@]}"; do
        font_paths=($(fc-list | grep "$font_name" | grep -v "/NotoSans-" | grep -v "/NotoSansSymbols2-" | grep -v "/NotoSerif-" | grep -v "/NotoColorEmoji" | grep -v "/NotoMono-" | awk -F: '{print $1}'))
        for path in "${font_paths[@]}"; do
            if [ -f "$path" ]; then
                echo "Removendo $path"
                echo "$path" >> ItensExcluidos.txt
                sudo rm "$path"
            else
                echo "Arquivo não encontrado: $path"
            fi
        done
    done

    sudo fc-cache -f -v

}

apagarFontesM(){
font_names=("\-Semi" "\-Bold" "\-Medium" "\-Extra" "\-Light" "\-Condensed" "\-Black")

    for font_name in "${font_names[@]}"; do
        font_paths=($(fc-list | grep "$font_name" | awk -F: '{print $1}'))
        for path in "${font_paths[@]}"; do
            if [ -f "$path" ]; then
                echo "Removendo $path"
                echo "$path" >> ItensExcluidos.txt
                sudo rm "$path"
            else
                echo "Arquivo não encontrado: $path"
            fi
        done
    done
    sleep 30
    sudo fc-cache -f -v

}

MSGFinalizar(){
    echo ""
    echo ""
    echo '	Fontes excluídas ✓'
    echo ""
    echo ""
    open ./ItensExcluidos.txt
    notify-send "Itens Excluidos" "Fontes removidas"
    sleep 10
}

while true; do
    senha=$(zenity --password --title="Senha" --text="")

    if [ $? -ne 0 ]; then
        zenity --error --text="Você cancelou a operação."
        exit 1
    fi

    echo "$senha" | sudo -S ls /root > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        apagarFontes
        MSGFinalizar
        break
    else
        zenity --error --text="Senha incorreta.\nTente novamente."
    fi
done

