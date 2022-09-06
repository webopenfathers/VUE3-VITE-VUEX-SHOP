import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from "nprogress";

// 消息提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = true) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 1000,
    });
}


export function showModal(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}


// 显示顶部加载进度条
export function showFullLoading() {
    nprogress.start()
}



// 隐藏顶部加载进度条
export function hideFullLoading() {
    nprogress.done()
}

// 弹出输入框
export function showPrompt(tip, value = '') {
    return ElMessageBox.prompt(tip, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}

