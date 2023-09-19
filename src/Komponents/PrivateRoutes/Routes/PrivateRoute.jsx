import MainPage from "../../../pages/MainPage/MainPage";
import { CUR_USER_TOKEN } from "../../../redux/store/usersReducer";
import InfoPage from "../../../pages/InfoPage/InfoPage";
import { useSelector } from "react-redux";

const Private = () => {
  const token = localStorage.getItem(CUR_USER_TOKEN);
  const userInAccount = useSelector((state) => state.toolkit.userInAccount);
  console.log(userInAccount)
  if (!token|| !userInAccount) {
    return <MainPage />;
  }
  if(token===' '){
    return <MainPage/>
  }
  else{
    return <InfoPage />;
  }
  
};
export default Private;
