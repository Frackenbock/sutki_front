import React from 'react';
import {Routes,Route} from 'react-router-dom';
import StartPage from '../../pages/StartPage/StartPage';
import Layout from '../Layout/Layout';
import PbrAiiskue from '../../pages/PBR_aiiskue/PbrAiiskue';
import PBR from '../../pages/PBR/PBR';
import Sutki from '../../pages/Sutki/Sutki';
import Charts from '../../pages/Charts/Charts';
import RashodGen from '../../pages/RashodGen/RashodGen';
import MainTable from '../../pages/MainTable/MainTable';
import StokGen from '../../pages/StokGen/StokGen';
import Itog from '../../pages/Itog/Itog';
import Maket17 from '../../pages/Maket17/Maket17';
import ListAdress from '../../pages/ListAdress/ListAdress';
import VSP from '../../pages/VSP/VSP';
import AdminPanel from '../../pages/AdminPanel/AdminPanel';
import RashodStokVirab from '../../pages/RashodStokVirab/RashodStokVirab';
import MaketParams from '../../pages/MaketParams/MaketParams';

function AppRouter(){
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<StartPage/>}/>
                <Route path='/pbr_aiiskue' element={<PbrAiiskue/>}/> 
                <Route path='/pbr' element={<PBR/>}/>
                <Route path='/maket17' element={<Maket17/>}/>
                <Route path='/maketparams' element={<MaketParams/>}/>
                <Route path='/charts' element={<Charts/>}/>
                <Route path='/vsp' element={<VSP/>}/>
                <Route path='/listadress' element={<ListAdress/>}/>
                <Route path='/gfytkmflvbyf' element={<AdminPanel/>}/>
                <Route path='/srednrashod' element={<RashodStokVirab/>}/>
                <Route path='/sutki' element={<Sutki/>}>
                     <Route index element={<MainTable/>}/> 
                     <Route path='/sutki/maintable' element={<MainTable/>}/>
                     <Route path='/sutki/rashod' element={<RashodGen/>}/>
                     <Route path='/sutki/stok' element={<StokGen/>}/>
                     <Route path='/sutki/itog' element={<Itog/>}/>
                </Route>
                {/* <Route path = '*' element = {<Notfound/>}/> */}
            </Route>
        </Routes>
    );
}

export default AppRouter;