import Swal from 'sweetalert2'

export const alert = (icon, title, text) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text : text
    })
}

export const AlertWithButton = (icon, title, text, confirmButtonText) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text : text,
        confirmButtonText: confirmButtonText
    })
}

export const AlertWithButtonAndFunction = (icon, title, text, confirmButtonText, func) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text : text,
        confirmButtonText: confirmButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            func()
        }
    })
}

export const AlertWithButtonAndFunctionAndCancel = async (icon, title, text, confirmButtonText, cancelButtonText, func) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text : text,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            func()
        }
    })
}