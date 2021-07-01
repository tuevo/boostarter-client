export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomNumberNotInArray = (arr) => {
    let num = 0;

    while (arr.indexOf(num) > -1) {
        num = randomNumber(0, 100);
    }

    return num;
};