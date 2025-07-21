function bigFactorial(n) {
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}

const result = bigFactorial(5000n);

process.send(`Factorial(5000n) calculated, length: ${result.toString().length} digits`);
