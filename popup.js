
var urls = [];
var titles = [];
var both = [];

var copy  = function() {
    var ta = document.getElementsByTagName('textarea')[0];
    ta.focus();
    ta.select();
    document.execCommand('copy');
};

var show  = function(text) {
    var ta = document.getElementsByTagName('textarea')[0];
    ta.innerHTML = '';
    ta.innerHTML = text;
};

chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i  = 0, l = tabs.length; i < l; i++) {
        urls.push(tabs[i].url);
        titles.push(tabs[i].title);
        both.push([tabs[i].title, tabs[i].url].join('\n'));
    }
    show(urls.join('\n'));
});

document.getElementById('navi').addEventListener('click', function(e) {
    var target = e.target
    var name = target.textContent;
    if (target.tagName === 'UL') {
        return false;
    }
    document.getElementsByClassName('cur')[0].className = '';
    e.target.className = 'cur';
    if (name === 'URL') {
       show(urls.join('\n'));
    } else if (name === 'TITLE') {
        show(titles.join('\n'));
    } else if (name === 'TAG') {
        result = [];
        for (var i  = 0, l = titles.length; i < l; i++) {
            result.push('<a href="' + urls[i] + '">' + titles[i] + '</a>');
        }
        show(result.join('\n'));
    } else if (name === 'MARKDOWN') {
        result = [];
        for (var i  = 0, l = titles.length; i < l; i++) {
            result.push('![' + titles[i] + '](' + urls[i] + ')');
        }
        show(result.join('\n'));
    } else {
        show(both.join('\n'));
    }
}, false);

document.getElementsByTagName('h1')[0].addEventListener('click', function() {
    copy();
}, false);

