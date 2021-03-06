
////////////////////Массивы с вопросами/ответами//////////////////////

var questions = ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'Вопрос 4', 'Quest 5'];

var answers = [
    ['Вариант ответа 1', 'Вариант ответа 2', 'Вариант ответа 3', 'Вариант ответа 4'],
    ['Вариант ответа 1', 'Вариант ответа 2', 'Вариант ответа 3', 'Вариант ответа 4'],
    ['Вариант ответа 1', 'Вариант ответа 2', 'Вариант ответа 3', 'Вариант ответа 4'],
    ['Вариант ответа 1', 'Вариант ответа 2', 'Вариант ответа 3'],
    ['lol', 'test', 'test']
];

/////////////Переменные для плавного скролла///////////////

var testMap = document.getElementsByClassName('wrapper__item');
var wrapper = document.getElementsByClassName('wrapper')[0];
var currentNode = 0;
var userInput = true;

///////////////функция собирающая вопросы/ответы в блоки//////////////
function createPage(questions, answers) {
    
    var parent = document.getElementsByClassName('test')[0];
    var navbar = document.getElementsByClassName('navbar')[0];
    
    for(var i = 0; i < questions.length; i++){
        
        var newQuestion = document.createElement('section');
        var newQuestionHeading = document.createElement('h2');
        var newNavbarLink = document.createElement('div');
        
        newQuestionHeading.innerHTML = questions[i];
        
        newQuestion.classList.add('test__question', 'wrapper__item');
        newQuestionHeading.classList.add('question__heading');
        newNavbarLink.classList.add('navbar__link');
        
        newNavbarLink.setAttribute('onclick', 'moveTo(' + i + ')')
        newNavbarLink.innerHTML = i + 1;
        
        parent.appendChild(newQuestion);
        newQuestion.appendChild(newQuestionHeading);
        navbar.appendChild(newNavbarLink);
        
        for(var o = 0; o < answers[i].length; o++){
            
            var newAnswer = document.createElement('p');
            
            newAnswer.innerHTML = '<input type="radio" name ="question' + i + '" value="' + answers[i][o] + '">' + answers[i][o];
            
            newQuestion.appendChild(newAnswer);
        }
        
        if(i == questions.length - 1) {
            var footer = document.createElement('footer');
            footer.classList.add('footer');
            footer.innerHTML = '<a href="#" class="footer__item">О нас</a><a href="#" class="footer__item">Контакты</a><a href="#" class="footer__item">Нашли баг?</a><a href="#" class="footer__item">Отзывы</a>'
            
            newQuestion.appendChild(footer);
        }
    }
}

function position() {
        document.getElementsByClassName('navbar')[0].style.top = (parseInt(document.documentElement.clientHeight) + 100) / 2 - parseInt(getComputedStyle(document.getElementsByClassName('navbar')[0]).height) / 2 + 'px';
}

////////////Функция перехода к выбранному вопросу/////////////////////

function moveTo(num) {
    
    wrapper.style.transform += 'translateY(' + (currentNode - num) * parseInt(getComputedStyle(document.getElementsByClassName('test__question')[0]).height) + 'px' + ')';
    
    currentNode = num;
    
}

///////////функция плавного перемещения/////////////

function move(deltaY){
    
    if(deltaY > 0 && userInput === true && currentNode < testMap.length - 1) {
        
        currentNode++;
        
        wrapper.style.transform += 'translateY('+ '-' + parseInt(getComputedStyle(testMap[currentNode]).height) + 'px' + ')';
        
        userInput = false;
        
        var timer = setTimeout(function() {
            
            userInput = true;	
            
        }, 1000);
        
    } else if(deltaY < 0 && userInput === true && currentNode > 0) {
        
        wrapper.style.transform += 'translateY(' + getComputedStyle(testMap[currentNode]).height + ')';
        
        currentNode--;
        
        userInput = false;
        
        var timer = setTimeout(function() {
            
            userInput = true;	   
            
        }, 1000);
    }
}

//////////Функции выполняемые при полной загрузке страницы/////////////

window.onload = function() {
    
    createPage(questions, answers);
    position();
    
}

/////////////////Функции выполняемые при скролле///////////////////

window.onwheel = function() {
    
    var deltaY = window.event.deltaY;
//			console.log(deltaY);
    move(deltaY);
    
}