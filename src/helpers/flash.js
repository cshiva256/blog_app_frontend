import { toast } from "react-toastify";

export const flash = (msg, info = "success") => toast(msg, { type: info });
