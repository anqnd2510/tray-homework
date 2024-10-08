/**
 * The maximum total score is 10 points.
 * 
 * 
 * @param {number} correctAnswers - Number of correct answers.
 * @param {number} totalQuestions - Total number of questions.
 * @returns {number} - Score calculated on a 10-point scale.
 */

const calculateScore = async (correctAnswers, totalQuestions) => {
    if (totalQuestions === 0) {
        return 0;
    }

    const pointsPerQuestion = 10 / totalQuestions;

    let score = correctAnswers * pointsPerQuestion;

    score = Math.min(score, 10);

    return parseFloat(score.toFixed(2));
}

module.exports = calculateScore;