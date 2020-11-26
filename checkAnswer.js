// TODO: Ditch playerInput and out_consoleOutput arguments

function checkAnswer(level, playerInput, out_consoleOutput=null) // out_consoleOutput won’t work, gonna have to fill the HTML directly here
{
    //const playerInput = document.querySelector("#input").value;
    console.log("Entering checkAnswer");
    console.log(level);
    if (level.type == "open")
    {
        // Assemble the code to send to the interpreter
        var skulptInput = ""
        for (i=0; i<level.remaining.length; i++)
        {
            if (level.remaining[i] == "")
                skulptInput += playerInput;
            else
                skulptInput += level.remaining[i];
        }

        let variablesValues = null;
        if (level.variables != null)
            variablesValues = JSON.parse(JSON.stringify(level.variables));

        consoleOutput = skulpt(skulptInput, variablesValues);

        // Check if the result is what we expect
        if (level.reponse != null)
        {
            if (playerInput != level.reponse) {
                console.log("Player input isn’t what was expected");
                return false;
            }
        }
        if (level.renduconsole != null)
        {
            if (consoleOutput != level.renduconsole) {
                console.log("Console output isn’t what we expected");
                return false;
            }
        }
        if (level.variables != null)
        {
            console.log("Warning: Variables check hasn’t been tested yet");
            for (i=0; i<variables.length; i++)
            {
                if(variablesValues[i].value != level.variables[i].value) {
                    console.log("Variable " + level.variablesValues[i].name + " isn’t what we expected");
                    return false;
                }       
            }
        }
        return true;
    }
    else
    {
        console.error("checkAnswer() not yet implemented for types other than ’open’");
    }   
}