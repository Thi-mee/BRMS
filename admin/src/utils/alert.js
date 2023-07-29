import Swal from 'sweetalert2'

export const alert = (icon, title, text) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text : text
    })
}

export const alertWithButton = (icon, title, text, confirmButtonText) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text : text,
        confirmButtonText: confirmButtonText
    })
}

export const alertWithButtonAndFunction = async (icon, title, text, confirmButtonText, func) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            icon: icon,
            title: title,
            text : text,
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                func()
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
    })
}

export const alertWithButtonFunctionAndCancel = async (icon, title, text, confirmButtonText, cancelButtonText, func) => {
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

export const deleteAlert = async (item, func) => {
    return Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text : `You won't be able to restore this ${item}!`,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            func()
        }
    })
}

export const successAlert = (title, text) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text : text
    })
}

export const successAlertWithFunction = async (title, text, func) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text : text
        }).then((result) => {
            if (result.isConfirmed) {
                func()
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
    })
}

export const errorAlert = (title, text) => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text : text
    })
}