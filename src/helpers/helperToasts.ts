import { toast ,ToastContainerProps} from "react-toastify";


export function toastError(message:string,toastProps:ToastContainerProps) {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}
export function toastSuccess(message:string,toastProps :ToastContainerProps) {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}
export function toastSuccessPasswordRestored(message:string,toastProps :ToastContainerProps) {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}
export function toastInputIsEmpty(message:string,toastProps :ToastContainerProps) {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}