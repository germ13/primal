import {PRIMES} from "./primes"

const primes = PRIMES;//[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const isPrime = (n: number) => primes.indexOf(n) > -1 ? true : false;

export type R2 = [number, number];

let divisions = 1;

let direction_vector: R2[] = [[1, 0]];
let roundoff = 1000000;
for (let i = 1; i < divisions; i++) {

    let x = Math.cos(Math.PI * 2 * i / divisions);
    let y = Math.sin(Math.PI * 2 * i / divisions);
    x = Math.round((x + Number.EPSILON) * roundoff) / roundoff;
    y = Math.round((y + Number.EPSILON) * roundoff) / roundoff;
    direction_vector.push([x, y]);
}

const move = (position: R2, direction: R2): R2 =>
    [position[0] + direction[0]
        , position[1] + direction[1]];

const rotate = (current_direction: R2, directions: R2[]): R2 => {
    let cd_index = directions.indexOf(current_direction);
    let new_index = (cd_index + 1) % directions.length;
    //console.log('--->', directions[new_index]);
    return directions[new_index];
}

export function getPath() : R2[] {
    let cd: R2 = direction_vector[0];
    let position: R2 = [0, 0];

    let result : R2[] = [];
    result.push(position);
    
    for (var i = 0; i <= Math.max.apply(Math, primes); i++) {
        if (isPrime(i)) {
            cd = rotate(cd, direction_vector);
            position = move(position, cd);
        } else {
            position = move(position, cd);
        }
        result.push(position);
    }
    return result;
}
