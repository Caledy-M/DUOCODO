/*
variables = [
    {
        name: "toto",
        value: null
    },
    {
        name: "titi",
        value: 0
    }];
*/
function skulpt(python, variables=null, errorCallback=null)
{
    var skulptOutput = "";

    function outf(text) // Run once every line
    {
        skulptOutput += text;
    }

    function successCallback(mod)
    {
    
    }

    if (errorCallback == null) errorCallback = defaultErrorCallback;
    function defaultErrorCallback(err)
    {
        console.log(err);
    }

    function process(code) 
    { 
        Sk.configure({output:outf}); 

        var skulptPromise = Sk.misceval.asyncToPromise(
            function() { return Sk.importMainWithBody("<stdin>", false, code, false); }
        );
        skulptPromise.then(successCallback, errorCallback);
    }

    // Add code that will interrogate the interpreter about the state of specific variables
    input = python;
    if (variables != null)
    {
        for (i=0; i<variables.length; i++)
        {
            // Abort if "variables" isn’t formatted properly
            if (variables[i].name == null) 
            { 
                console.error("Function skulpt(): Second argument contains objects without a \"name\" field).");
                return;
            }
            input += "\nprint(" + variables[i].name + ")";
        }
    }

    // Change HTML formatting
    input = input.replace(/<br>/g, "\n");
    input = input.replace(/&emsp;/g, "\t");

    // Interpret the code
    process(input);
    if (skulptOutput == "") return "Syntax error."


    // Parse the output to retrieve the value of our variables
    if (variables != null)
    {        
        for (i=1; i<=variables.length; i++)
        {
            variables[variables.length -i].value = skulptOutput[skulptOutput.length-i*2];
        }

         // Cut the output 
        skulptOutput = skulptOutput.slice(0, skulptOutput.length - 1 - variables.length * 2);                   
    }
    
    // Take out the final \n
    if (skulptOutput[skulptOutput.length-1] == "\n") {
        skulptOutput = skulptOutput.slice(0, skulptOutput.length-1);
        console.log("Taking out final line break");
    }
    return skulptOutput;
}