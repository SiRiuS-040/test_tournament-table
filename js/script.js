
let TEAM_DATA = [
    {
        id: "1",
        name: "Участник 1",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "2",
        name: "Участник 2",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "3",
        name: "Участник 3",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "4",
        name: "Участник 4",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "5",
        name: "Участник 5",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "6",
        name: "Участник 6",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "7",
        name: "Участник 7",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "8",
        name: "Участник 8",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "9",
        name: "Участник 9",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "10",
        name: "Участник 11",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "11",
        name: "Участник 11",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "12",
        name: "Участник 12",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "13",
        name: "Участник 13",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "14",
        name: "Участник 15",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
    {
        id: "15",
        name: "Участник 15",
        logo: "https://fire-logo.ru/img/mascots.png"
    },
    {
        id: "16",
        name: "Участник 16",
        logo: "https://papik.pro/uploads/posts/2021-11/thumbs/1636129744_53-papik-pro-p-krutie-logotipi-foto-55.png"
    },
]

const MAX_GAME_SCORE = 10;

const MAX_TEAM_NAME = 15;


document.addEventListener('DOMContentLoaded', function (evt) {
    let teamMatchupArr = document.querySelectorAll('.tournament__matchup')
    teamMatchupArr.forEach(matchUp => {
        let buttonMatch = matchUp.querySelector('.tournament__button-play-match')
        let teamsArr = matchUp.querySelectorAll('.tournament__team')
        teamsArr.forEach(team => {
            let teamNameInput = team.querySelector('.tournament__team-input');
            let teamName = team.querySelector('.tournament__team-name');
            let teamDataNumber = team.getAttribute('data-team');
            if (teamName.textContent == '') {
                team.classList.add('not-ready')
            } else {
                team.classList.add('ready')
            }
            if (team.closest('.tournament__round--one')) {
                if (TEAM_DATA) {
                    for (let key in TEAM_DATA) {
                        if (teamDataNumber == TEAM_DATA[key].id) {
                            teamNameInput.value = TEAM_DATA[key].name
                            teamNameInput.setAttribute('data-default', TEAM_DATA[key].name)
                            teamName.textContent = TEAM_DATA[key].name
                            team.style.backgroundImage = `url(${TEAM_DATA[key].logo})`;
                        }
                    }
                }
            }
        });

        let newTeamArr = [...teamsArr]
        if (newTeamArr[0].classList.contains('ready') && newTeamArr[1].classList.contains('ready')) {
            buttonMatch.classList.remove('hidden')
        } else {
            buttonMatch.classList.add('hidden')
        }
    });
})

document.addEventListener('click', function (evt) {
    if (evt.target && evt.target.classList.contains('tournament__button-play-match')) {
        let target = evt.target
        let matchRound = target.closest('.tournament-table__wrapper');
        let parent = target.closest('.tournament__matchup');
        let teamArr = parent.querySelectorAll('.tournament__team')
        let allMatchArr = document.querySelectorAll('.tournament__matchup')

        function getScore(parent) {
            teamArr.forEach(team => {
                let teamScore = team.querySelector('.tournament__team-score')
                teamScore.textContent = getRandomInt(0, MAX_GAME_SCORE)
                team.classList.add('battle')
            });
            let firstTeamScore = teamArr[0].querySelector('.tournament__team-score').textContent;
            let SecondTeamScore = teamArr[1].querySelector('.tournament__team-score').textContent;
            if (firstTeamScore == SecondTeamScore) {
                console.log('счет одинаковый');
                setTimeout(() => {
                    teamArr.forEach(team => {
                        team.classList.remove('battle')
                    });
                }, 300);
            } else if (firstTeamScore > SecondTeamScore) {
                teamArr[0].classList.add('winner')
                teamArr[1].classList.remove('ready')
                teamArr[0].classList.remove('ready')
                teamArr[1].classList.add('looser')
                target.classList.add('hidden')
            } else {
                teamArr[1].classList.add('winner')
                teamArr[1].classList.remove('ready')
                teamArr[0].classList.remove('ready')
                teamArr[0].classList.add('looser')
                target.classList.add('hidden')
            }
        }
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        function mooveWinner() {
            let currentMatch = parent.getAttribute('data-match')
            let currentRound = parent.getAttribute('data-round')
            teamArr.forEach(team => {
                if (team.classList.contains('winner')) {
                    let findTeamArr = document.querySelectorAll('.tournament__team');
                    findTeamArr.forEach(findTeemm => {
                        let findTeamID = findTeemm.getAttribute('data-team');
                        let findMatch = findTeemm.closest('.tournament__matchup');
                        let findMatchRound = findMatch.getAttribute('data-round');
                        let findTeamName = findTeemm.querySelector('.tournament__team-name');
                        let setTeamName = team.querySelector('.tournament__team-name').textContent;
                        if (currentMatch == findTeamID && (Number(currentRound) + 1 == findMatchRound)) {
                            findTeemm.style = team.getAttribute('style');
                            findTeamName.textContent = setTeamName;
                            findTeemm.classList.remove('not-ready')
                            findTeemm.classList.add('ready')
                        }
                    });
                }
            });
        }

        function unblockMatchButton() {
            allMatchArr.forEach(match => {
                let teamArr = match.querySelectorAll('.tournament__team')
                let battleButton = match.querySelector('.tournament__button-play-match')
                let readyCounter = 0;
                teamArr.forEach(team => {
                    if (team.classList.contains('ready')) {
                        readyCounter++
                    }
                    if (team.classList.contains('winner')) {
                        battleButton.classList.add('hidden')
                    }
                });
                if (readyCounter == 2) {
                    battleButton.classList.remove('hidden')
                }
            });
        }
        function showChampion() {
            teamArr.forEach(team => {
                let mmatchRound = team.closest('.tournament__round')
                if (team.classList.contains('winner') && mmatchRound.classList.contains('final')) {
                    team.classList.add('champion')
                    let parentWrapper = team.closest('.final')
                    let championWrapperLogo = parentWrapper.querySelector('.tournament__winner-logo')
                    let championWrapperName = parentWrapper.querySelector('.tournament__winner-name')
                    let teamName = team.querySelector('.tournament__team-name').textContent
                    championWrapperName.textContent = teamName;
                    championWrapperLogo.style = team.getAttribute('style');
                    parentWrapper.classList.add('show-champion')
                }
            });
        }

        function startMatch() {
            if (teamArr[0].classList.contains('ready') && teamArr[1].classList.contains('ready')) {
                getScore()
                mooveWinner()
                unblockMatchButton()
                showChampion()
            } else {
            }
        }
        startMatch();
    }
})

document.addEventListener('input', function (evt) {
    // ввод своих названий команд
    if (evt.target && evt.target.classList.contains('tournament__team-input')) {
        let target = evt.target
        let parentTeam = target.closest('.tournament__team')
        let parentTeamName = parentTeam.querySelector('.tournament__team-name')
        parentTeamName.textContent = target.value;

        let inputTextArr = target.value.split('')
        console.log(inputTextArr);
        if (target.value.length > MAX_TEAM_NAME) {
            inputTextArr.splice(MAX_TEAM_NAME, 1);
            target.value = inputTextArr.join('')
        }
    }
})

document.addEventListener('change', function (evt) {
    // ввод своих названий команд
    if (evt.target && evt.target.classList.contains('tournament__team-input')) {
        let target = evt.target
        let parentTeam = target.closest('.tournament__team')
        let parentTeamName = parentTeam.querySelector('.tournament__team-name')
        parentTeamName.textContent = target.value;
        if (target.value.length == 0) {
            target.value = target.getAttribute('data-default');
        }
    }
})