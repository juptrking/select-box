# select-box

I used to use [Uniform.js](https://web.archive.org/web/20150114093618/http://uniformjs.com/) so I could style select dropdown boxes. However this is now unsupported.

I created this little Vanilla javascript project to replace it. It should work fine in all modern browsers (pretty much +IE9).

It will target all select boxes on document ready and wrap them as such...

```
<div class="selector">
  <span style="-webkit-user-select: none;">Please select</span>
  <select id="myId">
    <option>...
  </select>
</div>
```

Note that the ID is preserved. This allows you to set the opacity of the actual select box to 0 and use the div and span to build a facade select box with CSS. This means all of the default browser behavoir is preserved. If you have select boxes that you don't want wrapped, you can give them the class "unstyled" and they will be skipped.

If you add a select box after page ready you can manually update it using this method...

```
selectBox.wrap();
selectBox.wrap(document.getElementById('myId'));
```
