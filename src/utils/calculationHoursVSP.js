import apiVSP from "../API/fetchVSP"

function calculationHoursVSP(data){ 
    let rashodM
    let ArrData=[];//основной массив для возврата обратно
    let arrForTimes=[]//массив для значений проработанного количества минут в каждом часе
    let proletArr =[]//массив для пролётов, для которых нет записей
    let allProletsArr=['1','2','3','4','5','6','7','8','9','10','11','12']
    const vspFetch = new apiVSP();

    for(let t=0;t<data.dataRecords.length;t++){
         if(!proletArr.includes(data.dataRecords[t].prolet)){
             proletArr.push(data.dataRecords[t].prolet)
         };

        let arrTimesRashod=[];
        let hourBegin=Number(data.dataRecords[t].open_time.slice(0,2))
        let hourEnd=Number(data.dataRecords[t].close_time.slice(0,2))
        let minutesBegin=Number(data.dataRecords[t].open_time.slice(3,5))
        let minutesEnd=Number(data.dataRecords[t].close_time.slice(3,5))
        if(hourBegin===0&&minutesBegin===0&&hourEnd===24){//если пролёт был открыт c 00:00 до 24
            arrTimesRashod=[60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,]}

        else if(hourBegin===0&&minutesBegin!==0&&hourEnd===24){//если пролёт был открыт  c 00:мм до 24
            arrTimesRashod=[60-minutesBegin,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,]}

        else if(hourBegin!==0&&minutesBegin===0&&hourEnd===24){//если пролёт был открыт  c чч:00 до 24
            for(let i=0;i<hourBegin;i++){arrTimesRashod.push(0)};
            for(let i=hourBegin;i<hourEnd;i++){arrTimesRashod.push(60)}}

        else if(hourBegin!==0&&minutesBegin!==0&&hourEnd===24){//если пролёт был открыт c чч:мм до 24
            for(let i=0;i<hourBegin;i++){arrTimesRashod.push(0)};
            arrTimesRashod.push(60-minutesBegin);
            for(let i=hourBegin;i<23;i++){arrTimesRashod.push(60)}}

        else if(hourBegin===0&&minutesBegin===0&&hourEnd!==24&&minutesEnd===0){//если пролёт был открыт c 00:00 до чч:00
            for(let i=0;i<hourEnd;i++){arrTimesRashod.push(60)};
            for(let i=hourEnd;i<24;i++){arrTimesRashod.push(0)}}

        else if(hourBegin===0&&minutesBegin===0&&hourEnd===23&&minutesEnd!==0){//если пролёт был открыт c 00:00 до 23:мм
            arrTimesRashod=[60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,minutesEnd]}

        else if(hourBegin===0&&minutesBegin!==0&&hourEnd===23&&minutesEnd!==0){//если пролёт был открыт c 00:мм до 23:мм
            arrTimesRashod=[60-minutesBegin,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,minutesEnd]}

        else if(hourBegin===0&&minutesBegin===0&&hourEnd!==(23||24)&&minutesEnd!==0){//если пролёт был открыт c 00:00 до чч:мм
            for(let i=0;i<hourEnd;i++){arrTimesRashod.push(60)};
            arrTimesRashod.push(minutesEnd);
            for(let i=hourEnd;i<23;i++){arrTimesRashod.push(0)}}

        else if(hourBegin!==0&&hourEnd!==24){//если пролёт был открыт c чч до чч
            if(minutesBegin===0&&minutesEnd===0){//если минуты равны 0
                for(let i=0;i<hourBegin;i++){arrTimesRashod.push(0)};
                for(let i=hourBegin;i<hourEnd;i++){arrTimesRashod.push(60)}
                for(let i=hourEnd;i<24;i++){arrTimesRashod.push(0)}
            }
            if(minutesBegin!==0&&minutesEnd===0){//если минуты начала не равны 0, минуты конца равны 0
                for(let i=0;i<hourBegin;i++){arrTimesRashod.push(0)};
                arrTimesRashod.push(60-minutesBegin);
                for(let i=hourBegin+1;i<hourEnd;i++){arrTimesRashod.push(60)}
                for(let i=hourEnd;i<24;i++){arrTimesRashod.push(0)}
            }

            if(minutesBegin===0&&minutesEnd!==0){//если минуты начала равны 0, минуты конца не равны 0
                for(let i=0;i<hourBegin;i++){arrTimesRashod.push(0)};
                for(let i=hourBegin;i<hourEnd;i++){arrTimesRashod.push(60)}
                arrTimesRashod.push(minutesEnd);
                for(let i=hourEnd+1;i<24;i++){arrTimesRashod.push(0)}
            }

            if(minutesBegin!==0&&minutesEnd!==0){//если минуты начала не равны 0, минуты конца не равны 0
                for(let i=0;i<hourBegin;i++){arrTimesRashod.push(0)};
                arrTimesRashod.push(60-minutesBegin);
                for(let i=hourBegin+1;i<hourEnd;i++){arrTimesRashod.push(60)}
                arrTimesRashod.push(minutesEnd);
                for(let i=hourEnd+1;i<24;i++){arrTimesRashod.push(0)}
            }
        }
        arrForTimes.push(arrTimesRashod)
    };

    const resp = vspFetch.getAllInterpolationData()
    .then((dataInt)=>{
        for(let i=0;i<24;i++){ 
            let elem={}
            const promejut= Math.trunc(Number((data.dataUVB[0][`uvb_${i+1}`]).replace(",","."))*10)/10
            let ubv_1 = promejut.toFixed(1);
            let ubv_2 = (promejut+0.1).toFixed(1);
            let ubv = Number((data.dataUVB[0][`uvb_${i+1}`]).replace(",","."))
            elem.ubv = ubv;
            elem.hour = i+1;
            elem.arrProlRas=[];
            for(let j=0; j<data.dataRecords.length;j++){
                let prolet = data.dataRecords[j].prolet;
                let type = data.dataRecords[j].type_open; 
                let neededObject1,neededObject2;

                 if(Number(prolet)>=1&&Number(prolet)<=10){
                        for(let k=0;k<=dataInt.dataFor1_10.length;k++){
                            if (ubv_1===dataInt.dataFor1_10[i].ubv){
                                neededObject1=dataInt.dataFor1_10[i]
                            }
                            if (ubv_2===dataInt.dataFor1_10[i].ubv){
                                neededObject2=dataInt.dataFor1_10[i]
                            }
                        }
                    for(let k=0;k<dataInt.dataFor1_10.length;k++){
                        if (ubv_1===(dataInt.dataFor1_10[k].ubv).replace(",",".")){
                            neededObject1=dataInt.dataFor1_10[k];
                        }
                        if (ubv_2===(dataInt.dataFor1_10[k].ubv).replace(",",".")){
                            neededObject2=dataInt.dataFor1_10[k];
                        }
                    }
                    if(type==='1 м'){
                        let rashodInt1 = Number((neededObject1.open_1_m).replace(",","."));
                        let rashodInt2 = Number((neededObject2.open_1_m).replace(",","."));
                        rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                    };
                    if(type==='2 м'){
                        let rashodInt1 = Number((neededObject1.open_2_m).replace(",","."));
                        let rashodInt2 = Number((neededObject2.open_2_m).replace(",","."));
                        rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                    };
                    if(type==='3 м'){
                        let rashodInt1 = Number((neededObject1.open_3_m).replace(",","."));
                        let rashodInt2 = Number((neededObject2.open_3_m).replace(",","."));
                        rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                    };
                    if(type==='Полное открытие'){
                        let rashodInt1 = Number((neededObject1.full_open).replace(",","."));
                        let rashodInt2 = Number((neededObject2.full_open).replace(",","."));
                        rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                    };
                 }else{
                    for(let k=0;k<dataInt.dataFor11_12.length;k++){
                        if (ubv_1===(dataInt.dataFor11_12[k].ubv).replace(",",".")){
                            neededObject1=dataInt.dataFor11_12[k];
                        };
                        if (ubv_2===(dataInt.dataFor11_12[k].ubv).replace(",",".")){
                            neededObject2=dataInt.dataFor11_12[k];
                        };
                    };
                    if(type==='Перелив ниж. секц.'){
                        let rashodInt1 = Number((neededObject1.overflow_lower_section).replace(",","."));
                        let rashodInt2 = Number((neededObject2.overflow_lower_section).replace(",","."));
                        rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1))
                    };
                    if(type==='Полное открытие'){
                        let rashodInt1 = Number((neededObject1.full_open).replace(",","."));
                        let rashodInt2 = Number((neededObject2.full_open).replace(",","."));
                        rashodM = rashodInt1+(((rashodInt2-rashodInt1)/(ubv_2-ubv_1))*(ubv-ubv_1));
                    };
                 };
                 elem.arrProlRas.push({rashodM:rashodM.toFixed(1),prolet,type, time: arrForTimes[j][i]})//, time:arrTimesRashod[j][i]
            };
            ArrData.push(elem);
        };

        for(let i=0;i<proletArr.length;i++){//из общего числа пролётов (12) удаляем те, для которых существуют записи в журнале
            if(allProletsArr.includes(proletArr[i])){
                const index = allProletsArr.indexOf(proletArr[i]);
                if (index !== -1) {
                    allProletsArr.splice(index, 1);
                };
            }; 
        }; 

        const lengthArr=ArrData[0].arrProlRas.length
        for(let i=0; i<ArrData.length;i++){//заполняем нулевыми значениями те пролёты, для которых нет записий в журнале
            for(let j=0;j<lengthArr;j++){
                if(ArrData[i].arrProlRas[j].time===0){
                    ArrData[i].arrProlRas[j].rashodM=0;
                    ArrData[i].arrProlRas[j].rashodSrH=0;
                    ArrData[i].arrProlRas[j].stok=0;
                }else{
                    ArrData[i].arrProlRas[j].rashodSrH=(Number(ArrData[i].arrProlRas[j].rashodM)*ArrData[i].arrProlRas[j].time*60/3600).toFixed(2);
                    ArrData[i].arrProlRas[j].stok=(Number(ArrData[i].arrProlRas[j].rashodM)*ArrData[i].arrProlRas[j].time*60).toFixed(2);

                };
            };
            for(let o=0;o<allProletsArr.length;o++){
                ArrData[i].arrProlRas.push({rashodM: 0, prolet: allProletsArr[o], time: 0, rashodSrH: 0,stok:0})
            }
        };

        let finalArr=[]
        for(let i=0;i<ArrData.length;i++){
            let elem={ubv:ArrData[i].ubv,hour:ArrData[i].hour}
            for(let j=0;j<ArrData[i].arrProlRas.length;j++){
                if(elem.hasOwnProperty("pr"+ArrData[i].arrProlRas[j].prolet)){ 
                    if(elem["time"+ArrData[i].arrProlRas[j].prolet]===0){
                        delete elem["time"+ArrData[i].arrProlRas[j].prolet]
                        delete elem["pr"+ArrData[i].arrProlRas[j].prolet]
                        delete elem["rashodSrH"+ArrData[i].arrProlRas[j].prolet] 
                        delete elem["stok"+ArrData[i].arrProlRas[j].prolet]
                        elem["pr"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].prolet
                        elem["time"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].time
                        elem["rashodSrH"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].rashodSrH
                        elem["stok"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].stok
                    }else{
                        elem["pr"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].prolet
                        elem["time"+ArrData[i].arrProlRas[j].prolet]= elem["time"+ArrData[i].arrProlRas[j].prolet] + ArrData[i].arrProlRas[j].time
                        elem["rashodSrH"+ArrData[i].arrProlRas[j].prolet]=((Number(elem["stok"+ArrData[i].arrProlRas[j].prolet])+Number(ArrData[i].arrProlRas[j].stok))/3600).toFixed(2)
                        elem["stok"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].stok
                    }
                }else{
                    elem["pr"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].prolet
                    elem["time"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].time
                    elem["rashodSrH"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].rashodSrH
                    elem["stok"+ArrData[i].arrProlRas[j].prolet]=ArrData[i].arrProlRas[j].stok
                }
            }  
            finalArr.push(elem)      
        }   
        let totalDay=0;
        for(let i =0;i<finalArr.length;i++){
            let summHour=0
            for(let j=1; j<=12;j++){
                finalArr[i]["rashodSrH"+j]=Math.round(finalArr[i]["rashodSrH"+j])
                summHour+=Number(finalArr[i]["rashodSrH"+j])
            }
            totalDay+=summHour;
            finalArr[i].totalHour=summHour
        }
        finalArr.totalDay=totalDay;

        for(let i =1;i<=12;i++){
            let sredneeZnachSutki=0
            for(let j=0; j<finalArr.length;j++){
                finalArr[j]["rashodSrH"+i]=Math.round(Number(finalArr[j]["rashodSrH"+i]))
                sredneeZnachSutki+=Number(finalArr[j]["rashodSrH"+i])
            }
            finalArr["srednZn"+i]=Math.round(sredneeZnachSutki/24)
        }
        return finalArr
    })
    return resp
}
export default calculationHoursVSP;