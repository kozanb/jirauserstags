function runCodeOnConsole(codeStr) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {
            code: codeStr
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('showModalBtn').addEventListener('click', function () {
        runCodeOnConsole('document.querySelectorAll(".custommodal")[0].style = "display: block;"');
    });

    document.getElementById('hideModalBtn').addEventListener('click', function () {
        runCodeOnConsole('document.querySelectorAll(".custommodal")[0].style = "display: none;"');
    });

    document.getElementById('reloadModalBtn').addEventListener('click', function () {
        runCodeOnConsole('location.href="javascript:loadData(true); void 0";');
    });
}, false);