function nextGeneration() {
    // console.log(savedBirds);
    pipes = [];
    birds = [];
    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
        let parentA = pickOne();
        let parentB = pickOne();
        let child_brain = Neural_Network.crossOver(parentA, parentB);
        let child = new Bird(child_brain);
        child.mutate(0.05);
        birds[i] = child;
    }
    time = 0;
    savedBirds = [];
    console.log("NEXT GENERATION");
}

function pickOne() {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;
    return savedBirds[index].brain;
}

function calculateFitness() {
    // find max sum
    let max_score = 0, total_sum = 0;
    for (let i = 0; i < savedBirds.length; i++) {
        total_sum += savedBirds[i].score;
        if (savedBirds[i].score > max_score) max_score = savedBirds[i].score;
    }
    if (max_score != 0) {
        // console.log("MAX SCORE: ", max_score);
        for (let i = 0; i < savedBirds.length; i++) {
            savedBirds[i].fitness = savedBirds[i].score / total_sum;
        }
        // console.log(savedBirds);
        // noLoop();
    }
}