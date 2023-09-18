import MainPage from "../MainPage/MainPage";
import LogInPage from "../LogIn/LogInPage";
import UserPage from "../CurUserPage/UserPage";

const Private = ()=>{
    const authen = localStorage.getItem('CUR_USER_TOKEN');
    const auth = localStorage.getItem('CUR_USER_TOKEN')?.length;

    if(authen === null ){
        return <MainPage/>
    }
    if(authen ==='[]'){
        return <LogInPage/>
    }
    if(authen.length===auth){
       return <UserPage/>
    }

}
export default Private