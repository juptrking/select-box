var SelectBox = (function(){
    function wrapSelectBox(elem){
        // make sure the target is viable and isn't already wrapped
        // wrap the select box with the facade mark up
        if (!elem.classList.contains('unstyled') && !elem.parentNode.classList.contains('selector')) {
            var myValue = elem.options[elem.selectedIndex].text;
            var modified = '<div class="selector"><span style="-webkit-user-select: none;">' + myValue + '</span>' + elem.outerHTML + '</div>';
            elem.outerHTML = modified;
        }
    }
    function updateSelectBox(elem){
        // update text in facade when select box value is changed
        // make sure the select box is already wrapped
        var wrap = elem.parentNode;
        if (wrap.classList.contains('selector')) {
            var myValue = elem.options[elem.selectedIndex].text;
            var mySpan = wrap.getElementsByTagName("span");
            mySpan[0].innerText = myValue;
        }
    }
    function toggleSelectBox(elem){
        // simple class toggle for focus and blur states
        var wrap = elem.parentNode;
        if (wrap.classList.contains('selector')) wrap.classList.toggle('focus');
    }
    function selectEvent(myEvent, callback){
        // event handler
        // check to assure target is a select box
        document.addEventListener(myEvent, function(e){
            var elem = e.target;
            if (elem.type && elem.type === 'select-one') {
                e.preventDefault();
                callback(elem);
            }
        }, true);
    }
    function initSelectBox(elems) {
        // check to see if a target has been specified, if not grab all select boxes available
        // if the selection isn't already in an array, put it in one
        // run a wrap function on each item in the array
        if (undefined === elems) elems = Array.prototype.slice.call(document.getElementsByTagName("select"));
        var matches = (Array.isArray(elems)) ? elems : [elems];
        matches.forEach(wrapSelectBox);
    }
    document.addEventListener("DOMContentLoaded", function() {
        // initialise the script on document ready
        // capture all relevant events
        initSelectBox();
        selectEvent('change',updateSelectBox);
        selectEvent('focus',toggleSelectBox);
        selectEvent('blur',toggleSelectBox);
    });
    // return a method to allow select boxes to be wrapped manually after document ready
    return {
        wrap: initSelectBox
    };
})();
