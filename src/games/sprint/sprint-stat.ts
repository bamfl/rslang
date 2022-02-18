import { model, view } from "../../ts";
import { api } from "../../ts/api";
import { EPage, IWord, IWordData } from "../../types/types";

export class SprintStat {

    public getHTML(): string{
        return `
      <h2 class="sprint-title">Мини-игра спринт</h2>
      <div class="sprint-stat">
       <div class="sprint-stat__stat-box">
       <div class="sprint-stat__score" id="sprint-score-stat"></div>
       <div class="sprint-stat__streak" id="sprint-streak-stat"></div>
       <h2>Правильные ответы:</h2>
        <div class="sprint-stat__correct-words" id="sprint-correct-stat"></div>
       <h2>Неправильные ответы:</h2>
        <div class="sprint-stat__incorrect-words" id="sprint-incorrect-stat"></div>
        <button class="sprint-stat__again-button" id="sprint-again-button">Заново</button>
       </div>
      </div>
      `
    }

    public showStatWords() {
        console.log(model.sprintStatData);
        const streakSection = document.getElementById('sprint-streak-stat') as HTMLElement;
        const scoreSection = document.getElementById('sprint-score-stat') as HTMLElement;
        streakSection.innerHTML = `Лучшая серия за раунд: ${(model.sprintStatData.maxStreak).toString()}`;
        scoreSection.innerHTML = `Ваш счет за раунд: ${model.sprintScore}`;
        document.onkeyup = null; 
        this.showCorrectWords();
        this.showIncorrectWords();
        this.setAudioListeners();
        this.setAgainButtonListener();
    }

    private changeStatistics(){
        
    }

    private showCorrectWords(){
        const correctSection = document.getElementById('sprint-correct-stat') as HTMLElement;

        model.sprintStatData.correctWords.forEach((elem) => {
            correctSection.innerHTML += `<div class="sprint-stat__correct-word">
            ${elem.word} --- ${elem.wordTranslate} 
            <button class="sprint-stat__correct-audio" id="${!model.auth ? (elem as IWordData).id : (elem as IWord)._id}">Прослушать</button>
            </div>`
        });
    }

    private showIncorrectWords(){
        const incorrectSection = document.getElementById('sprint-incorrect-stat') as HTMLElement;

        model.sprintStatData.incorrectWords.forEach((elem) => {
            incorrectSection.innerHTML += `<div class="sprint-stat__incorrect-word">
            ${elem.word} --- ${elem.wordTranslate} 
            <button class="sprint-stat__incorrect-audio" id="${!model.auth ? (elem as IWordData).id : (elem as IWord)._id}">Прослушать</button>
            </div>`
        })  
    }

    private setAudioListeners(){
           const correctAudioBtn = document.querySelectorAll('.sprint-stat__correct-audio');
           const incorrectAudioBtn = document.querySelectorAll('.sprint-stat__incorrect-audio');

           correctAudioBtn.forEach((elem) => {
            const audio = new Audio();
            audio.src = `${api.baseUrl}/${(model.sprintStatData.correctWords.find((el) => (model.auth ? (el as IWord)._id : (el as IWordData).id) === elem.id) as IWordData | IWord).audio}`
              elem.addEventListener('click', function(){
                  audio.play();
              })
           });

           incorrectAudioBtn.forEach((elem) => {
            const audio = new Audio();
            audio.src = `${api.baseUrl}/${(model.sprintStatData.incorrectWords.find((el) => (model.auth ? (el as IWord)._id : (el as IWordData).id) === elem.id) as IWordData | IWord).audio}`
              elem.addEventListener('click', function(){
                  audio.play();
              })
           })

    }

    private setAgainButtonListener(){
        const againBtn = document.getElementById('sprint-again-button') as HTMLElement;
        againBtn.addEventListener('click', () => {
            model.previousPage = model.activePage;
            model.activePage = EPage.sprintDifficulty;
            view.renderContent(model.activePage);
        })
    }

}