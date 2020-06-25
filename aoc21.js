let input = require('fs')
    .readFileSync('input/aoc21.txt', 'utf8')
    .split('\r\n')

    , bound = input
        .shift()
        .split(' ')[1] | 0

    , prog = input
        .map(e => {
            e = e.split(' ')
            return {
                i: e[0],
                a: e[1] | 0,
                b: e[2] | 0,
                c: e[3] | 0
            }
        })

    , ops = {
        'addr': (a, b) => R[a] + R[b],
        'addi': (a, b) => R[a] + b,
        'mulr': (a, b) => R[a] * R[b],
        'muli': (a, b) => R[a] * b,
        'banr': (a, b) => R[a] & R[b],
        'bani': (a, b) => R[a] & b,
        'borr': (a, b) => R[a] | R[b],
        'bori': (a, b) => R[a] | b,
        'setr': (a, b) => R[a],
        'seti': (a, b) => a,
        'gtir': (a, b) => a > R[b] ? 1 : 0,
        'gtri': (a, b) => R[a] > b ? 1 : 0,
        'gtrr': (a, b) => R[a] > R[b] ? 1 : 0,
        'eqir': (a, b) => a == R[b] ? 1 : 0,
        'eqri': (a, b) => R[a] == b ? 1 : 0,
        'eqrr': (a, b) => R[a] == R[b] ? 1 : 0,
    }



let seen = []
let R = [0, 0, 0, 0, 0, 0]
for (let last, ip = 0; prog[ip];) {
    let { i, a, b, c } = prog[ip]
    R[bound] = ip
    R[c] = ops[i](a, b)
    ip = R[bound] + 1
    if (i == 'eqrr') {
        if (!last) console.log(R[3])
        if (seen[R[3]]) { console.log(last); break }
        seen[R[3]] = 1
        last = R[3]
    }
}