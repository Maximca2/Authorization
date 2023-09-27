import { toast } from "react-toastify";

export function setError() {
    toast.error("акаунт вже існує", {
        position: toast.POSITION.TOP_RIGHT,
    })
}
export function setSuccess() {
    toast.success("Вітаю ви створили акаунт!", {
        position: toast.POSITION.TOP_RIGHT,
    })
}