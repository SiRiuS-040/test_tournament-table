




document.addEventListener('DOMContentLoaded', function (evt) {

    // console.log('проверка');
    let teamMatchupArr = document.querySelectorAll('.tournament__matchup')
    teamMatchupArr.forEach(matchUp => {

        let buttonMatch = matchUp.querySelector('.tournament__button-play-match')

        let teamsArr = matchUp.querySelectorAll('.tournament__team')
        teamsArr.forEach(team => {
            let teamNameInput = team.querySelector('.tournament__team-input');
            let teamName = team.querySelector('.tournament__team-name');
            console.log(teamName.textContent);

            if (teamName.textContent == '') {
                team.classList.add('not-ready')
                // console.log('нет команды');
            } else {
                team.classList.add('ready')
            }

            if (teamNameInput) {
                if (teamNameInput.value == '') {
                    team.classList.remove('ready')
                    team.classList.add('not-ready')

                    // console.log('нет команды');
                } else {
                    team.classList.add('ready')
                    team.classList.remove('not-ready')
                }
            }


            // 

            team.classList.add('battle')

        });

        let newTeamArr = [...teamsArr]
        console.log(newTeamArr[0]);

        if (newTeamArr[0].classList.contains('ready') && newTeamArr[1].classList.contains('ready')) {
            buttonMatch.classList.remove('hidden')
        } else {
            buttonMatch.classList.add('hidden')
        }

    });
})

document.addEventListener('click', function (evt) {

    if (evt.target && evt.target.classList.contains('tournament__button-play-match')) {
        console.log('играем матч');
        let target = evt.target

        let matchRound = target.closest('.tournament-table__wrapper');
        let parent = target.closest('.tournament__matchup');
        let teamArr = parent.querySelectorAll('.tournament__team')

        let allMatchArr = document.querySelectorAll('.tournament__matchup')

        function getScore(parent) {
            teamArr.forEach(team => {
                let teamScore = team.querySelector('.tournament__team-score')
                teamScore.textContent = getRandomInt(0, 10)
            });
            let firstTeamScore = teamArr[0].querySelector('.tournament__team-score').textContent;
            let SecondTeamScore = teamArr[1].querySelector('.tournament__team-score').textContent;
            if (firstTeamScore == SecondTeamScore) {
                console.log('счет одинаковый');

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
                // let teamNumber = team.getAttribute('data-team')
                if (team.classList.contains('winner')) {
                    let teamName = team.querySelector('.tournament__team-name').textContent;
                    // console.log(team);
                    // console.log(currentRound);
                    console.log(currentMatch);
                    console.log(Number(currentRound));
                    let findTeamArr = document.querySelectorAll('.tournament__team');
                    findTeamArr.forEach(findTeemm => {
                        let findTeamID = findTeemm.getAttribute('data-team');
                        let findMatch = findTeemm.closest('.tournament__matchup');
                        let findMatchRound = findMatch.getAttribute('data-round');
                        let findTeamName = findTeemm.querySelector('.tournament__team-name');
                        let setTeamName = team.querySelector('.tournament__team-name').textContent;
                        // let findMatchRound = 
                        // console.log(currentMatch);
                        // console.log(Number(currentRound));
                        if (currentMatch == findTeamID && (Number(currentRound) + 1 == findMatchRound)) {
                            console.log('двигаем подедителя');
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
                        console.log('есть победитель');
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
                }

            });

        }

        function startMatch() {

            if (teamArr[0].classList.contains('ready') && teamArr[1].classList.contains('ready')) {
                console.log('команды готовы');
                getScore()
                mooveWinner()
                unblockMatchButton()

                showChampion()

            } else {
                console.log('команды не готовы');
            }
        }

        startMatch();

        function checkScore() {
            if (teamArr[0].classList.contains('ready') && teamArr[1].classList.contains('ready')) {
                console.log('команды готовы');
                startMatch()
            } else {
                console.log('команды не готовы');
            }
        }





        // console.log(parent);


    }


})