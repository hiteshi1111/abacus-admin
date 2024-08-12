import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export const CopyToClipboard = (text) => {
    let isCopy = copy(text);
    if (isCopy) {
        toast("Copied to Clipboard", {
            position: "bottom-right",
            autoClose: 500,
            theme: "colored"
        });
    }
}