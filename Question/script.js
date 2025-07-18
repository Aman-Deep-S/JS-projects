var questionDescription = document.getElementById("questionDescription");
var questionTitle = document.getElementById("questiontitle");
var submitQuestion = document.getElementById("SubmitQuestion");

submitQuestion.addEventListener("click", function (event) {
    var title = questionTitle.value;
    var description = questionDescription.value;
    addQuestion({ title: title, description: description });
    questionTitle.value = "";
    questionDescription.value = "";
});


// Onload show all questions
let questions = getQuestionFromStorage();
questions.forEach(function (question) {
    displayQuestionAtUI(question);
});
