
export function convertNumberToHeightFeetInches(value)
    {   
        let floatpart = value-parseInt(value);
        let ret =parseInt(value)+"'' "  +Math.round(floatpart*12) +"'"
        return (ret)
    }