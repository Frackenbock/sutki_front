import arrGoodRashod from "../data/dataForRashod"
import arrStok from "../data/dataForStok"

function normalizeRashod(arrRashod,power){
   // console.log(arrRashod)
   const dataRashod  =new arrGoodRashod().arrGenRashod;
   const dataStok = new arrStok().arrGenStok;
//нормализация массива с данными расходов
   for(let i = 0;i<=23;i++){     
         for(let j = 1;j<=8;j++){
         if(arrRashod[i][j-1].number===1){
            // console.log(arrRashod[i][j-1])
            dataRashod[i].gen1 = arrRashod[i][j-1].data
         }else if(arrRashod[i][j-1].number===2){
            dataRashod[i].gen2 = arrRashod[i][j-1].data
         }else if(arrRashod[i][j-1].number===3){
            dataRashod[i].gen3 = arrRashod[i][j-1].data
         }else if(arrRashod[i][j-1].number===4){
            dataRashod[i].gen4 = arrRashod[i][j-1].data;
         }else if(arrRashod[i][j-1].number===5){
            dataRashod[i].gen5 = arrRashod[i][j-1].data;
         }else if(arrRashod[i][j-1].number===6){
            dataRashod[i].gen6 = arrRashod[i][j-1].data;
         }else if(arrRashod[i][j-1].number===7){
            dataRashod[i].gen7 = arrRashod[i][j-1].data;
         }else if(arrRashod[i][j-1].number===8){
            dataRashod[i].gen8 = arrRashod[i][j-1].data;
         };
      };
   };
//добавление и расчёт последнего столбца с суммами расхода по часам(24 значения) и среднего расхода за сутки
   let totalSumRashod=0;
   let totalSrednRashod=0;
   for(let i = 0;i<=23;i++){
      let sum=0;
      for(let key in dataRashod[i]){
            let begin = key.slice(0,3)
            if (begin==='gen'){
               sum+=Number(dataRashod[i][key]);
            };
      };
      dataRashod[i].summ=String(sum);
      totalSumRashod+=Number(sum);

   };
   totalSrednRashod=Math.round(totalSumRashod/24);
   
//создание и расчёт массива данных стока с суммами  по часам(24 значения) в последнем столбце и расчёт суммарного стока за сутки
   let totalSumStok=0;
   let totalSumStokForUdeln=0;
   for(let i=0;i<=23;i++){
      let totalSumForHour=0;
      for(let j=1;j<=8;j++){
         dataStok[i]['gen'+j]=String(Number(dataRashod[i]['gen'+j])*3600/1000000).replace('.',',');
         totalSumForHour+=Number(dataRashod[i]['gen'+j])*3600/1000000;
      }
      dataStok[i].summ=String(totalSumForHour.toFixed(3)).replace('.',',');
      totalSumStok+=totalSumForHour
   };
   totalSumStokForUdeln=totalSumStok*1000000
   totalSumStok=String(totalSumStok.toFixed(3).replace('.',','));

//расёт средних данных расхода по генераторам за сутки(8 значений)
   let arrSumGenRashod=[];
   for(let i = 1;i<=8;i++){
      let elem=0;
      for(let j = 0;j<=23;j++){
        elem+=Number(dataRashod[j]['gen'+i])
      }
      arrSumGenRashod.push(Math.round(elem/24))
   }
//расёт суммарных данных стока по генераторам(8 значений)
   let arrSumGenStok=[];
   for(let i = 1;i<=8;i++){
      let elem=0
      for(let j = 0;j<=23;j++){
        elem+=Number((dataStok[j]['gen'+i]).replace(',','.'))
      }
      arrSumGenStok.push(String(Number(elem).toFixed(3)).replace('.',','))
   }
//расёт удельного расхода
   let udelnRashod = String((totalSumStokForUdeln/(Number(power.replace(",",'.'))*1000)).toFixed(2)).replace('.',',')

   return {dataRashod,totalSrednRashod,dataStok,totalSumStok,arrSumGenRashod,arrSumGenStok,udelnRashod}
}

export default normalizeRashod;