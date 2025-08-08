import { createStore,combineReducers } from 'redux';
import emptyCellsSutki from '../data/dataForSutkiTable'
import emptyRashod from '../data/dataForRashod'
import emptyStok from '../data/dataForStok';
import emptyAiisPbr from '../data/dataForAiisPbr';
import emptyItog from '../data/dataForItogTable';
import emptyRaport from '../data/dataRaport'

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate();
if(month<10){month='0'+String(month);}
if(day<10){day = '0'+String(day);}
let fullDate = String(year)+'-'+month+'-'+day;

const arrData = new emptyCellsSutki();
const rashod = new emptyRashod();
const stok = new emptyStok();
const itog = new emptyItog()
const raport = new emptyRaport()

///////////////////////////////////////////////////////////////////////////////////////////////
/////////Страница Расчёта расхода воды////////////////////////////////////////////////
const sutkiState ={
  date : fullDate,
  napors : arrData.arrNaporInputs,
  sredniyNapor : '-',
  times : arrData.arrTimeInputs,
  summTimes : ['-','-','-','-','-','-','-','-'],
  powersGenerators:arrData.arrGen,
  arrSumPowersGenForSutki:['-','-','-','-','-','-','-','-'],
  totalPower : ['-'],
  arrSumPowerForHour : arrData.arrGenTotalHour,
  calculationDoneFlag:false,
  titleForSutkiTable:'',
};
function sutkiReducer (state=sutkiState,action){
    switch(action.type){
      case "CHANGE_DATE": return {...state, date: action.payload};
      case "CHANGE_CLACULATION_FLAG": return {...state, calculationDoneFlag: action.payload};//отображает кнопки "Итоговая таблица","Сохранить данные", "Экспорт таблиц в Exel" 
      case "CHANGE_TITLE_FOR_SUTKI_TABLE": return {...state, titleForSutkiTable: action.payload};
      case "CHANGE_NAPORS":return {...state, napors:action.payload};
      case "CHANGE_SREDNIY_NAPOR":return {...state, sredniyNapor:action.payload};
      case "CHANGE_TIMES":return {...state, times:action.payload};
      case "CHANGE_SUMM_TIMES":return {...state, summTimes:action.payload};
      case "CHANGE_TOTAL_POWER":return {...state, totalPower:action.payload};
      case "CHANGE_POWERS_GENERATORS":return {...state, powersGenerators:action.payload};
      case "CHANGE_TOTAL_POWER_FOR_HOUR":return {...state, arrSumPowerForHour:action.payload};
      case "CHANGE_ARR_SUM_POWERS_GEN_FOR_SUTKI":return {...state, arrSumPowersGenForSutki:action.payload};
      default:return state;
    }
};

const stokState={
  stokData : stok.arrGenStok,
  totalStok : ['-'],
  sumGenStok : ['-','-','-','-','-','-','-','-'],
  stokTitleTable:'',
};
///////////////////////////////////////////////////////////////////////////////////////////////
/////////Страница "Сток воды через генераторы"/////////////////////////
function stokReducer (state=stokState,action){
    switch(action.type){
      case "CHANGE_ARR_STOK":return {...state, stokData:action.payload};
      case "CHANGE_TOTAL_STOK":return {...state, totalStok:action.payload};
      case "CHANGE_ARR_SUM_GEN_STOK": return {...state, sumGenStok:action.payload};
      case "CHANGE_STOK_TITLE_TABLE": return {...state, stokTitleTable:action.payload};
      default:return state;
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////
/////////Страница "Расход воды через генераторы"/////////////////////////
const rashodState={
  rashodData : rashod.arrGenRashod,
  totalRashod : ['-'],
  sumGenRashod : ['-','-','-','-','-','-','-','-'],
  udelnRashod : '-',
  rashodTitleTable : '',
};
function rashodReducer (state=rashodState,action){
    switch(action.type){
      case "CHANGE_TOTAL_RASHOD":return {...state, totalRashod:action.payload};
      case "CHANGE_ARR_RASHOD":return {...state, rashodData:action.payload};
      case "CHANGE_ARR_SUM_GEN_RASHOD":return {...state, sumGenRashod:action.payload};
      case "CHANGE_UDELNRASHOD":return {...state, udelnRashod:action.payload};
      case "CHANGE_RASHOD_TITLE_TABLE":return {...state, rashodTitleTable:action.payload};
      default:return state;
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////страница сравнения данных АИИСКУЭ и ПБР///////////////////////////////////////////
const aiisPbrState = {
  arrPbrAiis:emptyAiisPbr,
  arrAIISforChart:[],
  arrPBRforChart:[],
  titleForCharts:'График ... за ...',
  titleForAiisPbrTable:'Данные ... за ...',
  flagPowerButtonClick:false,
};
function aiisPbrReducer (state=aiisPbrState,action){
    switch(action.type){
      case "CHANGE_AIIS_PBR":return {...state, arrPbrAiis:action.payload};
      case "CHANGE_AIIS_FOR_CHART":return {...state, arrAIISforChart:action.payload};
      case "CHANGE_PBR_FOR_CHART":return {...state, arrPBRforChart:action.payload};
      case "CHANGE_TITLE_FOR_CHART":return {...state, titleForCharts:action.payload};
      case "CHANGE_TITLE_FOR_TABLE":return {...state, titleForAiisPbrTable:action.payload};
      case "CHANGE_FLAG_POWER_BUTTON_CLICK":return {...state, flagPowerButtonClick:action.payload};
      default:return state;
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////
/////////Страница "Данные среднесуточного расхода, стока и выработки"/////////////////////////
const rashodStokVirabState={
  arrData : [],
  titleDates : '',
  virabData : '',
  stokData : '',
  rashodData : '',
  dateBegin:'',
  dateEnd:''
};
function rashodStokVirabReducer (state=rashodStokVirabState,action){
    switch(action.type){
      case "CHANGE_RASHOD_STOK_VIRAB_ARR":return {...state, arrData:action.payload};
      case "CHANGE_RASHOD_STOK_VIRAB_DATES":return {...state, titleDates:action.payload};
      case "CHANGE_TOTAL_VIRAB_DATA":return {...state, virabData:action.payload};
      case "CHANGE_TOTAL_STOK_DATA":return {...state, stokData:action.payload};
      case "CHANGE_TOTAL_RASHOD_DATA":return {...state, rashodData:action.payload};
      case "CHANGE_RASHOD_STOK_VIRAB_BEGIN_DATE":return {...state, dateBegin:action.payload};
      case "CHANGE_RASHOD_STOK_VIRAB_END_DATE":return {...state, dateEnd:action.payload};
      default:return state;
    }
};
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////Страница "Итоговая таблица"////////////////////////////////////////////
const itogState = {
  itogActivePower: itog.itogActivePower,
  itogReactivePower:itog.itogReactivePower,
  TimeHH:itog.TimeHH,
  RashodHH:0,
  StokHH:0,
  Protechki:0,
  mainStok:0,
  itogTitleTable:'',
};
function itogReducer (state=itogState,action){
    switch(action.type){
      case "CHANGE_ACTIVE_ITOGARR":return {...state, itogActivePower:action.payload};
      case "CHANGE_REACTIVE_ITOGARR":return {...state, itogReactivePower:action.payload};
      case "CHANGE_TIMEHH":return {...state, TimeHH:action.payload};
      case "CHANGE_RASHODHH":return {...state, RashodHH:action.payload};
      case "CHANGE_STOKHH":return {...state, StokHH:action.payload};
      case "CHANGE_PROTECHKI":return {...state, Protechki:action.payload};
      case "CHANGE_MAINSTOK":return {...state, mainStok:action.payload};
      case "CHANGE_TITLE_ITOG_TABLE":return {...state, itogTitleTable:action.payload};
      default:return state;
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Для изменения цвета акитвной кнопки на зелёный на Лэйауте(основные кнопки переключения между страницами) и на странице расчёта расхода ///
const buttonState={
  sutkiButtonsState:{mainButton:'',stokButton:'',rashodButton:'',itogButton:''},
  layoutButtonsState:
    {sutkiButton:'',vspButton:'',pbrAiisButton:'',pbrButton:'',maketButton:'',adminButton:'',srRashodButton:'',raportButton:'',},
};
function buttonsReducer (state=buttonState,action){//для изменения цвета кнопок при нажатии
  switch(action.type){
    case "CHANGE_BUTTONS_SUTKI":return {...state, sutkiButtonsState:action.payload};
    case "CHANGE_BUTTONS_LAYOUT":return {...state, layoutButtonsState:action.payload};
    default:return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////Страницы "Макет №17", "Данные Макета №17" ///////////////////////////////////////
const maketState ={
  passw:'21',//Вероятно нигде не используется, но удалить страшно)
  arrMaket17:[],//массив хранения данных макета при выгрузке за период на странице "Данные Макета №17"
  dateBeginForReadMaket17:'',//хранение даты НАЧАЛА периода выгрузки за период на странице "Данные Макета №17"
  dateEndForReadMaket17:'',//хранение даты ОКОНЧАНИЯ периода выгрузки за период на странице "Данные Макета №17"
};
function maketReducer (state=maketState,action){
  switch(action.type){
    case "CHANGE_PASSWORD":return {...state, passw:action.payload};
    case "CHANGE_ADMIN_ARR_RECORDS_MAKET17":return {...state, arrMaket17:action.payload};
    case "CHANGE_ADMIN_DATE_BEGIN_FOR_READ_MAKET17":return {...state, dateBeginForReadMaket17:action.payload};
    case "CHANGE_ADMIN_DATE_END_FOR_READ_MAKET17":return {...state, dateEndForReadMaket17:action.payload};
    default:return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////Данные для страницы "Панель администратора" ///////////////////////////////// 
const adminState ={
  passw:'flvby',
  dateBeginForReadUBV:'',
  dateEndForReadUBV:'',
  dateBeginForReadNapors:'',
  dateEndForReadNapors:'',
  arrNapors:[],
  arrUVB:[],
};
function adminReducer (state=adminState,action){
  switch(action.type){
    case "CHANGE_ADMIN_PASSW":return {...state, passw:action.payload};
    case "CHANGE_ADMIN_DATE_BEGIN_FOR_READ_UBV":return {...state, dateBeginForReadUBV:action.payload};
    case "CHANGE_ADMIN_DATE_END_FOR_READ_UBV":return {...state, dateEndForReadUBV:action.payload};
    case "CHANGE_ADMIN_DATE_BEGIN_FOR_READ_NAPORS":return {...state, dateBeginForReadNapors:action.payload};
    case "CHANGE_ADMIN_DATE_END_FOR_READ_NAPORS":return {...state, dateEndForReadNapors:action.payload};
    case "CHANGE_ADMIN_ARR_RECORDS_NAPORS":return {...state, arrNapors:action.payload};
    case "CHANGE_ADMIN_ARR_RECORDS_UVB":return {...state, arrUVB:action.payload};
    default:return state;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////Данные для страницы "ВСП" и "Журнала открытия и закрытия пролётов" /////////////////////////////////// 
const vspState={
  vspRecordsState:[],
  vspStoksState:{oneMn1:'-',twoMn1:'-',threeMn1:'-',fullN1:'-',oneMn2:'-',twoMn2:'-',threeMn2:'-',fullN2:'-',
    oneMn3:'-',twoMn3:'-',threeMn3:'-',fullN3:'-',oneMn4:'-',twoMn4:'-',threeMn4:'-',fullN4:'-',
    oneMn5:'-',twoMn5:'-',threeMn5:'-',fullN5:'-',oneMn6:'-',twoMn6:'-',threeMn6:'-',fullN6:'-',
    oneMn7:'-',twoMn7:'-',threeMn7:'-',fullN7:'-',oneMn8:'-',twoMn8:'-',threeMn8:'-',fullN8:'-',
    oneMn9:'-',twoMn9:'-',threeMn9:'-',fullN9:'-',oneMn10:'-',twoMn10:'-',threeMn10:'-',fullMn10:'-',
    pnsN11:'-',fullMn11:'-',pnsN12:'-',fullMn12:'-'},

  vspTimesState:{oneMn1:'',twoMn1:'',threeMn1:'',fullN1:'',oneMn2:'',twoMn2:'',threeMn2:'',fullN2:'',
    oneMn3:'',twoMn3:'',threeMn3:'',fullN3:'',oneMn4:'',twoMn4:'',threeMn4:'',fullN4:'',
    oneMn5:'',twoMn5:'',threeMn5:'',fullN5:'',oneMn6:'',twoMn6:'',threeMn6:'',fullN6:'',
    oneMn7:'',twoMn7:'',threeMn7:'',fullN7:'',oneMn8:'',twoMn8:'',threeMn8:'',fullN8:'',
    oneMn9:'',twoMn9:'',threeMn9:'',fullN9:'',oneMn10:'',twoMn10:'',threeMn10:'',fullMn10:'',
    pnsN11:'',fullMn11:'',pnsN12:'',fullMn12:''},
  vspTotalStok:'-',
  vspSrRashod:'-',
  vspSrUBV:'',
  vspHoursMagazineDate:'',
  vspHoursMagazineArrayRecords:[],
  dateBeginDiapasonVspMagazine:'',
  dateEndDiapasonVspMagazine:'',
};
function vspReducer (state=vspState,action){
  switch(action.type){
    case "CHANGE_VSP_RECORDS":return {...state, vspRecordsState:action.payload};
    case "CHANGE_VSP_STOKS":return {...state, vspStoksState:action.payload};
    case "CHANGE_VSP_TIMES":return {...state, vspTimesState:action.payload};
    case "CHANGE_VSP_TOTAL_STOK":return {...state, vspTotalStok:action.payload};
    case "CHANGE_VSP_SR_UBV":return {...state, vspSrUBV:action.payload};
    case "CHANGE_VSP_SR_RASHOD":return {...state, vspSrRashod:action.payload};
    case "CHANGE_VSP_HOURS_MAGAZINE_DATE":return {...state, vspHoursMagazineDate:action.payload};
    case "CHANGE_VSP_HOURS_MAGAZINE_ARRAY_RECORDS":return {...state, vspHoursMagazineArrayRecords:action.payload};
    case "CHANGE_VSP_DATE_BEGIN_MAGAZINE_DIAPAZONE":return {...state, dateBeginDiapasonVspMagazine:action.payload};
    case "CHANGE_VSP_DATE_END_MAGAZINE_DIAPAZONE":return {...state, dateEndDiapasonVspMagazine:action.payload};
    default:return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////Страница "ПБР" //////////////////////////////////////////////////////////////////////////////
const pbrState = {
  pbrArr:[],//массив для отображения данных и файлов ПБР в таблице
};
function pbrReducer (state=pbrState,action){
    switch(action.type){
      case "CHANGE_PBR_ARR":return {...state, pbrArr:action.payload};
      default:return state;
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////Страница "Суточная справка" //////////////////////////////////////////////////////////////////////////////
const raportState = {
  raportPbrArr:raport.dataPBRRaport,
};
function raportReducer (state=raportState,action){
    switch(action.type){
      case "CHANGE_RAPORT_PBR_ARR":return {...state, raportPbrArr:action.payload};
      default:return state;
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
const rootReducer = combineReducers({
    rashodStokVirab:rashodStokVirabReducer,
    sutki:sutkiReducer,
    stok:stokReducer,
    rashod:rashodReducer,
    aiisPbr:aiisPbrReducer,
    pbr:pbrReducer,
    itog:itogReducer,
    maket:maketReducer,
    buttons:buttonsReducer,
    vspPage:vspReducer,
    admin:adminReducer,
    raport:raportReducer,
})

const store = createStore(rootReducer);

export default store;