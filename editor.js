import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from './aiControls.js'

var sessions = {
    'Base Start' : BaseStart,
    'Base Update' : BaseUpdate,
    'Ship Start' : ShipStart,
    'Ship Update' : ShipUpdate,
}

var oldSessionValue = "Ship Update"

var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setValue(sessions[oldSessionValue])
setEditorOptions(editor)

function setEditorOptions(editor){
    editor.session.setMode("ace/mode/javascript");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        fontSize: '12pt'
    });
}

// Sessions are saved when users switch between tabs
function selectScript(event) {
    const session = event.target.value;
    var code = editor.getSession().getValue();
    sessions[oldSessionValue] = ace.createEditSession(code)
    oldSessionValue = session
    
    if (typeof sessions[session] == 'string')
        editor.session.setValue(sessions[session])
    else
        editor.setSession(sessions[session])

    setEditorOptions(editor)
}
document.getElementById("select-script").addEventListener("change", selectScript)

export var getCodeFromEditor = function(){
    sessions[oldSessionValue] = editor.getSession().getValue()

    var sessionCode = {}

    // if a session is uninitialized, it will be a string
    Object.keys(sessions).forEach(function(key, index) {
        const value = sessions[key]
        if (typeof value === "string")
            sessionCode[key] = value
        else
            sessionCode[key] = value.getValue();
      });

    return sessionCode
}