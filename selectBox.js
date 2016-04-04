var SelectBox = (function(){
    function wrapSelectBox(elem){
        if (!elem.classList.contains('unstyled') && !elem.parentNode.classList.contains('selector')) {
            var myValue = elem.options[elem.selectedIndex].text;
            var modified = '<div class="selector"><span style="-webkit-user-select: none;">' + myValue + '</span>' + elem.outerHTML + '</div>';
            elem.outerHTML = modified;
        }
    }
    function updateSelectBox(elem){
        var wrap = elem.parentNode;
        if (wrap.classList.contains('selector')) {
            var myValue = elem.options[elem.selectedIndex].text;
            var mySpan = wrap.getElementsByTagName("span");
            mySpan[0].innerText = myValue;
        }
    }
    function toggleSelectBox(elem){
        var wrap = elem.parentNode;
        if (wrap.classList.contains('selector')) wrap.classList.toggle('focus');
    }
    function selectEvent(myEvent, callback){
        document.addEventListener(myEvent, function(e){
            var elem = e.target;
            if (elem.type && elem.type === 'select-one') {
                e.preventDefault();
                callback(elem);
            }
        }, true);
    }
    function initSelectBox(elems) {
        if (undefined === elems) elems = Array.prototype.slice.call(document.getElementsByTagName("select"));
        var matches = (Array.isArray(elems)) ? elems : [elems];
        matches.forEach(wrapSelectBox);
    }
    pageReady(function () {
        initSelectBox();
        selectEvent('change',updateSelectBox);
        selectEvent('focus',toggleSelectBox);
        selectEvent('blur',toggleSelectBox);
    });
    return {
        wrap: initSelectBox
    };
})();
