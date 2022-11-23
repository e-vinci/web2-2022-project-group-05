
    const getRandomInt = (int) =>Math.floor(Math.random() * int)

    const getRandomIntBetween = (start,end) => Math.floor(Math.random() * (end - start + 1) + start)


export { getRandomInt, getRandomIntBetween }