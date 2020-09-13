Primal
======

Primal experiments: visions into numbers, their structure, patterns, behavior and personality.

primal-000
----------

`n` is a natural number > 1.

Take the vectors on the circle with roots of unity `n`:

v = [v_0, ..., v_i, ..., v_(n-1) ]

Iterate through the natural numbers.  Travel in direction v_i while iterate is not prime.  Every time a prime is reached, we change direction to the next direction vector.  When we reach the last one we cycle to the first vector.

- TODO add slider

primal-001
----------

ratio of ratio of primes

take three consecutive primes: `p_(n-1)`, `p_i`, `p_(n+1)`

Take the ratio of adjacent primes

a = p_(n+1) / p_n

b = p_n / p_(n-1)

Take the ratio of ratios

`r_0 = a / b = (p_(n+1) * p_(n-1) / (p_n)^2)`

- TODO map the difference from one: `delta_i =  1 - abs(r_i)`





