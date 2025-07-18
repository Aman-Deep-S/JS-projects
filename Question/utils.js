function getQuestionId() {
    const storageKey = "_questionIdCount_";
    const currentId = localStorage.getItem(storageKey) || 1;
    localStorage.setItem(storageKey, parseInt(currentId) + 1);
    return parseInt(currentId);
}
