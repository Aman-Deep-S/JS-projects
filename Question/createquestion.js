var questionList = document.getElementById("questionList");
var questionDetailContainer = document.getElementById("questionDetailContainer");
var createNewQuestion = document.getElementById("createNewQuestion");

function addQuestion(questionDetails) {
    const questionId = getQuestionId();
    const question = {
        title: questionDetails.title,
        description: questionDetails.description,
        id: questionId,
        upvotes: 0,
        downvotes: 0,
        createdat: Date.now(),
        isResolved: false,
        acceptedAnswer: 0
    };
    saveQuestionToStorage(question);
    displayQuestionAtUI(question);
}

function displayQuestionAtUI(question) {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("questionItemContainer");
    const title = document.createElement("h4");
    const description = document.createElement("p");
    const upvote = document.createElement("label");
    const downvote = document.createElement("label");
    const createdAT = document.createElement("p");

    title.innerText = question.title;
    description.innerText = question.description;
    upvote.innerText = "upvotes: " + question.upvotes; // Fixed plural form
    downvote.innerText = "downvotes: " + question.downvotes; // Fixed plural form
    createdAT.innerText = new Date(question.createdat).toLocaleDateString('en'); // Fixed date access

    questionContainer.appendChild(title);
    questionContainer.appendChild(description);
    questionContainer.appendChild(upvote).innerHTML+="<br>";
    questionContainer.appendChild(downvote);
    questionContainer.appendChild(createdAT);

    questionList.appendChild(questionContainer);
}

function selectQuestion(question) {
    displayQuestionDetails(question);
}

function displayQuestionDetails(question) {
    toggleDetailsSectionDisplay(question);
}

function toggleDetailsSectionDisplay() {
    createNewQuestion.classList.add("hidden");
    questionDetailContainer.classList.remove("hidden");
}

function saveQuestionToStorage(question) {
    let questions = getQuestionFromStorage();
    questions.push(question);
    localStorage.setItem("questions", JSON.stringify(questions));
}

function getQuestionFromStorage() {
    let questions = localStorage.getItem("questions");
    if (questions) {
        return JSON.parse(questions);
    }
    return [];
}
