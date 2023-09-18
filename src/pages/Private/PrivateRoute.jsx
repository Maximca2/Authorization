import MainPage from "../MainPage/MainPage";
import LogInPage from "../LogIn/LogInPage";
import UserPage from "../CurUserPage/UserPage";

const Private = ()=>{
    const authen = localStorage.getItem('CUR_USER_TOKEN');

    if(authen === null ){
        return <MainPage/>
    }
    if(authen ==='[]'){
        return <LogInPage/>
    }
    if(authen.length>0){
       return <UserPage/>
    }

}
export default Private