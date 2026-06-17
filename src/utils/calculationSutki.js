function calculationSutki(arrNapor,arrTime,arrPower){
/////////////////////////////////////////////////////////////////////
//расчёт среднего значения напора за сутки по введённым значениям
    let schetchikNapor = 0;
    let sumNapor = 0;
    let srednNapor=0;

    for(let i=0;i<arrNapor.length;i++){
        arrNapor[i].input=String(arrNapor[i].input).replace(',','.');
        sumNapor+=Number(arrNapor[i].input)
        if(arrNapor[i].input!==''){
            schetchikNapor++;   
        }
    }
    srednNapor=String((sumNapor/schetchikNapor).toFixed(2)).replace('.',',');
    if(srednNapor==='NaN'){
        srednNapor='-'
    }

/////////////////////////////////////////////////////////////////////
//расчёт суммарной выработки по каждому генератору за сутки (8 значений)
    let arrSumPower = [];
    for(let j=1;j<=8;j++){
        let elem = 0;
        for(let i=0;i<arrPower.length;i++){
            if(arrPower[i]['gen'+j]!=='нет данных'){
                if(arrPower[i]['gen'+j]!==undefined &&arrPower[i]['gen'+j]!=='нет данных'){
                    elem+=Number((arrPower[i]['gen'+j]).replace(',','.'))
                }
            }
        }
        arrSumPower.push(String((elem/1000).toFixed(2)).replace('.',','))
    }
///////////////////////////////////////////////////////////////////
//расчёт суммарной выработки по всем генераторам за час (24 значения)  
    let summHourAllGen=[]
    let totalPowerVr = 0
    let chetchikChasov=0
    for(let i=0;i<arrPower.length;i++){
        let summHourAll=0;
        for(let j=1;j<=8;j++){
            if(arrPower[i]['gen'+j]!==undefined &&arrPower[i]['gen'+j]!=='нет данных'){
                summHourAll+=Number((arrPower[i]['gen'+j]).replace(',','.'))
                chetchikChasov++
            }
        }
        //console.log()
        if(arrPower[i].gen1===undefined||arrPower[i].gen1==='-'){
            summHourAllGen.push({power:'0,0',number:i+1});
        }else{
            summHourAllGen.push({power:String((summHourAll/1000).toFixed(4)).replace('.',',')  ,number:i+1});
            totalPowerVr+=Number((summHourAll/1000))           
        }
    }
    let totalPower=0;
    totalPower = String(Number(totalPowerVr.toFixed(5))).replace('.',',');

////////////////////////////////////////////////////////////////////
//расчёт суммарного значения времени работы каждого генератора 

    let arrTimePower =[];
    let elemTime=0;
    for(let j=1;j<=8;j++){                          //пробегаем по каждому генератору
        for(let i=0;i<arrTime.length;i++){          //пробегаем по каждому часу
            if(arrTime[i]['gen'+j]===''||arrTime[i]['gen'+j]==='-'){           //при отсутствии значения времени, время работы генератора за час приравнивается 0
                arrTime[i]['gen'+j]='0';
            }
            elemTime+=Number(arrTime[i]['gen'+j])   //суммирование времени работы генератора за сутки 
        }
        arrTimePower.push(String((elemTime/60).toFixed(2)).replace('.',',')) //просуммированное значение в минутах переводим в часы и кладём в массив
        elemTime=0;
    }
    chetchikChasov=chetchikChasov/8
    return {srednNapor,arrSumPower,arrTimePower,summHourAllGen,totalPower,chetchikChasov}
}


export default calculationSutki;