const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const isPrime = (n: number) => primes.indexOf(n) > -1 ? true : false;

type R2 = [number, number];

let divisions = 4;

let direction_vector: R2[] = [[1, 0]];//, [0, 1], [-1, 0], [0, -1]];
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

export default function getPath() {

    let cd: R2 = direction_vector[0];
    let position: R2 = [0, 0];

    for (var i = 0; i <= Math.max.apply(Math, primes); i++) {
        if (isPrime(i)) {
            cd = rotate(cd, direction_vector);
            position = move(position, cd);
        } else {
            position = move(position, cd);
        }
        console.log(i, position)
    }

    return position;
}
