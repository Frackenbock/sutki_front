function calculationVSP(data,openTimeHours,openTimeMinutes,closeTimeHours,closeTimeMinutes,type,prolet,ubv,ubv_1,ubv_2){ 
    let rashodM, rashodS, workTime, stok;
    ubv = Number(ubv)
    ubv_1 = Number(ubv_1)
    ubv_2 = Number(ubv_2)
    if(Number(prolet)>=1&&Number(prolet)<=10){
        if(type==='1 м'){
            let rashodInt1 = Number((data.data_nap_1[0].open_1_m).replace(",","."));
            let rashodInt2 = Number((data.data_nap_2[0].open_1_m).replace(",","."));
            rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
        };
        if(type==='2 м'){
            let rashodInt1 = Number((data.data_nap_1[0].open_2_m).replace(",","."));
            let rashodInt2 = Number((data.data_nap_2[0].open_2_m).replace(",","."));
            rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
        };
        if(type==='3 м'){
            let rashodInt1 = Number((data.data_nap_1[0].open_3_m).replace(",","."));
            let rashodInt2 = Number((data.data_nap_2[0].open_3_m).replace(",","."));
            rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
        };
        if(type==='Полное открытие'){
            let rashodInt1 = Number((data.data_nap_1[0].full_open).replace(",","."));
            let rashodInt2 = Number((data.data_nap_2[0].full_open).replace(",","."));
            rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
        };
    }else{
        if(type==='Перелив ниж. секц.'){
            let rashodInt1 = Number((data.data_nap_1[0].overflow_lower_section).replace(",","."));
            let rashodInt2 = Number((data.data_nap_2[0].overflow_lower_section).replace(",","."));
            rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
        };
        if(type==='Полное открытие'){
            let rashodInt1 = Number((data.data_nap_1[0].full_open).replace(",","."));
            let rashodInt2 = Number((data.data_nap_2[0].full_open).replace(",","."));
            rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
        };
    };
    rashodM = rashodM.toFixed(1);
    let openHour = Number(openTimeHours); 
    let openMinutes =  Number(openTimeMinutes);
    let closeHour = Number(closeTimeHours);
    let closeMinutes = Number(closeTimeMinutes);

    if(openHour===0&&openMinutes===0&&closeHour===0&&closeMinutes===0){
        workTime=86400
    };
    if(openHour===0&&openMinutes===0&&(closeHour!==0||closeMinutes!==0)){
        workTime=(closeHour*3600)+(closeMinutes*60);
    };
    if((openHour!==0||openMinutes!==0)&&closeHour===0&&closeMinutes===0){
        workTime=86400-(openHour*3600)+(openMinutes*60);
    };
    if((openHour!==0||openMinutes!==0)&&(closeHour!==0||closeMinutes!==0)){
        workTime=((closeHour*3600)+(closeMinutes*60))-((openHour*3600)+(openMinutes*60));
    };

    stok = ((rashodM*workTime)/1000000).toFixed(3);
    rashodS = (stok*1000000/86400).toFixed(2);
    return {workTime,rashodM,rashodS,stok}
}

export default calculationVSP;