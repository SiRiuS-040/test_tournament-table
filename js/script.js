




document.addEventListener('DOMContentLoaded', function (evt) {

    // console.log('проверка');
    let teamMatchupArr = document.querySelectorAll('.tournament__matchup')
    teamMatchupArr.forEach(matchUp => {

        let buttonMatch = matchUp.querySelector('.tournament__button-play-match')

        let teamsArr = matchUp.querySelectorAll('.tournament__team')
        teamsArr.forEach(team => {
            let teamName = team.querySelector('.tournament__team-name');
            console.log(teamName.textContent);
            if (teamName.textContent == '') {
                team.classList.add('not-ready')
                // console.log('нет команды');
            } else {
                team.classList.add('ready')
            }
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


        function getScore(parent) {

            teamArr.forEach(team => {
                let teamScore = team.querySelector('.tournament__team-score')
                teamScore.textContent = getRandomInt(0, 100)
            });
            target.classList.add('hidden')

            // teamArr.forEach(team => {
            //     let teamScore = team.querySelector('.tournament__team-score')
            //     if () {

            //     }
            // });


        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        // teamArr.forEach(team => {
        //     if (!team.classList.contains('ready')) {
        //         console.log('нет команд');
        //     }
        // });


        function startMatch() {

            if (teamArr[0].classList.contains('ready') && teamArr[1].classList.contains('ready')) {
                console.log('команды готовы');
                getScore()

                // if () {


                // }
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