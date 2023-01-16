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
    CompOps: CompOps
};

// Export functions.
export { utils as default };
