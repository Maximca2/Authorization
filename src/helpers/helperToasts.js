import { toast } from "react-toastify";


export function toastError(message,toastProps ={}) {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}
export function toastSuccess(message,toastProps ={}) {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}
export function toastSuccessPasswordRestored(message,toastProps ={}) {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}
export function toastInputIsEmpty(message,toastProps ={}) {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...toastProps
    })
}