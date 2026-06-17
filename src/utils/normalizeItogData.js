function normalizeItogData(data){
    for (let i=0;i<=23;i++){
        data.active[i][1]=String((data.active[i][1]/1000).toFixed(3)).replace(".",",")
        data.reactive[i][1]=String((data.reactive[i][1]/1000).toFixed(3)).replace(".",",")
    };
   let ActivePower= {gen1:data.active[0][1],gen2:data.active[1][1],gen3:data.active[2][1],gen4:data.active[3][1],gen5:data.active[4][1],gen6:data.active[5][1],
    gen7:data.active[6][1],gen8:data.active[7][1],viazn:data.active[8][1],semenov:data.active[9][1], malah_1:data.active[10][1],levob_1:data.active[11][1],
    sormov:data.active[12][1],cbk:data.active[13][1],zmz:data.active[14][1],malah_2:data.active[15][1],puchezh_1:data.active[16][1],
    zapad:data.active[17][1],dzer:data.active[18][1],luch:data.active[19][1],vikl_OSSH:data.active[20][1],
    levob_2:data.active[21][1],T32:data.active[22][1],T31:data.active[23][1]};

   let ReactivePower={gen1:data.reactive[0][1],gen2:data.reactive[1][1],gen3:data.reactive[2][1],gen4:data.reactive[3][1],gen5:data.reactive[4][1],gen6:data.reactive[5][1],
    gen7:data.reactive[6][1],gen8:data.reactive[7][1],viazn:data.reactive[8][1],semenov:data.reactive[9][1], malah_1:data.reactive[10][1],levob_1:data.reactive[11][1],
    sormov:data.reactive[12][1],cbk:data.reactive[13][1],zmz:data.reactive[14][1],malah_2:data.reactive[15][1],puchezh_1:data.reactive[16][1],
    zapad:data.reactive[17][1],dzer:data.reactive[18][1],luch:data.reactive[19][1],vikl_OSSH:data.reactive[20][1],
    levob_2:data.reactive[21][1],T32:data.reactive[22][1],T31:data.reactive[23][1]};

   return {ActivePower,ReactivePower}

}

export default normalizeItogData;