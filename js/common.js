var data = [];
var answer;
var timer;
var now;

function addData() {
    let input = document.getElementById('data-add').getElementsByTagName('input')[0];
    let val = input.value.split(/[\s,，、]+/).filter(str => str != '');
    let tbody = document.getElementById('data').getElementsByTagName('tbody')[0];
    for (let i = 0; i < val.length; i ++) {
        data.push(val[i]);
        let tr = document.createElement('tr');
        tbody.append(tr);
        tr.innerHTML = `<td>${val[i]}</td><td class="mdui-table-col-numeric"><button class="mdui-btn mdui-btn-icon mdui-ripple" onclick="delData(${data.length-1})"><i class="mdui-icon material-icons">close</i></button></td>`;
    }
    input.value = '';
    input.focus();
}

function delData(serial) {
    let trs = document.getElementById('data').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    trs[serial].remove();
    data.splice(serial, 1);
    for (let i = serial; i < trs.length; i ++) {
        let icon = trs[i].getElementsByTagName('td')[1].getElementsByClassName('mdui-btn-icon')[0];
        icon.setAttribute('onclick', `delData(${i})`);
    }
}

function delAllData() {
    data = [];
    document.getElementById('data').getElementsByTagName('tbody')[0].innerHTML = '';
}

function startRandom() {
    if (data.length <= 1) return;
    answer = Math.floor(Math.random() * data.length);
    if (timer) {
        clearInterval(timer);
        timer = undefined;
        document.getElementById('start').getElementsByTagName('span')[0].innerHTML = data[answer];
    } else {
        now = 0;
        timer = setInterval(function() {
            document.getElementById('start').getElementsByTagName('span')[0].innerHTML = data[now];
            now = (now + 1) % data.length;
        }, 50);
    }
}

function getCookie(key) {
    let args = document.cookie.split(';');
    let map = {};
    for (arg of args) map[arg.trim().split('=')[0]] = arg.trim().split('=')[1];
    if (!key) return map;
    return map[key];
}

function setCookie(key, value, day) {
    let date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value}; expires=${date.toGMTString()}`;
}

function delCookie(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function welcomeDialog() {
    if (!getCookie('visited')) {
        setCookie('visited', true, 30);
        let dialog = new mdui.Dialog('#about-dialog', { history: false });
        dialog.open();
    } else {
        setCookie('visited', true, 30);
    }
}

(function() {
    window.addEventListener('load', welcomeDialog, false);
})();
