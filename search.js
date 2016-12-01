/**
 * Created by Surya Kumar on 25-11-2016.
 */
var NS4 = (document.layers);
var IE4 = (document.all);
var win = window;
var n   = 0;
function findInPage(str) {
    var txt, i, found;
    if (str == "")
        return false;
    if (NS4) {
        if (!win.find(str))
            while(win.find(str, false, true))
                n++;
        else
            n++;
        if (n == 0)
            alert("Not found.");
    }
    if (IE4) {
        txt = win.document.body.createTextRange();
        for (i = 0; i <= n && (found = txt.findText(str)) != false; i++) {
            txt.moveStart("character", 1);
            txt.moveEnd("textedit");
        }
        if (found) {
            txt.moveStart("character", -1);
            txt.findText(str);
            txt.select();
            txt.scrollIntoView();
            n++;
        }
        else {
            if (n > 0) {
                n = 0;
                findInPage(str);
            }
            else
                alert("Sorry, we couldn't find.Try again");
        }
    }
    return false;
}