/*
* This function returns a random number between aMin and aMax (inclusive of both, i.e. [aMin, aMax]).

* Parameters:
    > aMin: the minimum value of the random number.
    > aMax: the maximum value of the random number.
*/
function GetRandom(aMin, aMax)
{
    return Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;
}

/*
* Randomises the order of the given array.

* Parameters:
    > aArray: the array to randomise.
*/
function RandomiseArray(aArray)
{
    if (!Array.isArray(aArray))
    {
        console.log("The parameter is not an array.");
        return;
    }

    for (let i = aArray.length - 1; i > 0; --i)
    {
        const lIndexRandom = GetRandom(0, i);

        let lValueI = aArray[i];
        aArray[i] = aArray[lIndexRandom];
        aArray[lIndexRandom] = lValueI;
    }

}

function SetInLocalStorage(aKey, aValue)
{
    if (aValue instanceof Map)
    {
        console.log("Storing a map in local storage.");

        localStorage[aKey] = JSON.stringify(Array.from(aValue));
    }
    else if (aValue instanceof Array)
    {
        console.log("Storing an object in local storage.");

        localStorage[aKey] = JSON.stringify(aValue);
    }
    else if (typeof aValue === 'object')
    {
        console.log("Storing an object in local storage.");

        localStorage[aKey] = JSON.stringify(aValue);
    }
    else
    {
        localStorage[aKey] = aValue;
    }

}

function GetFromLocalStorage(aKey)
{
    if (!localStorage.hasOwnProperty(aKey))
    {
        console.log("localStorage doesn't contain data associated with this key.");
        return;
    }

    const lString = localStorage[aKey];

    return JSON.parse(lString);
}

function OrdinalSuffix(aNum)
{
    if (typeof aNum !== 'number')
        return;

    const lNumAbs = Math.abs(aNum);

    if (lNumAbs > 3 && lNumAbs < 21)
        return "th";
    
    const lNumMod10 = lNumAbs % 10;

    if (lNumMod10 === 1)
        return "st";
    else if (lNumMod10 === 2)
        return "nd"
    else if (lNumMod10 === 3)
        return "rd"
    else
        return "th";
}

// An 'enum' for representing comparison operators.
const CompOps = Object.freeze(
    {
        E: 0,  // Equals (===)
        NE: 1, // Not Equals (!==)
        G: 2,  // Greater (>)
        L: 3,  // Less than (<)
        GE: 4, // Greater or Equal (>=)
        LE: 5  // Less than or Equal (<=)
    });

const utils =
{
    GetRandom: GetRandom,
    RandomiseArray: RandomiseArray,
    SetInLocalStorage: SetInLocalStorage,
    GetFromLocalStorage: GetFromLocalStorage,
    OrdinalSuffix: OrdinalSuffix,
    CompOps: CompOps
};

// Export functions.
export { utils as default };
