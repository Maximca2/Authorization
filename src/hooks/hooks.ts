import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { AppDispatch ,RootState} from "@/redux/store";

export const useAppDispatch = ()=>useDispatch<AppDispatch>();
export const AppSelector:TypedUseSelectorHook<RootState> = useSelector