import MainPage from "../../../pages/MainPage/MainPage";
import { CUR_USER_TOKEN } from "../../../redux/store/usersReducer";
import InfoPage from "../../../pages/InfoPage/InfoPage";

const Private = () => {
  const token = localStorage.getItem(CUR_USER_TOKEN);

  if (!token) {
    return <MainPage />;
  }
  if (token === "[]") {
    return <MainPage />;
  }
  return <InfoPage />;
};
export default Private;
